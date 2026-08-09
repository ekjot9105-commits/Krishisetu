import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { weatherData } from '../data/weatherData';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Sun, 
  AlertTriangle, 
  Lightbulb, 
  MapPin, 
  Sparkles,
  CloudRain
} from 'lucide-react';

export const WeatherAdvisory = () => {
  const { t } = useLanguage();
  const { current, aiAgronomyAdvice, forecast7Days } = weatherData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-100 px-3 py-1 rounded-full w-fit mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Micro-Climate Forecast & AI Agronomy Advisory</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            {t('weatherTitle')}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            {t('weatherSub')}
          </p>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-r from-sky-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-800/50 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-semibold">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>Location: <strong>{current.location}</strong></span>
            </div>
            
            <div className="flex items-baseline gap-4">
              <span className="font-heading font-extrabold text-5xl sm:text-6xl text-white">{current.temp}</span>
              <div>
                <span className="text-lg font-bold text-sky-200 block">{current.condition}</span>
                <span className="text-xs text-slate-300">AQI: {current.airQuality}</span>
              </div>
            </div>
          </div>

          {/* Key Weather Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                <span>Humidity</span>
              </span>
              <strong className="text-white text-base block">{current.humidity}</strong>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span>Rain Chance</span>
              </span>
              <strong className="text-white text-base block">{current.rainProbability}</strong>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Wind className="w-3.5 h-3.5 text-sky-400" />
                <span>Wind Speed</span>
              </span>
              <strong className="text-white text-base block">{current.windSpeed}</strong>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700">
              <span className="text-slate-400 flex items-center gap-1 mb-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>UV Index</span>
              </span>
              <strong className="text-white text-base block">{current.uvIndex}</strong>
            </div>
          </div>

        </div>
      </div>

      {/* AI Agronomy Advice Alerts */}
      <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <span>AI Agronomist Crop Action Recommendations</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {aiAgronomyAdvice.map((adv) => (
          <div
            key={adv.id}
            className={`p-5 rounded-2xl border flex items-start gap-3 shadow-sm ${
              adv.type === 'WARNING'
                ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}
          >
            {adv.type === 'WARNING' ? (
              <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white border border-slate-200">
                  Target: {adv.cropTarget}
                </span>
                <span className="font-bold text-sm">{adv.title}</span>
              </div>
              <p className="text-xs mt-1.5 leading-relaxed font-medium">
                {adv.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 7-Day Forecast Grid */}
      <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-4">
        7-Day Weather Radar Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {forecast7Days.map((f, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-sky-300 transition-colors space-y-2"
          >
            <span className="text-xs font-bold text-slate-700 block">{f.day}</span>
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 mx-auto flex items-center justify-center">
              {f.rain !== '0%' ? <CloudRain className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </div>
            <div className="text-sm font-extrabold text-slate-900">
              {f.tempMax} <span className="text-slate-400 text-xs font-medium">/ {f.tempMin}</span>
            </div>
            <div className="text-[11px] text-sky-700 font-semibold bg-sky-50 py-0.5 rounded">
              Rain: {f.rain}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
