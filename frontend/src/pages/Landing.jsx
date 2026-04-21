import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Sparkles, HeartPulse, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-prime-50 rounded-full blur-3xl -mr-64 -mt-32 opacity-70" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-70" />

      {/* Nav */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-prime-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-bold text-slate-900">Aiviora</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="text-slate-600 font-medium hover:text-prime-600 transition-colors">Login</button>
          <button onClick={() => navigate('/register')} className="px-5 py-2 bg-prime-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 bg-prime-50 text-prime-600 rounded-full text-sm font-semibold mb-6 inline-block">
            Revolutionizing Preventive Healthcare
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
            Your Personal AI <br />
            <span className="bg-gradient-to-r from-prime-600 to-accent bg-clip-text text-transparent italic">
              Health Companion
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mb-12">
            Aiviora uses advanced AI to monitor your health, predict risks, and provide 
            personalized insights to keep you and your loved ones healthy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-prime-600 text-white rounded-2xl font-semibold text-lg hover:shadow-premium transition-all flex items-center gap-2"
            >
              Start Free Health Check <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-semibold text-lg hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 w-full">
          {[
            { icon: Sparkles, title: 'AI Assistant', desc: 'Real-time health advice and medical report analysis.' },
            { icon: Shield, title: 'Risk Checker', desc: 'Predictive analytics to identify potential health risks early.' },
            { icon: HeartPulse, title: 'Daily Insights', desc: 'Personalized wellness tips based on your lifestyle.' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-3xl text-left hover:shadow-soft transition-all"
            >
              <div className="w-12 h-12 bg-prime-50 rounded-2xl flex items-center justify-center text-prime-600 mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Landing;
