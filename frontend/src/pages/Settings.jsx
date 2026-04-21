import React from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Shield, CreditCard, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  const sections = [
    { title: 'Profile Information', icon: User, desc: 'Update your personal details and photo.' },
    { title: 'Notifications', icon: Bell, desc: 'Manage alerts and health reminders.' },
    { title: 'Privacy & Security', icon: Lock, desc: 'Control your data sharing and passwords.' },
    { title: 'Subscriptions', icon: CreditCard, desc: 'Manage your plan and billing details.' },
    { title: 'Connected Devices', icon: Shield, desc: 'Manage your smartwatches and health bands.' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 md:pb-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-500">Manage your profile, data, and application preferences.</p>
      </header>

      <div className="card !p-0 overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center gap-6">
          <div className="w-20 h-20 bg-prime-100 rounded-3xl flex items-center justify-center text-prime-600 text-3xl font-black">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{user?.name}</h2>
            <p className="text-slate-500">{user?.email}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-prime-50 text-prime-600 text-[10px] font-bold uppercase rounded-full tracking-wider border border-prime-100">
                {user?.subscription?.plan} Plan
              </span>
            </div>
          </div>
          <button className="ml-auto px-5 py-2 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
            Edit Profile
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {sections.map((section, i) => (
            <button 
              key={i} 
              className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all text-left group"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-prime-600 transition-colors">
                  <section.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{section.title}</h3>
                  <p className="text-sm text-slate-400">{section.desc}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-300 group-hover:text-prime-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">Aiviora v1.0.4 Early Access</p>
      </div>
    </div>
  );
};

export default Settings;
