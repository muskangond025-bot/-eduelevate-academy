export interface CourseResult {
  rankOrClass: string;
  name: string;
  stat: string;
}

export interface CourseData {
  id: string;
  name: string;
  duration: string;
  eligibility: string;
  description: string;
  whoIsItFor: string[];
  syllabus: { title: string; topics: string[] }[];
  results?: CourseResult[];
}

export const coursesData: Record<string, CourseData> = {
  "11th-science": {
    id: "11th-science",
    name: "11th Science Integrated",
    duration: "1 Year Academic Program",
    eligibility: "Completed Grade 10",
    description: "Build a rock-solid foundation for both boards and competitive exams. We cover Physics, Chemistry, and Biology/Maths with a focus on core principles.",
    whoIsItFor: ["Students starting their Junior College journey.", "Individuals aiming for high percentages in boards.", "Beginners looking to transition to competitive level."],
    syllabus: [
      { title: "Physical Sciences", topics: ["Laws of Motion", "Work & Energy", "Chemical Bonding", "Atomic Structure"] },
      { title: "Mathematical Foundations", topics: ["Trigonometry", "Linear Algebra", "Basic Calculus", "Sets & Relations"] }
    ]
  },
  "12th-science": {
    id: "12th-science",
    name: "12th Science Mastery",
    duration: "1 Year Board & Entrance Sync",
    eligibility: "Completed Grade 11",
    description: "The final push for board excellence and simultaneous preparation for major entrance exams. Includes intensive revision and test series.",
    whoIsItFor: ["Grade 12 students aiming for merit lists.", "Competitive aspirants who need a balanced approach.", "Students looking for intensive board-pattern practice."],
    syllabus: [
      { title: "Advanced Sciences", topics: ["Electromagnetism", "Organic Chemistry Mastery", "Plant & Human Physiology", "Optics"] },
      { title: "Mathematics", topics: ["Integral Calculus", "Vectors & 3D Geometry", "Probability", "Differential Equations"] }
    ]
  },
  "mht-cet": {
    id: "mht-cet",
    name: "MHT-CET FastTrack",
    duration: "6 Months Intensive",
    eligibility: "Grade 12 Students / Droppers",
    description: "Optimized for speed. We focus on the specific MCQ patterns of Maharashtra State's entrance exam, providing shortcut methods and high-frequency question patterns.",
    whoIsItFor: ["Engineering & Pharmacy aspirants in Maharashtra.", "Students looking for speed-oriented coaching.", "Individuals aiming for top state colleges like COEP, VJTI."],
    syllabus: [
      { title: "Speed Physics", topics: ["Quick Formulas", "Circuit Analysis", "Magnetism Shortcuts", "Waves"] },
      { title: "State-Level Math", topics: ["Trig Shortcuts", "Calculus Speed Drills", "Geometry Visualization", "Statics"] }
    ]
  },
  "nda": {
    id: "nda",
    name: "NDA Warriors",
    duration: "1 Year Officer Training Prep",
    eligibility: "Grade 11/12 Unmarried Males/Females",
    description: "Combining academic excellence with character building. We prepare students for the UPSC NDA written examination and provide SSB orientation.",
    whoIsItFor: ["Defense service aspirants.", "Students with a strong sense of discipline.", "Individuals aiming for a career in the Indian Armed Forces."],
    syllabus: [
      { title: "General Ability", topics: ["History & Polity", "Geography", "Current Affairs", "General Science"] },
      { title: "Maths for NDA", topics: ["Calculus", "Algebra", "Probability", "Statistics"] }
    ]
  },
  "jee": {
    id: "jee",
    name: "IIT-JEE Coaching",
    duration: "2 Year Integrated (Grade 11 & 12)",
    eligibility: "Students moving to 11th Science",
    description: "The gold standard of engineering coaching in India. We aim for deep mastery of Physics, Chemistry, and Mathematics concepts required to crack both JEE Main and Advanced.",
    whoIsItFor: [
      "Ambitious students aiming for IITs and NITs.",
      "High achievers who enjoy solving complex logic problems.",
      "Students dedicated to a 2-year rigorous academic marathon."
    ],
    syllabus: [
      { title: "Physics", topics: ["Mechanics & Kinematics", "Electrodynamics", "Optics & Modern Physics", "Thermodynamics"] },
      { title: "Mathematics", topics: ["Calculus & Analysis", "Coordinate Geometry", "Algebra & Complex Numbers", "Vector & 3D"] },
      { title: "Chemistry", topics: ["Physical Equilibrium", "Organic Reaction Mechanisms", "Inorganic Coordination", "Atomic Structure"] }
    ],
    results: [
      { rankOrClass: "AIR 12", name: "Rohan S.", stat: "Score: 342/360" },
      { rankOrClass: "AIR 45", name: "Anish G.", stat: "Percentile: 99.98" },
      { rankOrClass: "AIR 84", name: "Mehul T.", stat: "IIT-B Selection" },
      { rankOrClass: "AIR 105", name: "Sanya K.", stat: "IIT-D Selection" }
    ]
  },
  "neet": {
    id: "neet",
    name: "NEET Medical",
    duration: "2 Year Core Path",
    eligibility: "Students moving to 11th Science (PCB)",
    description: "Specialized training for the National Eligibility cum Entrance Test. Our biology-heavy focus combined with intensive chemical logic prepares you for AIIMS and top medical colleges.",
    whoIsItFor: [
      "Aspiring doctors and medical researchers.",
      "Students with strong visualization skills in biological sciences.",
      "Those aiming for top-tier government medical colleges."
    ],
    syllabus: [
      { title: "Biology", topics: ["Human Physiology", "Genetics & Evolution", "Plant Reproduction", "Cell Biology & Biotech"] },
      { title: "Chemistry", topics: ["Chemical Bonding", "Organic Chemistry Basics", "Environmental Chemistry", "Biomolecules"] },
      { title: "Physics", topics: ["Modern Physics", "Electromagnetism", "Fluids & Mechanics", "Wave Optics"] }
    ],
    results: [
      { rankOrClass: "715/720", name: "Priya V.", stat: "AIR 05" },
      { rankOrClass: "705/720", name: "Karan L.", stat: "AIR 24" },
      { rankOrClass: "698/720", name: "Sneha R.", stat: "AIIMS Selection" },
      { rankOrClass: "690/720", name: "Vikram S.", stat: "MAMC Selection" }
    ]
  },
  "foundation": {
    id: "foundation",
    name: "Junior High (8-10)",
    duration: "3 Year Foundation Trail",
    eligibility: "Students in Grade 8, 9, or 10",
    description: "Building the mental muscles early. This program bridges the gap between school curriculum and competitive exam logic, focusing on Olympiads and NTSE preparation.",
    whoIsItFor: [
      "Early bloomers who want to stay ahead of the curve.",
      "Students aiming to build a strong base for future JEE/NEET.",
      "Those appearing for Olympiads and NTSE."
    ],
    syllabus: [
      { title: "Logical Reasoning", topics: ["Mental Ability", "Direction Sense", "Pattern Recognition", "Coding-Decoding"] },
      { title: "Advanced Science", topics: ["Atomic Structure", "Force & Motion", "Life Processes", "Natural Resources"] },
      { title: "Higher Mathematics", topics: ["Number Systems", "Polynomials", "Geometry Proofs", "Probability"] }
    ],
    results: [
      { rankOrClass: "Class 10 Topper", name: "Aryan K.", stat: "Score: 98.4%" },
      { rankOrClass: "Class 9 Topper", name: "Isha P.", stat: "Score: 97.2%" },
      { rankOrClass: "Class 8 Topper", name: "Siddharth M.", stat: "Score: 99.0%" }
    ]
  },
  "olympiads": {
    id: "olympiads",
    name: "Olympiads / NSE",
    duration: "1 Year Specialized Crack",
    eligibility: "Students in Grade 9-12",
    description: "Elite-level training for national and international Olympiads (Physics, Chemistry, Maths, Astronomy). We focus on non-routine problem solving and high-level derivations.",
    whoIsItFor: [
      "Gifted students with a passion for deep subject research.",
      "Those aiming to represent India in International Olympiads.",
      "Students targeting KVPY and other specialized scholarships."
    ],
    syllabus: [
      { title: "Non-Routine Math", topics: ["Number Theory", "Combinatorics", "Functional Equations", "Euclidean Geometry"] },
      { title: "Advanced Theory", topics: ["Astro-Physics", "Inorganic Qual Analysis", "Relativity Basics", "Quantum Mechanics Intro"] }
    ]
  }
};
