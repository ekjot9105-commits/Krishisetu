import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  Sprout, 
  Globe, 
  ShoppingCart, 
  UserCheck, 
  TrendingUp, 
  PhoneCall, 
  Menu, 
  X,
  Layers,
  ShoppingBag,
  Tractor,
  Stethoscope,
  Building2,
  CloudSun
} from 'lucide-react';

export const Navbar = () => {
  const { lang, changeLanguage, t } = useLanguage();
  const { userRole, setUserRole, activeTab, setActiveTab, cart, mandiList } = useMarket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Sprout },
    { id: 'mandi', label: t('navMandi'), icon: TrendingUp },
    { id: 'pooling', label: t('navPooling'), icon: Layers, badge: '+20%' },
    { id: 'produce', label: t('navProduce'), icon: ShoppingBag },
    { id: 'equipment', label: t('navEquipment'), icon: Tractor },
    { id: 'doctor', label: t('navAiDoctor'), icon: Stethoscope, badge: 'AI' },
    { id: 'schemes', label: t('navSchemes'), icon: Building2 },
    { id: 'weather', label: t('navWeather'), icon: CloudSun }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm w-full max-w-full overflow-hidden">
      {/* Top Ticker Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-3 sm:px-4 overflow-hidden border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium shrink-0 bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px] sm:text-[11px] uppercase tracking-wider">
          <TrendingUp className="w-3 h-3 animate-pulse" />
          <span>{t('liveMandiRates')}</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full ml-3">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8 text-slate-300 font-mono text-xs">
            {mandiList.map((m) => (
              <span key={m.id} className="inline-flex items-center gap-1.5">
                <span className="font-semibold text-white">{m.crop} ({m.district}):</span>
                <span className="text-emerald-400 font-bold">₹{m.mandiPrice}/q</span>
                <span className={m.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {m.change24h >= 0 ? `▲ +${m.change24h}%` : `▼ ${m.change24h}%`}
                </span>
                <span className="text-slate-500">|</span>
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 shrink-0 ml-4 text-slate-300 text-xs">
          <a href="tel:18001801551" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span>Kisan Helpline: 1800-180-1551</span>
          </a>
        </div>
      </div>

      {/* Main Navbar Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-1">
                Krishi<span className="text-emerald-600">Setu</span>
                <span className="text-[9px] sm:text-[10px] bg-amber-100 text-amber-800 border border-amber-300 font-bold px-1.5 py-0.5 rounded-full ml-0.5 uppercase tracking-wider">AI</span>
              </span>
              <span className="block text-[9px] text-slate-500 font-medium -mt-1 hidden md:block">Direct Harvest & Agronomy</span>
            </div>
          </div>

          {/* Desktop Navigation Links (XL Screens) */}
          <nav className="hidden xl:flex items-center space-x-1 shrink min-w-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-200/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-0.5 text-[9px] font-bold bg-amber-500 text-white px-1 py-0.2 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls Container: ALWAYS stays within screen right boundary */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
            
            {/* User Role Switcher */}
            <div className="hidden sm:flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setUserRole('FARMER')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                  userRole === 'FARMER'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{t('farmerMode')}</span>
              </button>
              <button
                onClick={() => setUserRole('BUYER')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                  userRole === 'BUYER'
                    ? 'bg-terracotta-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{t('buyerMode')}</span>
              </button>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center shrink-0">
              <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2 py-1.5 sm:px-2.5 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer transition-colors">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <select
                  value={lang}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="bg-transparent text-slate-800 font-semibold text-xs focus:outline-none cursor-pointer pr-0.5"
                >
                  <option value="en">English (EN)</option>
                  <option value="hi">हिंदी (HI)</option>
                  <option value="pa">ਪੰਜਾਬੀ (PA)</option>
                  <option value="mr">मराठी (MR)</option>
                  <option value="ta">தமிழ் (TA)</option>
                </select>
              </div>
            </div>

            {/* Cart Drawer Trigger Button - Fixed & Non-Overflowing */}
            <button 
              onClick={() => setActiveTab('cart')}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors shrink-0 flex items-center justify-center"
              title={t('cartTitle')}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-terracotta-600 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-slate-100 text-slate-700 shrink-0"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select User Role:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setUserRole('FARMER')}
                className={`px-3 py-1 rounded-lg font-semibold ${userRole === 'FARMER' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600'}`}
              >
                Farmer
              </button>
              <button
                onClick={() => setUserRole('BUYER')}
                className={`px-3 py-1 rounded-lg font-semibold ${userRole === 'BUYER' ? 'bg-terracotta-600 text-white shadow-sm' : 'text-slate-600'}`}
              >
                Buyer
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                    activeTab === item.id 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm' 
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
