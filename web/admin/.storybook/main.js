module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    "storybook-addon-styled-component-theme/dist/register",
      {
        name: '@storybook/addon-docs',
        options: {
          configureJSX: true,
          babelOptions: {},
          sourceLoaderOptions: null,
        },
      },
    ],
};
