import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Activity,
  Heart,
  Scale,
  Stethoscope
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const RiskChecker = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    bloodPressure: '',
    bloodSugar: '',
    symptoms: []
  });
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/health/risk', formData);
      setResult(res.data);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#22d3ee', '#ffffff']
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: 'Basics', icon: Scale },
    { title: 'Vitals', icon: Activity },
    { title: 'Symptoms', icon: Stethoscope },
    { title: 'Result', icon: ShieldCheck }
  ];

  if (result) {
    return (
      <div className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full card !p-12 text-center"
        >
          <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 ${
            result.riskLevel === 'Low' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
          }`}>
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Analysis Complete</h2>
          <p className="text-slate-500 mb-8">Based on your recent checkup data</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Health Score</span>
              <div className="text-3xl font-black text-slate-900">{result.score}</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Risk Level</span>
              <div className={`text-xl font-bold ${
                result.riskLevel === 'Low' ? 'text-green-600' : 'text-amber-600'
              }`}>{result.riskLevel}</div>
            </div>
          </div>

          <div className="text-left bg-prime-50 p-6 rounded-2xl mb-8">
            <h4 className="font-bold text-prime-900 mb-3 flex items-center gap-2">
              <CheckCircle2 size={18} /> AI Recommendations
            </h4>
            <ul className="space-y-2">
              {result.suggestions.map((s, i) => (
                <li key={i} className="text-sm text-prime-700 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 bg-prime-400 rounded-full shrink-0"></span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-4 bg-prime-600 text-white rounded-2xl font-bold shadow-premium hover:bg-prime-700 transition-all"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Progress */}
      <div className="flex justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10 mx-6"></div>
        {steps.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
              step >= i + 1 ? 'bg-prime-600 text-white shadow-premium' : 'bg-white text-slate-400 border border-slate-200'
            }`}>
              <s.icon size={20} />
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              step >= i + 1 ? 'text-prime-600' : 'text-slate-400'
            }`}>{s.title}</span>
          </div>
        ))}
      </div>

      <div className="card !p-8 md:!p-12 relative overflow-hidden min-h-[500px] flex flex-col">
        {/* Animated Background Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-prime-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 -z-10"></div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Physical Measurements</h2>
                <p className="text-slate-500">Provide your basic physical parameters.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Age</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="e.g. 25"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Weight (kg)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="e.g. 70"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Height (cm)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="e.g. 175"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">Medical Vitals</h2>
                <p className="text-slate-500">Enter your recent clinical readings if available.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Pressure (mmHg)</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. 120/80"
                    value={formData.bloodPressure}
                    onChange={(e) => setFormData({...formData, bloodPressure: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Blood Sugar (mg/dL)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="e.g. 95"
                    value={formData.bloodSugar}
                    onChange={(e) => setFormData({...formData, bloodSugar: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 flex-1"
            >
              <div>
                <h2 className="text-2xl font-bold mb-2">How are you feeling?</h2>
                <p className="text-slate-500">Select any symptoms you are currently experiencing.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Headache', 'Fever', 'Fatigue', 'Cough', 'Nausea', 'Chest Pain', 'Dizziness', 'None'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      if (s === 'None') setFormData({...formData, symptoms: []});
                      else {
                        const newSymptoms = formData.symptoms.includes(s)
                          ? formData.symptoms.filter(x => x !== s)
                          : [...formData.symptoms, s];
                        setFormData({...formData, symptoms: newSymptoms});
                      }
                    }}
                    className={`p-4 rounded-2xl border text-sm font-semibold transition-all ${
                      formData.symptoms.includes(s) || (s === 'None' && formData.symptoms.length === 0)
                        ? 'bg-prime-600 border-prime-600 text-white shadow-soft' 
                        : 'bg-white border-slate-100 text-slate-600 hover:border-prime-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex justify-between">
          <button 
            disabled={step === 1}
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 text-slate-500 font-semibold disabled:opacity-30"
          >
            <ChevronLeft size={20} /> Previous
          </button>
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-prime-600 text-white rounded-2xl font-bold shadow-premium hover:shadow-lg transition-all"
            >
              Next Step <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-prime-700 text-white rounded-2xl font-bold shadow-premium hover:shadow-lg transition-all"
            >
              {isSubmitting ? (
                <>Analyzing... <Activity className="animate-pulse" size={20} /></>
              ) : (
                <>Calculate Risk <ShieldCheck size={20} /> </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
        <Heart className="text-blue-500" size={20} />
        <p className="text-xs text-blue-700 font-medium italic">
          Disclaimer: This AI assessment is for informational purposes and is not a clinical diagnosis. 
          Please consult a healthcare professional for medical advice.
        </p>
      </div>
    </div>
  );
};

export default RiskChecker;
