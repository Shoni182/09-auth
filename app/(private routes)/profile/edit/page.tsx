'use client';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updateMe } from '@/lib/api/clientApi';
import { useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from '@/app/api/api';
import { getMe } from '@/lib/api/clientApi';
import { useEffect } from 'react';
import { User } from '@/types/user';

export type UpdateNameProp = {
  username: string;
};

const EditUserProfile = () => {
  const initialValues: User = {
    username: '',
    email: '',
    avatar: '',
  };

  const router = useRouter();
  const [error, setError] = useState('');
  const [user, setLocalUser] = useState(initialValues);
  const setUser = useAuthStore((state) => state.setUser);

  // Додаємо стан для контрольованого інпуту
  const [usernameInput, setUsernameInput] = useState('');

  const handleBack = () => {
    router.push('/profile');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setLocalUser(data);
        setUsernameInput(data.username); // Ініціалізуємо інпут отриманим значенням
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      setError('');
      const username = formData.get('username') as string;

      if (!username.trim()) {
        setError('Username cannot be empty');
        return;
      }

      const updatedUser = await updateMe({ username });

      if (updatedUser) {
        setUser(updatedUser);
        setLocalUser(updatedUser);
        router.push('/profile'); // Опціонально: редирект після успіху
      } else {
        setError('Invalid username');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error',
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username" // КЛЮЧОВЕ: додано name для FormData
              type="text"
              className={css.input}
              value={usernameInput} // КЛЮЧОВЕ: тепер поле контрольоване
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>

          <p className={css.emailText}>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button onClick={handleBack} type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
          {error && <p className={css.errorMessage}>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditUserProfile;
