import { defineConfig } from '@umijs/max';
import defaultSettings from './config/defaultSetting';

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: '#00387a',
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
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      icon: 'DashboardOutlined',
      name: 'dashboard',
      path: '/home',
      component: './Home',
    },
    {
      icon: 'FormOutlined',
      name: 'Nội dung',
      path: '/post',
      routes: [
        {
          name: 'Entry',
          path: '/post/entry',
          component: './posts/entry',
        },
        {
          name: 'Tin tức',
          path: '/post/article',
          component: './posts/article',
        },
        {
          name: 'Thông báo',
          path: '/post/notification',
          component: './posts/notification',
        },
        {
          name: 'Trang',
          path: '/post/page',
          component: './posts/pages/list',
        },
        {
          name: 'Bài viết mới',
          path: '/post/setting',
          component: './posts/post-setting',
          hideInMenu: true,
        },
        {
          name: 'Chỉnh sửa',
          path: '/post/setting/:id',
          component: './posts/post-setting',
          hideInMenu: true,
        },
        {
          name: 'Page Builder',
          path: '/post/page/:id',
          component: './posts/pages',
          hideInMenu: true,
        },
        {
          name: 'Tuyển sinh',
          path: '/post/admission',
          component: './posts/admission',
        },
        {
          name: 'Câu hỏi thường gặp',
          path: '/post/qa',
          component: './posts/qa',
        },
        {
          name: 'Danh sách câu hỏi',
          path: '/post/qa/item/:id',
          component: './posts/qa/item',
          hideInMenu: true,
        },
      ],
    },
    {
      icon: 'AppstoreAddOutlined',
      name: 'category',
      path: '/category/list',
      component: './categories/category-list',
    },
    {
      icon: 'ApartmentOutlined',
      name: 'Phòng ban',
      path: '/departments',
      component: './departments',
    },
    {
      name: 'Phòng ban',
      path: '/department/detail/:id',
      component: './departments/details',
      hideInMenu: true,
    },
    {
      icon: 'TeamOutlined',
      name: 'Tài khoản',
      path: '/user',
      routes: [
        {
          name: 'Người dùng',
          path: '/user',
          component: './users/user-list',
        },
        {
          name: 'Chỉnh sửa người dùng',
          path: '/user/edit/:id',
          component: './users/user-edit',
          hideInMenu: true,
        },
        {
          name: 'Hồ sơ',
          path: '/user/profile/:id',
          component: './users/profile',
          hideInMenu: true,
        },
      ],
    },
    {
      icon: 'SolutionOutlined',
      name: 'Đối tác',
      path: '/partners',
      component: './partners/partner-setting',
    },
    {
      icon: 'DownloadOutlined',
      name: 'fileManager',
      path: '/files',
      component: './files',
    },
    {
      icon: 'PictureOutlined',
      name: 'Multimedia',
      path: '/media',
      routes: [
        {
          name: 'Thư viện ảnh',
          path: '/media/gallery',
          component: './gallery',
        },
        {
          name: 'Hình ảnh',
          path: '/media/gallery/photo/:id',
          component: './gallery/photo',
          hideInMenu: true,
        },
        {
          name: 'Video',
          path: '/media/videos',
          component: './videos/video-setting',
        },
      ],
    },
    {
      icon: 'ToolOutlined',
      name: 'Công cụ',
      path: '/tool',
      component: './tools'
    },
    {
      name: 'Email',
      path: '/tool/email',
      component: './tools/email',
      hideInMenu: true
    },
    {
      icon: 'SettingOutlined',
      name: 'setting',
      path: '/settings',
      routes: [
        {
          name: 'general',
          path: '/settings/general',
          component: './settings/general',
        },
        {
          name: 'application',
          path: '/settings/application',
          component: './settings/app'
        },
        {
          name: 'Menu',
          path: '/settings/menus',
          component: './settings/menus',
        },
        {
          name: 'language',
          path: '/settings/localizations',
          component: './settings/localizations',
        },
        {
          name: 'Slide',
          path: '/settings/banners',
          component: './banners/banner-list',
        },
        {
          name: 'roles',
          path: '/settings/roles',
          component: './roles/role-list',
        },
        {
          name: 'Bài viết trên Zalo OA',
          path: '/settings/application/zalo-article',
          component: './settings/app/zalo/article',
          hideInMenu: true
        }
      ],
    },
    {
      path: '/onboard',
      name: 'Onboard',
      icon: 'LoginOutlined',
      routes: [
        {
          path: '/onboard',
          redirect: '/onboard/dashboard'
        },
        {
          name: 'Dashboard',
          path: '/onboard/dashboard',
          component: './onboard/dashboard'
        },
        {
          name: 'Chuyên ngành',
          path: '/onboard/major',
          component: './onboard/major'
        },
        {
          name: 'Đăng ký chuyên ngành',
          path: '/onboard/form',
          component: './onboard'
        },
        {
          name: 'Tuần CDSV',
          path: '/onboard/fist-week',
          component: './onboard/fist-week'
        },
        {
          name: 'Lịch sử',
          path: '/onboard/history',
          component: './onboard/history'
        }
      ]
    },
    {
      path: '/exam',
      icon: 'QuestionCircleOutlined',
      name: 'exam',
      routes: [
        {
          path: '/exam',
          redirect: '/exam/dashboard'
        },
        {
          name: 'Kỳ thi',
          component: './exam',
          path: '/exam/dashboard'
        },
        {
          name: 'Câu hỏi',
          path: '/exam/question/:id',
          component: './exam/question',
          hideInMenu: true
        },
        {
          name: 'Đề thi',
          path: '/exam/version/:id',
          component: './exam/version',
          hideInMenu: true
        },
        {
          name: 'Câu trả lời',
          path: '/exam/answer/:id',
          component: './exam/answer',
          hideInMenu: true
        },
        {
          name: 'history',
          path: '/exam/history',
          component: './exam/history'
        }
      ],
      access: 'admin'
    },
    {
      path: '/accounts',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/accounts/login',
          component: './accounts/login',
        },
      ],
    },
  ],

  npmClient: 'pnpm',
  tailwindcss: {},
});
