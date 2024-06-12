import { User } from '../types/user';
import { UserSequence } from '../utils/UserSequence';

export const validateUser = (user: User): boolean => {
  if (user.id) {
    if (!user.email) {
      if (user.referal) {
        //referals can omit email
      }
    } else {
      const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      if (regex.test(user.email)) {
        //email is ok
      } else {
        if (user.referal) {
          //users with referal can omit email
        }
      }
    }
    if (!user.name) {
      return false;
    }
    if (!user.surnames) {
      return false;
    }

    const birthDate = user.birthDate.replaceAll('-', '/');
    if (!isNaN(new Date(birthDate).getMilliseconds())) {
      return false;
    }
  } else {
    user.id = UserSequence.getInstance().getNext();
    const birthDate = user.birthDate.replaceAll('-', '/');
    if (isNaN(new Date(birthDate).getMilliseconds())) {
      return false;
    }

    if (!user.name) {
      return false;
    }
    if (!user.surnames) {
      return false;
    }
    if (!user.email) {
      if (user.referal) {
        //referals can omit email
      }
    } else {
      const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
      if (regex.test(user.email)) {
        //email is ok
      } else {
        if (user.referal) {
          //users with referal can omit email
        }
      }
    }
  }

  if (user.tier === 'premium') {
    if (user.discount !== null) {
      return true;
    } else {
      return false;
    }
  }
  return user.discount === null;
};
