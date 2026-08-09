import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  ShoppingBag, 
  MapPin, 
  CheckCircle, 
  Plus, 
  MessageSquare, 
  ShoppingCart, 
  Sparkles,
  Search,
  Filter,
  ShieldCheck
} from 'lucide-react';

export const DirectMarketplace = () => {
  const { t } = useLanguage();
  const { crops, addToCart, addProduceListing } = useMarket();
  
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showListModal, setShowListModal] = useState(false);

  // Listing Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Grains');
  const [quantity, setQuantity] = useState(100);
  const [unit, setUnit] = useState('Quintal');
  const [askingPrice, setAskingPrice] = useState(2600);
  const [location, setLocation] = useState('Ludhiana, Punjab');
  const [grade, setGrade] = useState('Grade A Organic');
  const [organic, setOrganic] = useState(true);
  const [desc, setDesc] = useState('');

  const filteredCrops = crops.filter((item) => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleListSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addProduceListing({
      title,
      category,
      quantityAvailable: Number(quantity),
      unit,
      pricePerUnit: Number(askingPrice),
      mandiBenchmark: Math.round(Number(askingPrice) * 0.88),
      location,
      grade,
      organicCertified: organic,
      harvestDate: new Date().toISOString().split('T')[0],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      description: desc || 'Freshly harvested produce listed directly by verified farmer.'
    });
    setShowListModal(false);
    setTitle('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full w-fit mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Direct Farm-to-Consumer / Wholesaler Market</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('navProduce')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Buy produce directly from verified farmers with guaranteed harvest freshness & zero middleman commission.
          </p>
        </div>

        {/* List Produce Action */}
        <button
          onClick={() => setShowListModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>List My Produce for Sale</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 text-xs font-semibold">
          {['ALL', 'Grains', 'Vegetables', 'Commercial'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Produce' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search produce, farmer or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-emerald-500 w-full sm:w-64 shadow-sm"
          />
        </div>
      </div>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCrops.map((crop) => (
          <div
            key={crop.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {crop.organicCertified && (
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Organic Certified</span>
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold bg-slate-900/80 px-2 py-0.5 rounded text-slate-200">
                    {crop.grade}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 space-y-3">
                <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {crop.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium text-slate-700">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{crop.location} ({crop.distanceKm} km away)</span>
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center justify-between">
                  <span>Available Batch:</span>
                  <strong className="text-slate-900">{crop.quantityAvailable} {crop.unit}s</strong>
                </div>

                {/* Price Box */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Direct Price</span>
                    <span className="font-extrabold text-emerald-700 text-base">
                      ₹{crop.pricePerUnit.toLocaleString('en-IN')}/{crop.unit === 'Quintal' ? 'q' : 'kg'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Local Mandi Avg</span>
                    <span className="font-semibold text-slate-500 line-through text-xs">
                      ₹{crop.mandiBenchmark}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 line-clamp-2">
                  {crop.description}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4 pt-0 space-y-2">
              <button
                onClick={() => addToCart(crop)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Buy Direct Harvest</span>
              </button>

              <a
                href={`tel:${crop.farmerPhone}`}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
              >
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Contact Farmer ({crop.farmerName})</span>
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Modal: List My Crop */}
      {showListModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900">List Your Produce for Sale</h3>
              </div>
              <button 
                onClick={() => setShowListModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleListSubmit} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Harvest Title / Variety</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fresh Organic Sharbati Wheat"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white"
                  >
                    <option value="Grains">Grains</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location / Village</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quantity</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    />
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="px-2 py-2 border border-slate-300 rounded-xl bg-white text-xs"
                    >
                      <option value="Quintal">Quintal</option>
                      <option value="Kg">Kg</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Asking Price (₹/{unit})</label>
                  <input
                    type="number"
                    required
                    value={askingPrice}
                    onChange={(e) => setAskingPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* AI Suggested Price Pill */}
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-center justify-between text-xs text-amber-900">
                <span className="flex items-center gap-1 font-semibold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>AI Suggested Price for {category}:</span>
                </span>
                <strong className="text-amber-800 text-sm">₹{Math.round(askingPrice * 1.05)} / {unit}</strong>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="organicChk"
                  checked={organic}
                  onChange={(e) => setOrganic(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="organicChk" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Produce is Organic Certified / Chemical Free
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Harvest Notes / Details</label>
                <textarea
                  rows={2}
                  placeholder="Describe crop moisture, harvesting method, storage..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowListModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-center shadow-md transition-colors"
                >
                  Publish Produce Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
