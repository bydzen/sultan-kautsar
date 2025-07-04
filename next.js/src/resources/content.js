import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Sultan",
  lastName: "Kautsar",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Founder & Web Engineer",
  avatar: "/images/avatar.jpg",
  email: "contact@sultankautsar.com",
  location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally share insigts on technology, design, and the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/bydzen",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/sultankautsar",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@bydzen",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bridging aesthetics and modern web engineering</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Rayatiga UI</strong></>,
    href: "/work/rayatiga-ui",
  },
  subline: (
    <>
      Passionate learner in technology, design, and its business, founder of Rayatiga, a thriving technology-focused SME.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  cta: {
    display: true,
    link: "mailto:" + person.email,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p>I believe in integrity, upholding honesty and strong moral values in everything I do. Trust and respect are the foundation of meaningful relationships, both personally and professionally.</p>
        <p>Life is full of challenges, but with resilience, I embrace setbacks as opportunities for growth. Adaptability and persistence drive me forward, no matter the obstacles. </p>
        <p>Above all, I practice gratitude, appreciating the present, finding value in every experience, and fostering a positive mindset. This perspective keeps me grounded and motivated in all aspects of life.</p>
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Rayatiga",
        timeframe: "2020 - Present",
        role: "Founder & Web Developer",
        achievements: [
          <>
            Founded Rayatiga, a technology-focused SME, leading a team of 10+ in delivering innovative
            web solutions.
          </>,
          <>
            Developed and launched Rayatiga UI, a customizable design system that has been adopted by
            over 50 clients, enhancing their web development efficiency.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/rayatiga-ui/rayatiga-home.png",
            alt: "Rayatiga UI Project",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/rayatiga-ui/rayatiga-about.png",
            alt: "Rayatiga UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Breef Studio",
        timeframe: "2023 - Present",
        role: "WP Web Developer",
        achievements: [
          <>
            Worked as a WordPress developer at Breef Studio, contributing to the development of
            high-profile projects for clients in various industries.
          </>,
          <>
            Implemented custom WordPress themes and plugins, enhancing site functionality and user
            experience.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/breef-studio/breef-studio-ui.png",
            alt: "Breef Studio Website",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Telkom University",
        description: <>Studied information technology with a focus on IT preneur, web development and design.</>,
      },
      {
        name: "Bangkit Academy",
        description: <>Studied online about cloud computing and web development through the Bangkit Academy program.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Designing user interfaces and experiences with Figma.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "WordPress",
        description: <>Building and customizing WordPress sites with themes and plugins.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Angular",
        description: <>Developing dynamic web applications using Angular framework.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      }
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about tech and designs...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects - ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery - ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
