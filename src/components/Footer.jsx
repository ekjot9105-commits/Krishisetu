import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  Sprout, 
  PhoneCall, 
  ShieldCheck, 
  Globe, 
  Heart,
  TrendingUp
} from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();
  const { setActiveTab } = useMarket();

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Krishi<span className="text-emerald-500">Setu</span> AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering small & marginal farmers with direct-to-consumer sales, collective crop pooling, real-time APMC mandi rate AI predictors, and precision agronomy.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] mb-3">Platform Features</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('mandi')} className="hover:text-emerald-400 transition-colors">
                  Live Mandi Rates & AI Predictor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pooling')} className="hover:text-amber-400 transition-colors">
                  Collective Crop Pooling (+20% Profit)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('produce')} className="hover:text-emerald-400 transition-colors">
                  Direct Harvest Produce Market
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('equipment')} className="hover:text-emerald-400 transition-colors">
                  Cheapest Local Agri Equipment
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Information & AI */}
          <div>
            <h4 className="font-bold text-white uppercase text-[11px] mb-3">Agri Knowledge Hub</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('doctor')} className="hover:text-teal-400 transition-colors">
                  AI Crop Doctor Leaf Scanner
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('schemes')} className="hover:text-amber-400 transition-colors">
                  Govt Schemes & Subsidy Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('weather')} className="hover:text-sky-400 transition-colors">
                  7-Day Weather & Agronomy Radar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Helpline & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px]">Kisan Support & Helpline</h4>
            <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 block font-semibold">Toll-Free Government Helpline:</span>
              <a href="tel:18001801551" className="text-emerald-400 font-extrabold text-sm flex items-center gap-1">
                <PhoneCall className="w-4 h-4" />
                <span>1800-180-1551</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Agmarknet & APMC Verified Portal</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            © 2026 KrishiSetu AI Technologies. Made with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500 mx-0.5" /> for Indian Farmers.
          </div>
          <div className="flex items-center gap-4">
            <span>Multilingual Platform (8 Languages)</span>
            <span>•</span>
            <span>Direct B2C & B2B Trade</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
