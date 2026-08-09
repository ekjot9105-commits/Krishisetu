import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  Stethoscope, 
  UploadCloud, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  ShoppingBag, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const AiCropDoctor = () => {
  const { t } = useLanguage();
  const { addToCart } = useMarket();

  const [isScanning, setIsScanning] = useState(false);
  const [selectedScan, setSelectedScan] = useState(null);

  const sampleLeafData = [
    {
      id: 'l1',
      title: 'Tomato Early Blight',
      crop: 'Tomato',
      diseaseName: 'Early Blight (Alternaria solani)',
      confidence: '96%',
      severityScore: 45, // %
      severityLabel: 'Moderate',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
      causes: 'Fungal spores spread by wind and high moisture (70%+ relative humidity).',
      treatment: 'Apply Neem Oil extract (5ml/L water) or Copper Oxychloride spray every 7 days.',
      sprayProduct: {
        id: 'sp1',
        title: 'Bio-Neem Crop Care Concentrate (500ml)',
        price: 340,
        supplier: 'KrishiBio Organics'
      }
    },
    {
      id: 'l2',
      title: 'Paddy Leaf Blast',
      crop: 'Rice / Paddy',
      diseaseName: 'Blast Disease (Magnaporthe oryzae)',
      confidence: '92%',
      severityScore: 75,
      severityLabel: 'High Risk',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      causes: 'Excessive nitrogen fertilizer application during foggy morning weather.',
      treatment: 'Spray Pseudomonas fluorescens @ 10g/L water during early morning hours.',
      sprayProduct: {
        id: 'sp2',
        title: 'Tricho-Guard Bio-Fungicide Powder (1kg)',
        price: 420,
        supplier: 'National Agro Bio Labs'
      }
    },
    {
      id: 'l3',
      title: 'Wheat Yellow Rust',
      crop: 'Wheat',
      diseaseName: 'Stripe / Yellow Rust (Puccinia striiformis)',
      confidence: '94%',
      severityScore: 30,
      severityLabel: 'Low-Mild',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      causes: 'Cool temperature (10-15°C) coupled with intermittent rainfall.',
      treatment: 'Apply Propiconazole 25% EC (1ml/L) or organic sulfur spray immediately.',
      sprayProduct: {
        id: 'sp3',
        title: 'Organic Sulfur Bio-Shield Spray (1L)',
        price: 290,
        supplier: 'EcoAgri Solutions'
      }
    }
  ];

  const handleRunScan = (sample) => {
    setIsScanning(true);
    setSelectedScan(null);
    setTimeout(() => {
      setIsScanning(false);
      setSelectedScan(sample);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 bg-teal-100 px-3 py-1 rounded-full w-fit mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>AI Precision Agronomy & Plant Pathology</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('doctorTitle')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            {t('doctorSub')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Photo Upload Zone & Sample Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upload Drop Zone */}
          <div className="bg-white rounded-3xl p-6 border-2 border-dashed border-teal-300 hover:border-teal-500 transition-colors shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center mb-3">
              <UploadCloud className="w-8 h-8 animate-bounce" />
            </div>
            <h4 className="font-heading font-bold text-base text-slate-900">{t('uploadPrompt')}</h4>
            <p className="text-slate-500 text-xs mt-1">Supports JPG, PNG, WEBP photos up to 10MB</p>

            <div className="mt-4">
              <label className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md transition-colors inline-block">
                <span>Take Photo / Choose File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={() => handleRunScan(sampleLeafData[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Sample Photos Selector */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">{t('sampleLeafs')}</h4>
            <div className="grid grid-cols-3 gap-3">
              {sampleLeafData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleRunScan(s)}
                  className={`p-2 rounded-xl border text-left transition-all overflow-hidden ${
                    selectedScan?.id === s.id
                      ? 'border-teal-500 bg-teal-50 shadow-sm ring-2 ring-teal-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <img src={s.image} alt={s.title} className="w-full h-16 object-cover rounded-lg mb-1.5" />
                  <span className="block text-[11px] font-bold text-slate-900 line-clamp-1">{s.crop}</span>
                  <span className="block text-[10px] text-slate-500 line-clamp-1">{s.title}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: AI Diagnostics Result Card (7 cols) */}
        <div className="lg:col-span-7">
          {isScanning ? (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[350px]">
              <RefreshCw className="w-10 h-10 text-teal-600 animate-spin mb-4" />
              <h4 className="font-heading font-bold text-lg text-slate-900">AI Deep Neural Network Scanning Crop Leaf...</h4>
              <p className="text-slate-500 text-xs mt-1">Analyzing leaf cell structures, color spots & fungal patterns...</p>
            </div>
          ) : selectedScan ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-in fade-in duration-300">
              
              {/* Header result */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    AI Diagnosis Complete
                  </span>
                  <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 mt-2">
                    {selectedScan.diseaseName}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">AI Accuracy</span>
                    <strong className="text-teal-600 font-extrabold text-lg">{selectedScan.confidence}</strong>
                  </div>
                </div>
              </div>

              {/* Severity Gauge Meter */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-700">{t('severity')}:</span>
                  <span className={selectedScan.severityScore > 50 ? 'text-rose-600' : 'text-amber-600'}>
                    {selectedScan.severityScore}% ({selectedScan.severityLabel})
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedScan.severityScore > 50 ? 'bg-rose-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${selectedScan.severityScore}%` }}
                  />
                </div>
              </div>

              {/* Cause & Treatment */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Pathogen Cause & Trigger Factors:</span>
                  </h4>
                  <p className="text-slate-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 text-xs">
                    {selectedScan.causes}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{t('treatment')}:</span>
                  </h4>
                  <p className="text-slate-700 bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 text-xs sm:text-sm font-medium">
                    {selectedScan.treatment}
                  </p>
                </div>
              </div>

              {/* Recommended Spray Product Direct Purchase */}
              {selectedScan.sprayProduct && (
                <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                  <div>
                    <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                      {t('recommendedSpray')}
                    </span>
                    <h5 className="font-heading font-bold text-sm sm:text-base text-white mt-0.5">
                      {selectedScan.sprayProduct.title}
                    </h5>
                    <span className="text-xs text-slate-300">By {selectedScan.sprayProduct.supplier}</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-extrabold text-amber-300 text-lg">
                      ₹{selectedScan.sprayProduct.price}
                    </span>
                    <button
                      onClick={() => addToCart({ ...selectedScan.sprayProduct, title: selectedScan.sprayProduct.title })}
                      className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Direct</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[350px]">
              <Sparkles className="w-12 h-12 text-teal-500 mb-3" />
              <h4 className="font-heading font-bold text-lg text-slate-900">Select a Sample Leaf or Upload a Photo</h4>
              <p className="text-slate-500 text-xs max-w-sm mt-1">
                Our AI model trained on over 50,000 crop leaf pathologies will instantly diagnose diseases and provide bio-remedies.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
