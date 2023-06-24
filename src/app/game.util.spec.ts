import { Mark } from './game.service';
import { areAllValuesPresent } from './game.util';

describe('GameUtil', () => {
  describe('#areAllValuesPresent', () => {
    it('should return true if all values are present in array', () => {
      expect(areAllValuesPresent([Mark.X, Mark.O, Mark.O])).toBeTrue();
    });

    it('should return false if not all values are present in array', () => {
      expect(areAllValuesPresent([Mark.X, '', Mark.O])).toBeFalse();
    });
  });
});
