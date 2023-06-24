import { Mark } from './game.service';

export const areAllValuesPresent = (arr: (Mark | '')[]): boolean => {
  return arr.every((item) => item);
};
