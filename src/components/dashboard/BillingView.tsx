import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, Check, Sparkles, ArrowRight, ShieldCheck, Download } from 'lucide-react';

export const BillingView: React.FC = () => {
  const { currentUser, setCurrentUser, pricingPlans, showNotification } = useApp();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (planName: 'Free' | 'Pro' | 'Career') => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, plan: planName });
      showNotification(`Subscription plan updated to ${planName}!`);
    }
  };

  const invoices = [
    { id: 'INV-2026-003', date: '2026-10-01', amount: '$15.00', status: 'Paid', plan: 'Pro Annual' },
    { id: 'INV-2026-002', date: '2026-09-01', amount: '$15.00', status: 'Paid', plan: 'Pro Annual' },
    { id: 'INV-2026-001', date: '2026-08-01', amount: '$15.00', status: 'Paid', plan: 'Pro Starter' },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
          <span>Subscription & Billing</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Manage Your Plan</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Switch between plans anytime. No hidden cancellation fees or locked contracts.
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Active Subscription
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            {currentUser?.plan || 'Pro'} Plan
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Next renewal date: November 29, 2026. Payment method: Visa ending in 4242.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showNotification('Invoice history exported.')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Receipts</span>
          </button>
        </div>
      </div>

      {/* Plan Switcher Grid */}
      <div className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Available Plans</h3>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className={!isAnnual ? 'text-slate-900' : 'text-slate-500'}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-11 h-6 bg-slate-900 rounded-full transition-colors p-0.5"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={isAnnual ? 'text-slate-900' : 'text-slate-500'}>Annual (-20%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isCurrent = currentUser?.plan === (plan.id === 'plan-free' ? 'Free' : plan.id === 'plan-pro' ? 'Pro' : 'Career');

            return (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-50/40 border-2 border-emerald-500 shadow-sm'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-900">{plan.name}</h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="my-4 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500">/ month</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {plan.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id === 'plan-free' ? 'Free' : plan.id === 'plan-pro' ? 'Pro' : 'Career')}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isCurrent
                      ? 'bg-slate-200 text-slate-600 cursor-default'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : 'Switch to this Plan'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Payment History
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 font-mono">{inv.id}</span>
                <span className="text-slate-400 mx-2">·</span>
                <span className="text-slate-600">{inv.plan}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-900">{inv.amount}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                  {inv.status}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">{inv.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
