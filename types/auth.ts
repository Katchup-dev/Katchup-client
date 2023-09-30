export interface AuthInfo {
  nickname: string;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}

export interface UserProfileInfo {
  nickname: string;
}
