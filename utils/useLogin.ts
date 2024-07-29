import { checkUsernameExists } from './api';

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const users = await checkUsernameExists(username);
  if (users.length === 0) throw new Error('일치하는 회원정보가 없습니다.');

  const user = users[0];
  if (user.password !== password)
    throw new Error('비밀번호가 일치하지 않습니다.');

  return user.id;
};
