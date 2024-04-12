import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState(null);

    const handleAttachmentChange = (e) => {
        setAttachment(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            if (attachment) {
                formData.append('attachment', attachment);
            }

            const response = await axios.post('http://localhost:4000/api/sendMail', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Email sent:', response.data);
          
        } catch (error) {
            console.error('Failed to send email:', error.response.data);
      
        }
    };

    return (
        <div>
            <h2>Send Email</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicSubject">
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="formBasicMessage">
                    <Form.Label>Message:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} required />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Attachment:</Form.Label>
                    <Form.File onChange={handleAttachmentChange} accept=".jpg, .jpeg, .png, .pdf, .xlsx" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Send Email
                </Button>
            </Form>
        </div>
    );
};

export default EmailForm;
