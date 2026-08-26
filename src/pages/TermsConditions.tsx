import React from 'react';
import { FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const TermsConditions: React.FC = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Terms & Conditions', url: '/terms-conditions' }
  ];

  return (
    <>
      <SEOHead
        title="TERMS & CONDITIONS - Mobile Wholesale"
        description="Review our terms and conditions to understand the policies, rules, and guidelines for using our wholesale mobile phone services."
        canonicalPath="/terms-conditions/"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-[#FAF8F2]">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#D8E2DE] shadow-md space-y-8">
          {/* Header */}
          <div className="border-b border-[#D8E2DE] pb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071715] uppercase tracking-widest bg-[#E5F3EF] px-3.5 py-1.5 rounded-full border border-[#D4AF62]">
              <FileText className="w-3.5 h-3.5 text-[#00A88F]" /> Legal & Trade Terms
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#071715] mt-2">Terms & Conditions</h1>
            <p className="text-xs text-[#596662] mt-1">Official Policy & Wholesale Trading Terms</p>
          </div>

          {/* Key Policies & Guidelines */}
          <div className="space-y-6 text-sm text-[#101A18] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Stock Availability and Placing an Order</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                At Mobiles Wholesale, “Goods” refer to the goods, products, or services offered for sale by us. Orders are accepted only from the UK and individuals over 18 years of age. While we strive to maintain accurate stock availability, all items on our website are subject to availability. In the event of an out-of-stock item, we will notify you within 1 business day. You can choose to wait for the item to be restocked or cancel the order.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Telephone Orders and Security Checks</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Orders can be placed online via our secure website or by calling our sales office during business hours. We may conduct random security checks on orders to protect both parties. Our customer service team may request proof of address or identity before processing an order to ensure security.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Payment and Possession of Goods</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                We accept payments from all major credit/debit card providers. Your card will not be charged until your order is ready to ship. Goods remain our property until full payment is received. In the event of payment rejection by your card issuer, we will notify you via email. If the item has already been shipped, we may request its return or alternative payment within 48 hours.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Fraud Prevention Policy</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                All orders are subject to our discretion, and in some cases, additional documentation may be required, especially for high-value orders. This is part of our fraud prevention policy aimed at protecting customers from fraudulent use of personal information or credit cards. Return shipping is not free, but replacement shipping is free.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Website Accuracy</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                While we endeavor to provide accurate information on our website, product details, prices, and offers are subject to change without notice. We recommend contacting the manufacturer directly for specific product information. Images are for illustrative purposes only, and product specifications/colors may vary.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Grading of Devices</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Our devices are categorized into Grades A, B, and C, based on their condition. Each grade reflects the cosmetic condition of the device and undergoes thorough testing to ensure functionality. All devices come with a 28-day warranty and a 14-day return period.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Delivery</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Parcels are shipped via Royal Mail or DPD, depending on the product’s value. Overnight delivery is available for orders placed before specific cut-off times. Accessories are shipped within 1-2 business days. Additional charges may apply for remote locations or uncollected parcels.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Agreement Overview</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                These Terms and Conditions constitute a legally binding agreement between you, whether acting on your own behalf or representing an entity (referred to as “you”), and Mobile Wholesale, situated at Suite 3234 Unit 3A 34, 35 Hatton Garden, London EC1N 8DX, United Kingdom (referred to as “we” or “us”), concerning your utilization of the Mobile Wholesale website (<a href="https://mobileswholesale.co.uk/" target="_blank" rel="noopener noreferrer" className="text-[#00A88F] underline">https://mobileswholesale.co.uk/</a>) and any associated applications (collectively referred to as the “Site”).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Acknowledgment and Acceptance</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Mobile Wholesale functions as the designated Commercial Agent for our merchants, providing a platform for the wholesale procurement of mobile devices (hereinafter referred to as “Products”). By accessing the Site, you acknowledge that you have read, comprehended, and consented to abide by these Terms and Conditions. Should you disagree with any portion of these Terms and Conditions, please refrain from accessing the Site and making any wholesale mobile purchases, discontinuing usage immediately. We suggest retaining a copy of these Terms and Conditions for future reference.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Supplementary Policies</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                The supplementary policies detailed in the section below, as well as any additional terms or documents published on the Site, are explicitly incorporated by reference.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Modifications to Terms</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                We reserve the right to amend these Terms and Conditions at our discretion. The revised version will be identified by an updated “Revised” date and will become effective upon accessibility. It is your responsibility to review these revisions to remain informed. Continued use of the Site implies acceptance of such modifications.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Site Modifications</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                We may enhance or modify the Site to accommodate changes in products, user requirements, and business priorities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Jurisdictional Use</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                The Site is intended for use by individuals located in the United Kingdom. Information presented on the Site is not intended for distribution or utilization in any jurisdiction or country where such actions would contravene the law or regulations.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Age Requirement</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                The Site is designed for individuals aged 18 and above. Individuals under the age of 18 are prohibited from registering or making wholesale mobile purchases without parental consent.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Privacy Notice</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Our Privacy Notice at <a href="https://mobileswholesale.co.uk/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[#00A88F] underline">https://mobileswholesale.co.uk/privacy-policy/</a> delineates the terms governing the processing of any collected personal data.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Cookie Policy</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Our Cookie Policy provides information regarding cookies utilized on the Site.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Terms and Conditions of Supply</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                For wholesale transactions involving digital goods from the Site, the terms and conditions of supply shall apply.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Product Quality Guarantee</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                We guarantee that any product acquired from us through our site is of satisfactory quality and reasonably fit for all commonly supplied purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Limitation of Liability</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                Our liability for losses incurred due to a breach of this agreement is strictly limited to the purchase price of the product and the foreseeable consequences of breaching the agreement. We shall not be held liable for indirect losses that were not foreseeable by you or us.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-extrabold text-[#071715]">Revisions to Terms</h2>
              <p className="text-xs text-[#596662] leading-relaxed">
                We reserve the right to revise these Terms and Conditions to reflect alterations in market conditions, technology, payment methods, relevant laws, regulatory requirements, and our systems. Your order will be subject to the policies and terms in effect at the time of purchase, unless alterations are mandated by law or governmental authority, or if we notify you prior to sending the Dispatch Confirmation and you notify us of your objection within 14 working days of receiving the purchased products from the Store.
              </p>
            </section>
          </div>

          <hr className="border-[#D8E2DE]" />

          {/* Terms and Conditions: Wholesale Mobiles Detailed Section */}
          <div className="space-y-6 text-sm text-[#101A18] leading-relaxed pt-2">
            <div className="border-b border-[#D8E2DE] pb-3">
              <h2 className="text-2xl font-black text-[#071715]">Terms and Conditions: Wholesale Mobiles</h2>
              <p className="text-xs text-[#596662] mt-1">
                These Terms and Conditions (“Terms”) constitute a legally binding agreement between you (whether personally or on behalf of an entity) and Mobile Wholesale, located at Suite 3234 Unit 3A 34, 35 Hatton Garden, London, EC1N 8DX, United Kingdom (“Mobile Wholesale,” “we,” “us,” or “our”) concerning your access to and use of the Mobile Wholesale website (<a href="https://mobileswholesale.co.uk/" target="_blank" rel="noopener noreferrer" className="text-[#00A88F] underline">https://mobileswholesale.co.uk/</a>) as well as any related applications and services (collectively, the “Site”). By accessing the Site and/or engaging in any transactions with Mobile Wholesale, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you must refrain from using the Site and our services immediately.
              </p>
            </div>

            {/* 1. Agreement to Terms */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">1. Agreement to Terms</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">1.a. Scope:</strong> These Terms govern your access to and use of the Mobile Wholesale website and services.</li>
                <li><strong className="text-[#071715]">1.b. Supplemental Policies:</strong> Additional policies, such as our Privacy Policy and Cookie Policy, are expressly incorporated by reference into these Terms. By using the Site, you consent to the processing of your personal data as described in our Privacy Policy.</li>
                <li><strong className="text-[#071715]">1.c. Updates:</strong> We may update these Terms from time to time without notice. The updated version will be effective upon posting, and your continued use of the Site constitutes acceptance of the updated Terms.</li>
              </ul>
            </section>

            {/* 2. Use of the Site */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">2. Use of the Site</h3>
              <div className="space-y-2 text-xs text-[#596662] pl-4">
                <p><strong className="text-[#071715]">2.a. Permitted Use:</strong> The Site is intended for users who are at least 18 years old. By using the Site, you affirm that you are at least 18 years old or have obtained parental permission to use the Site.</p>
                <p><strong className="text-[#071715]">2.b. Prohibited Conduct:</strong> You agree not to engage in any of the following activities:</p>
                <ul className="space-y-1 pl-4 list-circle">
                  <li><strong>2.b.i.</strong> Accessing the Site for any unlawful purpose or in violation of these Terms</li>
                  <li><strong>2.b.ii.</strong> Attempting to interfere with the proper functioning of the Site</li>
                  <li><strong>2.b.iii.</strong> Using the Site to transmit or distribute viruses, malware, or other harmful computer code</li>
                  <li><strong>2.b.iv.</strong> Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            {/* 3. Products and Services */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">3. Products and Services</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">3.a. Offerings:</strong> Mobile Wholesale deals in wholesale mobile phones, tablets, laptops, and electronics.</li>
                <li><strong className="text-[#071715]">3.b. Availability:</strong> Product availability and pricing are subject to change without notice. We reserve the right to modify or discontinue any product or service at any time.</li>
              </ul>
            </section>

            {/* 4. Ordering and Purchasing */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">4. Ordering and Purchasing</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">4.a. Eligibility:</strong> To place orders on the Site, you must create an account and provide accurate and complete information.</li>
                <li><strong className="text-[#071715]">4.b. Pricing:</strong> Prices displayed on the Site are in GBP and are subject to applicable taxes and shipping fees.</li>
                <li><strong className="text-[#071715]">4.c. Order Acceptance:</strong> Order acceptance and the formation of a contract occur when we dispatch the ordered products to you.</li>
              </ul>
            </section>

            {/* 5. Payment */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">5. Payment</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">5.a. Payment Methods:</strong> We accept payment via credit/debit card, bank transfer, or other methods as specified on the Site.</li>
                <li><strong className="text-[#071715]">5.b. Payment Terms:</strong> Payment is due at the time of purchase. Orders will not be processed until payment is received in full.</li>
              </ul>
            </section>

            {/* 6. Shipping and Delivery */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">6. Shipping and Delivery</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">6.a. Shipping:</strong> We aim to dispatch orders promptly, but delivery times may vary depending on your location and shipping method.</li>
                <li><strong className="text-[#071715]">6.b. Risk of Loss:</strong> The risk of loss and title for products purchased from us pass to you upon delivery of the items to the carrier.</li>
              </ul>
            </section>

            {/* 7. Returns and Refunds */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">7. Returns and Refunds</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">7.a. Return Policy:</strong> We accept returns within 14 days of delivery for eligible products. Please refer to our Return Policy for detailed instructions.</li>
                <li><strong className="text-[#071715]">7.b. Refunds:</strong> Refunds will be issued in accordance with our Refund Policy.</li>
              </ul>
            </section>

            {/* 8. Intellectual Property */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">8. Intellectual Property</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">8.a. Ownership:</strong> All content on the Site, including text, graphics, logos, and images, is the property of Mobile Wholesale or its licensors and is protected by copyright laws.</li>
                <li><strong className="text-[#071715]">8.b. Use Restrictions:</strong> You may not reproduce, distribute, or modify any content from the Site without our prior written consent.</li>
              </ul>
            </section>

            {/* 9. Limitation of Liability */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">9. Limitation of Liability</h3>
              <ul className="space-y-1.5 text-xs text-[#596662] pl-4 list-disc">
                <li><strong className="text-[#071715]">9.a. Disclaimer:</strong> The Site and its contents are provided on an “as is” and “as available” basis. We make no warranties or representations regarding the accuracy or completeness of the information provided on the Site.</li>
                <li><strong className="text-[#071715]">9.b. Limitation of Liability:</strong> In no event shall Mobile Wholesale be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Site or products purchased from us.</li>
              </ul>
            </section>

            {/* 10. Contact Us */}
            <section className="space-y-2">
              <h3 className="text-base font-extrabold text-[#071715]">10. Contact Us</h3>
              <p className="text-xs text-[#596662] leading-relaxed pl-4">
                <strong className="text-[#071715]">10.a. Questions:</strong> If you have any questions about these Terms or the Site, please contact us at <a href="mailto:sales@mobileswholesale.co.uk" className="text-[#00A88F] underline">sales@mobileswholesale.co.uk</a> or visit our Contact Us page.
              </p>
            </section>

            <div className="bg-[#FAF8F2] p-4 rounded-xl border border-[#D8E2DE] text-xs text-[#596662] mt-4">
              By accessing the Site and engaging in transactions with Mobile Wholesale, you agree to abide by these Terms. If you do not agree with any part of these Terms, you must refrain from using the Site.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TermsConditions;
