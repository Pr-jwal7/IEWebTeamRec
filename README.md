# IEWebTeamRec
NITK Student Profile Dashboard (MERN Stack): A secure administrative portal for managing student records, built with React, Node.js/Express, and MongoDB.


Student Profile Dashboard
This is a full-stack web application designed to fulfill the requirements of an administrative task, providing a secure platform for managing student data profiles. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and is branded for the National Institute of Technology Karnataka (NITK).

Key Features Implemented:
Full Authentication & Persistence: Secure user login for administrative users using JSON Web Tokens (JWT). The login status is maintained using localStorage across browser refreshes (Requirement a & e).

Role-Based Access Control (RBAC): All data creation endpoints (POST /api/students) are protected by Admin Middleware, ensuring only authenticated administrators can add new records.

Student Data Management: Full backend support for creating and reading student profiles (Requirement d).

Modern UI/UX: Features a professional, branded dark theme color scheme and a responsive design layout compatible with mobile devices (Requirement b & f - Bonus).

Database: Persistent storage handled by MongoDB Atlas (Requirement c).
