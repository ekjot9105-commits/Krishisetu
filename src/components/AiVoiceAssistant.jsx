import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, 
  Mic, 
  Send, 
  X, 
  Sparkles, 
  Volume2, 
  MessageSquare,
  CheckCircle
} from 'lucide-react';

export const AiVoiceAssistant = () => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am your Multilingual Krishi AI Voice Assistant. How can I assist your farm today? (Ask about Mandi rates, pooling, weather or crop disease)'
    }
  ]);

  const sampleQueries = [
    { label: '🌾 Wheat Mandi Rate today?', query: 'What is today\'s wheat price in Punjab?' },
    { label: '🍅 Tomato Blight spray?', query: 'Best bio treatment for tomato early blight?' },
    { label: '📜 How to join Kisan Pool?', query: 'How does collective crop pooling work?' },
    { label: '💰 PM-KISAN eligibility?', query: 'How much subsidy do I get for 3 acres?' }
  ];

  const handleSend = (textToSend) => {
    const userMsg = textToSend || query;
    if (!userMsg.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setQuery('');

    // Simulate AI response
    setTimeout(() => {
      let aiReply = 'I found the information for you: ';
      if (userMsg.toLowerCase().includes('wheat') || userMsg.toLowerCase().includes('गेहूं')) {
        aiReply = '🌾 Sharbati Wheat is currently trading at ₹2,450/q in Ludhiana APMC, but direct buyers are paying ₹2,780/q. AI predicts a +14% surge over the next 4 days. Recommendation: HOLD harvest or JOIN Sangrur Pool!';
      } else if (userMsg.toLowerCase().includes('blight') || userMsg.toLowerCase().includes('tomato')) {
        aiReply = '🍅 For Tomato Early Blight, apply Neem Oil extract (5ml/L) or Copper Oxychloride spray immediately. You can order the Bio-Neem spray directly from our AI Doctor tab for ₹340.';
      } else if (userMsg.toLowerCase().includes('pool') || userMsg.toLowerCase().includes('पूल')) {
        aiReply = '🤝 Collective crop pooling allows small farmers to combine 100kg + 200kg batches. Bulk contracts unlock +18% to +25% higher prices from wholesale buyers like BigBasket & Adani Wilmar.';
      } else {
        aiReply = '🌱 According to live KrishiSetu data, local weather is 31°C with 65% rain probability tomorrow. Postpone chemical sprays until Friday morning for best results.';
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiReply }]);
    }, 800);
  };

  const toggleMic = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      handleSend('What is the best crop price forecast for Punjab today?');
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/40"
          title="Open Multilingual AI Voice Assistant"
        >
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-slate-950 font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
            AI
          </span>
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Multilingual Voice Assistant
          </span>
        </button>
      )}

      {/* Chat Window Box */}
      {isOpen && (
        <div className="bg-white rounded-3xl w-[calc(100vw-2rem)] sm:w-96 max-w-md shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-300">

          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Krishi Voice Assistant</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h4>
                <span className="text-[10px] text-emerald-300 font-medium">8 Languages Supported</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] p-3 rounded-2xl leading-relaxed shadow-sm font-medium ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isListening && (
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl flex items-center gap-2 font-bold animate-pulse text-xs">
                <Mic className="w-4 h-4 text-amber-600 animate-bounce" />
                <span>Listening in native language... Speak now!</span>
              </div>
            )}
          </div>

          {/* Sample Query Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
            {sampleQueries.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq.query)}
                className="bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap font-medium transition-colors"
              >
                {sq.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              onClick={toggleMic}
              className={`p-2.5 rounded-xl text-white transition-all ${
                isListening ? 'bg-rose-600 animate-pulse' : 'bg-slate-800 hover:bg-slate-700'
              }`}
              title="Voice Input"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Ask anything in your native language..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
            />

            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
