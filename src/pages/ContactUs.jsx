import React, { useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Add your EmailJS credentials here
    emailjs.sendForm('service_kcsj3ws', 'template_ipfk3tv', form.current, 'IAqrA2xNX9TehNX7h')
      .then((result) => {
        console.log(result.text);
        //alert("Message sent successfully!");
      }, (error) => {
        console.log(error.text);
        //alert("Failed to send message, please try again later.");
      });
    
    e.target.reset();
  };

  useEffect(()=>{
    document.title="Contact Us | WebAlay"
  },[])

  return (
    <div className="w-full bg-gray-100 flex flex-col items-center py-12">
      {/* Hero Section */}
      <section className="w-full bg-primary text-white text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg">We would love to hear from you! Fill out the form below to get in touch.</p>
      </section>

      {/* Contact Form */}
      <section className="lg:w-6/12 md:w-8/12 w-11/12 bg-white shadow-md p-8 mt-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Send us a message</h2>
        <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="to_name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="user_email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              rows="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;
