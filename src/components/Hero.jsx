import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  TrendingUp, 
  Layers, 
  ShoppingBag, 
  Tractor, 
  Stethoscope, 
  ShieldCheck, 
  Users, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();
  const { setActiveTab } = useMarket();

  const quickActions = [
    {
      id: 'produce',
      title: t('actionSell'),
      sub: 'Direct sale to consumer / wholesaler with 0% middleman fees',
      icon: ShoppingBag,
      color: 'from-emerald-500 to-emerald-700',
      badge: 'B2C & B2B'
    },
    {
      id: 'pooling',
      title: t('actionPool'),
      sub: 'Group crop pooling for bulk wholesale price surge (+15-25%)',
      icon: Layers,
      color: 'from-amber-500 to-amber-700',
      badge: 'High Profit'
    },
    {
      id: 'equipment',
      title: t('actionEquipment'),
      sub: 'Rent tractor, drone sprayer, or buy cheapest implements nearby',
      icon: Tractor,
      color: 'from-blue-600 to-indigo-700',
      badge: 'Buy & Rent'
    },
    {
      id: 'doctor',
      title: t('actionDoctor'),
      sub: 'AI leaf disease diagnosis & bio-remedies recommendation',
      icon: Stethoscope,
      color: 'from-teal-500 to-cyan-700',
      badge: 'AI Smart'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-emerald-950 text-white py-12 md:py-20">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Banner Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Next-Gen Agricultural Intelligence & Multilingual Marketplace</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-100">
            {t('heroTitle').split('AI')[0]}
            <span className="text-gradient"> Smart AI</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            {t('heroSub')}
          </p>

          {/* Key Stat Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Users className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white text-sm">45,000+</strong> Farmers Connected</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span><strong className="text-white text-sm">+28.4%</strong> Avg Profit Increase</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span><strong className="text-white text-sm">100%</strong> Verified Buyers</span>
            </div>
          </div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                onClick={() => setActiveTab(act.id)}
                className="group relative bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 p-6 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${act.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-700 group-hover:bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-slate-600 group-hover:border-emerald-500/40">
                      {act.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed font-normal">
                    {act.sub}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Mandi Predictor Teaser Card */}
        <div className="mt-8 bg-gradient-to-r from-emerald-900/60 via-slate-800/80 to-amber-900/60 p-4 sm:p-6 rounded-2xl border border-emerald-500/30 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded uppercase border border-amber-400/30">
                  AI Real-Time Insight
                </span>
                <span className="text-xs text-slate-300">Ludhiana & Karnal APMC</span>
              </div>
              <p className="text-sm font-semibold text-white mt-1">
                "Sharbati Wheat & Basmati Paddy demand expected to surge +14% over next 4 days. Recommendation: <strong className="text-amber-300">HOLD SALE</strong> for maximum profit."
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('mandi')}
            className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>View Full APMC Mandi Rates</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
