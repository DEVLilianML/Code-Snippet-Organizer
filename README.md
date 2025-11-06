## Code Snippet Organizer for Instructors

A web-based tool designed to help instructors store, manage, and retrieve reusable code snippets across multiple programming languages. This application makes it easy to organize snippets with categories, tags, search capabilities, and secure user authentication.

  # Features
- User Registration & Login (JWT Authentication)
- Create, Read, Update & Delete (CRUD) operations for snippets
- Categorize snippets by programming language
- Add tags for easy filtering
- Search snippets by title, tag, or language
- Fully responsive UI for both desktop and mobile
- Secure password hashing (bcryptjs)
- Organized folder structure (Frontend/Backend separation)

 ## Tech Stack Used
 # Frontend
 - React.js
 - JavaScript (ES6+)
 - React Router DOM
 - CSS (Custom Styling)

  # Backend
  - Node.js
  - Express.js
  - MongoDB (Local)
  - Mongoose
  - JSON Web Token (JWT)
  - bcryptjs
  - CORS
  - dotenv

# User Roles
- Role	Ability
- Authenticated User	Add, View, Edit & Delete their own snippets

# Installation & Setup Guide
Make sure these are installed on your computer:
 - Node.js (v16+ recommended)
 - MongoDB Community Server (Local Database)

 ## Backend Setup
 - cd backend
- npm install express mongoose cors dotenv bcryptjs jsonwebtoken nodemon

  # Run the backend server
  - node server.js

  ## Frontend Setup
- npm install react-router-dom axios

  # Start frontend:
  - npm start

 # Access the App
  - Open your browser and visit:
  - http://localhost:3000.

 ## Search & Filtering
- Users can search snippets by:
- Title
- Tags
- Programming language
- Multiple tags enable flexible retrieval 

## Security Highlights
# Feature	Benefit
- JWT Authentication ---	Secure API access
- Password Hashing  --	Protects user credentials
- Protected Routes  --	Only logged-in users can manage snippets

## Project Status
- Fully functional based on project requirements
- Ready for deployment or further extension

  ## Author
- Developed by: Obianuju Lilian Onuoha
- Instructor Code Snippet Management Tool — 2025



