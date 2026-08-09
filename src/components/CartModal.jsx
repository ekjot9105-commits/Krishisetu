import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarket } from '../context/MarketContext';
import { 
  ShoppingCart, 
  Trash2, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Phone 
} from 'lucide-react';

export const CartModal = () => {
  const { t } = useLanguage();
  const { cart, removeFromCart, setActiveTab } = useMarket();

  const totalPrice = cart.reduce((acc, item) => {
    const p = item.pricePerUnit || item.price || 0;
    return acc + Number(p);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">
                {t('cartTitle')}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                Direct Seller Inquiry & Orders ({cart.length} items)
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('produce')}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            ← Continue Browsing
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-lg text-slate-700">{t('emptyCart')}</h3>
            <p className="text-xs text-slate-500">Browse produce listings or equipment catalog to add items for direct order.</p>
            <button
              onClick={() => setActiveTab('produce')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md inline-block mt-2"
            >
              Explore Direct Harvest Market
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.cartId} className="py-4 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-xl border border-slate-200 shrink-0" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title || item.name}</h4>
                      <span className="text-xs text-slate-500">{item.location || 'Direct Seller Verified'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-emerald-700 text-base">
                      ₹{(item.pricePerUnit || item.price || 0).toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout Bar */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Estimated Value:</span>
                <span className="text-emerald-700 text-xl font-extrabold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-600 text-xs bg-white p-3 rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero commission direct contact. Payments secured via Escrow or UPI upon delivery.</span>
              </div>

              <button
                onClick={() => alert('Order inquiry sent directly to seller! Seller will contact you shortly.')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{t('checkout')}</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
