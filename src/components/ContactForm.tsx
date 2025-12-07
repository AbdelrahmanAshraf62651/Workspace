import { useState, useEffect } from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    variant: 'success' | 'danger';
  } | null>(null);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert(null);
    setIsLoading(true);
    axios
      .post(
        'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/contact_message',
        {
          name: name,
          email: email,
          subject: subject,
          message: message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Message sent successfully:', response.data);
        setAlert({
          show: true,
          message: 'Your message has been sent successfully!',
          variant: 'success',
        });
        // Clear form fields
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        setAlert({
          show: true,
          message:
            'There was an error sending your message. Please try again later.',
          variant: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className="col-12" onSubmit={handleSubmit} method="POST">
      {alert && alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert(null)}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <div className="mb-3">
        <label className="fs-6 py-2">Your Name</label>
        <input
          type="text"
          placeholder="John Doe"
          id="name"
          className="form-control px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="fs-6 py-2">Your Email</label>
        <input
          type="email"
          placeholder="john.doe@example.com"
          id="email"
          className="form-control px-3 py-2"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="fs-6 py-2">Subject</label>
        <input
          type="text"
          placeholder="Inquiry about booking"
          id="subject"
          className="form-control px-3 py-2"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="fs-6 py-2">Your Message</label>
        <textarea
          placeholder="Your message"
          id="message"
          className="form-control px-3 py-2"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="sec-btn fs-5 btn-lg rounded-1 col-12 mt-3"
      >
        {isLoading ? <Spinner animation="border" size="sm" /> : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;
