interface ISlide {
  id: number;
  url: string;
  alt: string;
}

const slides: ISlide[] = [
  {
    id: 1,
    url: '/assets/images/slider-main/slide-1.jpg',
    alt: 'Slide 1',
  },
  {
    id: 2,
    url: '/assets/images/slider-main/slide-2.jpg',
    alt: 'Slide 2',
  },
  {
    id: 3,
    url: '/assets/images/slider-main/slide-3.jpg',
    alt: 'Slide 3',
  },
  {
    id: 4,
    url: '/assets/images/slider-main/slide-4.jpg',
    alt: 'Slide 4',
  },
];

export default slides;
