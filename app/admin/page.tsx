import { AdminTable } from '@/components/AdminTable'
import { redirect }   from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { key?: string }
}

export default function AdminPage({ searchParams }: Props) {
  const adminKey = process.env.ADMIN_KEY ?? 'secret'
  const key      = searchParams.key

  if (key === 'mahmoud') return <AdminTable adminKey={adminKey} side="groom" />
  if (key === 'raghda')  return <AdminTable adminKey={adminKey} side="bride" />
  if (key !== adminKey)  redirect('/')

  return <AdminTable adminKey={adminKey} />
}
