import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(cors());

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
  res.status(200).json('Welcome to Dwayne\'s Api');
});

app.post('/newsletter', (req, res) => {
  const {
    name, email, phone, subject
  } = req.body;

  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(options));

  const emailDetails = {
    from: 'seekingempowerment@gmail.com',
    to: email,
    subject: 'Welcome to Dwyane\'s App',
    html: `Hi, ${name}, <b>Hello world</b>`
  };
  
  client.sendMail(emailDetails, (err, info) => {
    if (err) {
      console.log(error);
      res.status(400).json('Email not sent!');
    }
    else {
      console.log(`Message sent: ${info.message}`);
      res.status(200).json('Email successfully sent!');
    }
  });
});

const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
  console.log(`Listening for requests on ${PORT}`);
});

export default app;