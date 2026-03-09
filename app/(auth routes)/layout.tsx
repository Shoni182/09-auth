import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TanStackProvider>{children}</TanStackProvider>;
}
