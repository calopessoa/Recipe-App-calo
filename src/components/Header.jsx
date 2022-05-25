import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { PATHS, NO_SEARCH } from '../helpers/pathroute';
import Search from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './styles/header.css';

function Header() {
  const [toggleSearch, setToggleSearch] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const resetSearch = () => setToggleSearch(false);

  return (
    <div className="container-header">
      <header id="header">

        <img
          data-testid="profile-top-btn"
          className="text-white"
          width={28}
          role="presentation"
          src={profileIcon}
          alt="profile"
          onClick={() => navigate('/profile')}
        />

        <h1>
          {PATHS[pathname]}
        </h1>

        <div className="flex gap-5">
          {!NO_SEARCH.some(
            (each) => pathname !== '/explore/foods/nationalities'
              && pathname.includes(each),
          ) && (
              <img
                data-testid="search-top-btn"
                role="presentation"
                width={28}
                src={searchIcon}
                alt="search"
                onClick={() => setToggleSearch(!toggleSearch)}
              />
            )}

        </div>
      </header>

      <Search toggleSearch={toggleSearch} setToggleSearch={resetSearch} />
    </div>
  );
};

export default Header;