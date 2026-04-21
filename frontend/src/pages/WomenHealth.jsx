import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Baby, 
  Droplet, 
  Sparkles, 
  ChevronRight,
  ChevronLeft,
  Plus
} from 'lucide-react';

const WomenHealth = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSetup, setShowSetup] = useState(false);
  const [formData, setFormData] = useState({
    lastPeriodDate: '',
    cycleLength: 28
  });

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/women-health/status');
      setData(res.data);
      setShowSetup(false);
    } catch (err) {
      if (err.response?.status === 404) setShowSetup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/women-health/setup', formData);
      fetchStatus();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prime-600"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          Women's Health <Sparkles className="text-prime-400" />
        </h1>
        <p className="text-slate-500">Track your cycle and physiological health.</p>
      </header>

      {showSetup ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto card text-center p-8"
        >
          <div className="w-16 h-16 bg-prime-50 rounded-2xl flex items-center justify-center text-prime-600 mx-auto mb-6">
            <Calendar size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-4">Initialize Tracking</h2>
          <p className="text-slate-500 mb-8 text-sm">Let's set up your cycle parameters for better predictions.</p>
          
          <form onSubmit={handleSetup} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Last Period Start Date</label>
              <input 
                type="date" 
                className="input-field" 
                value={formData.lastPeriodDate}
                onChange={(e) => setFormData({...formData, lastPeriodDate: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Average Cycle Length (Days)</label>
              <input 
                type="number" 
                className="input-field" 
                value={formData.cycleLength}
                onChange={(e) => setFormData({...formData, cycleLength: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="w-full py-4 bg-prime-600 text-white rounded-2xl font-bold shadow-premium hover:bg-prime-700 transition-all">
              Save & Start Tracking
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Prediction Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 card bg-gradient-to-br from-pink-50 to-white overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-100 rounded-full blur-3xl -mr-24 -mt-24 opacity-60"></div>
            
            <div className="relative z-10 p-4">
              <span className="text-xs font-bold text-pink-600 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
                Next Period Date
              </span>
              <div className="mt-8">
                <h2 className="text-5xl font-black text-slate-900 mb-2">
                  {new Date(data.nextPeriod).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex items-center gap-2 mt-4">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                    data.daysUntil < 5 ? 'bg-orange-500 text-white' : 'bg-prime-600 text-white'
                  }`}>
                    Predicted: In {data.daysUntil} Days
                  </div>
                  <button onClick={() => setShowSetup(true)} className="p-2 text-slate-400 hover:text-slate-600">
                    Edit cycle length
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-white/50 backdrop-blur rounded-2xl p-6 border border-white/40 shadow-premium">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800">
                <Droplet size={18} className="text-pink-500" /> Cycle Insights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl">
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Ovulation</p>
                  <p className="font-bold text-slate-800">Healthy Phase</p>
                </div>
                <div className="p-4 bg-white rounded-xl">
                  <p className="text-xs text-slate-400 font-semibold mb-1 uppercase tracking-wider">Fertility Window</p>
                  <p className="font-bold text-pink-600">Approaching</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-bold mb-4">Log Symptoms</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Cramps', 'Mood', 'Bloating', 'Fatigue'].map((s) => (
                  <button key={s} className="px-3 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold hover:border-prime-300 transition-all text-slate-600">
                    {s}
                  </button>
                ))}
              </div>
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-prime-600 hover:border-prime-200 transition-all">
                <Plus size={18} /> Add Note
              </button>
            </div>

            <div className="card bg-slate-900 text-white flex items-center justify-between p-6">
              <div>
                <h3 className="font-bold text-lg">AI Assistant</h3>
                <p className="text-xs text-slate-400">Ask about your cycle health</p>
              </div>
              <button className="w-12 h-12 bg-prime-600 rounded-2xl flex items-center justify-center">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomenHealth;
