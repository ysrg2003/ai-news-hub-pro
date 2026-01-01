import React from 'react';
import { Helmet } from 'react-helmet';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - AI News Hub</title>
        <meta name="description" content="Learn about AI News Hub - your source for the latest AI news, research, and developments." />
        <meta property="og:title" content="About Us - AI News Hub" />
        <meta property="og:description" content="Learn about AI News Hub - your source for the latest AI news, research, and developments." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About AI News Hub</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            AI News Hub is dedicated to bringing you the latest developments in artificial intelligence, machine learning, and related technologies. We believe that AI is transforming the world, and everyone should have access to accurate, in-depth information about these transformative technologies.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
          <p>
            Our platform delivers daily curated content covering:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Machine Learning breakthroughs and applications</li>
            <li>Natural Language Processing innovations</li>
            <li>Computer Vision advancements</li>
            <li>Robotics and automation</li>
            <li>Generative AI developments</li>
            <li>Practical AI applications across industries</li>
            <li>Cutting-edge AI research</li>
            <li>AI ethics and responsible development</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Approach</h2>
          <p>
            We combine human expertise with artificial intelligence to deliver high-quality, original content. Each article is carefully researched and written to provide deep insights into AI topics, making complex concepts accessible to both technical and non-technical audiences.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose AI News Hub?</h2>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Daily Updates:</strong> Fresh AI news and analysis every day</li>
            <li><strong>In-Depth Analysis:</strong> We go beyond headlines to provide meaningful insights</li>
            <li><strong>Diverse Coverage:</strong> From cutting-edge research to real-world applications</li>
            <li><strong>Accessible Writing:</strong> Complex topics explained in clear, understandable language</li>
            <li><strong>Ethical Perspective:</strong> We address the implications and ethics of AI development</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>
          <p>
            AI News Hub is powered by a combination of AI-assisted content generation and human editorial oversight. Our platform uses advanced language models to research, write, and optimize content, while maintaining rigorous standards for accuracy and quality.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Get in Touch</h2>
          <p>
            Have questions, suggestions, or feedback? We'd love to hear from you! Visit our <a href="/contact" className="text-blue-600 hover:text-blue-800">contact page</a> to get in touch with our team.
          </p>
        </div>
      </div>
    </>
  );
}
