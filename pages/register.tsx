/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const formStyle = css`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
`;

const inputStyle = css`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const buttonStyle = css`
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <input
        css={inputStyle}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        css={inputStyle}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button css={buttonStyle} type="submit">
        회원가입하기
      </button>
    </form>
  );
};

export default Register;
