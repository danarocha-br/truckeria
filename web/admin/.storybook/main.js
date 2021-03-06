module.exports = {
  stories: ['../src/**/*.stories.(js|mdx|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    'themeprovider-storybook/register',
    'storybook-formik/register',
    '@storybook/addon-viewport/register',
  ],
};
