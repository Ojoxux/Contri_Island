import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) =>
      React.createElement('div', {
        className: 'p-4 bg-acnh-beige min-h-screen',
        children: Story(),
      }),
  ],
};

export default preview;
