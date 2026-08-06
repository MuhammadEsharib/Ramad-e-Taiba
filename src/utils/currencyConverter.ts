import { Currency } from '../types';

export interface ExchangeRates {
  PKR: number;
  USD: number;
  SAR: number;
  AED: number;
  EUR: number;
  [key: string]: number;
}

const DEFAULT_FALLBACK_RATES: ExchangeRates = {
  PKR: 1,
  USD: 0.0036, // ~278 PKR per USD
  SAR: 0.0134, // ~74.5 PKR per SAR
  AED: 0.0131, // ~76.2 PKR per AED
  EUR: 0.0033  // ~302 PKR per EUR
};

let memoryRates: ExchangeRates = { ...DEFAULT_FALLBACK_RATES };
let memoryIsLive = false;
let memoryLastFetched = 0;

export async function fetchLiveExchangeRates(): Promise<{ rates: ExchangeRates; isLive: boolean }> {
  // If fetched within 30 minutes, reuse memory
  if (memoryLastFetched && Date.now() - memoryLastFetched < 1800000) {
    return { rates: memoryRates, isLive: memoryIsLive };
  }

  try {
    const res = await fetch('/api/currency-rates');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        memoryRates = {
          PKR: 1,
          USD: data.rates.USD || DEFAULT_FALLBACK_RATES.USD,
          SAR: data.rates.SAR || DEFAULT_FALLBACK_RATES.SAR,
          AED: data.rates.AED || DEFAULT_FALLBACK_RATES.AED,
          EUR: data.rates.EUR || DEFAULT_FALLBACK_RATES.EUR,
        };
        memoryIsLive = data.isLive ?? true;
        memoryLastFetched = Date.now();
        return { rates: memoryRates, isLive: memoryIsLive };
      }
    }
  } catch (err) {
    console.warn('Currency rates API fallback activated');
  }

  return { rates: DEFAULT_FALLBACK_RATES, isLive: false };
}

export function convertPKRToCurrency(
  priceInPKR: number,
  targetCurrency: Currency,
  rates: ExchangeRates = memoryRates
): { formatted: string; raw: number; symbol: string } {
  if (targetCurrency === 'PKR' || !rates) {
    return {
      formatted: `PKR ${priceInPKR.toLocaleString('en-PK')}`,
      raw: priceInPKR,
      symbol: '₨'
    };
  }

  const rateFactor = rates[targetCurrency] || DEFAULT_FALLBACK_RATES[targetCurrency] || 1;
  const convertedAmount = Math.round(priceInPKR * rateFactor);

  const symbols: Record<Currency, string> = {
    PKR: '₨',
    USD: '$',
    SAR: '﷼',
    AED: 'AED',
    EUR: '€'
  };

  const symbol = symbols[targetCurrency] || targetCurrency;

  return {
    formatted: `${symbol} ${convertedAmount.toLocaleString()}`,
    raw: convertedAmount,
    symbol
  };
}
