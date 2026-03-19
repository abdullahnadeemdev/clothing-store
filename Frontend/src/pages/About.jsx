import { Award, Zap, HeartHandshake } from 'lucide-react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-12">
          <Title text1="ABOUT" text2="US" />
        </div>

        {/* Side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div className="overflow-hidden rounded-3xl aspect-[4/3] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop"
              alt="About Forever clothing store"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Our Story</h2>
            <p className="text-gray-500 leading-relaxed">
              Forever was born from a simple belief: that great style shouldn't come at the cost of quality
              or the environment. Founded in 2020, we set out to create a clothing brand that celebrates
              the beauty of simplicity while delivering exceptional craftsmanship.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Each piece in our collection is thoughtfully designed and meticulously crafted to ensure you
              look and feel your best, whether you're dressing for a casual day out or an important occasion.
              We believe clothing is a form of self-expression, and we want to give you the tools to tell
              your story beautifully.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '200+', label: 'Unique Styles' },
                { number: '15+', label: 'Countries Served' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">{stat.number}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-6">
          <Title text1="WHY" text2="CHOOSE US" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {[
            {
              icon: Award,
              title: 'Quality Assurance',
              desc: 'Every garment passes through a rigorous 15-step quality check before reaching you. We never compromise on the materials or craftsmanship that make our clothes exceptional.',
            },
            {
              icon: Zap,
              title: 'Convenience',
              desc: "From seamless browsing to fast delivery and easy returns, we've designed every touchpoint around your convenience. Shopping with Forever should be a pleasure, not a chore.",
            },
            {
              icon: HeartHandshake,
              title: 'Exceptional Customer Service',
              desc: "Our dedicated support team is available around the clock. Whether you have a question about sizing or need help with a return, we're always here to help you.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-gray-100 rounded-2xl p-7 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-5">
                <Icon size={22} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
