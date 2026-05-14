/**
 * Server-only RSVP storage backed by a local JSON file.
 *
 * ⚠  Vercel note: the Vercel file-system is read-only in production.
 *    RSVPs will persist fine locally and on any traditional VPS/container.
 *    For Vercel, swap this module for Vercel KV — see README for a drop-in
 *    replacement.
 */
import fs   from 'fs'
import path from 'path'

export interface RsvpEntry {
  id:         number
  name:       string
  attendance: 'solo' | 'family'
  partySize:  number
  meal:       string
  at:         string
}

const FILE = path.join(process.cwd(), 'data', 'rsvps.json')

export function readRsvps(): RsvpEntry[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf-8')) as RsvpEntry[]
  } catch {
    return []
  }
}

export function appendRsvp(entry: RsvpEntry): void {
  const list = readRsvps()
  list.push(entry)
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2))
}

export function clearRsvps(): void {
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
  fs.writeFileSync(FILE, '[]')
}
