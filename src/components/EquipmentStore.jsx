import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  Tractor, 
  MapPin, 
  Phone, 
  Star, 
  ShoppingCart, 
  Calendar, 
  ShieldCheck,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const EquipmentStore = () => {
  const { t } = useLanguage();
  const { equipment, addToCart } = useMarket();
  
  const [activeTypeTab, setActiveTypeTab] = useState('ALL'); // 'ALL', 'BUY', 'RENT'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [radiusKm, setRadiusKm] = useState(30);

  const filteredEquipment = equipment.filter((item) => {
    const matchesType = activeTypeTab === 'ALL' || item.type === activeTypeTab;
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesRadius = item.distanceKm <= radiusKm;
    return matchesType && matchesCat && matchesRadius;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full w-fit mb-2">
            <Tractor className="w-3.5 h-3.5" />
            <span>Local Machinery & Farm Implements Marketplace</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('equipTitle')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            {t('equipSub')}
          </p>
        </div>

        {/* Buy vs Rent Main Tabs */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold w-fit">
          <button
            onClick={() => setActiveTypeTab('ALL')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTypeTab === 'ALL' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('tabAll')}
          </button>
          <button
            onClick={() => setActiveTypeTab('RENT')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTypeTab === 'RENT' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('tabRent')} (Rent per Day)
          </button>
          <button
            onClick={() => setActiveTypeTab('BUY')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTypeTab === 'BUY' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t('tabBuy')} (Purchase)
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        
        {/* Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'Tractors', 'Drones', 'Implements', 'Solar & Irrigation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Machinery' : cat}
            </button>
          ))}
        </div>

        {/* Distance Radius Filter Slider */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-700">{t('filterDistance')}</span>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            className="w-24 accent-blue-600 cursor-pointer"
          />
          <strong className="text-blue-700 font-bold min-w-[50px]">{radiusKm} km</strong>
        </div>

      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEquipment.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image & Type Badge */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                <span className={`absolute top-3 left-3 font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 ${
                  item.type === 'RENT' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {item.type === 'RENT' ? 'FOR RENT' : 'FOR PURCHASE'}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-slate-900/80 px-2 py-0.5 rounded text-slate-200">
                    {item.condition}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-slate-900/80 px-2 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{item.rating}</span>
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 space-y-3">
                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.location} ({item.distanceKm} km)</span>
                  </span>
                </div>

                {item.driverIncluded && (
                  <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Driver & Operator Included in Price</span>
                  </div>
                )}

                {/* Price Display */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Cheapest Local Price</span>
                    <span className="font-extrabold text-blue-700 text-base">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-slate-500 text-[11px]"> / {item.priceUnit}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0 space-y-2">
              <button
                onClick={() => addToCart({ ...item, title: item.name })}
                className={`w-full text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm ${
                  item.type === 'RENT' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{item.type === 'RENT' ? t('rentNow') : t('buyNow')}</span>
              </button>

              <a
                href={`tel:${item.ownerPhone}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>Call Supplier ({item.ownerName})</span>
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
