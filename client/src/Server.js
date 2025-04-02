const express = require('express');
const { Client } = require('pg'); 
const cors = require('cors'); 

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json()); 

const client = new Client({
  host: 'localhost', // Database host (use your host or IP address if different)
  port: 5432, // Default PostgreSQL port
  user: 'postgres', // Replace with your PostgreSQL username
  password: '2004', // Replace with your PostgreSQL password
  database: 'EvotingDapp', // Replace with your PostgreSQL database name
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Connection error', err.stack));

app.get('/users', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "user"');  
    res.json(result.rows); 
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Error fetching data');
  }
});

app.post('/users', async (req, res) => {
  const { name,password,aadhaar_no, email_id, location, constituency,party, role, status } = req.body;
 
  try {
    const query = `
      INSERT INTO "user" (name,password,aadhaar_no, email_id, location, constituency,party, role, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9) RETURNING *
    `;
    const values = [name,password,aadhaar_no, email_id, location, constituency,party, role, status];
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    if (err.code === '23505') { 
      return res.status(400).json({ message: 'Your previous submission is in pending...' });
    }
    res.status(500).json({ message: 'An unexpected error occurred.' });
  }
});

app.delete('/users', async (req, res) => {
  const { role, status, aadhaar_no } = req.body;

  try {
    const query = `
      DELETE FROM "user"
      WHERE role = $1 AND status = $2 AND aadhaar_no = $3
      RETURNING *
    `;
    const values = [role, status, aadhaar_no];
    
    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'User deleted successfully', deletedUser: result.rows[0] });
    } else {
      res.status(404).json({ message: 'User not found with the provided criteria' });
    }
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'An unexpected error occurred' });
  }
});


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});

const nodemailer = require('nodemailer'); 
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email provider. Gmail is used here as an example
  auth: {
    user: 'karuppu10112004@gmail.com', // Your email
    pass: 'umubokiovafsssbu' // Your email password or app-specific password
  }
});

app.post('/send-email', async (req, res) => {
  const { email, name, message } = req.body; 
  console.log("Reached /send-email route");
  console.log("Request received:", email);

  const mailOptions = {
    from: 'karuppu10112004@gmail.com', 
    to: email, // Recipient's email
    subject: 'Hello from EvotingDapp',
    text: `Hello ${name},\n\n${message}` 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
     // console.error('Error sending email:', JSON.stringify(error, null, 2));
      res.status(500).json({ message: 'Error sending email' });
    } else {
      //console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully!' });
    }
  });
});

