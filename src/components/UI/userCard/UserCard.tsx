import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import classes from './UserCard.module.scss';
import { IPerson } from '../../../assets/data/team';

const UserCard: React.FC<IPerson> = ({ name, image, role, git, bio }): JSX.Element => {
  return (
    <div className={classes.userCard}>
      <div>
        <img src={image} className={classes.userCard__image} />
        <h2 className={classes.userCard__name}>{name}</h2>
        <p className={classes.userCard__role}>{role}</p>
      </div>
      <div className={classes.userCard__text}>
        <ul>
          {bio.map((item, index) => (
            <li key={index}>
              <KeyboardArrowRightIcon />
              {item}
            </li>
          ))}
        </ul>
        <a className={classes.userCard__git} href={`https://github.com/${git}`} target="_blank">
          {git}
        </a>
      </div>
    </div>
  );
};

export default UserCard;
