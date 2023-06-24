import { Mark } from './game.service';

export const areAllValuesPresent = (arr: (Mark | '')[]): boolean => {
  const find = arr.find((item) => !item);
  return find === '' ? false : true;
};
