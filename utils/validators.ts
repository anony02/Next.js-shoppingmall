export const validateUsername = (username: string): string => {
  if (username && !/^[a-zA-Z0-9]{4,12}$/.test(username)) {
    return '아이디는 4~12글자, 영문자와 숫자만 사용할 수 있습니다.';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (
    password &&
    !/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(
      password
    )
  ) {
    return '비밀번호는 8~16글자이며, 영문, 숫자, 특수문자를 모두 포함해야 합니다.';
  }
  return '';
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (confirmPassword && password !== confirmPassword) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return '';
};
