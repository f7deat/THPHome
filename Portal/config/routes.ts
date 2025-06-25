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
    routes: [
      {
        name: 'Entry',
        path: '/post/entry',
        component: './posts/entry',
        access: 'canAdmin',
        hideInMenu: true
      },
      {
        name: 'Tin tức',
        path: '/post/article',
        component: './posts/article',
      },
      {
        name: 'Thùng rác',
        path: '/post/trash',
        component: './posts/trash',
        hideInMenu: true
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
        access: 'canEditor'
      },
      {
        name: 'Danh sách câu hỏi',
        path: '/post/qa/item/:id',
        component: './posts/qa/item',
        hideInMenu: true,
      },
      {
        name: 'Đối tác',
        path: '/post/partner',
        component: './partners/partner-setting',
        access: 'canEditor'
      },
      {
        name: 'Slide',
        path: '/post/banners',
        component: './banners/banner-list',
        access: 'canEditor'
      },
      {
        name: 'Menu',
        path: '/post/menus',
        component: './settings/menus'
      }
    ],
  },
  {
    icon: 'AppstoreAddOutlined',
    name: 'category',
    path: '/category/list',
    component: './categories/category-list'
  },
  {
    icon: 'ApartmentOutlined',
    name: 'department',
    path: '/department',
    routes: [
      {
        path: '/department',
        redirect: '/department/center',
      },
      {
        name: 'Chi tiết',
        path: '/department/center',
        component: './departments/center',
        hideInMenu: true
      }
    ]
  },
  {
    name: 'Phòng ban',
    path: '/department/detail/:id',
    component: './departments/details',
    hideInMenu: true,
  },
  {
    icon: 'TeamOutlined',
    name: 'account',
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
      },
      {
        name: 'leave',
        path: '/account/leave',
        component: './users/leave',
      },
      {
        name: 'Thông báo',
        path: '/account/notification',
        component: './notification',
      }
    ]
  },
  {
    icon: 'PictureOutlined',
    name: 'multimedia',
    path: '/media',
    routes: [
      {
        name: 'Thư viện ảnh',
        path: '/media/gallery',
        component: './gallery',
      },
      {
        name: 'Hình ảnh',
        path: '/media/gallery/:id',
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
    name: 'Đào tạo',
    path: '/training',
    icon: 'ReadOutlined',
    access: 'training',
    routes: [
      {
        name: 'Chuẩn đầu ra',
        path: '/training/proficiency',
        component: './onboard/proficiency/practice'
      },
      {
        name: 'Đợt ôn tập',
        path: '/training/proficiency/batch/:id',
        component: './onboard/proficiency/practice/batch',
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
    access: 'canEditor',
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
        access: 'canAdmin'
      },
      {
        name: 'language',
        path: '/settings/localizations',
        component: './settings/localizations',
      },
      {
        name: 'roles',
        path: '/settings/roles',
        component: './roles/role-list',
        access: 'canAdmin'
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
      {
        name: 'general',
        path: '/settings/general/department',
        component: './settings/general/department',
        hideInMenu: true,
        access: 'canAdmin'
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
