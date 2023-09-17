import classes from './UserCard.module.scss';

interface IUserCard {
  name: string;
  image: string;
  role: string;
  git: string;
}

const UserCard: React.FC<IUserCard> = ({ name, image, role, git }): JSX.Element => {
  return (
    <div className={classes.userCard}>
      <div>
        <img src={image} className={classes.userCard__image} />
        <h2 className={classes.userCard__name}>{name}</h2>
        <p className={classes.userCard__role}>{role}</p>
      </div>
      <div className={classes.userCard__text}>
        <p>Краткая биография</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit maxime quod odio, quis qui repellendus
          voluptatibus! Nostrum, iure distinctio. Distinctio unde quas molestias repudiandae reprehenderit doloribus
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit maxime quod odio, quis qui repellendus
          voluptatibus! Nostrum, iure distinctio.
        </p>
        <a className={classes.userCard__git} href={`https://github.com/${git}`} target="_blank">
          {git}
        </a>
      </div>
    </div>
  );
};

export default UserCard;
