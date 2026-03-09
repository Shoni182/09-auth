import Link from 'next/link';
import css from './ProfilePage.module.css';
import Image from 'next/image';

//Для коректної роботи з віддаленими зображеннями у Next.js (аватар профілю)
//  потрібно в next.config.ts додати розділ images з масивом remotePatterns,
// який обов’язково містить hostname: 'ac.goit.global'.

const PrivatProfile = () => {
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
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
};

export default PrivatProfile;
