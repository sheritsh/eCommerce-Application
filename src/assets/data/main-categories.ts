interface IMainCategory {
  img: string;
  title: string;
  link: string;
}

const categories: IMainCategory[] = [
  {
    img: '/assets/images/categories-main/shoes.jpg',
    title: 'Shoes',
    link: '/categories/fc6a4245-9a8b-4efd-aefb-0a09546b7e5e',
  },
  {
    img: '/assets/images/categories-main/clothing.jpg',
    title: 'Clothing',
    link: '/categories/8349580f-39e6-46c2-85dd-98d633897d70',
  },
];

export default categories;
