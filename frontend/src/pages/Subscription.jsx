import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Subscription = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '0',
      icon: Star,
      features: ['Basic AI Chat', '1 Risk Check / Month', 'Standard Tracking', 'Email Support'],
      buttonText: 'Current Plan',
      current: user?.subscription?.plan === 'Free'
    },
    {
      name: 'Pro',
      price: '19',
      icon: Zap,
      features: ['Advanced AI Insights', 'Unlimited Risk Checks', 'Historical Analytics', 'Priority Support', 'Women Health Pro'],
      buttonText: 'Upgrade to Pro',
      highlight: true,
      current: user?.subscription?.plan === 'Pro'
    },
    {
      name: 'Premium',
      price: '49',
      icon: Crown,
      features: ['Doctor Consultation', 'Medical Report PDF Export', 'Personal Health Coach', 'Family Plan (4 members)', '24/7 Hotline'],
      buttonText: 'Go Premium',
      current: user?.subscription?.plan === 'Premium'
    }
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Choose Your Plan</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Unlock professional health monitoring and personalized AI guidance with our premium plans.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`card relative overflow-hidden flex flex-col p-8 ${
              plan.highlight ? 'ring-2 ring-prime-600 shadow-2xl scale-105 z-10' : ''
            }`}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-prime-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${
              plan.highlight ? 'bg-prime-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              <plan.icon size={24} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-black text-slate-900">${plan.price}</span>
              <span className="text-slate-400 font-medium">/mo</span>
            </div>

            <ul className="space-y-4 mb-10 flex-1">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-slate-600 font-medium">
                  <Check size={18} className="text-prime-600 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <button 
              disabled={plan.current}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${
                plan.current 
                  ? 'bg-slate-50 text-slate-400 cursor-not-allowed'
                  : plan.highlight 
                    ? 'bg-prime-600 text-white shadow-premium hover:bg-prime-700' 
                    : 'bg-white text-prime-600 border-2 border-prime-50 hover:bg-prime-50'
              }`}
            >
              {plan.current ? 'Your Current Plan' : plan.buttonText}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-8 card bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-2">Need a Enterprise Plan?</h3>
          <p className="text-slate-400">Customized health solutions for hospitals and organizations.</p>
        </div>
        <button className="px-8 py-4 bg-prime-600 text-white rounded-2xl font-bold whitespace-nowrap">
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default Subscription;
