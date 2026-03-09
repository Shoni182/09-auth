'use client';
import css from './Header.module.css';
import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

// import { useAuthStore } from '@/lib/store/authStore';
// import { logout } from '@/lib/api/clientApi';
// import { useRouter } from 'next/navigation';

const Header = () => {
  // const router = useRouter();
  // const { isAuth, user } = useAuthStore();
  // const [refresh, setIsRefres] = useState();

  // const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuth);

  // const handleLogout = async () => {
  //   // Call logout
  //   await logout();
  //   // Чистимо глобальний стан
  //   clearIsAuthenticated();
  //   // Виконуємо навігацію на сторінку аторизації
  //   router.push('/sign-in');
  // };

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
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
