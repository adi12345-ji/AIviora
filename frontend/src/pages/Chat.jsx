import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Paperclip, 
  Bot, 
  User,
  Loader2,
  X,
  FileText
} from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/chat/history');
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        scrollToBottom();
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() && selectedFiles.length === 0) return;

    const formData = new FormData();
    formData.append('content', input);
    selectedFiles.forEach(file => formData.append('files', file));

    // Optimistic UI update
    const userMsg = { 
      role: 'user', 
      content: input, 
      attachments: selectedFiles.map(f => f.name),
      timestamp: new Date()
    };
    
    setMessages([...messages, userMsg]);
    setInput('');
    setSelectedFiles([]);
    setIsTyping(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat/message', formData);
      setMessages(prev => [...prev, res.data.aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 md:p-6 lg:p-8">
      <div className="flex-1 max-w-4xl mx-auto w-full glass-card flex flex-col overflow-hidden !p-0">
        {/* Chat Header */}
        <header className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-prime-100 rounded-xl flex items-center justify-center text-prime-600">
              <Bot size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">Aiviora Health Assistant</h1>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 ${
                    msg.role === 'user' ? 'bg-prime-600 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-prime-600 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {msg.attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] bg-black/10 p-1 rounded">
                            <FileText size={10} /> {typeof file === 'string' ? file.split('\\').pop() : file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-200"></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <footer className="p-4 bg-white/50 border-t border-slate-100">
          {selectedFiles.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {selectedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-prime-50 px-3 py-1 rounded-full border border-prime-200">
                  <span className="text-xs font-semibold text-prime-700 truncate max-w-[100px]">{file.name}</span>
                  <button onClick={() => removeFile(i)} className="text-prime-400 hover:text-prime-600">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <button 
              type="button" 
              onClick={() => fileInputRef.current.click()}
              className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-prime-600 hover:bg-prime-50 rounded-xl transition-all"
            >
              <Paperclip size={20} />
            </button>
            <input 
              type="file" 
              multiple 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileSelect}
            />
            
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Ask anything about your health..."
                className="w-full pl-4 pr-12 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-prime-100 focus:border-prime-400 outline-none transition-all shadow-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-prime-600"
              >
                <Mic size={20} />
              </button>
            </div>

            <button 
              type="submit"
              disabled={!input.trim() && selectedFiles.length === 0 || loading}
              className="w-12 h-12 bg-prime-600 text-white rounded-2xl flex items-center justify-center shadow-premium hover:bg-prime-700 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
