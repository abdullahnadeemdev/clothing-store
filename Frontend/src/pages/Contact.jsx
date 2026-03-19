import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-12">
          <Title text1="CONTACT" text2="US" />
        </div>

        {/* Main contact section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1560243563-062bfc001d68?w=800&h=600&fit=crop"
              alt="Forever store"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Store</h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Address</p>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    54709 Willms Station<br />
                    Suite 350, Washington, USA
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Phone</p>
                  <p className="text-sm text-gray-500">+1 (555) 000-0000</p>
                  <p className="text-xs text-gray-400 mt-0.5">Mon–Sat, 9am–6pm EST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-0.5">Email</p>
                  <p className="text-sm text-gray-500">hello@forever.store</p>
                  <p className="text-xs text-gray-400 mt-0.5">We'll reply within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Careers section */}
        <div className="bg-gray-50 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Careers at Forever</h2>
          <p className="text-gray-500 leading-relaxed max-w-xl mx-auto mb-8">
            We're always looking for passionate, creative people to join our growing team.
            If you love fashion and want to be part of something exciting, we'd love to hear from you.
          </p>
          <button className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-gray-800 transition-colors">
            Explore Jobs
            <ExternalLink size={15} />
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
