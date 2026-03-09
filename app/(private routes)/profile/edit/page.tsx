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

  const handleBack = () => {
    router.push('/profile');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setLocalUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as UpdateNameProp;
      const user = await updateMe(formValues);
      if (user) {
        setUser(user);
      } else {
        setError('invalid username');
      }
      return;
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

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {user.username}</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email:{user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button onClick={handleBack} type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
};

export default EditUserProfile;
