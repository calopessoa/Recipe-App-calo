import React from 'react';
import { useNavigate } from 'react-router';
import { getEmailStoraged } from '../storage';

function ProfileSpecs() {
  const { email } = getEmailStoraged();
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigation('/');
  };

  return (
    <div className="body-profile">
      <p
        data-testid="profile-email"
        className="profile-email"
      >
        { email }
      </p>
      <div className="btns">
        <button
          className="pages"
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => navigation('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="pages"
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => navigation('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
      </div>
      <button
        className="logout-btn"
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => handleLogout() }
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileSpecs;