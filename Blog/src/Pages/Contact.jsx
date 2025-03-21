import React, { useRef, useState } from "react";
import { IoIosContact } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import emailjs from "@emailjs/browser"; // Import EmailJS
import "./Contact.css";
import toast, { Toaster } from 'react-hot-toast';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    isAgreed: false,
  });

  const [charCount, setCharCount] = useState(300);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useRef();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "message") {
      const remaining = 300 - value.length;
      setCharCount(remaining >= 0 ? remaining : 0);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    // EmailJS parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: "vicky9877262@gmail.com",
    };

    try {
      const response = await emailjs.send(
        "service_b8y7tvh",
        "template_q6lwdoc",
        templateParams,
        "RiPoqDWJDI0e78ZUn"
      );
      console.log("Attempting to send email...");
      toast.success(" Email sent successfully!");

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        isAgreed: false,
      });
      setCharCount(300);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(`Failed to send email: ${error.text}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="image-container">
          <img
            src="https://img.freepik.com/premium-vector/get-animated-flat-illustration-clip-editing_9206-4152.jpg?uid=R108978622&ga=GA1.1.1172802665.1737735595&semt=ais_hybrid"
            alt="Contact illustration"
          />
        </div>

        <div className="form-content">
          <h2>Let's Get In Touch.</h2>
          <p className="contact-manual">
            Or just reach out manually to{" "}
            <a href="mailto:vicky9877262@gmail.com">vicky9877262@gmail.com</a>
          </p>

          <form className="contact-form" ref={form} onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-container">
                <IoPersonSharp className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name..."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <MdOutlineEmail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address..."
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-container">
                <IoIosContact className="input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+44 000)000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your main text here..."
                value={formData.message}
                onChange={handleInputChange}
                maxLength="300"
                required
              />
              <div className="char-counter">{charCount}/300</div>
            </div>

            <div className="agreement">
              <label>
                <input
                  type="checkbox"
                  name="isAgreed"
                  checked={formData.isAgreed}
                  onChange={handleInputChange}
                  required
                />
                <span style={{ fontWeight: "700" }}>
                  I hereby agree to our Privacy{" "}
                  <span style={{ color: "#005aff" }}>Policy</span> terms.
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Contact Me"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
