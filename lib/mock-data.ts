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

export const interestGroups: InterestGroup[] = [
  {
    name: "Arts and expression",
    interests: ["Music", "Dance", "Film", "Theater", "Photography", "Writing", "Art and Design"],
  },
  {
    name: "Community and identity",
    interests: [
      "Cultural Organizations",
      "International Students",
      "Community Service",
      "Sustainability",
      "Advocacy",
      "Faith and Spirituality",
      "Student Government",
    ],
  },
  {
    name: "Sports, wellness, and recreation",
    interests: ["Sports", "Fitness", "Outdoor Activities", "Wellness", "Gaming", "Food", "Travel"],
  },
  {
    name: "Academic and professional",
    interests: [
      "Business",
      "Health and Medicine",
      "Education",
      "Science",
      "Engineering",
      "Computer Science",
      "Law and Politics",
      "Career Development",
      "Entrepreneurship",
    ],
  },
];
