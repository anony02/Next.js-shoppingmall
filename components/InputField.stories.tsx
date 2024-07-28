/** @jsxImportSource @emotion/react */
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputField from '../components/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const Template: StoryFn<React.ComponentProps<typeof InputField>> = (args) => (
  <InputField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: '아이디',
  type: 'text',
  value: '',
  onChange: (e) => console.log(e.target.value),
  error: '',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: '비밀번호',
  type: 'password',
  value: '',
  onChange: (e) => console.log(e.target.value),
  error: '비밀번호는 최소 8자 이상이어야 합니다.',
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: '이메일',
  type: 'email',
  value: 'example@example.com',
  onChange: (e) => console.log(e.target.value),
  error: '',
};
