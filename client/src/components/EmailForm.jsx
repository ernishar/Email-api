import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('attachment', attachment);

    try {
      const response = await axios.post('http://localhost/api/sendMail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Email sent:', response.data);
      // You can handle success here, maybe show a success message to the user
    } catch (error) {
      console.error('Error sending email:', error.response.data);
      // You can handle errors here, maybe show an error message to the user
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicSubject">
        <Form.Label>Subject:</Form.Label>
        <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicMessage">
        <Form.Label>Message:</Form.Label>
        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicAttachment">
        <Form.Label>Attachment:</Form.Label>
        <Form.File id="custom-file" label="Choose file" custom onChange={(e) => setAttachment(e.target.files[0])} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send Email
      </Button>
    </Form>
  );
};

export default EmailForm;
