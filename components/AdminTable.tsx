'use client'

import { useState, useEffect, useCallback } from 'react'
import type { RsvpEntry } from '@/lib/rsvp-store'
import { WhatsAppShare } from '@/components/WhatsAppShare'

interface Stats {
  responses:  number
  total:      number
  solos:      number
  families:   number
  brideTotal: number
  groomTotal: number
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="border border-gold/20 bg-parchment-mid p-6 text-center min-w-[140px]">
      <span className="font-heading text-gold block" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
        {value}
      </span>
      <div className="text-[0.7rem] tracking-widest uppercase text-walnut-muted mt-1">{label}</div>
    </div>
  )
}

interface EditDraft {
  name:       string
  side:       'bride' | 'groom'
  attendance: 'solo' | 'family'
  partySize:  number
}

export function AdminTable({ adminKey, side }: { adminKey: string; side?: 'bride' | 'groom' }) {
  const readOnly = !!side
  const [allRsvps, setRsvps] = useState<RsvpEntry[]>([])
  const [filter, setFilter] = useState<'all' | 'bride' | 'groom'>('all')
  const rsvps = side
    ? allRsvps.filter(r => r.side === side)
    : filter === 'all' ? allRsvps : allRsvps.filter(r => r.side === filter)
  const [loading,  setLoading] = useState(true)
  const [busy,     setBusy]    = useState(false)
  const [flash,    setFlash]   = useState('')
  const [editId,   setEditId]  = useState<number | null>(null)
  const [draft,    setDraft]   = useState<EditDraft | null>(null)
  const [showAdd,  setShowAdd] = useState(false)
  const [newEntry, setNewEntry] = useState<EditDraft>({ name: '', side: 'groom', attendance: 'solo', partySize: 1 })

  const fetchRsvps = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/rsvp?key=${adminKey}`, { cache: 'no-store' })
      const data = await res.json()
      setRsvps(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }, [adminKey])

  useEffect(() => { fetchRsvps() }, [fetchRsvps])

  const TARGET = filter === 'all' ? 200 : 100
  const stats: Stats = {
    responses:  rsvps.length,
    total:      rsvps.reduce((s, r) => s + r.partySize, 0),
    solos:      rsvps.filter(r => r.attendance === 'solo').length,
    families:   rsvps.filter(r => r.attendance === 'family').length,
    brideTotal: allRsvps.filter(r => r.side === 'bride').reduce((s, r) => s + r.partySize, 0),
    groomTotal: allRsvps.filter(r => r.side === 'groom').reduce((s, r) => s + r.partySize, 0),
  }

  function startEdit(r: RsvpEntry) {
    setEditId(r.id)
    setDraft({ name: r.name, side: r.side, attendance: r.attendance, partySize: r.partySize })
  }

  function cancelEdit() {
    setEditId(null)
    setDraft(null)
  }

  async function handleSave(id: number) {
    if (!draft) return
    setBusy(true)
    try {
      await fetch(`/api/rsvp?key=${adminKey}&id=${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      setFlash('Saved.')
      setEditId(null)
      setDraft(null)
      await fetchRsvps()
    } catch {
      setFlash('Error — could not save.')
    } finally {
      setBusy(false)
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Delete RSVP for "${name}"?`)) return
    setBusy(true)
    try {
      await fetch(`/api/rsvp?key=${adminKey}&id=${id}`, { method: 'DELETE' })
      setFlash(`Deleted "${name}".`)
      await fetchRsvps()
    } catch {
      setFlash('Error — could not delete.')
    } finally {
      setBusy(false)
    }
  }

  async function handleAdd() {
    if (!newEntry.name.trim()) { setFlash('Name is required.'); return }
    setBusy(true)
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry),
      })
      setFlash(`Added "${newEntry.name}".`)
      setNewEntry({ name: '', side: 'groom', attendance: 'solo', partySize: 1 })
      setShowAdd(false)
      await fetchRsvps()
    } catch {
      setFlash('Error — could not add.')
    } finally {
      setBusy(false)
    }
  }

  async function handleClear() {
    if (!confirm('Clear all RSVPs? This cannot be undone.')) return
    setBusy(true)
    try {
      await fetch(`/api/rsvp?key=${adminKey}`, { method: 'DELETE' })
      setFlash('Cleared.')
      await fetchRsvps()
    } catch {
      setFlash('Error — could not clear.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div dir="ltr" className="min-h-screen bg-parchment px-6 py-16 text-walnut">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 pb-8 border-b border-gold/20">
          <h1 className="font-heading font-light text-walnut" style={{ fontSize: '2.4rem', fontStyle: 'italic' }}>
            {side === 'bride' ? "Bride's Dashboard" : side === 'groom' ? "Groom's Dashboard" : 'RSVP Dashboard'}
          </h1>
          <p className="text-walnut-muted text-sm mt-1 font-body">Mahmoud &amp; Raghda · Wedding Guest List</p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <StatCard value={stats.responses}      label="RSVPs"          />
          <StatCard value={stats.total}          label="Total Guests"   />
          <StatCard value={stats.solos}          label="Individual"     />
          <StatCard value={stats.families}       label="Family Groups"  />
          {!side && <StatCard value={stats.brideTotal}  label="Bride's Side"   />}
          {!side && <StatCard value={stats.groomTotal}  label="Groom's Side"   />}
          {!side && <StatCard value={TARGET - stats.total} label={`Remaining / ${TARGET}`} />}
        </div>

        <div className="mb-8">
          {showAdd ? (
            <div className="border border-gold/20 bg-parchment-mid p-6">
              <h2 className="font-heading font-light text-walnut mb-5 text-lg" style={{ fontStyle: 'italic' }}>Add RSVP</h2>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] tracking-widest uppercase text-walnut-muted">Name</label>
                  <input
                    value={newEntry.name}
                    onChange={e => setNewEntry({ ...newEntry, name: e.target.value })}
                    placeholder="Guest name"
                    className="border border-gold/30 bg-parchment px-3 py-2 text-sm w-52 outline-none focus:border-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] tracking-widest uppercase text-walnut-muted">Side</label>
                  <select
                    value={newEntry.side}
                    onChange={e => setNewEntry({ ...newEntry, side: e.target.value as 'bride' | 'groom' })}
                    className="border border-gold/30 bg-parchment px-3 py-2 text-sm outline-none focus:border-gold"
                  >
                    <option value="groom">Groom</option>
                    <option value="bride">Bride</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[0.65rem] tracking-widest uppercase text-walnut-muted">Attendance</label>
                  <select
                    value={newEntry.attendance}
                    onChange={e => setNewEntry({ ...newEntry, attendance: e.target.value as 'solo' | 'family', partySize: e.target.value === 'solo' ? 1 : 2 })}
                    className="border border-gold/30 bg-parchment px-3 py-2 text-sm outline-none focus:border-gold"
                  >
                    <option value="solo">Individual</option>
                    <option value="family">Family</option>
                  </select>
                </div>
                {newEntry.attendance === 'family' && (
                  <div className="flex flex-col gap-1">
                    <label className="text-[0.65rem] tracking-widest uppercase text-walnut-muted">Party Size</label>
                    <input
                      type="number"
                      min={2}
                      max={50}
                      value={newEntry.partySize}
                      onChange={e => setNewEntry({ ...newEntry, partySize: Number(e.target.value) })}
                      className="border border-gold/30 bg-parchment px-3 py-2 text-sm w-24 outline-none focus:border-gold"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleAdd}
                    disabled={busy}
                    className="border border-gold/40 bg-gold/10 text-walnut px-5 py-2 text-sm tracking-wide transition-all duration-300 hover:bg-gold/20 disabled:opacity-40"
                  >
                    {busy ? 'Adding…' : 'Add'}
                  </button>
                  <button
                    onClick={() => { setShowAdd(false); setNewEntry({ name: '', side: 'groom', attendance: 'solo', partySize: 1 }) }}
                    disabled={busy}
                    className="border border-gold/20 text-walnut-muted px-5 py-2 text-sm tracking-wide transition-all duration-300 hover:bg-parchment disabled:opacity-40"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              disabled={editId !== null}
              className="border border-gold/40 bg-gold/10 text-walnut px-5 py-2.5 text-sm tracking-wide transition-all duration-300 hover:bg-gold/20 disabled:opacity-40"
            >
              + Add RSVP
            </button>
          )}
        </div>

        {!side && (
          <div className="flex gap-2 mb-4">
            {(['all', 'groom', 'bride'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-heading text-[0.7rem] tracking-[2px] uppercase px-4 py-2 border transition-all duration-200 ${
                  filter === f
                    ? 'border-gold/60 bg-white/70 text-walnut'
                    : 'border-gold/20 text-walnut-muted hover:border-gold/40'
                }`}
              >
                {f === 'all' ? 'All' : f === 'groom' ? "Groom's Side" : "Bride's Side"}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <p className="text-center text-walnut-muted py-16 font-body">Loading…</p>
        ) : rsvps.length === 0 ? (
          <p className="text-center text-walnut-muted py-16 font-body text-lg">
            No RSVPs yet — share the invitation link!
          </p>
        ) : (
          <div className="overflow-x-auto border border-gold/20">
            <table className="w-full border-collapse font-body text-sm">
              <thead>
                <tr>
                  {['#', 'Name', 'Side', 'Attendance', 'Party Size', 'Submitted', ''].map(h => (
                    <th key={h} className="bg-parchment-mid text-walnut text-left px-5 py-4 text-[0.7rem] tracking-widest uppercase border-b border-gold/20">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r, i) => {
                  const isEditing = editId === r.id
                  return (
                    <tr key={r.id} className="border-b border-gold/10 hover:bg-parchment-mid/50 transition-colors">
                      <td className="px-5 py-4 text-walnut-muted">{i + 1}</td>

                      {isEditing && draft ? (
                        <>
                          <td className="px-5 py-4">
                            <input
                              value={draft.name}
                              onChange={e => setDraft({ ...draft, name: e.target.value })}
                              className="border border-gold/30 bg-parchment px-2 py-1 text-sm w-full outline-none focus:border-gold"
                            />
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={draft.side}
                              onChange={e => setDraft({ ...draft, side: e.target.value as 'bride' | 'groom' })}
                              className="border border-gold/30 bg-parchment px-2 py-1 text-sm outline-none focus:border-gold"
                            >
                              <option value="bride">Bride</option>
                              <option value="groom">Groom</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={draft.attendance}
                              onChange={e => setDraft({ ...draft, attendance: e.target.value as 'solo' | 'family', partySize: e.target.value === 'solo' ? 1 : draft.partySize < 2 ? 2 : draft.partySize })}
                              className="border border-gold/30 bg-parchment px-2 py-1 text-sm outline-none focus:border-gold"
                            >
                              <option value="solo">Individual</option>
                              <option value="family">Family</option>
                            </select>
                          </td>
                          <td className="px-5 py-4">
                            {draft.attendance === 'family' ? (
                              <input
                                type="number"
                                min={2}
                                max={50}
                                value={draft.partySize}
                                onChange={e => setDraft({ ...draft, partySize: Number(e.target.value) })}
                                className="border border-gold/30 bg-parchment px-2 py-1 text-sm w-20 outline-none focus:border-gold"
                              />
                            ) : (
                              <span className="text-walnut-muted text-sm">1 person</span>
                            )}
                          </td>
                          <td className="px-5 py-4 text-walnut-muted text-xs">{new Date(r.at).toLocaleString()}</td>
                          <td className="px-5 py-4">
                            {!readOnly && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleSave(r.id)}
                                  disabled={busy}
                                  className="border border-gold/40 bg-gold/10 text-walnut px-3 py-1 text-xs tracking-wide transition-all duration-300 hover:bg-gold/20 disabled:opacity-40"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={cancelEdit}
                                  disabled={busy}
                                  className="border border-gold/20 text-walnut-muted px-3 py-1 text-xs tracking-wide transition-all duration-300 hover:bg-parchment-mid disabled:opacity-40"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4 font-semibold">{r.name}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-block px-3 py-1 text-[0.7rem] tracking-wide border ${
                              r.side === 'bride'
                                ? 'bg-rose/10 border-rose/30 text-rose'
                                : 'bg-gold/10 border-gold/30 text-walnut'
                            }`}>
                              {r.side === 'bride' ? 'Bride' : 'Groom'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-block px-3 py-1 text-[0.7rem] tracking-wide border ${
                              r.attendance === 'solo'
                                ? 'bg-rose/10 border-rose/30 text-rose'
                                : 'bg-gold/10 border-gold/30 text-walnut'
                            }`}>
                              {r.attendance === 'solo' ? 'Individual' : 'Family'}
                            </span>
                          </td>
                          <td className="px-5 py-4">{r.partySize} {r.partySize === 1 ? 'person' : 'people'}</td>
                          <td className="px-5 py-4 text-walnut-muted text-xs">{new Date(r.at).toLocaleString()}</td>
                          <td className="px-5 py-4">
                            {!readOnly && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => startEdit(r)}
                                  disabled={busy || editId !== null}
                                  className="border border-gold/40 bg-gold/10 text-walnut px-3 py-1 text-xs tracking-wide transition-all duration-300 hover:bg-gold/20 disabled:opacity-40"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(r.id, r.name)}
                                  disabled={busy || editId !== null}
                                  className="border border-rose/40 bg-rose/10 text-rose px-3 py-1 text-xs tracking-wide transition-all duration-300 hover:bg-rose/20 disabled:opacity-40"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          {flash && <span className="text-gold text-sm font-body">{flash}</span>}
          <div className="ms-auto flex gap-3">
            <button
              onClick={fetchRsvps}
              disabled={loading}
              className="border border-gold/40 bg-gold/10 text-walnut px-5 py-2.5 text-sm tracking-wide transition-all duration-300 hover:bg-gold/20 disabled:opacity-40"
            >
              {loading ? 'Loading…' : 'Refresh'}
            </button>
            {!side && (
              <button
                onClick={handleClear}
                disabled={busy}
                className="border border-rose/40 bg-rose/10 text-rose px-5 py-2.5 text-sm tracking-wide transition-all duration-300 hover:bg-rose/20 disabled:opacity-40"
              >
                {busy ? 'Clearing…' : 'Clear All RSVPs'}
              </button>
            )}
          </div>
        </div>
      </div>
      <WhatsAppShare />
    </div>
  )
}
