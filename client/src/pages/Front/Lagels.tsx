

const TermsAndFAQ = ({

}) => {
    const   contactEmail = "";
    const contactPhone = "";
    const businessAddress = '';
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Terms & Conditions */}
      <h1 className="text-3xl font-bold mb-6">AllTunisePara Terms & Conditions</h1>
      <p className="text-gray-600 mb-8"><em>Last Updated: March 22, 2025</em></p>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Age Requirement</h2>
        <p>
          You must be <strong>at least 18 years old</strong> to purchase products 
          containing restricted ingredients (e.g., nicotine-containing items). 
          Age verification may occur during delivery.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Promotions & Loyalty Program</h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <strong>Fidelity Points:</strong> Earn 1 point per 10 TND spent. 
            100 points = 5 TND discount. Points expire after 1 year.
          </li>
          <li className="mb-2">
            <strong>Free Delivery:</strong> Orders over [X] TND qualify for free shipping.
          </li>
          <li>
            Promotions are non-transferable and may be revoked for abuse.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
        <p>
          <strong>Data Retention:</strong> User data is stored indefinitely while the 
          website remains operational. You may request deletion via {contactEmail}.
        </p>
        <p className="mt-4">
          <strong>Third-Party Services:</strong> We use:
          <ul className="list-disc pl-6 mt-2">
            <li>Cloudinary for image storage</li>
            <li>Facebook/Google for social authentication</li>
          </ul>
        </p>
      </section>


      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Communication</h2>
        <p>
          <strong>Newsletter:</strong> By subscribing, you agree to receive marketing 
          emails in Arabic, French, or English. Unsubscribe anytime via email footer.
        </p>
        <p className="mt-4">
          <strong>Multilingual Support:</strong> Our website is available in 
          <strong> العربية (Arabic), Français (French), and English</strong>. 
          In case of translation conflicts, the Arabic version prevails.
        </p>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="mb-6">
          <h3 className="font-semibold">Q: How do I redeem fidelity points?</h3>
          <p className="mt-2">
            Points auto-apply at checkout. 100 points = 5 TND discount.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Q: Can I change the website language?</h3>
          <p className="mt-2">
            Yes! Use the language selector in the top-right corner.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Product Returns</h2>
        <p className="mb-4">
          Returns are only accepted <strong>at the time of delivery</strong> if products are damaged or incorrect. 
          Inspect your package thoroughly before accepting delivery.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">2. Shipping Policy</h2>
        <p>
          All orders within Tunisia are delivered within <strong>48 hours</strong> of order confirmation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">3. Prohibited Activities</h2>
        <ul className="list-disc pl-6">
          <li>Data scraping or automated access</li>
          <li>Unauthorized resale of products</li>
          <li>Misrepresentation of medical claims</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">4. Privacy Policy</h2>
        <p>
          We collect only necessary data for order processing. By using our service, you agree to: 
          <ul className="list-disc pl-6 mt-2">
            <li>Secure storage of payment information</li>
            <li>Order-related communication</li>
            <li>GDPR-compliant data handling</li>
          </ul>
        </p>
      </section>

      {/* FAQ Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

        <div className="mb-6">
          <h3 className="font-semibold">Q: What if I miss my delivery?</h3>
          <p className="mt-2">
            Our courier will attempt redelivery the next business day. 
            After 3 attempts, the order will be returned to our warehouse.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold">Q: Do you accept cash payments?</h3>
          <p className="mt-2">
            Yes, we accept <strong>cash on delivery (TND)</strong> nationwide.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p>📧 Email: {contactEmail}</p>
        <p className="my-2">📞 Phone: {contactPhone}</p>
        <p>🏢 Address: {businessAddress}</p>
        <p className="mt-4">⏰ Hours: 9:00 AM - 7:00 PM (Tunisia Time)</p>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Governed by Tunisian Law | © 2025 AllTunisePara. All rights reserved.
      </p>
    </div>
  );
};

export default TermsAndFAQ;