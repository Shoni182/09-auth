'use client';
import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Примусово оновлюємо серверні дані
    router.refresh();

    // 2. Безпечно оновлюємо стан loading
    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  return <>{loading ? <div>Loading...</div> : <TanStackProvider>{children}</TanStackProvider>}</>;
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return <TanStackProvider>{children}</TanStackProvider>;
// }
