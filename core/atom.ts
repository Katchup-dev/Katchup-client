import { UserProfileInfo } from 'types/auth';

import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userInfoState = atom<UserProfileInfo>({
  key: `userInfo`,
  default: {
    name: 'Katchup',
  },
  effects_UNSTABLE: [persistAtom],
});
