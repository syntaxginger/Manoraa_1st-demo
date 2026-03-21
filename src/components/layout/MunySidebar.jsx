import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Sparkles, Search, LayoutDashboard, Beaker, Send, 
  BookOpen, Zap, BarChart2, MousePointer2, FileText, ArrowRight
} from 'lucide-react';

const MunySidebar = ({ currentPage }) => {
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

  // --- 1. CONFIG: Interactive Dialog Flow ---
  const flowLogic = {
    search: {
      welcome: "Hello! I'm Muny. Ready to find some molecules? You can start by entering a PDB ID or SMILES string.",
      options: [
        { label: "How to use Search?", action: "guide_step_1", icon: <Search size={12}/> },
        { label: "Data Sources", action: "source_info", icon: <BookOpen size={12}/> }
      ]
    },
    dashboard: {
      welcome: "Insight Dashboard loaded. I've clustered the results based on binding affinity trends. What would you like to explore?",
      options: [
        { label: "Explain Affinity Score", action: "score_info", icon: <Zap size={12}/> },
        { label: "View Cluster Details", action: "cluster_info", icon: <BarChart2 size={12}/> }
      ]
    },
    lab: {
      welcome: "3D Lab active. I can help you measure distances and analyze molecular interactions in real-time.",
      options: [
        { label: "How to measure?", action: "measure_info", icon: <MousePointer2 size={12}/> },
        { label: "Check H-Bonding", action: "hbond_info", icon: <Beaker size={12}/> }
      ]
    },
    report: {
      welcome: "Detailed Analysis Report. I've summarized the key interactions and stability metrics for your selected ligand.",
      options: [
        { label: "Summarize Findings", action: "report_summary", icon: <FileText size={12}/> },
        { label: "Check Solubility (LogP)", action: "logp_info", icon: <Zap size={12}/> }
      ]
    },
    // --- Dashboard Interaction Flow (New) ---
    score_info: {
      content: "The LogKi score represents the binding affinity. Higher absolute values mean stronger binding. Would you like to see how we validate these scores?",
      options: [
        { label: "Yes, show validation", action: "validation_info" },
        { label: "Back to Dashboard", action: "dashboard" }
      ]
    },
    validation_info: {
      content: "We validate our scores against the PDBbind refined set, achieving high correlation (R² > 0.7) for most kinase families.",
      options: [
        { label: "Go to 3D Lab", action: "/lab" },
        { label: "Back", action: "score_info" }
      ]
    },
    cluster_info: {
      content: "Molecules are clustered by structural similarity (Tanimoto coefficient). This helps identify common binding scaffolds.",
      options: [
        { label: "Show most active cluster", action: "active_cluster" },
        { label: "Back", action: "dashboard" }
      ]
    },
    active_cluster: {
      content: "Cluster #4 contains the highest affinity fragments. It might be a good starting point for lead optimization.",
      options: [
        { label: "See Report", action: "/report" },
        { label: "Back", action: "cluster_info" }
      ]
    },
    // --- Report Interaction Flow (New) ---
    report_summary: {
      content: "The ligand shows strong hydrophobic interactions with Phe153. However, the torsion strain is slightly high. Should I suggest improvements?",
      options: [
        { label: "Suggest improvements", action: "improve_ligand" },
        { label: "Back to Report", action: "report" }
      ]
    },
    improve_ligand: {
      content: "Adding a hydroxyl group at the C4 position might stabilize the binding through an extra H-bond with Asp120.",
      options: [
        { label: "Try in 3D Lab", action: "/lab" },
        { label: "Back", action: "report_summary" }
      ]
    },
    logp_info: {
      content: "The calculated LogP is 2.4, which is within the ideal range for Lipinski's Rule of Five (Oral Bioavailability).",
      options: [
        { label: "Check Molecular Weight", action: "mw_info" },
        { label: "Back", action: "report" }
      ]
    },
    // --- Base Flows ---
    guide_step_1: {
      content: "Simply type a PDB ID (like 1STP). Would you like to see how our hierarchical data works?",
      options: [
        { label: "Yes, explain levels", action: "source_info" },
        { label: "Go to 3D Lab", action: "/lab" }
      ]
    },
    source_info: {
      content: "We fetch data from PDB & ChEMBL and process it 'On-the-fly' to ensure you get the most updated results.",
      options: [
        { label: "What is On-the-fly?", action: "otf_info" },
        { label: "Back to Search", action: "search" }
      ]
    },
    otf_info: {
      content: "It means we don't store static results. We calculate everything (distances, scores) the moment you click!",
      options: [
        { label: "Back", action: "source_info" }
      ]
    },
    measure_info: {
      content: "Use the Ruler Tool. If the distance is under 3.5Å, it likely suggests a meaningful interaction.",
      options: [
        { label: "Explain 3.5Å significance", action: "distance_logic" },
        { label: "Back", action: "lab" }
      ]
    }
  };

  useEffect(() => {
    const node = flowLogic[currentPage] || flowLogic.search;
    setMessages([{ role: 'ai', content: node.welcome || node.content }]);
    setCurrentOptions(node.options);
  }, [currentPage]);

  const handleFlow = (option) => {
    if (isThinking) return;
    setMessages(prev => [...prev, { role: 'user', content: option.label }]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      if (option.action.startsWith('/')) {
        setMessages(prev => [...prev, { role: 'ai', content: `Navigating to ${option.action.replace('/', '')}...` }]);
        setTimeout(() => navigate(option.action), 800);
        return;
      }
      const nextNode = flowLogic[option.action];
      if (nextNode) {
        setMessages(prev => [...prev, { role: 'ai', content: nextNode.content || nextNode.welcome }]);
        setCurrentOptions(nextNode.options);
      }
    }, 800);
  };

  const handleManualSend = (e) => {
    e.preventDefault();
    const query = inputValue.toLowerCase().trim();
    if (!query) return;
    setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
    setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      let response = "I'm here to help with MANORAA tools. Try using the suggested buttons for the best experience!";
      if (query.includes("what is manoraa")) response = "MANORAA is a platform for analyzing protein-ligand interactions and predicting binding affinity.";
      else if (query.includes("who is this for")) response = "It's for researchers and students focused on drug design and bioinformatics.";
      else if (query.includes("how to calculate affinity")) response = "Affinity is predicted using our On-the-fly regression models based on interatomic distances.";
      else if (query.includes("distance 2.5")) response = "2.5Å indicates a very strong Hydrogen Bond, which is key for stable binding.";
      else if (query.includes("explain stu")) response = "STU (Staurosporine) is a common kinase inhibitor used here as a reference ligand.";
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans border-l border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-50 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 bg-[#0F172A] rounded-full flex items-center justify-center text-white">
          <Sparkles size={16} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">Muny Assistant</h4>
          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">{currentPage} Mode</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8FAFC]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-snug shadow-sm ${
              msg.role === 'user' 
              ? 'bg-[#0F172A] text-white rounded-tr-none font-medium' 
              : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-2">
               <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Footer Area */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-4">
        <div className="flex flex-wrap gap-2">
          {!isThinking && currentOptions.map((opt, i) => (
            <button key={i} onClick={() => handleFlow(opt)}
              className="px-4 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-600 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-sm bg-white"
            >
              <span className="flex items-center gap-2">
                {opt.icon} {opt.label}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleManualSend} className="relative">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Muny..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1.5 p-2 bg-[#0F172A] text-white rounded-full hover:bg-black transition-colors">
            <Send size={16} />
          </button>
        </form>

        {/* Navigation Shortcuts - Fixed & Added Report */}
        <div className="grid grid-cols-4 gap-1 pt-2 border-t border-slate-50">
           <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <Search size={14} className="text-slate-400" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Search</span>
           </button>
           <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <LayoutDashboard size={14} className="text-slate-400" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Dash</span>
           </button>
           <button onClick={() => navigate('/lab')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <Beaker size={14} className="text-slate-400" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">3D Lab</span>
           </button>
           <button onClick={() => navigate('/report')} className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50 transition-colors">
              <FileText size={14} className="text-slate-400" />
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">Report</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default MunySidebar;