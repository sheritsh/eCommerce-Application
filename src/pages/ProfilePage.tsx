import React from 'react';
import Container from '../components/UI/container/Container';
import Profile from '../features/Profile/Profile';

const ProfilePage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <h1>Your Profile</h1>
        <Profile />
      </Container>
    </div>
  );
};

export default ProfilePage;
