import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { pricingPlans, setIsAuthModalOpen, setAuthMode, setViewMode } = useApp();
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Simple, Transparent Plans for Every Career Stage
          </h2>
          <p className="text-base text-slate-600 text-balance">
            Start for free and upgrade as your application volume ramps up. Cancel or pause anytime with 1 click.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3 text-xs font-semibold">
            <span className={!isAnnual ? 'text-slate-900' : 'text-slate-500'}>Monthly billing</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 bg-slate-900 rounded-full transition-colors p-0.5 focus:outline-none"
              aria-label="Toggle annual pricing"
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`flex items-center gap-1.5 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              <span>Annual billing</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const isPro = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all ${
                  isPro
                    ? 'bg-white border-2 border-emerald-500 shadow-xl p-8 ring-1 ring-emerald-500/20'
                    : 'bg-white border border-slate-200 p-7 shadow-sm hover:border-slate-300'
                }`}
              >
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="pb-6 mb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {price === 0 ? 'forever' : isAnnual ? '/ month (billed yearly)' : '/ month'}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Includes:
                    </div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      isPro
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/25'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{plan.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-center text-[11px] text-slate-600 mt-2">
                    {price === 0 ? 'No credit card required' : '14-day money back guarantee'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise / Team Note */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Need team licenses for university cohorts, bootcamps, or career transition programs?{' '}
          <button
            onClick={() => {
              setAuthMode('signup');
              setIsAuthModalOpen(true);
            }}
            className="text-emerald-700 font-semibold hover:underline"
          >
            Contact our Career Partnerships team
          </button>
        </div>
      </div>
    </section>
  );
};
