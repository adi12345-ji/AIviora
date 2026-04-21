import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Activity, Shield, Calendar, ChevronRight, Stethoscope } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24 md:pb-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Health History</h1>
        <p className="text-slate-500">A complete timeline of your health assessments and AI consultations.</p>
      </header>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-prime-600"></div>
        </div>
      ) : (
        <div className="space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100 -z-10"></div>

          {history.length > 0 ? history.map((record, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-prime-600 shrink-0">
                <Shield size={20} />
              </div>
              <div className="card flex-1 hover:shadow-soft transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">Health Risk Assessment</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
                      <Calendar size={12} />
                      {new Date(record.createdAt).toLocaleDateString()} at {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    record.riskLevel === 'Low' ? 'bg-green-100 text-green-700' : 
                    record.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {record.riskLevel} Risk
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Score</p>
                    <p className="text-lg font-black text-slate-800">{record.score}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">SpO2</p>
                    <p className="text-lg font-black text-slate-800">98%</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">BPM</p>
                    <p className="text-lg font-black text-slate-800">72</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50 group-hover:border-prime-100 transition-all">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-prime-50 rounded-lg flex items-center justify-center text-prime-600">
                      <Stethoscope size={16} />
                    </div>
                    <span className="text-sm font-semibold text-slate-600 truncate max-w-md">
                      {record.suggestions?.[0] || 'Assessment complete'}
                    </span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-prime-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400">Your health timeline is empty.</p>
              <button className="mt-4 text-prime-600 font-bold hover:underline">Start Assessment</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
