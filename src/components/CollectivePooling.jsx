import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  Layers, 
  Users, 
  TrendingUp, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Building, 
  Sparkles, 
  Calculator,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const CollectivePooling = () => {
  const { t } = useLanguage();
  const { pools, joinPoolWithCrop, createNewPoolGroup } = useMarket();
  
  const [selectedPool, setSelectedPool] = useState(null);
  const [userCropQty, setUserCropQty] = useState(50); // Quintals
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form state for creating new pool
  const [newPoolTitle, setNewPoolTitle] = useState('');
  const [newPoolCrop, setNewPoolCrop] = useState('Sharbati Wheat');
  const [newPoolDistrict, setNewPoolDistrict] = useState('Ludhiana');
  const [newPoolTarget, setNewPoolTarget] = useState(500);
  const [newPoolRate, setNewPoolRate] = useState(2450);
  const [newPoolInitialQty, setNewPoolInitialQty] = useState(100);

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!selectedPool) return;
    joinPoolWithCrop(selectedPool.id, userCropQty);
    setSelectedPool(null);
    setUserCropQty(50);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newPoolTitle) return;
    createNewPoolGroup({
      title: newPoolTitle,
      crop: newPoolCrop,
      district: newPoolDistrict,
      targetVolume: Number(newPoolTarget),
      benchmarkMandiRate: Number(newPoolRate),
      pooledRateOffer: Math.round(Number(newPoolRate) * 1.2), // +20%
      bonusRatePercent: 20,
      initialQuantity: Number(newPoolInitialQty),
      daysLeft: 7
    });
    setShowCreateModal(false);
    setNewPoolTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-700/50 mb-10 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Layers className="w-80 h-80 text-white" />
        </div>
        
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kisan Bulk Sanchay Engine</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl leading-tight">
            {t('poolingTitle')}
          </h2>

          <p className="text-slate-200 text-xs sm:text-base mt-3 leading-relaxed font-normal">
            {t('poolingSub')}
          </p>

          {/* Quick Explainer Bar */}
          <div className="mt-6 pt-6 border-t border-emerald-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">1</div>
              <span>Combine 100kg + 200kg with nearby farmers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">2</div>
              <span>Unlock +18% to +25% Wholesale Price Surge</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">3</div>
              <span>Guaranteed Direct Transport & Payment</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t('createPool')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Collective Pools Grid */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-heading font-extrabold text-xl text-slate-900">Active Regional Farmer Pools</h3>
          <p className="text-slate-500 text-xs">Join an active pool in your district to start earning bulk prices immediately.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Start New Pool</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pools.map((pool) => {
          const progress = Math.min(100, Math.round((pool.currentPooled / pool.targetVolume) * 100));
          const singleEarnings = 50 * pool.benchmarkMandiRate;
          const pooledEarnings = 50 * pool.pooledRateOffer;
          const extraProfit = pooledEarnings - singleEarnings;

          return (
            <div
              key={pool.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Banner & Badge */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pool.image}
                    alt={pool.crop}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+{pool.bonusRatePercent}% Price Bonus</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{pool.district}, {pool.state}</div>
                    <h4 className="font-heading font-bold text-base line-clamp-1">{pool.title}</h4>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-4">
                  
                  {/* Rate Comparison Box */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[11px]">Single Mandi Rate</span>
                      <span className="font-semibold text-slate-700 text-sm">₹{pool.benchmarkMandiRate}/q</span>
                    </div>
                    <div className="border-l border-slate-200 pl-3">
                      <span className="text-slate-500 block text-[11px]">Bulk Pooled Rate</span>
                      <span className="font-extrabold text-emerald-600 text-base">₹{pool.pooledRateOffer}/q</span>
                    </div>
                  </div>

                  {/* Progress Bar towards Target Volume */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-slate-600">Volume Goal Progress:</span>
                      <span className="text-emerald-700 font-bold">{pool.currentPooled} / {pool.targetVolume} Quintals ({progress}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-amber-500 h-full rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Pool Metadata Badges */}
                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 font-semibold">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{pool.participatingFarmersCount} Farmers Joined</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pool.daysLeft} Days Left</span>
                    </span>
                  </div>

                  {/* Wholesale Buyer Info */}
                  <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl flex items-center gap-2 text-xs text-slate-800">
                    <Building className="w-4 h-4 text-amber-700 shrink-0" />
                    <div className="line-clamp-1">
                      <strong className="text-slate-900">{pool.buyerName}:</strong> {pool.buyerStatus}
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedPool(pool)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Join Pool & Calculate Profit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal 1: Join Pool Calculator & Confirmation */}
      {selectedPool && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase">Kisan Collective Pool</span>
                <h3 className="font-heading font-bold text-lg text-slate-900">{selectedPool.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedPool(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-4">
              
              {/* Quantity Input Slider */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Enter Your Crop Quantity to Pool (Quintals):</span>
                  <span className="text-emerald-600 font-extrabold text-sm">{userCropQty} Qtl ({userCropQty * 100} kg)</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={userCropQty}
                  onChange={(e) => setUserCropQty(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Profit Gain Calculation Preview Box */}
              <div className="bg-emerald-950 text-white p-4 rounded-xl space-y-2 text-xs sm:text-sm shadow-inner">
                <div className="flex justify-between text-slate-300">
                  <span>Selling individually at APMC rate (₹{selectedPool.benchmarkMandiRate}/q):</span>
                  <span>₹{(userCropQty * selectedPool.benchmarkMandiRate).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Selling pooled at Bulk rate (₹{selectedPool.pooledRateOffer}/q):</span>
                  <span>₹{(userCropQty * selectedPool.pooledRateOffer).toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-emerald-800/80 flex justify-between items-center text-sm">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Your Extra Profit Bonus:</span>
                  </span>
                  <span className="font-extrabold text-amber-300 text-base">
                    +₹{(userCropQty * (selectedPool.pooledRateOffer - selectedPool.benchmarkMandiRate)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Verified Logistics & Guarantee */}
              <div className="flex items-center gap-2 text-slate-600 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Free doorstep transport pickup provided once pool reaches 100% volume target.</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPool(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs text-center shadow-md transition-colors"
                >
                  Confirm & Join Pool with {userCropQty} Qtl
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Create New Farmer Pool */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">Start New Kisan Collective Pool</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pool Name / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ludhiana Wheat Farmers Bulk Pool"
                  value={newPoolTitle}
                  onChange={(e) => setNewPoolTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Crop Name</label>
                  <input
                    type="text"
                    required
                    value={newPoolCrop}
                    onChange={(e) => setNewPoolCrop(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District / Region</label>
                  <input
                    type="text"
                    required
                    value={newPoolDistrict}
                    onChange={(e) => setNewPoolDistrict(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Goal (Quintals)</label>
                  <input
                    type="number"
                    required
                    value={newPoolTarget}
                    onChange={(e) => setNewPoolTarget(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Single Mandi Rate (₹/q)</label>
                  <input
                    type="number"
                    required
                    value={newPoolRate}
                    onChange={(e) => setNewPoolRate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Initial Crop Quantity (Quintals)</label>
                <input
                  type="number"
                  required
                  value={newPoolInitialQty}
                  onChange={(e) => setNewPoolInitialQty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2.5 rounded-xl text-center shadow-md transition-colors"
                >
                  Publish Pool & Invite Farmers
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
