import axios from 'axios';

export const getUsername = async (username: string) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  console.log(data);
  return data;
};
