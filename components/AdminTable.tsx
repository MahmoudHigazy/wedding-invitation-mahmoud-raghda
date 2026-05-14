'use client'

import { useState }    from 'react'
import { useRouter }   from 'next/navigation'
import type { RsvpEntry } from '@/lib/rsvp-store'

interface Stats {
  responses: number
  total:     number
  solos:     number
  families:  number
}

interface Props {
  rsvps:  RsvpEntry[]
  stats:  Stats
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

export function AdminTable({ rsvps, stats }: Props) {
  const router  = useRouter()
  const [busy,  setBusy]  = useState(false)
  const [flash, setFlash] = useState('')

  async function handleClear() {
    if (!confirm('Clear all RSVPs? This cannot be undone.')) return
    setBusy(true)
    try {
      const params = new URLSearchParams(window.location.search)
      await fetch(`/api/rsvp?key=${params.get('key')}`, { method: 'DELETE' })
      setFlash('Cleared.')
      router.refresh()
    } catch {
      setFlash('Error — could not clear.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-parchment px-6 py-16 text-walnut">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 pb-8 border-b border-gold/20">
          <h1
            className="font-heading font-light text-walnut"
            style={{ fontSize: '2.4rem', fontStyle: 'italic' }}
          >
            RSVP Dashboard
          </h1>
          <p className="text-walnut-muted text-sm mt-1 font-body">Mahmoud &amp; Raghda · Wedding Guest List</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <StatCard value={stats.responses} label="Total RSVPs"   />
          <StatCard value={stats.total}     label="Total Guests"  />
          <StatCard value={stats.solos}     label="Individual"    />
          <StatCard value={stats.families}  label="Family Groups" />
        </div>

        {/* Table */}
        {rsvps.length === 0 ? (
          <p className="text-center text-walnut-muted py-16 font-body text-lg">
            No RSVPs yet — share the invitation link!
          </p>
        ) : (
          <div className="overflow-x-auto border border-gold/20">
            <table className="w-full border-collapse font-body text-sm">
              <thead>
                <tr>
                  {['#', 'Name', 'Attendance', 'Party Size', 'Submitted'].map(h => (
                    <th
                      key={h}
                      className="bg-parchment-mid text-walnut text-left px-5 py-4 text-[0.7rem] tracking-widest uppercase border-b border-gold/20"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r, i) => (
                  <tr key={r.id} className="border-b border-gold/10 hover:bg-parchment-mid/50 transition-colors">
                    <td className="px-5 py-4 text-walnut-muted">{i + 1}</td>
                    <td className="px-5 py-4 font-semibold">{r.name}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-[0.7rem] tracking-wide border ${
                          r.attendance === 'solo'
                            ? 'bg-rose/10 border-rose/30 text-rose'
                            : 'bg-gold/10 border-gold/30 text-walnut'
                        }`}
                      >
                        {r.attendance === 'solo' ? 'Individual' : 'Family'}
                      </span>
                    </td>
                    <td className="px-5 py-4">{r.partySize} {r.partySize === 1 ? 'person' : 'people'}</td>
                    <td className="px-5 py-4 text-walnut-muted text-xs">{new Date(r.at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          {flash && <span className="text-gold text-sm font-body">{flash}</span>}
          <div className="ms-auto">
            <button
              onClick={handleClear}
              disabled={busy}
              className="border border-rose/40 bg-rose/10 text-rose px-5 py-2.5 text-sm tracking-wide transition-all duration-300 hover:bg-rose/20 disabled:opacity-40"
            >
              {busy ? 'Clearing…' : 'Clear All RSVPs'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
