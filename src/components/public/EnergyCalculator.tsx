import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Calculator, 
  Zap, 
  DollarSign, 
  Leaf, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { EnergyCalculatorInputs, EnergyCalculatorResults } from '../../types';

export const EnergyCalculator: React.FC = () => {
  const { generateAIContent, setPublicView } = useCMS();

  const [inputs, setInputs] = useState<EnergyCalculatorInputs>({
    facilityAreaSqFt: 50000,
    monthlyElectricityBillUSD: 18000,
    regionSolarIrradiance: 'Moderate (Midwest/East)',
    targetRenewablePercent: 80,
    includeBatteryStorage: true,
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Math Calculations for Renewable Energy ROI
  const results: EnergyCalculatorResults = useMemo(() => {
    let irradianceFactor = 1450;
    if (inputs.regionSolarIrradiance.includes('Desert')) irradianceFactor = 1850;
    if (inputs.regionSolarIrradiance.includes('Coastal')) irradianceFactor = 1350;

    const maxCapacityKW = Math.floor(inputs.facilityAreaSqFt / 95);
    const annualKWhNeeded = (inputs.monthlyElectricityBillUSD / 0.14) * 12;
    const targetKWh = annualKWhNeeded * (inputs.targetRenewablePercent / 100);
    const neededCapacityKW = Math.round(targetKWh / irradianceFactor);

    const recommendedSolarKW = Math.min(neededCapacityKW, maxCapacityKW);
    const annualGenerationKWh = Math.round(recommendedSolarKW * irradianceFactor);
    
    const baseSavingsAnnual = Math.round((annualGenerationKWh * 0.14));
    const batteryBonusSavings = inputs.includeBatteryStorage ? Math.round(baseSavingsAnnual * 0.22) : 0;
    const estimatedAnnualSavingsUSD = baseSavingsAnnual + batteryBonusSavings;

    const costPerKW = inputs.includeBatteryStorage ? 1850 : 1350;
    const grossCost = recommendedSolarKW * costPerKW;
    const netCost = grossCost * 0.70;

    const paybackPeriodYears = Number((netCost / Math.max(1, estimatedAnnualSavingsUSD)).toFixed(1));
    const projected20YearSavings = (estimatedAnnualSavingsUSD * 20) - netCost;
    const projected20YearROI = Math.round((projected20YearSavings / netCost) * 100);

    const co2OffsetTonsAnnual = Math.round(annualGenerationKWh * 0.000707);
    const treesPlantedEquivalent = Math.round(co2OffsetTonsAnnual * 16.5);

    return {
      recommendedSolarKW,
      annualGenerationKWh,
      estimatedAnnualSavingsUSD,
      co2OffsetTonsAnnual,
      treesPlantedEquivalent,
      paybackPeriodYears,
      projected20YearROI,
    };
  }, [inputs]);

  const handleRunAiAnalysis = async () => {
    setIsAiLoading(true);
    setAiAnalysis(null);

    const summaryPrompt = `Evaluate the feasibility of a ${results.recommendedSolarKW} kW solar installation ${
      inputs.includeBatteryStorage ? 'with collocated Battery Storage (BESS)' : 'grid tied'
    } for an enterprise facility of ${inputs.facilityAreaSqFt.toLocaleString()} sq ft.
Monthly Electricity Spend: $${inputs.monthlyElectricityBillUSD.toLocaleString()}
Irradiance Zone: ${inputs.regionSolarIrradiance}
Projected Annual Generation: ${results.annualGenerationKWh.toLocaleString()} kWh
Estimated Annual Savings: $${results.estimatedAnnualSavingsUSD.toLocaleString()}
Payback Period: ${results.paybackPeriodYears} years`;

    const res = await generateAIContent({
      mode: 'calculator_analysis',
      prompt: summaryPrompt,
    });

    setIsAiLoading(false);
    if (res.success) {
      setAiAnalysis(res.text);
    }
  };

  return (
    <div className="py-16 bg-zinc-950 border-b border-zinc-800/80 font-sans text-zinc-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0c0e] border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE ROI MODELING</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            Solar + BESS Feasibility & ROI Estimator
          </h2>
          <p className="mt-1 text-xs text-zinc-400 font-sans">
            Estimate solar capacity, battery storage returns, CO2 abatement, and payback periods tailored to your corporate operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-5">
            <h3 className="text-xs font-bold text-white pb-2 border-b border-zinc-800 flex items-center justify-between uppercase tracking-wider">
              <span>Facility Inputs</span>
              <span className="text-[10px] text-emerald-400 font-normal">Real-Time Estimator</span>
            </h3>

            {/* Facility Area Slider */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-medium">
                <label className="text-zinc-400">Facility / Land Area</label>
                <span className="text-emerald-400 font-bold">{inputs.facilityAreaSqFt.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={inputs.facilityAreaSqFt}
                onChange={e => setInputs({ ...inputs, facilityAreaSqFt: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Monthly Bill Input */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-medium">
                <label className="text-zinc-400">Monthly Electricity Spend</label>
                <span className="text-emerald-400 font-bold">${inputs.monthlyElectricityBillUSD.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min={2000}
                max={200000}
                step={1000}
                value={inputs.monthlyElectricityBillUSD}
                onChange={e => setInputs({ ...inputs, monthlyElectricityBillUSD: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Solar Irradiance Region */}
            <div className="space-y-1 text-xs">
              <label className="text-zinc-400 block">Regional Solar Irradiance</label>
              <select
                value={inputs.regionSolarIrradiance}
                onChange={e => setInputs({ ...inputs, regionSolarIrradiance: e.target.value as any })}
                className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
              >
                <option value="High (Desert/Southwest)">High (Desert / Southwest - 1850 kWh/kW)</option>
                <option value="Moderate (Midwest/East)">Moderate (Midwest / East - 1450 kWh/kW)</option>
                <option value="Standard (Coastal)">Standard (Coastal - 1350 kWh/kW)</option>
              </select>
            </div>

            {/* Target Renewable Offset */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-medium">
                <label className="text-zinc-400">Target Renewable Offset</label>
                <span className="text-emerald-400 font-bold">{inputs.targetRenewablePercent}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={inputs.targetRenewablePercent}
                onChange={e => setInputs({ ...inputs, targetRenewablePercent: Number(e.target.value) })}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Battery Storage Toggle */}
            <div className="pt-2 flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800">
              <div>
                <span className="text-xs font-bold text-white block">Include Battery Storage (BESS)</span>
                <span className="text-[10px] text-zinc-500 font-sans">Shaves peak demand tariffs & guarantees resiliency</span>
              </div>
              <button
                type="button"
                onClick={() => setInputs({ ...inputs, includeBatteryStorage: !inputs.includeBatteryStorage })}
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                  inputs.includeBatteryStorage ? 'bg-emerald-500' : 'bg-zinc-700'
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    inputs.includeBatteryStorage ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              <ResultCard
                title="Recommended Capacity"
                value={`${results.recommendedSolarKW.toLocaleString()} kW`}
                subtitle={`Approx ${results.annualGenerationKWh.toLocaleString()} kWh/yr`}
                icon={<Zap className="w-4 h-4 text-emerald-400" />}
              />

              <ResultCard
                title="Est. Annual Savings"
                value={`$${results.estimatedAnnualSavingsUSD.toLocaleString()}`}
                subtitle={`Includes 30% ITC tax incentives`}
                icon={<DollarSign className="w-4 h-4 text-teal-400" />}
                highlight
              />

              <ResultCard
                title="Annual CO2 Abatement"
                value={`${results.co2OffsetTonsAnnual.toLocaleString()} Tons`}
                subtitle={`Planting ${results.treesPlantedEquivalent.toLocaleString()} trees`}
                icon={<Leaf className="w-4 h-4 text-emerald-400" />}
              />

              <ResultCard
                title="Payback & 20-Yr ROI"
                value={`${results.paybackPeriodYears} Yrs`}
                subtitle={`Projected 20-Year ROI: ${results.projected20YearROI}%`}
                icon={<TrendingUp className="w-4 h-4 text-cyan-400" />}
              />

            </div>

            {/* AI Engineering Evaluation Button */}
            <div className="p-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>GEMINI 2.5 FLASH AI ADVISOR</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Generate Executive Feasibility Analysis</h4>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    Get an instant technical assessment covering grid risk, battery sizing, and corporate PPA strategies.
                  </p>
                </div>
                <button
                  onClick={handleRunAiAnalysis}
                  disabled={isAiLoading}
                  className="px-4 py-2 rounded-lg font-bold text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 shrink-0 transition-all disabled:opacity-60"
                  id="calc-run-ai-btn"
                >
                  {isAiLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run AI Evaluation</span>
                    </>
                  )}
                </button>
              </div>

              {/* AI Result Card */}
              {aiAnalysis && (
                <div className="p-3.5 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 text-emerald-400 font-bold text-[11px]">
                    <span>Ginosko AI Engineering Assessment</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] font-mono">{aiAnalysis}</div>
                  <div className="pt-2 border-t border-zinc-800 flex justify-end">
                    <button
                      onClick={() => setPublicView('contact')}
                      className="text-emerald-400 hover:text-emerald-300 font-bold text-xs flex items-center gap-1"
                    >
                      <span>Submit RFP for this Configuration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const ResultCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  highlight?: boolean;
}> = ({ title, value, subtitle, icon, highlight }) => (
  <div
    className={`p-4 rounded-xl border transition-all font-mono ${
      highlight
        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
        : 'bg-[#0c0c0e] border-zinc-800 text-zinc-100'
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-bold uppercase text-zinc-500">{title}</span>
      <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
        {icon}
      </div>
    </div>
    <div className="text-2xl font-bold text-white tracking-tight">{value}</div>
    <div className="text-[10px] text-zinc-400 mt-1 font-sans">{subtitle}</div>
  </div>
);
