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
    <div className="border border-gold/18 bg-gold/[0.03] p-6 text-center min-w-[140px]">
      <span className="font-heading text-gold block" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
        {value}
      </span>
      <div className="text-[0.7rem] tracking-widest uppercase text-ivory/40 mt-1">{label}</div>
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
      await fetch('/api/rsvp?key=secret', { method: 'DELETE' })
      setFlash('Cleared.')
      router.refresh()
    } catch {
      setFlash('Error — could not clear.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#09040c] px-6 py-16 text-ivory">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 pb-8 border-b border-gold/15">
          <h1 className="font-heading italic text-gold" style={{ fontSize: '2.4rem' }}>
            RSVP Dashboard
          </h1>
          <p className="text-ivory-dark text-sm mt-1 font-body">Mahmoud &amp; Raghda · Wedding Guest List</p>
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center flex-wrap mb-10">
          <StatCard value={stats.responses} label="Total RSVPs"    />
          <StatCard value={stats.total}     label="Total Guests"   />
          <StatCard value={stats.solos}     label="Individual"     />
          <StatCard value={stats.families}  label="Family Groups"  />
        </div>

        {/* Table */}
        {rsvps.length === 0 ? (
          <p className="text-center text-ivory/25 py-16 font-body text-lg">
            No RSVPs yet — share the invitation link!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-body text-sm">
              <thead>
                <tr>
                  {['#', 'Name', 'Attendance', 'Party Size', 'Meal', 'Submitted'].map(h => (
                    <th
                      key={h}
                      className="bg-gold/8 text-gold text-left px-5 py-4 text-[0.7rem] tracking-widest uppercase border-b border-gold/15"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r, i) => (
                  <tr key={r.id} className="border-b border-ivory/5 hover:bg-gold/[0.03] transition-colors">
                    <td className="px-5 py-4 opacity-35">{i + 1}</td>
                    <td className="px-5 py-4 font-semibold">{r.name}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-sm text-[0.7rem] tracking-wide border ${
                          r.attendance === 'solo'
                            ? 'bg-burgundy/30 border-burgundy/50 text-red-300'
                            : 'bg-gold/10 border-gold/30 text-gold'
                        }`}
                      >
                        {r.attendance === 'solo' ? 'Individual' : 'Family'}
                      </span>
                    </td>
                    <td className="px-5 py-4">{r.partySize} {r.partySize === 1 ? 'person' : 'people'}</td>
                    <td className="px-5 py-4 opacity-60">{r.meal}</td>
                    <td className="px-5 py-4 opacity-40 text-xs">{new Date(r.at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-8">
          {flash && <span className="text-gold/70 text-sm font-body">{flash}</span>}
          <div className="ms-auto">
            <button
              onClick={handleClear}
              disabled={busy}
              className="border border-burgundy/50 bg-burgundy/25 text-red-300 px-5 py-2.5 text-sm tracking-wide transition-all duration-300 hover:bg-burgundy/45 disabled:opacity-40"
            >
              {busy ? 'Clearing…' : 'Clear All RSVPs'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
