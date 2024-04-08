import { defineConfig } from "@umijs/max";
import defaultSettings from "./config/defaultSetting";

export default defineConfig({
  antd: {
    theme: {
      token: {
        colorPrimary: "#00387a",
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
    type: "hash",
  },
  locale: {
    default: "vi-VN",
    baseSeparator: "-",
    antd: true,
  },
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      icon: "DashboardOutlined",
      name: "Dashboard",
      path: "/home",
      component: "./Home",
    },
    {
      icon: "FormOutlined",
      name: "Nội dung",
      path: "/post",
      routes: [
        {
          name: "Bài viết",
          path: "/post/list",
          component: "./posts/post-list",
        },
        {
          name: "Viết bài",
          path: "/post/setting",
          component: "./posts/post-setting",
          hideInMenu: true,
        },
        {
          name: "Chỉnh sửa",
          path: "/post/setting/:id",
          component: "./posts/post-setting",
          hideInMenu: true,
        },
        {
          name: "Page Builder",
          path: "/post/page/:id",
          component: "./posts/pages",
          hideInMenu: true,
        },
        {
          name: "Slide",
          path: "/post/banners",
          component: "./banners/banner-list",
        },
      ],
    },
    {
      icon: "AppstoreAddOutlined",
      name: "category",
      path: "/category/list",
      component: "./categories/category-list",
    },
    {
      icon: "ApartmentOutlined",
      name: "Phòng ban",
      path: "/departments",
      component: "./departments",
    },
    {
      name: "Phòng ban",
      path: "/department/detail/:id",
      component: "./departments/details",
      hideInMenu: true,
    },
    {
      icon: "VideoCameraAddOutlined",
      name: "Video",
      path: "/videos",
      component: "./videos/video-setting",
    },
    {
      icon: "TeamOutlined",
      name: "Người dùng",
      path: "/users",
      routes: [
        {
          path: "/users",
          redirect: "/users/list",
        },
        {
          name: "Danh sách",
          path: "/users/list",
          component: "./users/user-list",
        },
        {
          name: "Chỉnh sửa người dùng",
          path: "/users/edit/:id",
          component: "./users/user-edit",
          hideInMenu: true,
        },
        {
          name: "Hồ sơ",
          path: "/users/profile/:id",
          component: "./users/profile",
          hideInMenu: true,
        },
      ],
    },
    {
      icon: "SolutionOutlined",
      name: "Đối tác",
      path: "/partners",
      component: "./partners/partner-setting",
    },
    {
      icon: "DownloadOutlined",
      name: "fileManager",
      path: "/files",
      component: "./files",
    },
    {
      icon: "PictureOutlined",
      name: "Thư viện ảnh",
      path: "/gallery",
      routes: [
        {
          path: "/gallery",
          redirect: "/gallery/list",
        },
        {
          name: "Albums",
          path: "/gallery/list",
          component: "./gallery",
        },
        {
          name: 'Hình ảnh',
          path: '/gallery/photo/:id',
          component: './gallery/photo',
          hideInMenu: true
        }
      ]
    },
    {
      icon: "CommentOutlined",
      name: "Bình luận",
      path: "/comments",
      component: "./comments/comment-list",
    },
    {
      icon: "SettingOutlined",
      name: "setting",
      path: "/settings",
      routes: [
        {
          name: "general",
          path: "/settings/general",
          component: "./settings/general",
        },
        {
          name: "Menu",
          path: "/settings/menus",
          component: "./settings/menus",
        },
        {
          name: "language",
          path: "/settings/localizations",
          component: "./settings/localizations",
        },
        {
          name: "roles",
          path: "/settings/roles",
          component: "./roles/role-list",
        },
      ],
    },
    {
      path: "/accounts",
      layout: false,
      routes: [
        {
          name: "login",
          path: "/accounts/login",
          component: "./accounts/login",
        },
      ],
    },
  ],

  npmClient: "pnpm",
  tailwindcss: {},
});
