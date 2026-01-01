import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - AI News Hub</title>
        <meta name="description" content="Get in touch with AI News Hub. Send us your questions, feedback, or partnership inquiries." />
        <meta property="og:title" content="Contact Us - AI News Hub" />
        <meta property="og:description" content="Get in touch with AI News Hub. Send us your questions, feedback, or partnership inquiries." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions, suggestions, or feedback? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">contact@ai-news-hub.com</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Social Media</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                  <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-gray-600">We typically respond within 24-48 hours.</p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              >
                Send Message
              </button>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
