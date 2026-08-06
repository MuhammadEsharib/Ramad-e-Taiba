import React, { useState } from 'react';
import { Currency, Language } from '../types';
import { convertPKRToCurrency, ExchangeRates } from '../utils/currencyConverter';
import { CURRENCY_RATES } from '../data/mockData';
import { RefreshCw, ArrowRightLeft, DollarSign, Calculator, Check, ArrowRight } from 'lucide-react';

interface CurrencyConverterWidgetProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  liveRates?: ExchangeRates;
  isLiveRates?: boolean;
}

export const CurrencyConverterWidget: React.FC<CurrencyConverterWidgetProps> = ({
  currency,
  setCurrency,
  language,
  liveRates,
  isLiveRates = false
}) => {
  const [inputAmount, setInputAmount] = useState<number>(218000);
  const [fromCurrency, setFromCurrency] = useState<Currency>('PKR');

  const currencies: Currency[] = ['PKR', 'USD', 'SAR', 'AED', 'EUR'];
  const isUrdu = language === 'ur';

  // Helper to convert inputAmount from fromCurrency to PKR first, then to target currency
  const getRateToPKR = (c: Currency): number => {
    if (liveRates && liveRates[c] && c !== 'PKR') {
      // liveRates has rateToPKR or rate values
      const rateObj = liveRates[c];
      return typeof rateObj === 'number' ? rateObj : rateObj.rateToPKR;
    }
    return CURRENCY_RATES[c]?.rateToPKR || 1;
  };

  const amountInPKR = fromCurrency === 'PKR' ? inputAmount : inputAmount * getRateToPKR(fromCurrency);

  const presets = [
    { label: isUrdu ? 'اکانومی عمرہ (218k)' : 'Economy Umrah (218k)', pkr: 218000 },
    { label: isUrdu ? '5-اسٹار کلاک ٹاور (385k)' : '5-Star Clock Tower (385k)', pkr: 385000 },
    { label: isUrdu ? 'ترکی گرینڈ ٹور (345k)' : 'Turkey Grand Tour (345k)', pkr: 345000 },
    { label: isUrdu ? 'دبئی سفاری ٹور (175k)' : 'Dubai Safari Tour (175k)', pkr: 175000 },
    { label: isUrdu ? 'سکردو ہنزہ وادی (95k)' : 'Skardu Hunza Tour (95k)', pkr: 95000 }
  ];

  return (
    <div className="bg-[#0B1F3A] text-white rounded-[32px] p-6 md:p-8 shadow-2xl border border-white/10 relative overflow-hidden">
      {/* Glow decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E5EFF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs font-extrabold uppercase border border-[#D4AF37]/30 mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'لائیو ایکسچینج کیلکولیٹر' : 'Live Currency Converter'}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-display font-extrabold text-white">
              {isUrdu ? 'سفری بجٹ و کرنسی کیلکولیٹر (PKR, USD, SAR, AED, EUR)' : 'Convert Travel Costs (PKR, USD, SAR, AED, EUR)'}
            </h3>
            <p className="text-xs text-gray-300 mt-1">
              {isUrdu ? 'عمرہ یا سیاحتی پیکجز کی قیمتوں کو اپنی پسندیدہ کرنسی میں فوراً تبدیل کریں۔' : 'Calculate package rates, flight costs, and hotel expenses in real-time.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isLiveRates && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
                <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" />
                {isUrdu ? 'لائیو بینک ریٹ' : 'Live Interbank Rates'}
              </span>
            )}
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-6">
          
          {/* Amount Input */}
          <div className="md:col-span-7">
            <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
              {isUrdu ? 'رقم درج کریں' : 'Enter Amount'}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={inputAmount}
                onChange={(e) => setInputAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full bg-white/10 border border-white/20 rounded-[20px] px-4 py-3.5 text-lg font-extrabold text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="218000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-[#D4AF37]">
                {fromCurrency}
              </span>
            </div>
          </div>

          {/* Source Currency Select */}
          <div className="md:col-span-5">
            <label className="block text-xs font-bold uppercase text-gray-300 mb-1.5">
              {isUrdu ? 'بنیادی کرنسی' : 'From Currency'}
            </label>
            <div className="flex bg-white/10 p-1 rounded-[20px] border border-white/15">
              {currencies.map((c) => (
                <button
                  key={c}
                  onClick={() => setFromCurrency(c)}
                  className={`flex-1 py-2.5 rounded-[16px] text-xs font-extrabold transition-all ${
                    fromCurrency === c
                      ? 'bg-[#D4AF37] text-[#0B1F3A] shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Presets Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          <span className="text-xs font-bold text-gray-400 shrink-0">
            {isUrdu ? 'مقبول پیکجز:' : 'Quick Package Fares:'}
          </span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setFromCurrency('PKR');
                setInputAmount(p.pkr);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-bold text-gray-200 transition-colors shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Converted Output Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {currencies.map((c) => {
            const converted = convertPKRToCurrency(amountInPKR, c, liveRates);
            const isSiteSelected = currency === c;

            return (
              <div
                key={c}
                onClick={() => setCurrency(c)}
                className={`p-4 rounded-[22px] border cursor-pointer transition-all ${
                  isSiteSelected
                    ? 'bg-[#1E5EFF] border-white shadow-xl scale-[1.03]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-extrabold ${isSiteSelected ? 'text-white' : 'text-[#D4AF37]'}`}>
                    {c}
                  </span>
                  {isSiteSelected && (
                    <span className="p-1 bg-white text-[#1E5EFF] rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <div className="text-lg font-black text-white truncate">
                  {converted.symbol} {converted.raw.toLocaleString()}
                </div>

                <div className="text-[10px] text-gray-300 mt-1 flex items-center gap-1">
                  <span>1 {c} ≈ {(getRateToPKR(c)).toFixed(1)} PKR</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
          <div>
            {isUrdu ? 'کسی بھی کرنسی کارڈ پر کلک کر کے پوری ویب سائٹ پر اسی کرنسی کی قیمتیں فعال کریں۔' : 'Click any currency box above to set it as the active site-wide currency.'}
          </div>
          <button
            onClick={() => setCurrency(fromCurrency)}
            className="px-4 py-2 bg-[#D4AF37] text-[#0B1F3A] font-extrabold rounded-full hover:bg-amber-400 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>{isUrdu ? `پورے سائیٹ پر ${fromCurrency} لگائیں` : `Set ${fromCurrency} Site-wide`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
