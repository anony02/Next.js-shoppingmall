/** @jsxImportSource @emotion/react */
import { Meta, StoryFn } from '@storybook/react';
import Logo from './Logo';
import { css } from '@emotion/react';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
};

export default meta;

type LogoProps = {
  fontSize?: string;
};

const LogoWithStyle = ({ fontSize }: LogoProps) => {
  const logoStyle = css`
    font-weight: bold;
    text-decoration: none;
    color: black;
    font-size: ${fontSize || '1rem'};
  `;

  return <Logo customCss={logoStyle} />;
};

const Template: StoryFn<LogoProps> = (args) => <LogoWithStyle {...args} />;

export const Default = Template.bind({});
Default.args = {
  fontSize: '1rem',
};

export const Small = Template.bind({});
Small.args = {
  fontSize: '0.75rem',
};

export const Large = Template.bind({});
Large.args = {
  fontSize: '1.5rem',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  fontSize: '2rem',
};
