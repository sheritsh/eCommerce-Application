import React from 'react';
import Container from '../components/UI/container/Container';
import H1 from '../components/UI/titles/h1/H1';

const ProfilePage: React.FC = () => {
  return (
    <div className="content">
      <Container>
        <div className="main">
          <H1 text="Your Profile" />
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
