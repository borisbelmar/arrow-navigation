import type { StorybookConfig } from "@storybook/react-webpack5"
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true
      }
    }
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async config => {
    if (!config.resolve) {
      config.resolve = {
        plugins: [new TsconfigPathsPlugin()]
      }
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }
    return config
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
