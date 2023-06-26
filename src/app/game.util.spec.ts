import { Mark } from './game.service';
import { areAllValuesPresent, getRandomItem } from './game.util';

describe('GameUtil', () => {
  describe('#areAllValuesPresent', () => {
    it('should return true if all values are present in array', () => {
      expect(areAllValuesPresent([Mark.X, Mark.O, Mark.O])).toBeTrue();
    });

    it('should return false if not all values are present in array', () => {
      expect(areAllValuesPresent([Mark.X, '', Mark.O])).toBeFalse();
    });
  });

  describe('#getRandomItem', () => {
    it('should return a number if input array has length', () => {
      expect(getRandomItem([0, 2, 6, 8])).toBeInstanceOf(Number);
    });

    it('should return null if input array is empty', () => {
      expect(getRandomItem([])).toBeNull();
    });
  });
});
