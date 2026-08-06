import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

export function formatPrice(priceInPKR: number, currency: Currency = 'PKR'): string {
  const targetInfo = CURRENCY_RATES[currency] || CURRENCY_RATES['PKR'];
  
  if (currency === 'PKR') {
    return `PKR ${priceInPKR.toLocaleString('en-PK')}`;
  }

  const converted = Math.round(priceInPKR / targetInfo.rateToPKR);
  return `${targetInfo.symbol} ${converted.toLocaleString()}`;
}

export function openWhatsAppInquiry(messageText: string) {
  const number = "923001234567";
  const url = `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
  window.open(url, '_blank');
}
