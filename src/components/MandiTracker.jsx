import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  ArrowUpRight, 
  Info, 
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const MandiTracker = () => {
  const { t } = useLanguage();
  const { mandiList, setActiveTab } = useMarket();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCropInfo, setSelectedCropInfo] = useState(null);

  const filteredMandi = mandiList.filter((item) => {
    const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === 'ALL' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  const getSignalBadge = (signal) => {
    switch (signal) {
      case 'HOLD':
        return {
          label: 'HOLD HARVEST ⏳',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          desc: 'Price expected to increase significantly within 3-5 days.'
        };
      case 'SELL':
      case 'SELL_DIRECT':
        return {
          label: 'SELL DIRECT NOW 🚀',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          desc: 'Direct buyers offering top premium price above mandi benchmark.'
        };
      case 'POOL_RECOMMENDED':
        return {
          label: 'JOIN KISAN POOL 🌾',
          bg: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          desc: 'Pool with nearby farmers to unlock bulk volume bonus.'
        };
      default:
        return {
          label: 'STABLE',
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          desc: 'Market rates steady.'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Real-Time Price Engine</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('mandiTitle')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Compare local APMC mandi rates with verified direct buyer prices & 7-day AI forecast predictions.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('searchCrop')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-60 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold shadow-sm">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-slate-800 font-semibold"
            >
              <option value="ALL">All States</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Rates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">{t('crop')}</th>
                <th className="py-4 px-4">{t('mandiRate')}</th>
                <th className="py-4 px-4">{t('buyerRate')}</th>
                <th className="py-4 px-4">{t('change24h')}</th>
                <th className="py-4 px-6">7-Day Trend</th>
                <th className="py-4 px-6">{t('aiAdviceHeader')}</th>
                <th className="py-4 px-6 text-right">{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
              {filteredMandi.map((item) => {
                const signalObj = getSignalBadge(item.aiSignal);
                const isPositive = item.change24h >= 0;
                
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Crop Name & Location */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{item.crop}</div>
                      <div className="text-slate-500 text-xs flex items-center gap-1 font-normal">
                        <span>{item.district}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-700 font-semibold">{item.state}</span>
                      </div>
                    </td>

                    {/* APMC Mandi Price */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-700 text-sm">
                        ₹{item.mandiPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">APMC Benchmark</div>
                    </td>

                    {/* Direct Buyer Offer */}
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-emerald-600 text-base">
                        ₹{item.buyerPrice.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded w-fit">
                        +₹{item.buyerPrice - item.mandiPrice}/q Premium
                      </div>
                    </td>

                    {/* 24h Change */}
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>{isPositive ? `+${item.change24h}%` : `${item.change24h}%`}</span>
                      </div>
                    </td>

                    {/* 7-Day Trend Visual Sparkline SVG */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <svg className="w-24 h-8 overflow-visible" viewBox="0 0 100 30">
                          <path
                            d={`M 0 ${30 - (item.trend7d[0] - Math.min(...item.trend7d)) / (Math.max(...item.trend7d) - Math.min(...item.trend7d) || 1) * 20} ` +
                              item.trend7d.map((val, idx) => {
                                const x = (idx / (item.trend7d.length - 1)) * 100;
                                const y = 30 - ((val - Math.min(...item.trend7d)) / (Math.max(...item.trend7d) - Math.min(...item.trend7d) || 1)) * 24 - 3;
                                return `L ${x} ${y}`;
                              }).join(' ')}
                            fill="none"
                            stroke={isPositive ? '#10b981' : '#f43f5e'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    </td>

                    {/* AI Signal Badge & Reasoning Trigger */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => setSelectedCropInfo(item)}
                          className={`px-3 py-1 rounded-lg border text-xs font-bold w-fit flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 ${signalObj.bg}`}
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>{signalObj.label}</span>
                          <Info className="w-3 h-3 opacity-60 ml-0.5" />
                        </button>
                        <span className="text-[11px] text-slate-500 font-normal line-clamp-1">
                          Confidence: {item.aiConfidence}
                        </span>
                      </div>
                    </td>

                    {/* Sell Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setActiveTab('produce')}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm shadow-emerald-600/20"
                      >
                        <span>{t('sellNow')}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for AI Detailed Reasoning */}
      {selectedCropInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900">{selectedCropInfo.crop}</h3>
                  <p className="text-xs text-slate-500">{selectedCropInfo.district}, {selectedCropInfo.state}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCropInfo(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 block text-xs">Current Mandi Benchmark</span>
                  <span className="font-bold text-slate-900 text-base">₹{selectedCropInfo.mandiPrice}/q</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block text-xs">Direct Buyer Offer</span>
                  <span className="font-extrabold text-emerald-600 text-base">₹{selectedCropInfo.buyerPrice}/q</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>AI Market Analysis & Forecast Reasoning</span>
                </h4>
                <p className="text-slate-700 leading-relaxed bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl font-normal text-xs sm:text-sm">
                  "{selectedCropInfo.aiReasoning}"
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Model Confidence: <strong>{selectedCropInfo.aiConfidence}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-400" />
                  Updated 10 mins ago
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCropInfo(null);
                  setActiveTab('produce');
                }}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs text-center transition-colors shadow-md"
              >
                List Crop at Direct Price (₹{selectedCropInfo.buyerPrice})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
