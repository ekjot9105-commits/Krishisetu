import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { MarketProvider, useMarket } from './context/MarketContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MandiTracker } from './components/MandiTracker';
import { CollectivePooling } from './components/CollectivePooling';
import { DirectMarketplace } from './components/DirectMarketplace';
import { EquipmentStore } from './components/EquipmentStore';
import { AiCropDoctor } from './components/AiCropDoctor';
import { GovSchemes } from './components/GovSchemes';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { CartModal } from './components/CartModal';
import { AiVoiceAssistant } from './components/AiVoiceAssistant';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const MainContent = () => {
  const { activeTab, toast } = useMarket();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      
      {/* Toast Notification Popup */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>{toast.msg}</span>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Screen Body View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <MandiTracker />
            <CollectivePooling />
            <DirectMarketplace />
            <EquipmentStore />
          </>
        )}

        {activeTab === 'mandi' && <MandiTracker />}
        {activeTab === 'pooling' && <CollectivePooling />}
        {activeTab === 'produce' && <DirectMarketplace />}
        {activeTab === 'equipment' && <EquipmentStore />}
        {activeTab === 'doctor' && <AiCropDoctor />}
        {activeTab === 'schemes' && <GovSchemes />}
        {activeTab === 'weather' && <WeatherAdvisory />}
        {activeTab === 'cart' && <CartModal />}
      </main>

      {/* Floating Multilingual Voice Assistant */}
      <AiVoiceAssistant />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <MarketProvider>
        <MainContent />
      </MarketProvider>
    </LanguageProvider>
  );
}
