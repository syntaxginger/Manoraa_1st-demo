import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Sparkles, Search, LayoutDashboard, Beaker, Send, 
  BookOpen, Zap, BarChart2, MousePointer2, FileText, ArrowRight, Trash2, ExternalLink
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

  // --- 1. CONFIG: Interactive Dialog Flow (LLM/RAG Simulated) ---
  const flowLogic = {
    search: {
      welcome: "Hello! I'm Muny, your AI research assistant. Ready to find molecules? Try searching by PDB ID or analyze similarity.",
      options: [
        { label: "Tanimoto Similarity", action: "tanimoto_sim", icon: <BarChart2 size={12}/> },
        { label: "Search SARS-CoV-2", action: "rag_covid_search", icon: <Search size={12}/> },
        { label: "SMILES Guide", action: "smiles_info", icon: <BookOpen size={12}/> }
      ]
    },
    dashboard: {
      welcome: "Insight Dashboard loaded. I've clustered results by binding affinity. I can explain why certain clusters are more 'drug-like' than others.",
      options: [
        { label: "Analyze Cluster #4 Properties", action: "cluster_info", icon: <BarChart2 size={12}/> },
        { label: "Explain Affinity Score", action: "score_info", icon: <Zap size={12}/> }
      ]
    },
    lab: {
      welcome: "3D Lab active. I can analyze Pi-Pi stacking or H-bonds in real-time. Which interaction should we check first?",
      options: [
        { label: "Check H-Bonding", action: "hbond_info", icon: <Beaker size={12}/> },
        { label: "How to measure?", action: "measure_info", icon: <MousePointer2 size={12}/> }
      ]
    },
    report: {
      welcome: "Detailed Analysis Report. I've detected a high torsion strain in your ligand. Want me to suggest structural improvements?",
      options: [
        { label: "Summarize Findings", action: "report_summary", icon: <FileText size={12}/> },
        { label: "Check Solubility (LogP)", action: "logp_info", icon: <Zap size={12}/> }
      ]
    },
    rag_covid_search: {
      content: "Based on my database, 6LU7 and 7JSU are key structures for SARS-CoV-2 Main Protease. Would you like to switch to the 3D Lab to view them?",
      options: [
        { label: "Go to 3D Lab →", action: "/lab", isNav: true },
        { label: "Back to Search", action: "search" }
      ]
    },
    score_info: {
      content: "The LogKi represents binding affinity. Higher absolute values mean stronger binding. Note: AI predictions may vary from wet-lab results.",
      options: [
        { label: "Show validation (R²)", action: "validation_info" },
        { label: "Back to Dashboard", action: "dashboard" }
      ]
    },
    validation_info: {
      content: "Validated against PDBbind (R² > 0.7). Ready to see the structural basis in the Lab?",
      options: [
        { label: "Open 3D Lab →", action: "/lab", isNav: true },
        { label: "Back", action: "score_info" }
      ]
    },
    cluster_info: {
      content: "Cluster #4 shows ideal LogP (2.1) and zero Lipinski violations, suggesting high oral bioavailability.",
      options: [
        { label: "See Most Active Cluster", action: "active_cluster" },
        { label: "Back to Dashboard", action: "/dashboard" }
      ]
    },
    active_cluster: {
      content: "These fragments are lead-like. I recommend generating a full report for further ADMET analysis.",
      options: [
        { label: "Generate Report →", action: "/report", isNav: true },
        { label: "Back", action: "cluster_info" }
      ]
    },
    report_summary: {
      content: "Strong hydrophobic interaction with Phe153 found. Adding a hydroxyl group at C4 could stabilize it further via Asp120.",
      options: [
        { label: "Test in 3D Lab →", action: "/lab", isNav: true },
        { label: "Back to Report", action: "report" }
      ]
    },
    guide_step_1: {
      content: "Simply type a PDB ID. Our hierarchical data processing ensures high-speed interaction analysis.",
      options: [
        { label: "Data Sources", action: "source_info" },
        { label: "Back", action: "search" }
      ]
    },
    source_info: {
      content: "We use RAG to fetch real-time data from PDB & ChEMBL. Nothing is static; it's all 'On-the-fly'.",
      options: [
        { label: "Back", action: "search" }
      ]
    },
    measure_info: {
      content: "Use the Ruler. Distances < 3.5Å often indicate significant non-covalent interactions.",
      options: [
        { label: "Back", action: "lab" }
      ]
    },
    hbond_info: {
      content: "Hydrogen Bonds (H-Bonds) are crucial for ligand stability. I've identified potential donors and acceptors within 3.2Å of the binding site.",
      options: [
        { label: "Show donor list", action: "donor_list" },
        { label: "Back to Lab", action: "lab" }
      ]
    },
    donor_list: {
      content: "Key donors include Ser190 and the backbone nitrogen of Gly200. These often form the 'hinge region' interactions.",
      options: [
        { label: "Back", action: "hbond_info" }
      ]
    },
    // --- Additional Research Questions ---
    admet_info: {
      content: "ADMET (Absorption, Distribution, Metabolism, Excretion, and Toxicity) is calculated via our integrated pipeline. Your current lead shows high intestinal absorption but moderate toxicity risk in the Liver.",
      options: [
        { label: "Check Hepatotoxicity", action: "tox_detail" },
        { label: "Back to Report", action: "report" }
      ]
    },
    tox_detail: {
      content: "The toxicity risk is linked to the Nitro group at position R3. Replacing it with a Cyano group might reduce risk while maintaining affinity.",
      options: [
        { label: "Back", action: "admet_info" }
      ]
    },
    pi_stacking: {
      content: "I've detected a Pi-Pi stacking interaction between the aromatic ring of the ligand and Trp214 (distance: 3.9Å). This contributes ~1.2 kcal/mol to binding stability.",
      options: [
        { label: "View in 3D Lab →", action: "/lab", isNav: true },
        { label: "Back to Lab", action: "lab" }
      ]
    },
    lipinski_rule: {
      content: "Lipinski's Rule of 5 check: MW < 500 (Pass), LogP < 5 (Pass), H-bond Donors < 5 (Pass), H-bond Acceptors < 10 (Pass). This molecule is highly drug-like.",
      options: [
        { label: "Back to Dashboard", action: "/dashboard" }
      ]
    },
    tanimoto_sim: {
      content: "The Tanimoto coefficient between your query and the top hit is 0.85, indicating high structural similarity. This suggests a shared binding mode.",
      options: [
        { label: "Back to Search", action: "search" }
      ]
    },
    binding_pocket: {
      content: "The binding pocket is predominantly hydrophobic with a volume of 450Å³. There is additional space near the catalytic dyad for fragment growing.",
      options: [
        { label: "Show Pocket Residues", action: "pocket_residues" }
      ]
    },
    pocket_residues: {
      content: "Key residues forming the pocket: His41, Cys145, Glu166, and Gln189. These are highly conserved across variants.",
      options: [
        { label: "Back", action: "binding_pocket" }
      ]
    },
    logp_info: {
      content: "The calculated LogP for this molecule is 2.4. This indicates moderate lipophilicity, which is generally ideal for oral bioavailability.",
      options: [
        { label: "Is this within Lipinski range?", action: "lipinski_rule" },
        { label: "Check Absorption (ADMET)", action: "admet_info" },
        { label: "Back to Report", action: "/report" }
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
      if (option.isNav || option.action.startsWith('/')) {
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: `I've prepared the requested tools for you. Click the button below whenever you're ready to switch pages.`,
          isLink: true,
          linkPath: option.action 
        }]);
        setCurrentOptions([]);
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
      let response = "I'm analyzing your request using our database. For precise molecular tasks, try the quick-actions below!";
      if (query.includes("what is manoraa")) response = "MANORAA is a platform for analyzing protein-ligand interactions and predicting binding affinity using structural bioinformatics.";
      else if (query.includes("covid") || query.includes("sars")) response = "I found multiple SARS-CoV-2 structures. 6LU7 is a popular choice for protease inhibitors. Want to view it in 3D?";
      else if (query.includes("logp")) response = "LogP measures lipophilicity. A value between 1-5 is usually preferred for oral drugs.";
      else if (query.includes("lipinski")) response = "Lipinski's Rule of Five helps evaluate drug-likeness. It checks Molecular Weight, LogP, and H-bond donors/acceptors.";
      else if (query.includes("tanimoto")) response = "The Tanimoto coefficient measures structural similarity between two molecules, ranging from 0 to 1 (identical).";
      else if (query.includes("admet")) response = "ADMET analysis predicts how a drug is absorbed, distributed, metabolized, and excreted, along with its toxicity profile.";
      else if (query.includes("pdb")) response = "PDB (Protein Data Bank) IDs are 4-character codes (e.g., 1STP) representing unique 3D biological macromolecular structures.";
      else if (query.includes("smiles")) response = "SMILES is a chemical notation system that represents a molecular structure as a single line of text (e.g., CC(=O)OC1=CC=CC=C1C(=O)O for Aspirin).";
      else if (query.includes("pi stacking")) response = "I've detected a Pi-Pi stacking interaction between the aromatic ring of the ligand and Trp214 (distance: 3.9Å). This contributes ~1.2 kcal/mol to binding stability.";
      else if (query.includes("binding pocket")) response = "The binding pocket is predominantly hydrophobic with a volume of 450Å³. There is additional space near the catalytic dyad for fragment growing.";

      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  const clearChat = () => {
    const node = flowLogic[currentPage] || flowLogic.search;
    setMessages([{ role: 'ai', content: node.welcome || node.content }]);
    setCurrentOptions(node.options);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans border-l border-slate-200 shadow-sm overflow-hidden text-slate-600">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-white">
                <Sparkles size={16} />
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-800">Muny Assistant</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{currentPage} Mode</p>
            </div>
        </div>
        <button onClick={clearChat} className="p-2 text-slate-300 hover:text-red-400 transition-colors" title="Clear Chat">
            <Trash2 size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
              msg.role === 'user' 
              ? 'bg-slate-800 text-white rounded-tr-none font-medium' 
              : 'bg-white text-slate-600 border border-slate-200 rounded-tl-none'
            }`}>
              {msg.content}
              
              {msg.isLink && (
                <button 
                  onClick={() => navigate(msg.linkPath)}
                  className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-700 rounded-lg font-bold border border-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all shadow-sm"
                >
                  Confirm Navigation <ExternalLink size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
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
              className="px-4 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-500 hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all shadow-sm bg-white"
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
            placeholder="Ask Muny about molecules..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1.5 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors">
            <Send size={16} />
          </button>
        </form>

        <div className="text-center px-2 pb-2">
            <p className="text-[9px] text-slate-400 leading-tight">
                Muny is an AI and can make mistakes. <br/> Please verify important biochemical data.
            </p>
        </div>
      </div>
    </div>
  );
};

export default MunySidebar;