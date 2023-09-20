import React from 'react';
import classes from './AboutUs.module.scss';
import UserCard from '../../components/UI/userCard/UserCard';
import CenterTabs from './CenterTabs';
import FolderList from './FolderList';
import team from '../../assets/data/team';

const AboutUs: React.FC = () => {
  return (
    <div className={classes.aboutUs}>
      <div>
        <h2 className={classes.aboutUs__title}>Team Members</h2>
        <div className={classes.aboutUs__team}>
          {team.map((person, index) => (
            <UserCard
              key={index}
              name={person.name}
              image={person.image}
              role={person.role}
              git={person.git}
              bio={person.bio}
            />
          ))}
        </div>
      </div>
      <div className={classes.aboutUs__contributions}>
        <h2 className={classes.aboutUs__title}>Contributions</h2>
        <CenterTabs />
      </div>
      <div className={classes.aboutUs__collaboration}>
        <h2 className={classes.aboutUs__title}>Collaboration</h2>
        <p className={classes.aboutUs__subTitle}>The success of our team depended on:</p>
        <FolderList />
      </div>
      <a className={classes.aboutUs__logo} href="https://rs.school/js/">
        <img src="/assets/svg/rs_school_js.svg" alt="RS_School_logo" width="100%"></img>
      </a>
    </div>
  );
};

export default AboutUs;
