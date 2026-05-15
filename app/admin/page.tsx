import { AdminTable } from '@/components/AdminTable'
import { redirect }   from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: { key?: string }
}

export default function AdminPage({ searchParams }: Props) {
  const adminKey = process.env.ADMIN_KEY ?? 'secret'

  if (searchParams.key !== adminKey) {
    redirect('/')
  }

  return <AdminTable adminKey={adminKey} />
}
