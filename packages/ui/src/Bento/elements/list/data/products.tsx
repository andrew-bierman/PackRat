import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
const bags = {
  Clutch: 'https://www.tamagui.dev/bento/images/bag/bag1.jpg',
  'Duffle Bag': 'https://www.tamagui.dev/bento/images/bag/bag2.jpg',
  'Fanny Pack': 'https://www.tamagui.dev/bento/images/bag/bag3.webp',
  'Messenger Bag': 'https://www.tamagui.dev/bento/images/bag/bag4.webp',
  Satchel: 'https://www.tamagui.dev/bento/images/bag/bag2.jpg',
  'Shoulder Bag': 'https://www.tamagui.dev/bento/images/bag/bag3.webp',
  Tote: 'https://www.tamagui.dev/bento/images/bag/bag1.jpg',
  Weekender: 'https://www.tamagui.dev/bento/images/bag/bag4.webp',
  Wristlet: 'https://www.tamagui.dev/bento/images/bag/bag2.jpg',
};

const watchNames = {
  'Analog Watch': 'https://www.tamagui.dev/bento/images/watches/watch1.webp',
  'Chronograph Watch':
    'https://www.tamagui.dev/bento/images/watches/watch2.jpg',
  'Digital Watch': 'https://www.tamagui.dev/bento/images/watches/watch3.jpg',
  'Dive Watch': 'https://www.tamagui.dev/bento/images/watches/watch4.jpg',
  'Dress Watch': 'https://www.tamagui.dev/bento/images/watches/watch5.jpeg',
  'Field Watch': 'https://www.tamagui.dev/bento/images/watches/watch6.jpeg',
  'Mechanical Watch':
    'https://www.tamagui.dev/bento/images/watches/watch7.webp',
  'Pilot Watch': 'https://www.tamagui.dev/bento/images/watches/watch8.webp',
  Smartwatch: 'https://www.tamagui.dev/bento/images/watches/watch9.webp',
  'Sports Watch': 'https://www.tamagui.dev/bento/images/watches/watch10.webp',
};

const shoeNames = {
  'Ballet Flat': 'https://www.tamagui.dev/bento/images/shoes/shoe2.webp',
  Boot: 'https://www.tamagui.dev/bento/images/shoes/shoe2.webp',
  Clog: 'https://www.tamagui.dev/bento/images/shoes/shoe3.webp',
  Espadrille: 'https://www.tamagui.dev/bento/images/shoes/shoe4.avif',
  Loafer: 'https://www.tamagui.dev/bento/images/shoes/shoe5.jpg',
  Mule: 'https://www.tamagui.dev/bento/images/shoes/shoe6.webp',
  Oxford: 'https://www.tamagui.dev/bento/images/shoes/shoe7.jpg',
  Pump: 'https://www.tamagui.dev/bento/images/shoes/shoe8.png',
  Sandal: 'https://www.tamagui.dev/bento/images/shoes/shoe9.jpg',
  Sneaker: 'https://www.tamagui.dev/bento/images/shoes/shoe10.webp',
};

const jacketNames = {
  'Bomber Jacket': 'https://www.tamagui.dev/bento/images/jacket/jacket1.jpg',
  'Denim Jacket': 'https://www.tamagui.dev/bento/images/jacket/jacket2.webp',
  'Leather Jacket': 'https://www.tamagui.dev/bento/images/jacket/jacket3.jpg',
  Parka: 'https://www.tamagui.dev/bento/images/jacket/jacket4.jpg',
  Peacoat: 'https://www.tamagui.dev/bento/images/jacket/jacket5.jpg',
  'Puffer Jacket': 'https://www.tamagui.dev/bento/images/jacket/jacket5.jpg',
  'Rain Jacket': 'https://www.tamagui.dev/bento/images/jacket/jacket7.webp',
  'Trench Coat': 'https://www.tamagui.dev/bento/images/jacket/jacket8.jpg',
  Windbreaker: 'https://www.tamagui.dev/bento/images/jacket/jacket9.jpg',
  Overcoat: 'https://www.tamagui.dev/bento/images/jacket/jacket10.jpg',
};

export const getProducts = () => {
  const allImages = [bags, watchNames, shoeNames, jacketNames];
  return Array.from({ length: 20 })
    .fill(0)
    .map((_, i) => {
      const category = allImages[i % allImages.length];
      const name = Object.keys(category)[i % 10];
      const image = category[name];
      return {
        id: i,
        name,
        price: faker.commerce.price(),
        discount: faker.number.int({ min: 10, max: 50 }),
        image: image,
        desc: faker.commerce.productDescription(),
      };
    });
};

export type Product = ReturnType<typeof getProducts>[0];

export function useData() {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    setData(getProducts());
  }, []);
  return { data };
}
