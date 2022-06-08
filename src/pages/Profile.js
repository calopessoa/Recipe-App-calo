import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileSpecs from '../components/ProfileSpecs';
import './styles/profile.css';

function Profile() {
  return (
    <>
      <Header />
      <ProfileSpecs />
      <Footer />
    </>
  );
}

export default Profile;