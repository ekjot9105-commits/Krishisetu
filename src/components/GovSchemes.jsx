import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { govSchemesList } from '../data/schemesData';
import { 
  Building2, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Calculator,
  ShieldCheck,
  Search
} from 'lucide-react';

export const GovSchemes = () => {
  const { t } = useLanguage();
  
  const [landAcres, setLandAcres] = useState(3.5);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [calcResult, setCalcResult] = useState(null);

  const handleCalculateEligibility = (e) => {
    e.preventDefault();
    const acres = Number(landAcres);
    const pmKisanEligible = acres <= 5;
    const insuranceEst = Math.round(acres * 12500);
    const equipmentSubsidyEst = Math.round(acres * 18000);

    setCalcResult({
      pmKisanEligible,
      pmKisanAmount: pmKisanEligible ? 6000 : 0,
      insuranceEst,
      equipmentSubsidyEst,
      totalBenefit: (pmKisanEligible ? 6000 : 0) + insuranceEst + equipmentSubsidyEst
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full w-fit mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Government Agriculture Schemes & Financial Subsidies</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('schemesTitle')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            {t('schemesSub')}
          </p>
        </div>
      </div>

      {/* Interactive Eligibility Calculator Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-700 mb-10">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-4 h-4" />
          <span>Instant Subsidy & Welfare Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <form onSubmit={handleCalculateEligibility} className="lg:col-span-6 space-y-4">
            <h3 className="font-heading font-bold text-xl text-white">
              Check Eligible Government Subsidy for Your Farm
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {t('landSize')}
                </label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={landAcres}
                  onChange={(e) => setLandAcres(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Harvest Crop
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400"
                >
                  <option value="Wheat">Wheat</option>
                  <option value="Paddy / Rice">Paddy / Rice</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('checkEligibility')}</span>
            </button>
          </form>

          {/* Calculator Output */}
          <div className="lg:col-span-6 bg-slate-800/90 border border-slate-700 p-6 rounded-2xl">
            {calcResult ? (
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="text-amber-300 font-bold uppercase text-[11px]">
                  Estimated Govt Support for {landAcres} Acres:
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl flex justify-between items-center text-slate-200">
                  <span>PM-KISAN Cash Benefit:</span>
                  <strong className="text-emerald-400 font-bold">
                    {calcResult.pmKisanEligible ? '₹6,000 / year' : 'Ineligible (>5 Acres)'}
                  </strong>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl flex justify-between items-center text-slate-200">
                  <span>PMFBY Crop Insurance Coverage:</span>
                  <strong className="text-emerald-400 font-bold">₹{calcResult.insuranceEst.toLocaleString('en-IN')}</strong>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl flex justify-between items-center text-slate-200">
                  <span>Equipment & Irrigation Subsidy:</span>
                  <strong className="text-emerald-400 font-bold">₹{calcResult.equipmentSubsidyEst.toLocaleString('en-IN')}</strong>
                </div>

                <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-base">
                  <span className="font-bold text-white">Total Annual Benefit Potential:</span>
                  <span className="font-extrabold text-amber-400 text-lg">
                    ₹{calcResult.totalBenefit.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs space-y-2">
                <ShieldCheck className="w-10 h-10 text-amber-400 mx-auto" />
                <p>Enter your farm size in acres and click "Check My Eligibility" to see potential financial support & subsidies.</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Schemes Directory Grid */}
      <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-6">
        Featured Government Welfare Programs & Subsidies
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {govSchemesList.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                  {scheme.category}
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {scheme.amount}
                </span>
              </div>

              <h4 className="font-heading font-bold text-lg text-slate-900">{scheme.name}</h4>
              <p className="text-slate-600 text-xs leading-relaxed">{scheme.benefits}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-800">Eligibility Criteria:</div>
                <div className="text-slate-600 font-normal">{scheme.eligibility}</div>
              </div>

              <div>
                <div className="font-semibold text-xs text-slate-700 mb-1">Required Documents:</div>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.documentsRequired.map((doc, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200">
                      • {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
