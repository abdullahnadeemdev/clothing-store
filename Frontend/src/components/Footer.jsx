import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-widest text-black uppercase">Forever</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Forever is your destination for contemporary fashion. We curate timeless pieces
              that blend style, quality, and comfort for the modern individual.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-black hover:border-black transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-black uppercase mb-5">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Collection', to: '/collection' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'Privacy Policy', to: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-widest text-black uppercase mb-5">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Phone size={15} className="text-gray-400 flex-shrink-0" />
                +1 (555) 000-0000
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-500">
                <Mail size={15} className="text-gray-400 flex-shrink-0" />
                hello@forever.store
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Forever. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Designed with ♥ for fashion lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
