import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/health/history');
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const latestRecord = history[0] || { score: 0, riskLevel: 'N/A' };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-24 md:pb-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hello, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-slate-500">How are you feeling today?</p>
        </div>
        <button 
          onClick={() => navigate('/risk')}
          className="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center hover:shadow-soft transition-all"
        >
          <Plus size={24} className="text-prime-600" />
        </button>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Health Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 card bg-gradient-to-br from-white to-prime-50 flex flex-col items-center justify-center text-center py-12"
        >
          <h2 className="text-xl font-bold text-slate-800 mb-8">Your Health Score</h2>
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - latestRecord.score / 100)}
                strokeLinecap="round"
                className="text-prime-600 transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900">{latestRecord.score}</span>
              <span className="text-sm font-semibold text-prime-600 uppercase tracking-wider">
                {latestRecord.riskLevel === 'Low' ? 'Good' : latestRecord.riskLevel || 'Initialize'}
              </span>
            </div>
          </div>
          <p className="mt-8 text-slate-500 max-w-xs">
            {latestRecord.score > 0 
              ? "Your health score is stable. Keep up the good work!" 
              : "Let's complete your first risk assessment to get your score."}
          </p>
        </motion.div>

        {/* Quick Insights */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Latest Risk</h3>
              <AlertCircle size={20} className={latestRecord.riskLevel === 'High' ? 'text-red-500' : 'text-prime-500'} />
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className={`text-xs font-bold uppercase ${latestRecord.riskLevel === 'High' ? 'text-red-600' : 'text-prime-600'}`}>
                {latestRecord.riskLevel} Level
              </span>
              <p className="text-sm mt-1">{latestRecord.suggestions?.[0] || 'No suggestions yet'}</p>
            </div>
            <button onClick={() => navigate('/history')} className="mt-4 flex items-center gap-1 text-sm text-prime-600 font-semibold hover:underline">
              View History <ChevronRight size={14} />
            </button>
          </div>

          <div className="card bg-prime-600 text-white">
            <h3 className="font-bold mb-2">Speak with AI</h3>
            <p className="text-sm text-prime-100 mb-4">Have symptoms? Describe them to our AI assistant for instant feedback.</p>
            <button 
              onClick={() => navigate('/chat')}
              className="w-full py-3 bg-white text-prime-600 rounded-xl font-bold text-sm hover:bg-prime-50"
            >
              Start Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {history.length > 0 ? history.slice(0, 3).map((record, i) => (
            <div key={i} className="card p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-prime-100 rounded-lg flex items-center justify-center text-prime-600">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Health Checkup</h4>
                  <p className="text-xs text-slate-500">{new Date(record.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                record.riskLevel === 'Low' ? 'bg-green-100 text-green-700' : 
                record.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              }`}>
                {record.riskLevel}
              </div>
            </div>
          )) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400 font-medium">No activity history yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
