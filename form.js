const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  const formData = new FormData(form);

  fetch('/submit-form', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      console.log('Form submitted successfully!');
    } else {
      console.error('Error submitting form:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error submitting form:', error);
  });
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const { name, surname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jalilikarim4@gmail.com',
      pass: 'Marocco2013'
    }
  });

  const mailOptions = {
    from: 'jalilikarim4@gmail.com',
    to: 'jalilikarim4@gmail.com',
    subject: 'New form submission',
    text: `
      Name: ${name}
      Surname: ${surname}
      Email: ${email}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
