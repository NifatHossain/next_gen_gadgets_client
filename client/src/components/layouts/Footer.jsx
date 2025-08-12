"use client";

import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  const [socialLinks] = useState({
    facebook: "https://facebook.com/NextGenGadgets",
    instagram: "https://instagram.com/NextGenGadgets",
    youtube: "https://youtube.com/@NextGenGadgets",
  });

  const [contactInfo, setContactInfo] = useState({
    email: "support@nextgengadgets.com",
    phone: "+880 1234-567890",
    address: "House #12, Road #5, Dhanmondi, Dhaka",
  });

  const openLink = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("Link unavailable at the moment.");
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["About", "Terms & Conditions", "FAQs", "Support", "Privacy Policy"].map((link, idx) => (
              <li key={idx}>
                <a href={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} className="hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          {contactInfo.email && contactInfo.phone && contactInfo.address ? (
            <ul className="space-y-2">
              <li>Email: {contactInfo.email}</li>
              <li>Phone: {contactInfo.phone}</li>
              <li>Address: {contactInfo.address}</li>
            </ul>
          ) : (
            <p>Contact information currently unavailable.</p>
          )}
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <button onClick={() => openLink(socialLinks.facebook)}>
              <FaFacebookF />
            </button>
            <button onClick={() => openLink(socialLinks.instagram)}>
              <FaInstagram />
            </button>
            <button onClick={() => openLink(socialLinks.youtube)}>
              <FaYoutube />
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-bold mb-3">Payment Methods</h3>
          <div className="flex flex-wrap gap-2">
            <Image src="/images/visa.png" alt="Visa" width={50} height={30} />
            <Image src="/images/mastercard.png" alt="MasterCard" width={50} height={30} />
            <Image src="/images/bkash.png" alt="bKash" width={50} height={30} />
            <Image src="/images/nagad.png" alt="Nagad" width={50} height={30} />
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center mt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} NextGenGadgets. All rights reserved.
      </div>
    </footer>
  );
}
