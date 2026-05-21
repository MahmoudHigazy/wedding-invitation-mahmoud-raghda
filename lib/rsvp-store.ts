import { kv } from '@vercel/kv'

export interface RsvpEntry {
  id:         number
  name:       string
  side:       'bride' | 'groom'
  attendance: 'solo' | 'family'
  partySize:  number
  at:         string
}

export async function readRsvps(): Promise<RsvpEntry[]> {
  const entries = (await kv.get<RsvpEntry[]>('rsvps')) ?? []
  return entries.map(e => ({ ...e, side: e.side ?? 'groom' }))
}

export async function appendRsvp(entry: RsvpEntry): Promise<void> {
  const list = await readRsvps()
  list.push(entry)
  await kv.set('rsvps', list)
}

export async function updateRsvp(id: number, patch: Partial<Omit<RsvpEntry, 'id' | 'at'>>): Promise<void> {
  const list = await readRsvps()
  await kv.set('rsvps', list.map(e => e.id === id ? { ...e, ...patch } : e))
}

export async function deleteRsvp(id: number): Promise<void> {
  const list = await readRsvps()
  await kv.set('rsvps', list.filter(e => e.id !== id))
}

export async function clearRsvps(): Promise<void> {
  await kv.set('rsvps', [])
}
