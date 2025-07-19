import React from 'react';
import { Calendar, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="gradient-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">EventBook</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Your premier destination for discovering and booking amazing events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                Home
              </a></li>
              <li><a href="/events" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                Events
              </a></li>
              <li><a href="/about" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                About
              </a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white transition-colors duration-200 flex items-center group">
                <span className="w-1 h-1 bg-white/60 rounded-full mr-3 group-hover:bg-white transition-colors duration-200"></span>
                Contact
              </a></li>
            </ul>
          </div>

          {/* Categories */}
         

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="p-1 bg-white/10 rounded">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-white/80">support@eventbook.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="p-1 bg-white/10 rounded">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-white/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="p-1 bg-white/10 rounded mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-white/80">123 Event St, City, State 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-white/80">
            © 2024 EventBook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;