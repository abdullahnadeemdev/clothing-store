import { useState } from 'react';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-4 text-center bg-gray-50">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-3">Newsletter</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
          Subscribe now &amp; get <span className="border-b-2 border-black">20% off</span>
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Join our community and be the first to know about new arrivals, exclusive offers,
          and style tips straight to your inbox.
        </p>
        {submitted ? (
          <p className="text-green-600 font-medium bg-green-50 border border-green-200 rounded-xl py-3 px-6 inline-block">
            🎉 Thank you! Check your inbox for your 20% off code.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto shadow-sm rounded-full overflow-hidden border border-gray-200">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 pl-5 pr-3 py-3.5 text-sm focus:outline-none bg-white"
            />
            <button
              type="submit"
              className="bg-black text-white text-xs font-semibold tracking-widest uppercase px-6 py-3.5 hover:bg-gray-800 transition-colors flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterBox;
