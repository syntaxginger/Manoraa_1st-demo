import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, ChevronRight, Sparkles, ArrowLeft, PlayCircle, 
  BookOpen, Settings, RotateCcw, FileText, Search, LayoutDashboard, Send
} from 'lucide-react';

const MunySidebar = ({ currentAffinity, interactions, currentPage }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  // --- 1. CONFIG: Contextual Messages & Suggested Chips ---
  const pageConfigs = {
    search: {
      welcome: "Welcome to MANORAA. I'm Muny, your AI research assistant. How can I help you today?",
      options: [
        { label: "Search Guide", action: "guide_info", icon: <Search size={14}/> },
        { label: "Database Sources", action: "db_info", icon: <BookOpen size={14}/> },
        { label: "Go to Dashboard", action: "/dashboard", icon: <LayoutDashboard size={14}/>, isReal: true }
      ]
    },
    dashboard: {
      welcome: "Insight Dashboard loaded. I've analyzed the structural clusters and binding trends.",
      options: [
        { label: "What is this score?", action: "score_info" },
        { label: "Deep-Dive in 3D Lab", action: "/lab", icon: <PlayCircle size={14}/>, isReal: true }
      ]
    },
    lab: {
      welcome: "3D Lab active. I'm ready to calculate real-time binding affinity and forces.",
      options: [
        { label: "How to interact?", action: "lab_info" },
        { label: "View Report", action: "/report", icon: <FileText size={14}/>, isReal: true }
      ]
    }
  };

  const config = pageConfigs[currentPage] || pageConfigs.search;

  useEffect(() => {
    setMessages([{ role: 'ai', content: config.welcome }]);
    setCurrentOptions(config.options);
  }, [currentPage]);

  // --- 2. LOGIC: Interaction Responses (Hard-coded) ---
  const getResponse = (queryText, action = null) => {
    const query = queryText.toLowerCase().trim();
    
    // Check by Action (from Selection Menu)
    if (action === "guide_info") return "To start, enter a PDB ID or SMILES string in the search bar. I will then perform a hierarchical analysis of the molecular structures.";
    if (action === "db_info") return "MANORAA integrates high-quality data from UniProt, PDB, and ChEMBL to ensure precise binding affinity predictions.";
    if (action === "score_info") return "The LogKi score is calculated using our validated regression models, considering interatomic distances and atom types.";
    if (action === "lab_info") return "In the 3D Lab, you can use the Ruler tool to measure atomic distances. These values directly influence the affinity prediction.";
    
    // Navigation Responses
    if (action?.startsWith('/')) return `Acknowledged. Redirecting you to the ${action.replace('/', '')} module...`;

    // Check by Text Input (Manual Typing)
    if (query.includes("what is stu")) return "STU (Staurosporine) is a potent alkaloid and kinase inhibitor used as a reference ligand in this analysis.";
    if (query.includes("purpose") || query.includes("web") || query.includes("manoraa")) return "MANORAA is a specialized platform for protein-ligand interaction analysis and binding affinity prediction.";

    return "I'm sorry, this free-text feature is not yet available in the Demo version. Please use the suggested chips above for guidance.";
  };

  // --- 3. HANDLERS ---
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      const aiResponse = getResponse(userText);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  };

  const handleSelection = (option) => {
    if (isThinking) return;
    
    // 1. Show User's Selection in Chat
    setMessages(prev => [...prev, { role: 'user', content: option.label }]);
    setIsThinking(true); 

    // 2. Process Response
    setTimeout(() => {
      setIsThinking(false);
      const aiResponse = getResponse(option.label, option.action);
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);

      // 3. If it's a Navigation Action, wait a bit then navigate
      if (option.action?.startsWith('/')) {
        setTimeout(() => {
          navigate(option.action);
        }, 1200);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans border-l border-slate-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center text-white relative shadow-sm">
            <MessageSquare size={18} />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
          </div>
          <div>
            <h4 className="text-[12px] font-black text-slate-800 uppercase tracking-tight">Muny Assistant</h4>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em]">{currentPage || 'Home'} NODE</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-[#F8FAFC]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[90%] p-4 rounded-lg text-[12px] shadow-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-[#0F172A] text-white rounded-tr-none font-bold' 
              : 'bg-white text-slate-600 border border-slate-200 rounded-tl-none font-medium'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white border border-slate-100 px-4 py-3 rounded-lg rounded-tl-none flex gap-2 items-center shadow-sm">
              <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest animate-pulse">Thinking</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input & Footer */}
      <div className="p-5 border-t border-slate-100 bg-white space-y-4">
        
        {/* Suggested Chips */}
        {!isThinking && (
          <div className="flex flex-wrap gap-2">
            {currentOptions.map((opt, i) => (
              <button key={i} onClick={() => handleSelection(opt)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[9px] font-black uppercase border border-slate-200 bg-white text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm">
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Text Input */}
        <form onSubmit={handleSendMessage} className="relative flex items-center">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Muny a question..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-4 pr-12 py-3 text-[12px] font-bold text-slate-700 tracking-tight focus:outline-none focus:border-[#0F172A] transition-all placeholder:text-slate-400 placeholder:font-medium placeholder:normal-case"
          />
          <button type="submit" className="absolute right-2 p-2 bg-[#0F172A] text-white rounded-md hover:bg-indigo-600 transition-colors">
            <Send size={14} />
          </button>
        </form>

        {/* Home Button */}
        <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-200 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
            <ArrowLeft size={12} /> Search
        </button>
      </div>
    </div>
  );
};

export default MunySidebar;