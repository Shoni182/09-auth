import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
// import { Roboto } from 'next/font/google';
// import type { Metadata } from 'next';

//: Metatags

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '700'],
//   variable: '--font-roboto',
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: 'Sign up',
//   description: 'Page for sign in in profile',
//   openGraph: {
//     title: 'Sign up',
//     description: 'Page for sign in in profile',
//     url: 'https://08-zustand-eight-beta.vercel.app',
//     images: [
//       {
//         url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//         width: 640,
//         height: 640,
//         alt: 'NoteHub Logo image',
//       },
//     ],
//   },
// };

export default function RootLayout({
  children,
  //   modal,
}: Readonly<{
  children: React.ReactNode;
  // modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          {children}
          {/* {modal} */}
          {/* <div id="modal-root"></div> */}
        </TanStackProvider>
      </body>
    </html>
  );
}
