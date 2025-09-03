"use client";

import React, { useState } from "react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Zod validation schema
const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface Notification {
  type: "success" | "error";
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (type: "success" | "error", message: string) => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate form data with Zod
      contactSchema.parse(formData);
      setErrors({});

      setIsSubmitting(true);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Reset form on success
      setFormData({ name: "", email: "", message: "" });
      showNotification(
        "success",
        "Message sent successfully! We will get back to you soon."
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
        showNotification("error", "Please fix the errors below and try again.");
      } else {
        showNotification("error", "Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Add Toast container */}
      <ToastContainer position="top-right" autoClose={5000} />
      {/* Form Section */}
      <section>
        <div className="contact-container">
          <div className="contact-title">
            <h1>
              Contact <span>Us</span>
            </h1>
          </div>

          {/* left-content */}
          <div className="contact-field-container">
            <div className="contact-left-content">
              <div>
                <h3>Get in Touch with Us Today</h3>
                <p id="p-class">
                  Have questions? Contact EvenBoo today for expert assistance
                  with all your event booking needs. We're here to help!
                </p>
              </div>
              <div className="contatc-details">
                <p>Tel : +1 (212) 555-1212</p>
                <p>hello@domainsite.com</p>
                <p>KLLG St, No.99, Pku City, ID 28289</p>
              </div>

              <div className="left-social-icon">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* right-content */}
            <div className="contact-right-content">
              <form id="contactForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="cname"
                  placeholder="Enter your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "error" : ""}
                />
                {errors.name && (
                  <p id="name-error" className="error-message">
                    {errors.name}
                  </p>
                )}

                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="cemail"
                  placeholder="Enter your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <p id="email-error" className="error-message">
                    {errors.email}
                  </p>
                )}

                <label htmlFor="message">Your Message</label>
                <textarea
                  id="cmessage"
                  name="message"
                  rows={5}
                  placeholder="Write your message here"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? "error" : ""}
                />
                {errors.message && (
                  <p id="message-error" className="error-message">
                    {errors.message}
                  </p>
                )}

                <div className="send-btn">
                  <input
                    type="submit"
                    name="submit"
                    id="send-message-btn"
                    value={isSubmitting ? "Sending..." : "Send Message"}
                    disabled={isSubmitting}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
