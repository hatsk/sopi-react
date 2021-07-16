import { ReactComponent as Logo } from '../../icons/logo.svg';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

import CurrencySwitcher from '../currency-switcher';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/restaurants">
        <Logo />
      </Link>
      <CurrencySwitcher />
    </header>
  );
};

export default Header;
