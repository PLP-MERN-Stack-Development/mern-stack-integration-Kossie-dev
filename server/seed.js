const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const Post = require('./src/models/Post');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_api';


// USERS DATA
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password123',
    role: 'admin',
    isActive: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'Password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    password: 'Password123',
    role: 'user',
    isActive: true
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    password: 'Password123',
    role: 'user',
    isActive: true
  }
];


// CATEGORIES DATA
const categories = [
  {
    name: 'technology',
    description: 'Latest trends and updates in technology, programming, and software development'
  },
  {
    name: 'web-dev',
    description: 'Everything about web development, frameworks, and best practices'
  },
  {
    name: 'mobile-dev',
    description: 'iOS, Android, and cross-platform mobile app development'
  },
  {
    name: 'data-science',
    description: 'Machine learning, AI, data analysis, and big data technologies'
  },
  {
    name: 'devops',
    description: 'CI/CD, cloud computing, containers, and automation tools'
  },
  {
    name: 'cybersecurity',
    description: 'Security best practices, ethical hacking, and data protection'
  },
  {
    name: 'ui/ux',
    description: 'User interface and user experience design principles and trends'
  }
];


// POSTS DATA
const posts = [
  {
    title: 'Getting Started with React Hooks',
    content: `React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore the most commonly used hooks and how they can simplify your code.
useState is the most basic hook that allows you to add state to functional components. Before hooks, you needed to use class components to manage state. Now, you can simply call useState with an initial value and get back the current state and a function to update it.
useEffect is another essential hook that lets you perform side effects in your components. Whether you need to fetch data, subscribe to events, or manipulate the DOM, useEffect is your go-to solution. It combines the functionality of componentDidMount, componentDidUpdate, and componentWillUnmount into one API.
Custom hooks are one of the most powerful features of React. They allow you to extract component logic into reusable functions. By convention, custom hooks start with "use" and can call other hooks. This makes it easy to share stateful logic between components without changing your component hierarchy.
In conclusion, React Hooks provide a more direct API to the React concepts you already know. They enable you to use state and other React features without writing a class, making your code more readable and easier to test.`,
    excerpt: 'Learn how to use React Hooks to write cleaner and more efficient functional components',
    author: 'John Doe',
    category: 'web_dev',
    tags: ['React', 'JavaScript', 'Hooks', 'Frontend'],
    status: 'published'
  },
  {
    title: 'Building RESTful APIs with Node.js and Express',
    content: `Creating a RESTful API is one of the most common tasks in backend development. Node.js with Express provides an excellent platform for building fast, scalable APIs.
First, let's understand what REST means. REST (Representational State Transfer) is an architectural style that defines a set of constraints for creating web services. RESTful APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations.
Setting up Express is straightforward. After installing Node.js and npm, you can create a new project and install Express with just a few commands. Express provides a minimal and flexible web application framework with a robust set of features.
Middleware is a key concept in Express. Middleware functions have access to the request and response objects and can modify them or end the request-response cycle. You can use middleware for logging, authentication, parsing request bodies, and much more.
Error handling is crucial in any API. Express provides a way to define error-handling middleware that catches errors and sends appropriate responses to clients. This ensures your API is robust and provides meaningful error messages.
Testing your API is essential. Tools like Postman or Insomnia make it easy to test your endpoints and ensure they work as expected. You should also write automated tests using frameworks like Jest or Mocha.`,
    excerpt: 'A complete guide to creating RESTful APIs using Node.js and Express framework',
    author: 'Jane Smith',
    category: 'devops',
    tags: ['Node.js', 'Express', 'REST API', 'Backend'],
    status: 'published'
  },
  {
    title: 'Understanding JavaScript Promises and Async/Await',
    content: `Asynchronous programming is essential in JavaScript, especially when dealing with operations like API calls, file reading, or timers. Promises and async/await make asynchronous code much more manageable.
A Promise is an object representing the eventual completion or failure of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected. Promises allow you to attach callbacks for handling success or failure cases.
The then() method is used to handle fulfilled promises, while catch() handles rejected ones. You can chain multiple then() calls to handle sequential asynchronous operations. The finally() method runs regardless of whether the promise was fulfilled or rejected.
Async/await is syntactic sugar built on top of promises. The async keyword before a function means it will always return a promise. The await keyword can only be used inside async functions and makes JavaScript wait until the promise resolves.
Error handling with async/await is more straightforward than with promises. You can use traditional try/catch blocks, which makes the code more readable and easier to debug. This is especially useful when dealing with multiple asynchronous operations.
Understanding these concepts is crucial for modern JavaScript development. They form the foundation for working with APIs, handling user interactions, and managing any asynchronous operations in your applications.`,
    excerpt: 'Master asynchronous JavaScript with Promises and the async/await syntax',
    author: 'Mike Johnson',
    category: 'mobile_dev',
    tags: ['JavaScript', 'Async', 'Promises', 'Programming'],
    status: 'published'
  },
  {
    title: 'Introduction to MongoDB and NoSQL Databases',
    content: `MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. Unlike traditional relational databases, MongoDB doesn't require a predefined schema, making it ideal for applications with evolving data requirements.
Documents in MongoDB are stored in collections, which are analogous to tables in relational databases. However, documents in the same collection don't need to have the same structure. This flexibility is one of MongoDB's key advantages.
CRUD operations in MongoDB are straightforward. You can insert documents using insertOne() or insertMany(), find documents using find(), update with updateOne() or updateMany(), and delete with deleteOne() or deleteMany(). MongoDB's query language is powerful and expressive.
Indexes are crucial for performance in MongoDB. They allow the database to find documents quickly without scanning every document in a collection. You can create indexes on any field, and MongoDB supports various types of indexes including compound, text, and geospatial indexes.
Mongoose is an ODM (Object Document Mapper) for MongoDB in Node.js. It provides a schema-based solution for modeling your application data. Mongoose includes built-in type casting, validation, query building, and business logic hooks.
Aggregation framework is one of MongoDB's most powerful features. It allows you to process data and return computed results. You can perform operations like filtering, grouping, sorting, and transforming documents in a pipeline.`,
    excerpt: 'Discover the power of MongoDB and learn when to use NoSQL databases',
    author: 'Sarah Williams',
    category: 'data_science',
    tags: ['MongoDB', 'NoSQL', 'Database', 'Backend'],
    status: 'published'
  },
  {
    title: 'Modern CSS: Flexbox and Grid Layouts',
    content: `CSS has evolved significantly, and Flexbox and Grid are two of the most powerful layout systems available today. Understanding these tools will transform how you approach web design.
Flexbox is designed for one-dimensional layouts. Whether you're working with rows or columns, Flexbox makes it easy to align, distribute, and order elements. The main concepts are the flex container and flex items.
Properties like justify-content and align-items give you precise control over spacing and alignment. You can easily center elements, distribute space evenly, or push elements to the edges of their container. flex-grow, flex-shrink, and flex-basis control how items size themselves.
CSS Grid is perfect for two-dimensional layouts. It lets you create complex layouts with rows and columns simultaneously. Grid is more powerful than Flexbox for overall page layouts, while Flexbox excels at component-level layouts.
Grid template areas make it incredibly easy to visualize and create layouts. You can name different sections of your grid and then place elements by referencing these names. This makes your CSS more readable and maintainable.
Combining Flexbox and Grid is often the best approach. Use Grid for the overall page structure and Flexbox for the components within those grid areas. This gives you the best of both worlds and makes responsive design much easier.
Responsive design with these tools is straightforward. Media queries combined with Grid and Flexbox allow you to create layouts that adapt beautifully to any screen size. The days of float-based layouts and clearfix hacks are behind us.`,
    excerpt: 'Learn how to create modern, responsive layouts using CSS Flexbox and Grid',
    author: 'John Doe',
    category: 'web_dev',
    tags: ['CSS', 'Flexbox', 'Grid', 'Web Design'],
    status: 'published'
  },
  {
    title: 'Getting Started with TypeScript',
    content: `TypeScript is a superset of JavaScript that adds static typing. It catches errors during development rather than at runtime, making your code more robust and easier to maintain.
Type annotations are the foundation of TypeScript. You can specify types for variables, function parameters, and return values. This helps catch bugs early and makes your code self-documenting. The compiler will warn you if you try to use a value incorrectly.
Interfaces define the shape of objects. They're incredibly useful for describing the structure of data in your application. Interfaces can be extended and implemented, making them versatile for object-oriented programming.
Generics allow you to write reusable code that works with multiple types. Instead of using any and losing type safety, generics let you maintain type information. They're commonly used in functions, classes, and interfaces.
TypeScript's type inference is powerful. Often, you don't need to explicitly declare types because TypeScript can figure them out from context. This keeps your code clean while still providing type safety.
Integrating TypeScript into existing projects is straightforward. You can rename .js files to .ts and gradually add types. The TypeScript compiler is flexible and can work with various levels of strictness, allowing you to adopt TypeScript at your own pace.`,
    excerpt: 'Discover how TypeScript can improve your JavaScript development workflow',
    author: 'Jane Smith',
    category: 'technology',
    tags: ['TypeScript', 'JavaScript', 'Programming', 'Types'],
    status: 'published'
  },
  {
    title: 'Docker Fundamentals for Developers',
    content: `Docker has revolutionized how we develop, ship, and run applications. It allows you to package your application with all its dependencies into a standardized unit called a container.
Containers are lightweight and portable. Unlike virtual machines, containers share the host OS kernel, making them more efficient. They start up quickly and use fewer resources, allowing you to run more applications on the same hardware.
Docker images are the blueprints for containers. An image contains everything needed to run an application: code, runtime, libraries, and dependencies. Images are built from Dockerfiles, which are simple text files with instructions.
The Dockerfile is where you define your container. Each instruction creates a layer in the image. Best practices include using official base images, minimizing layers, and ordering instructions to maximize cache efficiency.
Docker Compose makes it easy to work with multi-container applications. You can define all your services, networks, and volumes in a single YAML file. This is especially useful for development environments where you might need a database, cache, and web server.
Understanding Docker networking is important for connecting containers. Docker provides several network drivers, and containers can communicate with each other using service names as hostnames. This makes it easy to build microservices architectures.`,
    excerpt: 'Learn Docker basics and how containerization can improve your development workflow',
    author: 'Mike Johnson',
    category: 'devops',
    tags: ['Docker', 'DevOps', 'Containers', 'Development'],
    status: 'published'
  },
  {
    title: 'React State Management: Context vs Redux',
    content: `State management is crucial in React applications. As your app grows, you need to decide how to manage state across components. Context API and Redux are two popular solutions.
React Context API is built into React. It allows you to share state across your component tree without prop drilling. Context is ideal for global state that doesn't change frequently, like theme or user authentication.
Creating a context involves three steps: creating the context, providing it at the top level, and consuming it in child components. The useContext hook makes consuming context in functional components straightforward.
Redux is a predictable state container for JavaScript apps. It provides a single source of truth for your application state. Redux uses actions to describe state changes and reducers to handle those changes.
The Redux flow is unidirectional: components dispatch actions, reducers process those actions and update state, and components subscribe to state changes. This predictability makes debugging easier with tools like Redux DevTools.
When to use what? Context is great for simple, less frequently changing state. Redux shines when you need middleware, time-travel debugging, or complex state logic. For medium-sized apps, Context might be sufficient. Large apps often benefit from Redux.
Modern alternatives include Zustand and Jotai, which offer simpler APIs than Redux while maintaining similar benefits. The React community continues to evolve state management solutions, so stay updated on best practices.`,
    excerpt: 'Compare React Context API and Redux to choose the right state management solution',
    author: 'Sarah Williams',
    category: 'technology',
    tags: ['React', 'Redux', 'State Management', 'Context API'],
    status: 'published'
  },
  {
    title: 'Web Security Best Practices',
    content: `Web security is not optional—it's essential. Understanding common vulnerabilities and how to prevent them protects your users and your application.
Cross-Site Scripting (XSS) is one of the most common vulnerabilities. It occurs when attackers inject malicious scripts into web pages. Always sanitize user input and use Content Security Policy headers to mitigate XSS attacks.
SQL Injection happens when attackers manipulate SQL queries through user input. Use parameterized queries or ORMs to prevent this. Never construct SQL queries by concatenating strings with user input.
Cross-Site Request Forgery (CSRF) tricks users into performing unwanted actions. Use CSRF tokens to verify that requests come from legitimate sources. Most modern frameworks provide CSRF protection out of the box.
Authentication and authorization are different concepts. Authentication verifies who you are, while authorization determines what you can do. Implement both correctly using proven libraries and frameworks.
HTTPS is mandatory for modern web applications. It encrypts data in transit, protecting against eavesdropping and man-in-the-middle attacks. Let's Encrypt provides free SSL certificates, so there's no excuse not to use HTTPS.
Keep dependencies updated. Vulnerabilities are discovered regularly in popular libraries. Use tools like npm audit or Snyk to identify and fix security issues in your dependencies.`,
    excerpt: 'Essential web security practices every developer should know and implement',
    author: 'David Brown',
    category: 'cybersecurity',
    tags: ['Security', 'Web Development', 'Best Practices', 'HTTPS'],
    status: 'published'
  },
  {
    title: 'GraphQL vs REST: Choosing the Right API',
    content: `API design is crucial for modern applications. REST has been the standard for years, but GraphQL offers a compelling alternative. Understanding both helps you make informed decisions.
REST is based on resources and HTTP methods. It's simple, well-understood, and supported everywhere. RESTful APIs are stateless, cacheable, and can be easily consumed by any HTTP client.
GraphQL provides a complete description of your API. Clients specify exactly what data they need, and the server responds with just that data. This eliminates over-fetching and under-fetching problems common in REST.
Type system is GraphQL's foundation. You define types for your data, and GraphQL ensures queries are valid before execution. This provides better documentation and enables powerful developer tools.
REST's main advantage is simplicity. It uses standard HTTP methods and status codes, making it intuitive for developers. Caching is straightforward with HTTP headers, and REST works well with CDNs.
GraphQL excels when you need flexibility. Different clients (web, mobile, desktop) can request exactly what they need. This reduces the number of endpoints you need to maintain and makes versioning easier.
Consider your use case carefully. REST is great for public APIs with simple data requirements. GraphQL shines in complex applications where different clients need different data. You can even use both in the same application.`,
    excerpt: 'Understand the differences between GraphQL and REST to choose the best API approach',
    author: 'John Doe',
    category: 'technology',
    tags: ['GraphQL', 'REST', 'API', 'Backend'],
    status: 'published'
  },
  {
    title: 'Introduction to Machine Learning for Developers',
    content: `Machine Learning is transforming software development. As a developer, understanding ML basics opens new possibilities for building intelligent applications.
Supervised learning is the most common type of ML. You train a model with labeled data, and it learns to predict labels for new data. Common applications include image classification, spam detection, and price prediction.
Unsupervised learning finds patterns in unlabeled data. Clustering algorithms group similar items together, while dimensionality reduction techniques compress data while preserving important information.
Python is the go-to language for ML. Libraries like scikit-learn, TensorFlow, and PyTorch provide powerful tools for building ML models. NumPy and Pandas handle data manipulation efficiently.
Data preprocessing is crucial. Real-world data is messy—it has missing values, outliers, and inconsistencies. Cleaning and preparing data often takes more time than training the model itself.
Model evaluation helps you understand performance. Metrics like accuracy, precision, recall, and F1 score quantify how well your model works. Always use separate training and testing data to avoid overfitting.
Getting started is easier than you think. Many cloud platforms offer pre-trained models and APIs. You can add intelligent features to your applications without becoming an ML expert. Start simple and iterate.`,
    excerpt: 'Begin your machine learning journey with this developer-friendly introduction',
    author: 'Jane Smith',
    category: 'data_science',
    tags: ['Machine Learning', 'AI', 'Python', 'Data Science'],
    status: 'published'
  },
  {
    title: 'Building Progressive Web Apps (PWAs)',
    content: `Progressive Web Apps combine the best of web and mobile apps. They're fast, reliable, and engaging, providing app-like experiences using web technologies.
Service Workers are the backbone of PWAs. They're scripts that run in the background, enabling offline functionality, push notifications, and background sync. Service Workers intercept network requests and can serve cached content when offline.
The App Shell architecture loads the minimal HTML, CSS, and JavaScript needed for the user interface. Content is loaded separately, making the app feel instant. This approach works well for single-page applications.
Manifest files make your PWA installable. The web app manifest is a JSON file describing your app's name, icons, colors, and display mode. Users can add your PWA to their home screen just like a native app.
Offline functionality is what sets PWAs apart. With service workers and caching strategies, your app works even without an internet connection. Cache important resources during installation and update them in the background.
Performance is critical for PWAs. Use lazy loading, code splitting, and compression to minimize load times. The PRPL pattern (Push, Render, Pre-cache, Lazy-load) provides a framework for optimizing delivery.
PWAs are the future of web development. They work on any device with a browser, require no app store approval, and are always up-to-date. Major companies like Twitter, Pinterest, and Starbucks have successful PWAs.`,
    excerpt: 'Learn how to build Progressive Web Apps that work offline and feel like native apps',
    author: 'Mike Johnson',
    category: 'mobile_dev',
    tags: ['PWA', 'Web Development', 'Service Workers', 'Mobile'],
    status: 'published'
  },
  {
    title: 'Mastering Git: Advanced Techniques',
    content: `Git is more than just commit, push, and pull. Advanced Git techniques can significantly improve your workflow and collaboration.
Interactive rebase is powerful for cleaning up commit history. You can reorder, squash, edit, or delete commits before pushing. This creates a cleaner, more understandable history for your team.
Git bisect helps you find bugs. It performs a binary search through your commit history to identify when a bug was introduced. This is invaluable when debugging complex issues.
Stashing temporarily saves your work. When you need to switch contexts quickly, git stash stores your changes without committing. You can apply stashes later or move them between branches.
Cherry-picking applies specific commits from one branch to another. This is useful when you need a bug fix from another branch without merging everything. Use it sparingly to avoid creating duplicate commits.
Hooks automate tasks at different points in the Git workflow. Pre-commit hooks can run tests or linters before allowing commits. Pre-push hooks can prevent pushing broken code.
Understanding reflog is crucial for recovery. Git keeps a log of all reference updates, even after deletes. If you accidentally lose commits, reflog can help you recover them. It's like Git's safety net.`,
    excerpt: 'Take your Git skills to the next level with these advanced techniques and workflows',
    author: 'Sarah Williams',
    category: 'technology',
    tags: ['Git', 'Version Control', 'Development', 'Tools'],
    status: 'published'
  },
  {
    title: 'Microservices Architecture Explained',
    content: `Microservices architecture structures applications as collections of loosely coupled services. Each service is independently deployable and scalable.
Monolithic vs Microservices: Monoliths have all functionality in one codebase. They're simpler initially but become harder to maintain as they grow. Microservices split functionality into separate services, each with its own database.
Service boundaries are crucial. Each microservice should represent a specific business capability. Services should be independent enough to be developed, deployed, and scaled separately.
Communication between services can happen synchronously (REST, gRPC) or asynchronously (message queues). Async communication provides better decoupling and resilience but adds complexity.
API Gateway pattern provides a single entry point for clients. It handles routing, authentication, rate limiting, and request aggregation. This simplifies client code and centralizes cross-cutting concerns.
Data management is challenging in microservices. Each service owns its database, leading to eventual consistency instead of ACID transactions. Saga patterns help manage distributed transactions.
Microservices aren't always the answer. They add operational complexity—you need robust monitoring, logging, and deployment automation. Start with a monolith and extract services as needed. Don't prematurely optimize.`,
    excerpt: 'Understand microservices architecture and when to use it in your applications',
    author: 'David Brown',
    category: 'technology',
    tags: ['Microservices', 'Architecture', 'Backend', 'Distributed Systems'],
    status: 'published'
  },
  {
    title: 'Responsive Web Design Principles',
    content: `Responsive design ensures your website works beautifully on all devices. It's not optional—it's essential for modern web development.
Mobile-first approach means designing for small screens first, then enhancing for larger screens. This ensures core functionality works on all devices and progressively adds features for larger screens.
Flexible layouts use relative units like percentages and viewport units instead of fixed pixels. CSS Grid and Flexbox make creating flexible layouts easier than ever. They automatically adjust to different screen sizes.
Media queries allow you to apply different styles based on device characteristics. Breakpoints should be based on content, not specific devices. Common breakpoints are around 768px (tablets) and 1024px (desktops).
Responsive images prevent downloading huge files on mobile devices. Use srcset and sizes attributes to provide different image versions. The picture element offers more control for art direction.
Touch-friendly interfaces are crucial for mobile. Make interactive elements large enough (minimum 44x44 pixels). Provide adequate spacing between clickable elements to prevent mis-taps.
Performance matters more on mobile. Slow networks and limited processing power require optimization. Minimize assets, use lazy loading, and consider device capabilities. Test on real devices, not just in browser dev tools.`,
    excerpt: 'Master responsive web design to create websites that work perfectly on any device',
    author: 'John Doe',
    category: 'ui/ux',
    tags: ['Responsive Design', 'CSS', 'Web Development', 'Mobile'],
    status: 'published'
  },
  {
    title: 'Introduction to Kubernetes',
    content: `Kubernetes orchestrates containerized applications at scale. It automates deployment, scaling, and management of containerized applications.
Pods are the smallest deployable units in Kubernetes. A pod can contain one or more containers that share storage and network resources. Pods are ephemeral—they can be created and destroyed as needed.
Deployments manage pods and ensure the desired number are running. If a pod fails, the deployment creates a new one. Rolling updates allow you to update applications without downtime.
Services provide stable networking for pods. Pods have dynamic IP addresses that change when they're recreated. Services provide a consistent way to access pods regardless of their IP addresses.
ConfigMaps and Secrets manage configuration separately from application code. ConfigMaps store non-sensitive data, while Secrets store sensitive information like passwords and API keys.
Namespaces provide logical isolation within a cluster. They're useful for multi-tenant environments or separating development, staging, and production environments.
Getting started with Kubernetes can be overwhelming. Begin with Minikube for local development. Cloud providers offer managed Kubernetes services (GKE, EKS, AKS) that handle cluster management complexity.`,
    excerpt: 'Learn Kubernetes basics and how it simplifies deploying and managing containerized applications',
    author: 'Jane Smith',
    category: 'devops',
    tags: ['Kubernetes', 'DevOps', 'Containers', 'Cloud'],
    status: 'published'
  }
];

// SEED FUNCTION
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('✓ Existing data cleared\n');

    // Seed Users
    console.log('👤 Seeding users...');
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users\n`);

    // Seed Categories
    console.log('📂 Seeding categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✓ Created ${createdCategories.length} categories\n`);

    // Prepare posts with references
    console.log('📝 Seeding posts...');
    const postsWithRefs = posts.map((post, index) => ({
      ...post,
      category: createdCategories[index % createdCategories.length]._id,
      views: Math.floor(Math.random() * 1000),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
    }));

    const createdPosts = await Post.insertMany(postsWithRefs);
    console.log(`✓ Created ${createdPosts.length} posts\n`);

    // Summary
    console.log('='.repeat(50));
    console.log('✨ Database seeded successfully!\n');
    console.log('Summary:');
    console.log(`  • Users: ${createdUsers.length}`);
    console.log(`  • Categories: ${createdCategories.length}`);
    console.log(`  • Posts: ${createdPosts.length}`);
    console.log('='.repeat(50));
    console.log('\n📊 Sample login credentials:');
    console.log('  Email: john@example.com');
    console.log('  Password: Password123');
    console.log('  Role: admin\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run seed
seedDatabase();