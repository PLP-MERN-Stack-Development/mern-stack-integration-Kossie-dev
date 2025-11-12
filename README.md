# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 

## ✨ Features

### Authentication & Authorization
- ✅ User registration with email and password
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (Admin/User)
- ✅ Protected routes and API endpoints
- ✅ Token refresh mechanism
- ✅ User profile management
- ✅ Change password functionality

### Post Management
- ✅ Create, read, update, and delete blog posts
- ✅ Rich text content support
- ✅ Post categorization
- ✅ Tag system for posts
- ✅ Post status (Draft, Published, Archived)
- ✅ View counter for posts
- ✅ Pagination for post listing
- ✅ Filter posts by category and status
- ✅ Search functionality (coming soon)

### Category Management
- ✅ Create and manage categories
- ✅ Automatic slug generation
- ✅ Category descriptions
- ✅ Post count per category

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern and clean interface
- ✅ Loading states and spinners
- ✅ Error handling with user-friendly messages
- ✅ Form validation
- ✅ Optimistic UI updates
- ✅ Toast notifications (coming soon)

### Advanced Features
- ✅ Custom React hooks (useApi, useForm, useAuth)
- ✅ Context API for global state management
- ✅ useReducer for complex state logic
- ✅ Axios interceptors for API calls
- ✅ Input validation with Joi
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Database seeding script

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing
- **Joi** - Schema validation
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **React Hooks** - State and lifecycle management
- **CSS3** - Styling (Flexbox, Grid)

### Development Tools
- **Nodemon** - Auto-restart server
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Postman** - API testing

### Screenshots
Home Screenshot- images\blog-api-home.png
Login Screenshot- images\blog-api-login.png
Posts screenshot- images\blog-api-posts.png
Register screenshot- images\blog-api-register.png