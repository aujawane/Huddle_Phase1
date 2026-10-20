import type { InterestGroup, University } from "@/lib/types";

export const mockUniversities: University[] = [
  { university_id: 1, name: "San Diego State University", domain: "sdsu.edu" },
  { university_id: 2, name: "University of California, San Diego", domain: "ucsd.edu" },
  { university_id: 3, name: "University of San Diego", domain: "sandiego.edu" },
  { university_id: 4, name: "California State University San Marcos", domain: "csusm.edu" },
  { university_id: 5, name: "University of California, Los Angeles", domain: "ucla.edu" },
  { university_id: 6, name: "University of Southern California", domain: "usc.edu" },
  { university_id: 7, name: "University of California, Berkeley", domain: "berkeley.edu" },
  { university_id: 8, name: "Stanford University", domain: "stanford.edu" },
  { university_id: 9, name: "California State University, Long Beach", domain: "csulb.edu" },
  { university_id: 10, name: "University of California, Irvine", domain: "uci.edu" },
];

// Preference options for the prototype; these are not seeded database categories.
export const interestGroups: InterestGroup[] = [
  {
    name: "Meet people",
    interests: ["Gaming", "Board Games", "Food", "Books", "Travel", "Social Events", "Language Exchange", "Anime and Manga", "Esports", "Tabletop RPGs", "Chess", "Trivia", "Comics", "Movies"],
  },
  {
    name: "Food and hands-on hobbies",
    interests: ["Cooking", "Baking", "Coffee", "Sewing", "Woodworking", "3D Printing", "DIY Projects", "Puzzles", "Collecting", "Car Enthusiasts"],
  },
  {
    name: "Build your future",
    interests: ["Career Development", "Networking", "Leadership", "Entrepreneurship", "Public Speaking", "Mentorship", "Student Government", "Debate", "Finance", "Marketing", "Product Design", "Consulting", "Investing"],
  },
  {
    name: "Create and perform",
    interests: ["Music", "Dance", "Film", "Theater", "Photography", "Writing", "Art and Design", "Crafts", "Music Production", "Singing", "Fashion", "Creative Writing", "Ceramics", "Digital Art", "Comedy"],
  },
  {
    name: "Get active",
    interests: ["Sports", "Fitness", "Hiking", "Outdoor Activities", "Yoga", "Wellness", "Recreational Teams", "Competitive Sports", "Basketball", "Soccer", "Volleyball", "Running", "Cycling", "Swimming", "Climbing", "Martial Arts", "Tennis", "Surfing", "Mental Health"],
  },
  {
    name: "Find your community",
    interests: ["Cultural Organizations", "International Students", "Faith and Spirituality", "LGBTQ+ Communities", "First-Generation Students", "Disability Community", "Transfer Students", "Women in STEM", "Veteran Students", "Commuter Students", "Graduate Students", "Interfaith Dialogue"],
  },
  {
    name: "Make a difference",
    interests: ["Community Service", "Sustainability", "Advocacy", "Fundraising", "Tutoring", "Animal Welfare", "Civic Engagement", "Social Justice", "Public Health", "Environmental Action", "Food Security", "Gardening"],
  },
  {
    name: "Explore your subject",
    interests: ["Business", "Health and Medicine", "Education", "Science", "Engineering", "Computer Science", "Law and Politics", "Research", "Robotics", "Electronics", "Hackathons", "Web Development", "Artificial Intelligence", "Data Science", "Psychology", "Astronomy", "Mathematics", "History", "Journalism"],
  },
];

// Common search terms students may use instead of the displayed interest label.
export const interestSearchAliases: Record<string, string> = {
  "Community Service": "volunteer volunteering service",
  "Computer Science": "coding programming software technology tech",
  "Social Events": "friends friendship socializing meet people",
  "Career Development": "jobs internships resumes careers skills",
  Networking: "professional connections careers",
  Mentorship: "mentor mentoring guidance advice",
  Gaming: "video games esports",
  "Outdoor Activities": "camping outdoors nature adventure",
  Hiking: "walking trails outdoors",
  Sports: "athletics sport",
  "Art and Design": "drawing painting illustration",
  "Health and Medicine": "premed pre-med nursing healthcare",
  "LGBTQ+ Communities": "lgbt pride queer",
  "First-Generation Students": "first gen first-gen",
};
