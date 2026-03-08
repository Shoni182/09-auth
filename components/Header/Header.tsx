'use client';
import css from './Header.module.css';
import Link from 'next/link';

import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
  const { isAuth, user } = useAuthStore();

  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuth);

  const handleLogout = async () => {
    // Call logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку аторизації
    router.push('/sign-in');
  };

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>

          {isAuth ? (
            <li className={css.navigationItem}>
              <p className={css.userEmail}>{user?.username}</p>
              <button onClick={handleLogout} className={css.logoutButton}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className={css.navigationItem}>
                <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                  Login
                </Link>
              </li>
              <li className={css.navigationItem}>
                <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
