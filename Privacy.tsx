import React from 'react';
import { Helmet } from 'react-helmet';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AI News Hub</title>
        <meta name="description" content="Privacy policy for AI News Hub. Learn how we collect, use, and protect your data." />
        <meta property="og:title" content="Privacy Policy - AI News Hub" />
        <meta property="og:description" content="Privacy policy for AI News Hub. Learn how we collect, use, and protect your data." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Introduction</h2>
          <p>
            AI News Hub ("we", "us", "our", or "Company") operates the https://ai-news-hub.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information Collection and Use</h2>
          <p>
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Types of Data Collected</h3>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
              <ul className="list-circle pl-6 mt-2">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
            <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
            <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Use of Data</h2>
          <p>AI News Hub uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>By email: privacy@ai-news-hub.com</li>
            <li>By visiting this page on our website: https://ai-news-hub.com/contact</li>
          </ul>
        </div>
      </div>
    </>
  );
}
