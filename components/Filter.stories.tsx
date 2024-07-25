import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Filter, { FilterProps } from './Filter';
import { RecoilRoot } from 'recoil';

export default {
  title: 'Components/Filter',
  component: Filter,
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
} as Meta<typeof Filter>;

const Template: StoryFn<FilterProps> = (args) => <Filter {...args} />;

export const Default = Template.bind({});
Default.args = {
  filterName: '낮은가격순',
  name: '낮은가격순',
};

export const HighPrice = Template.bind({});
HighPrice.args = {
  filterName: '높은가격순',
  name: '높은가격순',
};

export const Discount = Template.bind({});
Discount.args = {
  filterName: '할인율순',
  name: '할인율순',
};

export const Rating = Template.bind({});
Rating.args = {
  filterName: '평점순',
  name: '평점순',
};
