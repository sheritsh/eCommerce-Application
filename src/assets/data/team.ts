export interface IPerson {
  name: string;
  image: string;
  role: string;
  git: string;
  bio: string[];
}

const team: IPerson[] = [
  {
    name: 'Oleg Polovinko',
    image: '../assets/images/team/oleg.jpg',
    role: 'Team Lead, Frontend Developer',
    git: 'sheritsh',
    bio: [
      'Graduated from Volgograd Agricultural State University.',
      "Worked at McDonald's for 6 years.",
      "In September '22, I quit my job and enrolled in School 21, a programming school sponsored by Sber.",
      "During the winter of '22, I registered for RS School stage 0 and successfully completed the program.",
      "In March '23, I enrolled in Stage 1 and later progressed to Stage 2.",
      'Currently, I am nearing the completion of Stage 2 and actively seeking employment as a junior Frontend developer.',
    ],
  },
  {
    name: 'Ekaterina Trifonova',
    image: '../assets/images/team/kate.jpg',
    role: 'Frontend Developer',
    git: 'ekatrif',
    bio: [
      'Graduated from Bauman Moscow State Technical University in 2017.',
      'Worked as a technical writer.',
      'Developed websites on CMS Wordpress, Prestashop, Modx, Tilda etc.',
      'Completed a front-end development course at the "Professional" training center in 2021.',
      'Started learning frontend development on her own.',
      'Enrolled in stage 1 in RS School and failed it in 2022.',
      'Applied for stage 0 with a new cohort.',
      'Finished stage 1 and moved on to the second in 2023.',
      'Currently looking for a job as a front-end developer or internship.',
    ],
  },
  {
    name: 'Andrey Nezhdanov',
    image: '../assets/images/team/andrey.jpg',
    role: 'Frontend Developer',
    git: 'montek1o',
    bio: [],
  },
];

export default team;
