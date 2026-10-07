// team.js — Directors and employees for /about/team
// Source: agents/Annexure 4 Team Composition.docx (3 directors + 44 employees)
// Employee designation = "Task Assigned" column of the source document.
// Director photos: add the image to src/assets/images/team/, import it here and set `photo`.
// Without a photo the card shows an initials avatar.
// Message markup: **bold**, ==orange bold italic highlight==; blank line = new paragraph.

export const DIRECTORS = [
  {
    id: 1,
    name: 'Himanshu Goel',
    designation: 'Founder & Director',
    qualifications: [
      'M.Tech (Biotechnology)',
      'Post Graduate Diploma in Urban Environment Management Law',
      'M.A. in Sociology',
    ],
    photo: null,
    message: `At **OEMSIPL**, we believe sustainable development is built on the foundation of sound science, responsible governance and environmental integrity. Our mission is to ==“be a part of Sustainability”== and to deliver integrated environmental solutions that enable businesses and communities to grow responsibly while protecting natural resources for future generations.

With expertise in Environmental Consultancy, EIA, Environmental Monitoring, Laboratory Testing, Regulatory Compliance, Sustainability and ESG Advisory, we support our clients through technically robust, transparent and practical solutions.

Our organization brings together environmental science, engineering, regulatory knowledge, laboratory capabilities and sustainability expertise to provide comprehensive solutions across the project lifecycle.

We are committed to quality, innovation, scientific excellence and ethical professional practices. Through continuous improvement and multidisciplinary expertise, we aspire to be a trusted partner in creating a cleaner, safer and more sustainable future.`,
  },
  {
    id: 2,
    name: 'Vipul Aggarwal',
    designation: 'Director',
    qualifications: ['M.Tech in Environmental Engineering'],
    photo: null,
    message: null,
  },
  {
    id: 3,
    name: 'Krishan Chandra Panda',
    designation: 'Director',
    qualifications: ['B.Tech in Biotechnology', 'M.Sc. (Environmental Sciences)'],
    photo: null,
    message: null,
  },
];

export const EMPLOYEE_GROUPS = [
  {
    id: 'environmental',
    name: 'Environmental & Technical Team',
    description:
      'Environmental experts, EIA coordinators, functional area experts, GIS professionals, fire & safety experts and technical consultants.',
    employees: [
      { id: 4, name: 'Ms. Amita Jain', qualifications: 'Master of Technology in Environmental Science & technology', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 5, name: 'Nilesh Deshmukh', qualifications: 'M. Tech in Environmental Engineering', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 6, name: 'Mr. Laxman Kumar Aggarwal', qualifications: 'M. Sc (Organic Chemistry) & B.Sc. in Chemistry, Zoology, Botany', designation: 'EIA Coordinator · Functional Area Expert' },
      { id: 7, name: 'Mr. Arun Kumar Tyagi', qualifications: 'Master in Arts Post Graduate Certificate course in Geo informatics', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 8, name: 'Dr. Sanjeev Kumar Yadav', qualifications: 'Ph.D Agriculture Chemistry & Soil Science, M.Sc Agriculture Chemistry & Soil Science', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 9, name: 'Dr. Devendra Khokhar', qualifications: 'M.B.A in Environmental & Industrial Safety Management', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 10, name: 'Mr. Mohan Shriram Bhagwat', qualifications: 'M.Sc.Tech. (Applied Geology)', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 11, name: 'Mr. Sanjay Manwani', qualifications: 'Bachelor of Engineering (BE) in mining', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 12, name: 'Mr. Amit Kumar', qualifications: 'P.G. Diploma in Industrial Safety Management, M. Tech in Env. Eng. & Management, B. Tech (Biotechnology in Industrial Microbiology)', designation: 'EIA Coordinator · Empaneled Expert' },
      { id: 13, name: 'Mr. Saurav Ambastha', qualifications: 'Ph.D. in Environmental Engineering', designation: 'Functional Area Expert' },
      { id: 14, name: 'Harshit Chugh', qualifications: 'Post Gradate Diploma in Environmental Management', designation: 'Functional Area Expert' },
      { id: 15, name: 'Mr. Pradeep Lodhi', qualifications: 'M. Sc Environmental Science', designation: 'Functional Area Associate' },
      { id: 16, name: 'Mr. Mir Dulal', qualifications: 'P.G in GIS & Remote Sensing', designation: 'Team Member' },
      { id: 17, name: 'Ms. Shrejal Mishra', qualifications: 'M. Sc Environmental Science', designation: 'Functional Area Associate' },
      { id: 18, name: 'Dr. Jyoti Joshi', qualifications: 'Ph.D in Environmental Science', designation: 'Team Member' },
      { id: 19, name: 'Ms. Aradhana', qualifications: 'M. Sc Environmental Science', designation: 'Team Member' },
      { id: 20, name: 'Ms. Vaishali Verma', qualifications: 'M. Sc Environmental Science', designation: 'Team Member' },
      { id: 21, name: 'Ms. Bulbul Kumari', qualifications: 'M. Sc Environmental Science', designation: 'Team Member' },
      { id: 22, name: 'Mr. Jay Prakash Singh', qualifications: 'M. Sc Environmental Science', designation: 'Functional Area Associate' },
      { id: 23, name: 'Ms. Shreya Madhup', qualifications: 'PG in Environmental Science', designation: 'Functional Area Associate' },
      { id: 24, name: 'Ms. Nikita Nagar', qualifications: 'M. Sc in Bio-Technology', designation: 'Functional Area Associate' },
      { id: 25, name: 'Ms. Kajal Kashyap', qualifications: 'M. Sc Environmental Science', designation: 'Functional Area Associate' },
      { id: 26, name: 'Mr. Shivam', qualifications: 'M. Sc Environmental Science', designation: 'Functional Area Associate' },
      { id: 27, name: 'Ms. Farha Gaur', qualifications: 'M. Tech Environmental Engineering', designation: 'Functional Area Associate' },
      { id: 28, name: 'Sunjeet Singh', qualifications: 'Bachelor of Arts', designation: 'Functional Area Associate' },
      { id: 29, name: 'Mr. Ambuj Patel', qualifications: 'M. Sc Environmental Science', designation: 'Functional Area Associate' },
    ],
  },
  {
    id: 'laboratory',
    name: 'Laboratory & Research Team',
    description:
      'Laboratory experts, analysts, quality control and data management specialists.',
    employees: [
      { id: 36, name: 'Vandana Gupta', qualifications: 'M. Sc Environmental Science', designation: 'Technical Manager – Laboratory' },
      { id: 37, name: 'Kapil Yadav', qualifications: 'Bachelor in Computer Application', designation: 'Data Management' },
      { id: 38, name: 'Mr. Rohit', qualifications: 'M. Sc in Chemistry', designation: 'Quality control Analyst' },
      { id: 39, name: 'Mr. Shubham', qualifications: 'M. Sc Environmental Science', designation: 'Lab Analyst' },
      { id: 40, name: 'Preetam', qualifications: 'High School', designation: 'Lab Analyst' },
    ],
  },
  {
    id: 'business',
    name: 'Business & Corporate Team',
    description:
      'Business development, finance, legal & compliance, HR and corporate affairs professionals.',
    employees: [
      { id: 30, name: 'Ms. Komal Pal', qualifications: 'B.A Owners in Applied Psychology', designation: 'HR & Admin Work' },
      { id: 31, name: 'Furkan Saifi', qualifications: 'M.B.A in Finance', designation: 'Economic Affairs' },
      { id: 32, name: 'Prashant Kumar Dahiya', qualifications: 'Diploma in CS', designation: 'Legal Compliances' },
      { id: 33, name: 'Vaibhav Singh', qualifications: 'Bachelor of Arts', designation: 'Business Development' },
      { id: 34, name: 'Ashutosh Pandey', qualifications: 'Bachelor of Science', designation: 'Business Development' },
      { id: 35, name: 'Neeraj Rana', qualifications: 'Bachelor of Science', designation: 'Data Entry Executive' },
    ],
  },
  {
    id: 'operations',
    name: 'Operations & Support Team',
    description:
      'Field monitoring professionals, housekeeping and multi-tasking support staff.',
    employees: [
      { id: 41, name: 'Mithun Tyagi', qualifications: 'High School', designation: 'Field & Monitoring' },
      { id: 42, name: 'Veer Singh Rana', qualifications: 'Intermediate', designation: 'Field & Monitoring' },
      { id: 43, name: 'Sandeep Kumar', qualifications: 'Intermediate', designation: 'Field & Monitoring' },
      { id: 44, name: 'Mr. Bhuban Thapa', qualifications: 'Intermediate', designation: 'Multi-tasking Staff' },
      { id: 45, name: 'Mr. Laxmi Prasad Shriwas', qualifications: 'High School', designation: 'Housekeeping Work' },
      { id: 46, name: 'Mrs. Lakshmi', qualifications: 'High School', designation: 'Housekeeping Work' },
      { id: 47, name: 'Mr. Shakti', qualifications: 'High School', designation: 'Housekeeping Work' },
    ],
  },
];

export const getDirectorById = (id) => DIRECTORS.find((director) => director.id === id);

export const getEmployeeGroupById = (id) => EMPLOYEE_GROUPS.find((group) => group.id === id);

export const getTotalEmployees = () =>
  EMPLOYEE_GROUPS.reduce((total, group) => total + group.employees.length, 0);
