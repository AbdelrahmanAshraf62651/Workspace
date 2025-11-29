import {useState ,} from "react";
import axios from "axios";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/contact_message",{
      name: name,
      email: email,
      subject: subject,
      message: message,
    },{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      console.log("Message sent successfully:", response.data);
      alert("Your message has been sent successfully!"); 
      // Clear form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      alert("There was an error sending your message. Please try again later.");
    });
  };
  return (
    <form className="col-12" onSubmit={handleSubmit} method="POST">
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
        Send Message
      </button>
    </form>
  );
}

export default ContactForm;
