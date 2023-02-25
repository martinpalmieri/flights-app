import Search from '../search/search';
import './header.css';

export const Header = () => (
  <header className="Header">
    <h1 className="Header-title">FlightsApp</h1>
    <Search />
  </header>
);

export default Header;
