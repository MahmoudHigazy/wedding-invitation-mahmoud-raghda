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

export async function clearRsvps(): Promise<void> {
  await kv.set('rsvps', [])
}
