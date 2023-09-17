import React from 'react';
import classes from './AboutUs.module.scss';
import UserCard from '../../components/UI/userCard/UserCard';
import CenterTabs from './CenterTabs';
import FolderList from './FolderList';

const AboutUs: React.FC = () => {
  return (
    <div className={classes.aboutUs}>
      <div>
        <h2 className={classes.aboutUs__title}>Team Members</h2>
        <div className={classes.aboutUs__team}>
          <UserCard
            name={'Oleg Polovinko'}
            image={'../assets/images/team/oleg.jpg'}
            role={'Team Lead'}
            git={'sheritsh'}
          />
          <UserCard
            name={'Ekaterina Trifonova'}
            image={'../assets/images/team/kate.jpg'}
            role={'Frontend Developer'}
            git={'ekatrif'}
          />
          <UserCard
            name={'Andrey Nezhdanov'}
            image={'../assets/images/team/andrey.jpg'}
            role={'Frontend Developer'}
            git={'montek1o'}
          />
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
