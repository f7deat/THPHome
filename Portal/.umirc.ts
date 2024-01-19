import { defineConfig } from '@umijs/max';
import defaultSettings from './config/defaultSetting';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    ...defaultSettings
  },
  history: {
    type: 'hash'
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Dashboard',
      path: '/home',
      component: './Home',
    },
    {
      name: 'Bài viết',
      path: '/post/list',
      component: './posts/post-list',
    },
    {
      name: 'Bài viết',
      path: '/post/setting',
      component: './posts/post-setting',
      hideInMenu: true
    },
    {
      name: 'Bài viết',
      path: '/post/setting/:id',
      component: './posts/post-setting',
      hideInMenu: true
    },
    {
      name: 'Danh mục',
      path: '/category/list',
      component: './categories/category-list',
    },
    {
      name: 'Phòng ban',
      path: '/departments',
      component: './departments',
    },
    {
      name: 'Phòng ban',
      path: '/department/detail/:id',
      component: './departments/details',
      hideInMenu: true
    },
    {
      name: 'Video',
      path: '/videos',
      component: './videos/video-setting',
    },
    {
      name: 'Người dùng',
      path: '/users',
      component: './users/user-list',
    },
    {
      name: 'Đối tác',
      path: '/partners',
      component: './partners/partner-setting',
    },
    {
      name: 'Tài liệu',
      path: '/files',
      component: './files/file-explorer',
    },
    {
      name: 'Banner',
      path: '/banners',
      component: './banners/banner-list',
    },
    {
      name: 'Bình luận',
      path: '/comments',
      component: './comments/comment-list',
    },
    {
      name: 'Quyền',
      path: '/roles',
      component: './roles/role-list',
    },
    {
      name: 'Cài đặt',
      path: '/settings',
      routes: [
        {
          name: 'Menu',
          path: '/settings/menus',
          component: './settings/menus',
        },
        {
          name: 'Ngôn ngữ',
          path: '/settings/localizations',
          component: './settings/localizations',
        }
      ]
    },
    {
      path: '/accounts',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/accounts/login',
          component: './accounts/login'
        }
      ],
    },
  ],
  npmClient: 'pnpm',
});

