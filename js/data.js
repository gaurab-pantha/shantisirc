/* ============================================================
   SSIRC site data. Edit this file to change board members,
   links, or the built-in news list. No other code needs changes.
   ============================================================ */
window.SSIRC = {
  JOIN_URL: "https://forms.gle/P3rGE8NrjhkYCjAT6",
  FB_URL: "https://www.facebook.com/profile.php?id=61571635138716",
  IG_URL: "https://www.instagram.com/shanti_sirc/",
  EMAIL: "ssirc.club@gmail.com",
  SITE: "shantisirc.com",


  /* About text. These are drafts built from the club's posters - edit them to match the club's own words. */
  about: {
    mission: "To inspire innovation and creativity by giving students hands-on ways to learn science, ICT and robotics.",
    vision: "A student community in Rupandehi where young people grow into confident innovators, creators and leaders in technology.",
    values: [
      { t: "Innovation", d: "We try new ideas and turn them into working projects." },
      { t: "Teamwork", d: "We learn, build and lead together." },
      { t: "Integrity", d: "We lead with honesty, dedication and responsibility." },
      { t: "Learning by doing", d: "Hands-on sessions and real projects come first." }
    ]
  },

  programs: [
    { t: "Robotics & Innovation", d: "Explore real-world robotics and innovation projects." },
    { t: "Coding & Technology", d: "Learn coding, tools and new technologies." },
    { t: "Workshops", d: "Hands-on sessions such as our Aviation & Drone and 3D-printing workshops." },
    { t: "Competitions & Events", d: "Take part in competitions and exciting events." },
    { t: "Leadership", d: "Lead projects, join the team and make an impact." }
  ],

  expect: [
    ["Club introduction", "Know our mission, vision and goals."],
    ["Activities and plans", "Explore exciting projects and events."],
    ["Learning and growth", "Hands-on sessions and skill building."],
    ["Team and opportunities", "Meet the team and discover opportunities."],
    ["Your ideas matter", "Share, collaborate and innovate together."],
    ["Leadership", "Lead a project and make an impact."]
  ],

  /* Advisors and mentors: add people here and the Team page will show them.
     Example: { name: "Name", role: "Advisor teacher", photo: "img/name.jpg" } */
  advisors: [],

  faqs: [
    { q: "Who can join SSIRC?", a: "Our 2083/84 orientation was open to students of Classes 8–12 at Shree Shanti Namuna Secondary School. If you are not sure you qualify, message us and we will help." },
    { q: "What is the membership fee?", a: "Membership was announced as free at our 2083/84 orientation." },
    { q: "How do I join?", a: "Fill in our join form. It opens in a new tab.<br><a class=\"btn sm\" data-join>Open the join form</a>" },
    { q: "What will I do in the club?", a: "You can explore robotics, coding and technology, join hands-on workshops such as Aviation & Drone and 3D printing, take part in competitions and events, and work with a team on real projects." },
    { q: "Do I need experience to join?", a: "Hands-on sessions and skill building are a core part of the club, so you learn as you go. If you have questions about your level, send us a message." },
    { q: "Can I suggest a project or workshop?", a: "Yes. Your ideas matter at SSIRC. Share them with the Board by email or on Facebook." },
    { q: "Who runs the club?", a: "SSIRC is led by a Board of Directors of 10 students. Meet them on the <a href=\"team/\">Team page</a>." },
    { q: "How can I stay updated?", a: "Follow our Facebook page and Instagram @shanti_sirc, and check the <a href=\"events/\">Events page</a> on this website." },
    { q: "How can my organization work with SSIRC?", a: "We welcome schools, companies and organizations that want to support students in technology. See the <a href=\"partners/\">Partners page</a> or email us." }
  ],

  school: { name: "Shree Shanti Namuna Secondary School", address: "Tilottama-5, Manigram, Rupandehi, Nepal" },

  /* GitHub repository that holds this website (used to read the gallery, news and projects folders) */
  repo: { owner: "shantisirc", repo: "shantisirc.github.io", branch: "" },

  /* Board of Directors. "id" is the number printed on the ID card. */
  board: [
    { slug: "gunjit-gyawali",   name: "Gunjit Gyawali",   role: "President",         dept: "Executive",  photo: "img/gunjit.jpg",  id: "SSIRC-BOD-001", about: "Leads SSIRC with vision, dedication and integrity, inspiring innovation and empowering members." },
    { slug: "apsan-poudel",     name: "Apsan Poudel",     role: "Vice-President",    dept: "Executive",  photo: "img/apsan.jpg",   id: "SSIRC-BOD-002", about: "Supports the President in leading SSIRC and coordinating club activities and teamwork." },
    { slug: "siddhi-bhattarai", name: "Siddhi Bhattarai", role: "Secretary",         dept: "Secretariat",photo: "img/siddhi.jpg",  id: "SSIRC-BOD-003", about: "Keeps communication, coordination and management at SSIRC smooth and organized." },
    { slug: "sandesh-bk",       name: "Sandesh B.K",      role: "Joint-Secretary",   dept: "Secretariat",photo: "img/sandesh.jpg", id: "SSIRC-BOD-004", about: "Assists the Secretary with club records, communication, meetings and events." },
    { slug: "bishow-gyawali",   name: "Bishow Gyawali",   role: "Treasurer",         dept: "Finance",    photo: "img/bishow.jpg",  id: "SSIRC-BOD-005", about: "Manages SSIRC's finances with transparency, responsibility and precision." },
    { slug: "bishnu-pandey",    name: "Bishnu Pandey",    role: "Joint-Treasurer",   dept: "Finance",    photo: "img/bishnu.jpg",  id: "SSIRC-BOD-006", about: "Supports the Treasurer with SSIRC's budgeting and financial planning." },
    { slug: "gaurab-pantha",    name: "Gaurab Pantha",    role: "Marketing Head",    dept: "Marketing",  photo: "img/gaurab.jpg",  id: "SSIRC-BOD-007", about: "Builds SSIRC's identity through creative design, digital marketing and media documentation." },
    { slug: "susant-gaire",     name: "Susant Gaire",     role: "Marketing Officer", dept: "Marketing",  photo: "img/susant.jpg",  id: "SSIRC-BOD-008", about: "Promotes every club initiative through design, digital marketing and media." },
    { slug: "amit-pandey",      name: "Amit Pandey",      role: "Technical Head",    dept: "Technical",  photo: "img/amit.jpg",    id: "SSIRC-BOD-009", about: "Leads the Technical Department: robotics, programming, electronics and IT initiatives." },
    { slug: "pramish-bhusal",   name: "Pramish Bhusal",   role: "Technical Officer", dept: "Technical",  photo: "img/pramish.jpg", id: "SSIRC-BOD-010", about: "Supports the Technical Department in robotics, programming, electronics and IT." }
  ],

  /* News and events taken from the club's Facebook page.
     tag: Event | Workshop | Announcement | Notice | Observance */
  events: [
    { date: "2026-10-15", title: "Exploring the Future of Tech in Tilottama", tag: "Event",
      text: "A session exploring where technology is heading in Tilottama. See the photos and full details on our Facebook page." },
    { date: "2026-10-05", title: "World Teachers' Day 2026", tag: "Observance",
      text: "We wished all teachers on World Teachers' Day." },
    { date: "2026-09-25", when: "Sep 25–27, 2026", title: "Heavy Rainfall Alert", tag: "Notice",
      text: "We shared the weather department's warning about heavy rainfall across parts of Nepal, with flood, landslide and thunderstorm risks." },
    { date: "2026-09-20", title: "Aviation & Drone Workshop", tag: "Workshop",
      text: "Learn, build, fly. The workshop covered aviation basics, building a small model plane and hands-on drone flying with guidance. Day 1 was completed on September 20.",
      facts: [["Day", "Sunday, September 20"], ["Start", "10:30 AM"], ["Venue", "Shree Shanti Namuna Secondary School (Main Hall / Lab)"]] },
    { date: "2026-09-19", title: "Constitution Day 2083 (संविधान दिवस)", tag: "Observance",
      text: "Greetings from SSIRC on Constitution Day." },
    { date: "2026-09-17", title: "Vishwakarma Puja 2083", tag: "Observance",
      text: "Greetings from SSIRC on Vishwakarma Puja." },
    { date: "2026-09-15", title: "Rishi Panchami", tag: "Observance",
      text: "Greetings from SSIRC on Rishi Panchami." },
    { date: "2026-09-06", title: "Design. Create. 3D-Print.", tag: "Workshop",
      text: "A hands-on session at Shree Shanti Namuna where students designed a keyring in CAD and got it 3D printed." },
    { date: "2026-09-02", title: "A step towards the future of Robotics & ICT in Tilottama", tag: "Event",
      text: "See the photos and details of this step for robotics and ICT in Tilottama on our Facebook page." },
    { date: "2026-08-18", title: "Orientation Program 2083/84", tag: "Event",
      text: "Photos and highlights from our orientation program for the 2083/84 club year." },
    { date: "2026-08-17", title: "Club Orientation and Installation 2083/84", tag: "Announcement",
      text: "Be part of something bigger. The orientation introduced the club's mission, activities, learning plans, teams and leadership opportunities.",
      facts: [["Date", "Bhadra 2"], ["Time", "10:00 AM – 3:00 PM"], ["Venue", "Shanti Main Hall"], ["Eligibility", "Classes 8–12"], ["Membership fee", "Free"]] },
    { date: "2026-08-17", title: "Nag Panchami (नाग पञ्चमी)", tag: "Observance",
      text: "Greetings from SSIRC on Nag Panchami." },
    { date: "2026-07-25", title: "Meet the Board of Directors", tag: "Announcement",
      text: "We introduced the Board of Directors of Shanti Science, ICT & Robotics Club (SSIRC).", link: "team/", linkText: "Meet the team" }
  ]
};
