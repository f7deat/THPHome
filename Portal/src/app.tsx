import { history } from '@umijs/max';
import { queryCurrentUser } from './services/user';
import { RequestConfig } from '@umijs/max';
import { RequestOptions } from '@umijs/max';
import { message } from 'antd';
import { RunTimeLayoutConfig } from '@umijs/max';
import { DefaultFooter } from '@ant-design/pro-components';
import { HomeOutlined } from '@ant-design/icons';
import { AvatarDropdown } from './components/right-content/avatar-dropdown';
import { SelectLang } from '@umijs/max';
import { Question } from './components/right-content';
import './style.css';
import { getLocale } from '@umijs/max';
import MyNotification from './components/right-content/notification';
const loginPath = '/accounts/login';

export async function getInitialState(): Promise<{
  avatar?: string;
  name?: string;
  currentUser?: any;
  fetchUserInfo?: () => Promise<any>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      name: currentUser?.userName,
      avatar: currentUser?.avatar,
      currentUser: currentUser,
    };
  }
  return {
    fetchUserInfo,
    name: 'dhhp.edu.vn',
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: 'https://dhhp.edu.vn/favicon.ico',
    menu: {
      locale: true,
    },
    layout: 'mix',
    locale: 'vi-VN' as any,
    token: {
        sider: {
          colorMenuBackground: '#00387a',
          colorBgMenuItemHover: '#D02929',
          colorTextMenu: '#FFFFFF',
          colorTextMenuSelected: '#FFFFFF',
          colorTextMenuItemHover: '#FFFFFF',
          colorBgMenuItemSelected: '#D02929',
          colorTextMenuSecondary: '#FFFFFF',
          colorBgMenuItemCollapsedElevated: '#008000',
          colorTextSubMenuSelected: '#FFFFFF',
        }
    },
    footerRender: () => (
      <DefaultFooter copyright="Produced by Hai Phong University" links={[
        {
          key: 'home',
          title: <HomeOutlined />,
          href: 'https://dhhp.edu.vn',
          blankTarget: true,
        },
        {
          key: 'website',
          title: 'Trang chủ',
          href: 'https://dhhp.edu.vn',
          blankTarget: true,
        },
      ]} />
    ),
    rightContentRender: () => (
      <div className='flex items-center'>
        <Question key="doc" />
        <MyNotification />
        <SelectLang key="SelectLang" />
        <AvatarDropdown menu />
      </div>
    ),
    onPageChange: () => {
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
  };
};

export const request: RequestConfig = {
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = localStorage.getItem('thp_token');
      config.baseURL = 'https://dhhp.edu.vn/api/';
      config.headers = {
        authorization: `Bearer ${token}`,
      };
      const url = config?.url?.concat(`?locale=${getLocale()}`);
      return { ...config, url };
    },
  ],
  responseInterceptors: [
    (response: any) => {
      if (response.data && response.data.succeeded === false) {
        message.error(response.data.message || 'An error occurred');
        throw new Error(response.data.message || 'An error occurred');
      }
      return response;
    },
  ],
  errorConfig: {
    errorHandler: (error: any) => {
      if (error.response && error.response.data) {
        message.error(error.response.data)
      }
    }
  },
};