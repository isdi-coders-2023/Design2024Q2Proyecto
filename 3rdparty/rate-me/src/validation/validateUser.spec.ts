import { User } from 'src/types/user';
import { validateUser } from './validateUser';

describe('validateUser', () => {
  const sut = validateUser;
  describe('when validating user', () => {

    it('should return false if birthday is not valid', () => {
      expect(sut({ birthDate: '1976/13/13' } as User)).toBeFalsy();
    });

    it('should return false if has no name', () => {
        expect(sut({ birthDate: '1976/12/11' } as User)).toBeFalsy();
    });

    it('should return false if has no surnames', () => {
        expect(sut({ birthDate: '1976/12/11'} as User)).toBeFalsy();
    });

    it('should return false if email is invalid', () => {
        expect(sut({ birthDate: '1976/12/11', name: 'someName', surnames: 'surnames', 
            email: 'bad-email'
        } as User)).toBeFalsy();
    });
  });
});
