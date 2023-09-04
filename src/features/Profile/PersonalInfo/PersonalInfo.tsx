import classes from './PersonalInfo.module.scss';

interface PersonalInfoProps {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ firstName, lastName, birthDate, email }) => {
  return (
    <div className={classes.profile__personal}>
      <div className={classes.profile__item}>
        <p className={classes.profile__item__title}>FIRST NAME</p>
        <p className={classes.profile__item__value}>{firstName}</p>
      </div>
      <div className={classes.profile__item}>
        <p className={classes.profile__item__title}>LAST NAME</p>
        <p className={classes.profile__item__value}>{lastName}</p>
      </div>
      <div className={classes.profile__item}>
        <p className={classes.profile__item__title}>BIRTH DATE</p>
        <p className={classes.profile__item__value}>{birthDate}</p>
      </div>
      <div className={classes.profile__item}>
        <p className={classes.profile__item__title}>EMAIL</p>
        <p className={classes.profile__item__value}>{email}</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
