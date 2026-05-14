import { kv } from '@vercel/kv'

export interface RsvpEntry {
  id:         number
  name:       string
  attendance: 'solo' | 'family'
  partySize:  number
  at:         string
}

export async function readRsvps(): Promise<RsvpEntry[]> {
  return (await kv.get<RsvpEntry[]>('rsvps')) ?? []
}

export async function appendRsvp(entry: RsvpEntry): Promise<void> {
  const list = await readRsvps()
  list.push(entry)
  await kv.set('rsvps', list)
}

export async function clearRsvps(): Promise<void> {
  await kv.set('rsvps', [])
}
