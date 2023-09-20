interface IMainBrand {
  id: number;
  url: string;
  alt: string;
}

const brands: IMainBrand[] = [
  {
    id: 1,
    url: '/assets/images/brands-main/adidas.jpg',
    alt: 'Adidas',
  },
  {
    id: 2,
    url: '/assets/images/brands-main/columbia.jpg',
    alt: 'Columbia',
  },
  {
    id: 3,
    url: '/assets/images/brands-main/mammut.jpg',
    alt: 'Mammut',
  },
  {
    id: 4,
    url: '/assets/images/brands-main/salewa.jpg',
    alt: 'Salewa',
  },
  {
    id: 5,
    url: '/assets/images/brands-main/solomon.jpg',
    alt: 'Solomon',
  },
];

export default brands;
