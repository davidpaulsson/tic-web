import { Meta, StoryFn } from '@storybook/react';

import React from 'react';

import { Footer } from './footer';

export default {
  title: 'Sections/Footer',
  component: Footer,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn = () => <Footer />;

export const Default = Template.bind({});
