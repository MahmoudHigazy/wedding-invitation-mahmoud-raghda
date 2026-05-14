import { readRsvps } from '@/lib/rsvp-store'
import { AdminTable } from '@/components/AdminTable'
import { redirect }   from 'next/navigation'

interface Props {
  searchParams: { key?: string }
}

export default async function AdminPage({ searchParams }: Props) {
  const adminKey = process.env.ADMIN_KEY ?? 'secret'

  if (searchParams.key !== adminKey) {
    redirect('/')
  }

  const rsvps    = await readRsvps()
  const total    = rsvps.reduce((s, r) => s + r.partySize, 0)
  const solos    = rsvps.filter(r => r.attendance === 'solo').length
  const families = rsvps.filter(r => r.attendance === 'family').length

  return (
    <AdminTable
      rsvps={rsvps}
      stats={{ total, solos, families, responses: rsvps.length }}
    />
  )
}
