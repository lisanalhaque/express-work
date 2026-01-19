// Importing required modules
const express = require("express");
const { default: mongoose } = require("mongoose");

// Initializing the Express application
const app = express();

// Defining the port number
const PORT = 3000;

const User = require("./models/user"); // Importing User model

// Importing product routes
const productRoutes = require("./routes/productRoutes");

// Middleware to serve static files from 'public' directory
app.use(express.static("public"));
app.use('/uploads', express.static('public/uploads')); // Serving uploaded files

// Middleware to parse JSON requests
app.use(express.json());

// Custom middleware to log request details
app.use((req,res,next) => {                                     // Logging middleware
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);// Log URL and method
  next();                                                       // Proceed to next middleware/route handler
});

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Using product routes
app.use("/product", productRoutes);

// MongoDB connection URL
const mongoURL =
  "mongodb+srv://lisanop4444_db_user:KL17L7009@cluster0.qxlkrah.mongodb.net/?appName=mongosh+2.5.10";

// Connect to MongoDB
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Setting EJS as the templating engine
app.set("view engine", "ejs");



// Defining routes
app.get("/wejs", (req, res) => {
  res.render("welcome", { title: "Home Page", name: "Salman" });
});

// Student route to render a list of students
app.get("/student", (req, res) => {
  const students = [
    "Salman",
    "Lisan",
    "Zameel",
    "Shadin",
    "Irfan",
    "Hisham",
    "Ashi",
  ];
  res.render("student", { title: "Student List", students: students });
});

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Hello Express !<h1>");
});

// List route to fetch and display students from the database
app.get("/list", async (req, res) => { // Fetching students from the database
  try {
    const students = await User.find(); // Fetch all users from the database
    res.render('student', { // Render the student.ejs template
      title: 'Student Page', // Title for the page
      students: students // Pass the fetched students to the template
    });
  } catch (err) { // Error handling
    console.error(500).send("Error fetching students");
  }
});

// About route
app.get("/about", (req, res) => {
  res.send("About Page !");
});

// Contact route
app.get("/contact", (req, res) => {
  res.send("Contact Page !");
});

// JSON response route
app.get("/json", (req, res) => {
  res.json({
    name: "Salman Rasheed M",
    age: 21,
    city: "Calicut",
  });
});

// Add User route to render a form for adding a new student
app.get("/add-user", (req, res) => {
  res.render("add-user", { title: "Add Student" });
});

// Handling form submission from the Add User page
app.post("/add-user", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const user = new User({
      name,
      email,
      age,
    });
    await user.save(); // Save user to the database
    res.redirect("/list"); // Redirect to the list of students after saving
  } catch (error) {
    res.status(400).send("Error saving user: " + error.message);
  }
});

//search user
app.get('/add-user/search', async (req, res) => {//search users from DB
  console.log(req.query.search_teaxt);
  try {
    const query = req.query.search_text;//get search text from query params
    const students = await User.find({//search in DB
       name: {
        $regex: query,
        $options: 'i'
      }//case insensitive search
    });
    res.render('student', {//render student EJS with search results
      title: 'student page', students: students //send DB users to EJS
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("error loading");
  }
});


//edit user route
app.get('/add-user/edit/:id', async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    res.render('edit-user', { title: 'Edit Student', student: student });
  } catch (err) {
    res.status(400).send("error loading student");
  }
});

// Update user route
app.post('/add-user/update/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/list");
  } catch (err) {
    res.status(400).send("error updating student");
  }
});

// Delete user route
app.post('/add-user/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/list');
  }
  catch (err) {
    res.status(400).send("delete failed");
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});