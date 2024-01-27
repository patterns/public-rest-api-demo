
import { redirect } from 'next/navigation';
import { auth } from '../api/auth/[...nextauth]/auth';

export const runtime = 'edge';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) return redirect('/');

  return <>{children}</>;
}
