import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Send, 
  CheckCircle2, 
  Building, 
  Mail, 
  Phone, 
  DollarSign, 
  MessageSquare, 
  ShieldCheck 
} from 'lucide-react';

export const ContactLeadForm: React.FC = () => {
  const { addLead } = useCMS();

  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: 'Grid-Scale Solar + Battery Storage (BESS)',
    estimatedBudget: '$5M - $10M',
    timeline: 'Q3 2026',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead(form);
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-zinc-950 border-b border-zinc-800/80 font-sans text-zinc-100 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0c0c0e] border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Send className="w-3.5 h-3.5" />
            <span>ENTERPRISE RFP & ADVISORY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            Initiate Strategic Advisory Request
          </h2>
          <p className="text-xs text-zinc-400 font-sans">
            Partner with Ginosko's senior renewable energy engineers and sustainability strategists to evaluate project feasibility and structure enterprise PPAs.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-xl bg-[#0c0c0e] border border-emerald-500/30 text-center space-y-3 font-mono">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Request Logged in Ginosko CRM
            </h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto font-sans">
              Thank you, <span className="font-bold text-emerald-400">{form.contactName}</span>. Your RFP inquiry for <span className="font-bold">{form.companyName}</span> has been assigned to our Senior Energy Advisory Team.
            </p>
            <div className="pt-4 border-t border-zinc-800 flex justify-center">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-colors"
                id="rfp-submit-another-btn"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-5 font-mono text-xs">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Company Name */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Company Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AeroTech Industrial Solutions"
                  value={form.companyName}
                  onChange={e => setForm({ ...form, companyName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Contact Name */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">
                  Contact Name & Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robert Sterling, VP Sustainability"
                  value={form.contactName}
                  onChange={e => setForm({ ...form, contactName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Corporate Email</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="r.sterling@company.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phone (Optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase block">
                  Project Type
                </label>
                <select
                  value={form.projectType}
                  onChange={e => setForm({ ...form, projectType: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
                >
                  <option value="Grid-Scale Solar + Battery Storage (BESS)">Grid-Scale Solar + Battery Storage (BESS)</option>
                  <option value="CSRD Scope 1-3 ESG Advisory & PPA">CSRD Scope 1-3 ESG Advisory & PPA</option>
                  <option value="Offshore Wind Infrastructure Advisory">Offshore Wind Infrastructure Advisory</option>
                  <option value="Industrial Microgrid & EMS Digitalization">Industrial Microgrid & EMS Digitalization</option>
                  <option value="Energy Trading & Risk Management">Energy Trading & Risk Management</option>
                </select>
              </div>

              {/* Estimated Budget */}
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Estimated Capex</span>
                </label>
                <select
                  value={form.estimatedBudget}
                  onChange={e => setForm({ ...form, estimatedBudget: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none"
                >
                  <option value="$1M - $5M">$1M - $5M</option>
                  <option value="$5M - $10M">$5M - $10M</option>
                  <option value="$10M - $25M">$10M - $25M</option>
                  <option value="$25M+">$25M+ Capital Investment</option>
                </select>
              </div>

            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[10px] text-zinc-400 uppercase flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scope & Requirements</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe your facility specifications, targeted carbon offset metrics, or timeline requirements..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full p-3 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confidential Corporate Data Protection</span>
              </div>
              <button
                type="submit"
                id="contact-form-submit-btn"
                className="px-6 py-2.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5"
              >
                <span>Submit RFP</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
