import React from 'react';
import frontEnd from "../assets/frontEnd.webp"
import backEnd from "../assets/backEnd.webp"
import devOps from "../assets/devOps.webp"
import hero from "../assets/hero.webp"
const About = () => {
  return (
    <div className="w-full bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative bg-cover bg-center h-96 flex justify-center items-center text-white" style={{ backgroundImage: {hero} }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-md text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg">Empowering developers with high-quality tutorials on Frontend, Backend, and DevOps.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="lg:w-10/12 md:w-11/12 w-full mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">Who We Are</h2>
        <p className="text-center text-lg mb-4">
          We are passionate developers and educators committed to providing clear, step-by-step tutorials for aspiring and professional developers alike.
          Our goal is to simplify complex topics in Frontend, Backend, and DevOps, making it easier for you to build amazing projects.
        </p>
        <div className="text-center">
          <p className="text-lg text-gray-700">Our website covers a wide range of technologies including:</p>
          <ul className="list-disc inline-block text-left my-4">
            <li>HTML, CSS, JavaScript, React for Frontend Development</li>
            <li>Node.js, Express, and Databases for Backend</li>
            <li>DevOps tools like Docker, Kubernetes, and CI/CD pipelines</li>
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-white py-10">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Our Key Features</h2>
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-col items-center w-full md:w-1/3 mb-6">
            <img src={frontEnd} alt="Frontend Development" className="h-20 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Frontend Tutorials</h3>
            <p className="text-center">Learn the latest in frontend technologies with hands-on tutorials and projects.</p>
          </div>

          <div className="flex flex-col items-center w-full md:w-1/3 mb-6">
            <img src={backEnd} alt="Backend Development" className="h-20 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Backend Tutorials</h3>
            <p className="text-center">Master server-side programming with in-depth tutorials on Node.js, Express, and more.</p>
          </div>

          <div className="flex flex-col items-center w-full md:w-1/3 mb-6">
            <img src={devOps} alt="DevOps Tools" className="h-20 mb-4"/>
            <h3 className="text-xl font-semibold mb-2">DevOps Guidance</h3>
            <p className="text-center">Learn how to deploy, scale, and manage applications with DevOps tools like Docker and Kubernetes.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-primary py-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-lg mb-6">Jump into our tutorials and take your web development skills to the next level.</p>
        <button className="bg-white text-primary px-8 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Explore Tutorials
        </button>
      </section>
    </div>
  );
};

export default About;
