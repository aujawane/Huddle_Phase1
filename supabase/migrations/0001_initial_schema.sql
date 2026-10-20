create extension if not exists citext;

create table public.university (
  university_id bigint generated always as identity primary key,
  name text not null unique,
  domain citext unique
);

create table public.club (
  club_id bigint generated always as identity primary key,
  university_id bigint not null references public.university(university_id) on delete cascade,
  name text not null,
  description text not null default '',
  status text not null default 'active' check (status in ('active', 'inactive', 'pending')),
  logo_url text,
  updated_at timestamptz not null default now(),
  unique (university_id, name)
);

create table public.category_type (
  type_id bigint generated always as identity primary key,
  type_name text not null unique
);

create table public.category (
  category_id bigint generated always as identity primary key,
  type_id bigint not null references public.category_type(type_id) on delete restrict,
  category_name text not null,
  unique (type_id, category_name)
);

create table public.club_category (
  club_id bigint not null references public.club(club_id) on delete cascade,
  category_id bigint not null references public.category(category_id) on delete cascade,
  primary key (club_id, category_id)
);

create table public.location (
  location_id bigint generated always as identity primary key,
  university_id bigint not null references public.university(university_id) on delete cascade,
  building text not null,
  room text,
  unique (university_id, building, room)
);

create table public.meeting (
  meeting_id bigint generated always as identity primary key,
  club_id bigint not null references public.club(club_id) on delete cascade,
  location_id bigint references public.location(location_id) on delete set null,
  day_of_week smallint not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time,
  check (end_time is null or end_time > start_time)
);

create table public.manager (
  manager_id bigint generated always as identity primary key,
  name text not null,
  email citext not null unique,
  auth_user_id uuid not null unique references auth.users(id) on delete cascade
);

create table public.club_manager (
  manager_id bigint not null references public.manager(manager_id) on delete cascade,
  club_id bigint not null references public.club(club_id) on delete cascade,
  role text not null default 'editor',
  primary key (manager_id, club_id)
);

create table public.club_link (
  link_id bigint generated always as identity primary key,
  club_id bigint not null references public.club(club_id) on delete cascade,
  link_type text not null,
  url text not null
);

create index club_university_idx on public.club(university_id);
create index club_status_idx on public.club(status);
create index category_name_idx on public.category(category_name);
create index meeting_club_day_idx on public.meeting(club_id, day_of_week, start_time);
create index location_university_idx on public.location(university_id);

alter table public.university enable row level security;
alter table public.club enable row level security;
alter table public.category_type enable row level security;
alter table public.category enable row level security;
alter table public.club_category enable row level security;
alter table public.location enable row level security;
alter table public.meeting enable row level security;
alter table public.manager enable row level security;
alter table public.club_manager enable row level security;
alter table public.club_link enable row level security;

create policy "Universities are publicly readable"
on public.university for select using (true);

create policy "Active clubs are publicly readable"
on public.club for select using (status = 'active');

create policy "Category types are publicly readable"
on public.category_type for select using (true);

create policy "Categories are publicly readable"
on public.category for select using (true);

create policy "Club categories are publicly readable"
on public.club_category for select using (true);

create policy "Locations are publicly readable"
on public.location for select using (true);

create policy "Meetings are publicly readable"
on public.meeting for select using (true);

create policy "Club links are publicly readable"
on public.club_link for select using (true);

create policy "Managers can read their own account"
on public.manager for select to authenticated
using (auth.uid() = auth_user_id);

create policy "Managers can read their club assignments"
on public.club_manager for select to authenticated
using (
  exists (
    select 1 from public.manager
    where manager.manager_id = club_manager.manager_id
      and manager.auth_user_id = auth.uid()
  )
);
