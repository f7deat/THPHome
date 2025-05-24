import { defineConfig } from '@umijs/max';
import defaultSettings from './config/defaultSetting';
import routes from "./config/routes";

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: '#00387a'
      },
    },
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    ...defaultSettings,
  },
  history: {
    type: 'hash',
  },
  locale: {
    default: 'vi-VN',
    baseSeparator: '-',
    antd: true,
  },
  routes: routes,
  npmClient: 'pnpm',
  tailwindcss: {},
  hash: true,
  esbuildMinifyIIFE: true,
  mako: {}
});
