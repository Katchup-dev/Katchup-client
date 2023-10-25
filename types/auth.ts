export interface AuthInfo {
  nickname: string;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

export interface UserProfileInfo {
  imageUrl: string;
  nickname: string;
  email: string;
}

export interface WithdrawsReasonInfo {
  reason: string[];
}
