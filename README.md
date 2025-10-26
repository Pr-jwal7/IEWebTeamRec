# IEWebTeamRec

🎓 NITK Student Profile Dashboard (MERN Stack)
This is a secure, full-stack administrative portal built to manage student records for the National Institute of Technology Karnataka (NITK). The application meets all requirements for a robust intermediate web development task by focusing on security, data persistence, and a clean user experience.


✨ Implemented Features
This project addresses all core requirements and includes bonus features:

1.Full Authentication & Persistence:
  a)Secure user login is handled via JSON Web Tokens (JWT) and password hashing with bcrypt.
  b)Admin login status and token are persisted using localStorage, keeping the user logged in across browser sessions.

2.Role-Based Access Control:
  a)The POST /api/students route is protected by Auth Middleware, ensuring only logged-in users with the isAdmin: true flag can create new student records.

3.Core Data Management :
  a)Admins can securely Add New Students via a dedicated form.
  b)The main dashboard displays all student profiles retrieved from the persistent MongoDB Atlas database.

4.UI/UX and Branding:
  a)Features a custom, professional dark-theme color scheme aligned with NITK branding.
  b)Layout is responsive, providing a good user experience on both desktop and mobile devices (Bonus Feature).

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | `React`, `Vite`, `Axios`, `react-router-dom` | UI and API consumption. |
| **Backend** | `Node.js`, `Express`, `Mongoose` | REST API, Business Logic, JWT validation. |
| **Database** | `MongoDB Atlas` | Cloud-hosted, persistent data storage. |
| **Security** | `jsonwebtoken`, `bcryptjs` | Token management and password hashing. |
