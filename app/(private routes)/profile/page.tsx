'use client';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { Metadata } from 'next';

//Для коректної роботи з віддаленими зображеннями у Next.js (аватар профілю)
//  потрібно в next.config.ts додати розділ images з масивом remotePatterns,
// який обов’язково містить hostname: 'ac.goit.global'.

// //: Metatags
// export const metadata: Metadata = {
//   title: 'Profile',
//   description: 'Page of the user profile',
//   openGraph: {
//     title: 'Profile',
//     description: 'Page of the user profile',
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

const PrivatProfile = () => {
  const { user } = useAuthStore();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
};

export default PrivatProfile;
