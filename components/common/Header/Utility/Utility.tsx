import SearchBox from 'components/common/Header/Utility/SearchBox';
import { DEFAULT_PROFILE_IMAGE } from 'constants/katchupDefault';
import { IcHelp } from 'public/assets/icons';
import { UserProfileInfo } from 'types/auth';

import styled from '@emotion/styled';

interface UtilityProps {
  profile: UserProfileInfo | null;
  helpButtonRef: React.RefObject<HTMLButtonElement>;
  settingButtonRef: React.RefObject<HTMLButtonElement>;
  handleHelp: () => void;
  handleSetting: () => void;
}

const Utility = ({ profile, helpButtonRef, settingButtonRef, handleHelp, handleSetting }: UtilityProps) => (
  <>
    <SearchBox />
    <StHelpButton type="button" onClick={handleHelp} ref={helpButtonRef}>
      <IcHelp />
    </StHelpButton>
    <StSettingButton type="button" onClick={handleSetting} ref={settingButtonRef}>
      <StProfileImg src={profile?.imageUrl || DEFAULT_PROFILE_IMAGE} />
    </StSettingButton>
  </>
);

export default Utility;

const StHelpButton = styled.button`
  object-fit: fit;
  background-color: transparent;
  border: none;
`;

const StSettingButton = styled.button``;

const StProfileImg = styled.img`
  width: 4.5rem;
  height: 4.5rem;

  object-fit: fit;

  border: 1px solid ${({ theme }) => theme.colors.katchup_main};
  border-radius: 50%;
`;
