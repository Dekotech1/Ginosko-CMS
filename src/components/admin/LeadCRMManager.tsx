import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { LeadStatus } from '../../types';

export const LeadCRMManager: React.FC = () => {
  const { leads, updateLeadStatus, updateLeadNotes, showToast } = useCMS();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(leads[0]?.id || null);
  const [noteInput, setNoteInput] = useState('');

  const filteredLeads = leads.filter(lead => {
    const matchesQuery = lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  const selectedLead = leads.find(l => l.id === selectedLeadId) || filteredLeads[0];

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    updateLeadNotes(selectedLead.id, noteInput);
    showToast('Saved notes for lead!', 'success');
  };

  return (
    <div className="p-6 lg:p-8 bg-zinc-950 min-h-screen space-y-6 text-zinc-100 transition-colors">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>ENTERPRISE PIPELINE & RFP MANAGEMENT</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Inbound Lead & RFP CRM</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Review corporate sustainability RFPs, assign advisory engineers, and track deal scoring.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
            Total Pipeline: <span className="text-emerald-400 font-bold">${leads.length * 7.5}M Est.</span>
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-xl bg-[#0c0c0e] border border-zinc-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search company, contact, RFP type..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-zinc-500" />
          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none"
          >
            <option value="all">All Lead Statuses</option>
            <option value="new">NEW (Unreviewed)</option>
            <option value="in_contact">In Contact</option>
            <option value="proposal_sent">Proposal Sent</option>
            <option value="contracted">Contracted</option>
          </select>
        </div>
      </div>

      {/* 2-Column Split View: Lead List Left, Details & Action Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Lead List */}
        <div className="lg:col-span-5 rounded-xl bg-[#0c0c0e] border border-zinc-800 overflow-hidden divide-y divide-zinc-800/80">
          {filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              No leads match search filter.
            </div>
          ) : (
            filteredLeads.map(lead => (
              <div
                key={lead.id}
                onClick={() => {
                  setSelectedLeadId(lead.id);
                  setNoteInput(lead.notes || '');
                }}
                className={`p-4 cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                  selectedLead?.id === lead.id
                    ? 'bg-emerald-500/10 border-l-2 border-emerald-500'
                    : 'hover:bg-zinc-900/60'
                }`}
              >
                <div className="space-y-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white truncate block">{lead.companyName}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase ${
                      lead.score === 'High' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {lead.score} Priority
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 truncate">{lead.projectType}</p>
                  
                  <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 pt-1">
                    <span>{lead.contactName}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{lead.estimatedBudget}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 space-y-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase block ${
                    lead.status === 'new'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {lead.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block">{lead.submittedAt}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Active Lead Dossier & CRM Notes */}
        <div className="lg:col-span-7 space-y-6">
          {selectedLead ? (
            <div className="p-6 rounded-xl bg-[#0c0c0e] border border-zinc-800 space-y-6">
              
              {/* Top Dossier Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-lg font-bold text-white">{selectedLead.companyName}</h2>
                  </div>
                  <p className="text-xs text-zinc-400">
                    Contact: <span className="text-zinc-200 font-semibold">{selectedLead.contactName}</span> • Submitted {selectedLead.submittedAt}
                  </p>
                </div>

                {/* Status Changer */}
                <div className="space-y-1 text-right">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase block">Update Status</label>
                  <select
                    value={selectedLead.status}
                    onChange={e => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                    className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  >
                    <option value="new">NEW (Unreviewed)</option>
                    <option value="in_contact">In Contact</option>
                    <option value="proposal_sent">Proposal Sent</option>
                    <option value="contracted">Contracted / Closed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Lead Details Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Budget</span>
                  <span className="text-sm font-bold text-emerald-400">{selectedLead.estimatedBudget}</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Timeline</span>
                  <span className="text-sm font-bold text-zinc-200">{selectedLead.timeline}</span>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Deal Score</span>
                  <span className="text-sm font-bold text-amber-400">{selectedLead.score} Priority</span>
                </div>
              </div>

              {/* Contact Info Bar */}
              <div className="flex flex-wrap items-center gap-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/80 text-xs">
                <div className="flex items-center gap-2 text-zinc-300 font-mono">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline">{selectedLead.email}</a>
                </div>
                {selectedLead.phone && (
                  <div className="flex items-center gap-2 text-zinc-300 font-mono">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{selectedLead.phone}</span>
                  </div>
                )}
              </div>

              {/* Scope Message Box */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">RFP Project Description</span>
                <div className="p-4 rounded-lg bg-black border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

              {/* Internal Advisory Notes */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <label className="text-xs font-bold text-white flex items-center justify-between">
                  <span>Internal Advisory Notes & Action Items</span>
                  <button
                    onClick={handleSaveNotes}
                    className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-mono transition-colors"
                  >
                    Save Notes
                  </button>
                </label>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  placeholder="Record call logs, technical feasibility reviews, or advisory assignments..."
                  className="w-full p-3 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-600 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

            </div>
          ) : (
            <div className="p-12 text-center rounded-xl bg-[#0c0c0e] border border-zinc-800 text-xs text-zinc-500">
              Select a lead from the left pipeline panel to view dossier details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
