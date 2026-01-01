import React from 'react';
import { Helmet } from 'react-helmet';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - AI News Hub</title>
        <meta name="description" content="Terms of Service for AI News Hub. Read our terms and conditions for using our website." />
        <meta property="og:title" content="Terms of Service - AI News Hub" />
        <meta property="og:description" content="Terms of Service for AI News Hub. Read our terms and conditions for using our website." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on AI News Hub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
            <li>Attempting to decompile or reverse engineer any software contained on the website</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer</h2>
          <p>
            The materials on AI News Hub's website are provided on an 'as is' basis. AI News Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall AI News Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AI News Hub's website, even if AI News Hub or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Accuracy of Materials</h2>
          <p>
            The materials appearing on AI News Hub's website could include technical, typographical, or photographic errors. AI News Hub does not warrant that any of the materials on its website are accurate, complete, or current. AI News Hub may make changes to the materials contained on its website at any time without notice.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Links</h2>
          <p>
            AI News Hub has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AI News Hub of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Modifications</h2>
          <p>
            AI News Hub may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which AI News Hub operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>By email: legal@ai-news-hub.com</li>
            <li>By visiting this page on our website: https://ai-news-hub.com/contact</li>
          </ul>
        </div>
      </div>
    </>
  );
}
