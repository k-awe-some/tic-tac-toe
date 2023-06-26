import { Mark } from './game.service';

export const areAllValuesPresent = (arr: (Mark | '')[]): boolean => {
  return arr.every((item) => item);
};

export const getRandomItem = (arr: number[]): number | null => {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
};
