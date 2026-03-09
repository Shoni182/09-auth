// app/notes/filter/@sidebar/default.tsx
import css from './SidebarNotes.module.css';
import Link from 'next/link';

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      {/* список тегів */}
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>

      <li className={css.menuItem} key={'Todo'}>
        <Link href={`/notes/filter/Todo`} className={css.menuLink}>
          Todo
        </Link>
      </li>
      <li className={css.menuItem} key={'Work'}>
        <Link href={`/notes/filter/Work`} className={css.menuLink}>
          Work
        </Link>
      </li>
      <li className={css.menuItem} key={'Personal'}>
        <Link href={`/notes/filter/Personal`} className={css.menuLink}>
          Personal
        </Link>
      </li>
      <li className={css.menuItem} key={'Meeting'}>
        <Link href={`/notes/filter/Meeting`} className={css.menuLink}>
          Meeting
        </Link>
      </li>

      <li className={css.menuItem} key={'Shopping'}>
        <Link href={`/notes/filter/Shopping`} className={css.menuLink}>
          Shopping
        </Link>
      </li>

      <li className={css.menuItem} key={'Travel'}>
        <Link href={`/notes/filter/Travel`} className={css.menuLink}>
          Travel
        </Link>
      </li>

      <li className={css.menuItem} key={'Finanace'}>
        <Link href={`/notes/filter/Finanace`} className={css.menuLink}>
          Finanace
        </Link>
      </li>
      <li className={css.menuItem} key={'Health'}>
        <Link href={`/notes/filter/Health`} className={css.menuLink}>
          Health
        </Link>
      </li>
      <li className={css.menuItem} key={'Important'}>
        <Link href={`/notes/filter/Important`} className={css.menuLink}>
          Important
        </Link>
      </li>
    </ul>
  );
};

export default SidebarNotes;
