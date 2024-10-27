export const generateTempPassword = () => {
  const lowerCharset = 'abcdefghijklmnopqrstuvwxyz';
  const upperCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberCharset = '0123456789';
  const specialCharset = '!@#$%^&*()_+~';

  const getRandomChar = (charset: string) =>
    charset.charAt(Math.floor(Math.random() * charset.length));

  const tempPassword = [
    getRandomChar(lowerCharset),
    getRandomChar(upperCharset),
    getRandomChar(numberCharset),
    getRandomChar(specialCharset),
  ];

  const allCharset =
    lowerCharset + upperCharset + numberCharset + specialCharset;
  for (let i = 4; i < 8; i++) {
    tempPassword.push(getRandomChar(allCharset));
  }

  for (let i = tempPassword.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempPassword[i], tempPassword[j]] = [tempPassword[j], tempPassword[i]];
  }

  return tempPassword.join('');
};
