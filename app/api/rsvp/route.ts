import { NextResponse } from 'next/server'
import { appendRsvp, readRsvps, clearRsvps } from '@/lib/rsvp-store'
import type { RsvpEntry } from '@/lib/rsvp-store'

export const dynamic = 'force-dynamic'

const ADMIN_KEY = process.env.ADMIN_KEY ?? 'secret'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(await readRsvps())
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as Record<string, unknown>
    const { name, side, attendance, partySize } = body

    if (typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (side !== 'bride' && side !== 'groom') {
      return NextResponse.json({ error: 'Invalid side' }, { status: 400 })
    }
    if (attendance !== 'solo' && attendance !== 'family') {
      return NextResponse.json({ error: 'Invalid attendance type' }, { status: 400 })
    }

    const entry: RsvpEntry = {
      id:         Date.now(),
      name:       name.trim().slice(0, 120),
      side,
      attendance,
      partySize:  attendance === 'family'
                    ? Math.min(Math.max(Number(partySize) || 2, 2), 50)
                    : 1,
      at:         new Date().toISOString(),
    }

    await appendRsvp(entry)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  if (searchParams.get('key') !== ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  await clearRsvps()
  return NextResponse.json({ success: true })
}
