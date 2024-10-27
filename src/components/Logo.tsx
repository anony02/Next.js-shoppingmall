/** @jsxImportSource @emotion/react */
import Link from 'next/link';
import { css, SerializedStyles } from '@emotion/react';

interface LogoProps {
  customCss?: SerializedStyles;
}

const logo = css`
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

export default function Logo({ customCss }: LogoProps) {
  return (
    <Link css={[logo, customCss]} href="/">
      Shopping mall
    </Link>
  );
}
