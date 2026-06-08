export default class ModalContentProvider {
    constructor() {
      this.modalContents = {
        aboutMe: {
            title: 'Projects',
            description: `
    I have worked on several diverse projects that combine creativity, software engineering, and practical problem-solving. 
    These include an interactive 3D CV/Portfolio built with JavaScript and Blender, an Android application for displaying 
    monuments and restaurants in Skopje using Kotlin, Firebase, and OSMDroid, a Movies Web Application developed with 
    Java Spring Boot and Thymeleaf, and a data visualization and mapping application using the Esri Developer Core API. 
    Through these projects, I gained experience in frontend and backend development, interactive UI design, geospatial 
    visualization, and performance optimization.
    
    <br><br>

    <strong>You can find my work on GitHub:</strong>
    <a 
      href="https://github.com/VedaNarashanova" 
      target="_blank"
      style="color: white; font-weight: bold; text-decoration: none;">
      github.com/VedaNarashanova
    </a>
    <br>

    <strong>LinkedIn:</strong>
    <a 
      href="https://www.linkedin.com/in/veda-narashanova-b4a38b272/" 
      target="_blank"
      style="color: white; font-weight: bold; text-decoration: none;">
      linkedin.com/in/veda-narashanova-b4a38b272
    </a>

    <br>

    <strong>Email:</strong> vedanarasanova@yahoo.com
  `
        },
        projects: {
          title: 'About me',
          description: 'I am a fourth-year student at the Faculty of Computer Science and\n' +
              'Engineering with a strong interest in software engineering. I am\n' +
              'ambitious, hardworking, and dedicated. I have experience working\n' +
              'on the Internal HR project at Asee Dooel, where I was assigned a\n' +
              'full-stack task in React using Java and JavaScript. I am skilled in\n' +
              'programming, problem-solving, analytical reasoning, and project\n' +
              'management. I excel in team projects as I am social, interactive,\n' +
              'and communicative, always lending a helping hand, with a focus\n' +
              'on continuous learning and adapting to new challenges. I further\n' +
              'more exceeded my studies and did a summer semester in Vienna\n' +
              'at the University of Applied Sciences Technikum Wien which was\n' +
              'an amazing opportunity for me.\n' +
              'Beyond academics and work, I am passionate about nature and\n' +
              'enjoy spending time outdoors. I am adventurous and thrive in\n' +
              'challenging environments that allow me to explore new places\n' +
              'and learn new skills.',
        },
        contactMe: {
          title: 'Internship Experience',
          description: 'I completed a Full-Stack Developer internship at ASEE DOOEL from June to September 2024 in Skopje, North Macedonia, where I worked on the development and maintenance of the InternalHR application. Java was used as the main backend programming language, with Spring Boot for implementing business logic, REST API services, and database management. On the frontend, I worked with React JS, utilizing Redux, React Hooks, and state management to build dynamic and responsive user interfaces. I also worked with MSSQL for database operations, implementing CRUD functionality and ensuring efficient data handling. This internship strengthened my full-stack development skills and provided valuable real-world experience in enterprise-level software development.',
        },
      }
    }

    getModalInfo(portalName) {
      return this.modalContents[portalName];
    }
  }
