const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port=8080;

app.use(cors());
app.use(express.json());
/* mongodb+srv://selvaraj:Skkavi@2004@cluster0.uq6xz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 */
mongoose.connect("mongodb+srv://selvaraj:Skkavi%402004@cluster0.uq6xz.mongodb.net/EVoting_DApp?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Successfully connected to MongoDB"))
.catch((err) => {
    console.error("MongoDB connection error:");
    process.exit(1);
});

const People = require('./Model/Model');

app.get('/people/:aadhaar_no', async (req, res) => {
  const { aadhaar_no } = req.params;  
  try {
    const data = await People.find({aadhaar:aadhaar_no});
    console.log(data);
    if (data) {
      res.json(data); 
    } else {
      res.status(404).json({ message: "Person not found" });
    }
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).send("Server Error");
  }
});



app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
