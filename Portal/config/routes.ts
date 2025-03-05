export default [
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
    access: 'canEditor',
    routes: [
      {
        name: 'Entry',
        path: '/post/entry',
        component: './posts/entry',
        access: 'canAdmin'
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
        name: 'Chỉnh sửa tin tức',
        path: '/post/article/setting/:id',
        component: './posts/post-setting',
        hideInMenu: true,
      },
      {
        name: 'Chỉnh sửa trang',
        path: '/post/page/setting/:id',
        component: './posts/post-setting',
        hideInMenu: true,
      },
      {
        name: 'Chỉnh sửa thông báo',
        path: '/post/notification/setting/:id',
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
    access: 'canEditor'
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
    path: '/account',
    routes: [
      {
        name: 'Danh sách',
        path: '/account/list',
        component: './users/user-list',
        access: 'canAdmin'
      },
      {
        name: 'Hồ sơ',
        path: '/account/profile',
        component: './users/profile'
      },
      {
        name: 'Chỉnh sửa người dùng',
        path: '/account/profile/edit/:id',
        component: './users/user-edit',
        hideInMenu: true,
      }
    ]
  },
  {
    icon: 'SolutionOutlined',
    name: 'Đối tác',
    path: '/partners',
    component: './partners/partner-setting',
    access: 'canEditor',
  },
  {
    icon: 'PictureOutlined',
    name: 'Multimedia',
    path: '/media',
    access: 'canEditor',
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
    component: './tools',
    access: 'canAdmin'
  },
  {
    name: 'Email',
    path: '/tool/email',
    component: './tools/email',
    hideInMenu: true
  },
  {
    name: 'Thông báo',
    path: '/tool/notification',
    component: './tools/notification',
    hideInMenu: true
  },
  {
    name: 'Tuyển sinh',
    icon: 'UserAddOutlined',
    path: '/admission',
    access: 'canEditor',
    routes: [
      {
        name: 'Tin tức',
        path: '/admission/article',
        component: './posts/admission',
      },
      {
        name: 'Chỉnh sửa tuyển sinh',
        path: '/admission/article/setting/:id',
        component: './posts/post-setting',
        hideInMenu: true,
      },
      {
        name: 'Ngành/Chuyên ngành',
        path: '/admission/training-group',
        component: './admission/training-group'
      },
      {
        name: 'Chỉnh sửa ngành/chuyên ngành',
        path: '/admission/training-group/major/setting/:id',
        component: './posts/pages',
        hideInMenu: true,
      },
      {
        name: 'Liên hệ',
        path: '/admission/contact',
        component: './admission/contact'
      },
      {
        name: 'Trạng thái',
        path: '/admission/contact/status',
        component: './admission/contact/status',
        hideInMenu: true
      },
      {
        name: 'Chi tiết ngành/chuyên ngành',
        path: '/admission/training-group/center/:id',
        component: './admission/training-group/center',
        hideInMenu: true
      },
      {
        name: 'Chương trình đào tạo',
        path: '/admission/training-group/major/center/:id',
        component: './admission/major/center',
        hideInMenu: true
      }
    ]
  },
  {
    name: 'Khảo thí',
    path: '/quality-assurance',
    icon: 'SafetyOutlined',
    routes: [
      {
        path: '/quality-assurance',
        redirect: '/quality-assurance/dashboard',
      },
      {
        name: 'Dashboard',
        path: '/quality-assurance/dashboard',
        component: './quality-assurance'
      },
      {
        name: 'Thi chuẩn đầu ra',
        path: '/quality-assurance/proficiency-exam',
        component: './onboard/proficiency/exam'
      }
    ],
    access: 'qualityAssurance'
  },
  {
    icon: 'SettingOutlined',
    name: 'setting',
    path: '/settings',
    access: 'canAdmin',
    routes: [
      {
        name: 'general',
        path: '/settings/general',
        component: './settings/general',
      },
      {
        name: 'application',
        path: '/settings/application',
        component: './settings/app',
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
        name: 'roleCenter',
        path: '/settings/roles/center/:id',
        component: './settings/role/center',
        hideInMenu: true
      },
      {
        name: 'Bài viết trên Zalo OA',
        path: '/settings/application/zalo-article',
        component: './settings/app/zalo/article',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/onboard',
    name: 'Onboard',
    icon: 'LoginOutlined',
    access: 'canOnboard',
    routes: [
      {
        path: '/onboard',
        redirect: '/onboard/dashboard',
      },
      {
        name: 'Dashboard',
        path: '/onboard/dashboard',
        component: './onboard/dashboard',
      },
      {
        name: 'Chuyên ngành',
        path: '/onboard/major',
        component: './onboard/major',
      },
      {
        name: 'Đăng ký chuyên ngành',
        path: '/onboard/form',
        component: './onboard',
      },
      {
        name: 'Tuần CDSV',
        path: '/onboard/fist-week',
        component: './onboard/fist-week',
      },
      {
        name: 'Chuẩn đầu ra',
        path: '/onboard/proficiency',
        routes: [
          {
            name: 'Ôn chuẩn đầu ra',
            path: '/onboard/proficiency/practice',
            component: './onboard/proficiency/practice'
          },
          {
            name: 'Đợt ôn tập',
            path: '/onboard/proficiency/practice/batch/:id',
            component: './onboard/proficiency/practice/batch',
            hideInMenu: true
          }
        ]
      },
      {
        name: 'Lịch sử',
        path: '/onboard/history',
        component: './onboard/history',
      },
    ],
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
  {
    path: '*',
    layout: false,
    component: './404',
  }
];
