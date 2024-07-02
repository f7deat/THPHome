import { history } from '@umijs/max';
import { queryCurrentUser } from './services/user';
import { RequestConfig } from '@umijs/max';
import { RequestOptions } from '@umijs/max';
import { Space, message } from 'antd';
import { RunTimeLayoutConfig } from '@umijs/max';
import { DefaultFooter } from '@ant-design/pro-components';
import { GithubOutlined } from '@ant-design/icons';
import { AvatarDropdown } from './components/right-content/avatar-dropdown';
import { SelectLang } from '@umijs/max';
import { Question } from './components/right-content';
import './style.css';
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
    waterMarkProps: {
      content: initialState?.name
    },
    token: {
        sider: {
          colorMenuBackground: '#00387a',
          colorBgMenuItemHover: '#D02929',
          colorTextMenu: '#FFFFFF',
          colorTextMenuSelected: '#FFFFFF',
          colorTextMenuItemHover: '#FFFFFF',
          colorTextMenuActive: '#FFFFFF',
          colorBgMenuItemSelected: '#D02929',
          colorTextMenuSecondary: '#FFFFFF',
          colorTextMenuTitle: '#FFFFFF',
        },
    },
    footerRender: () => (
      <DefaultFooter copyright="Produced by Hai Phong University" links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/f7deat/THPHome',
          blankTarget: true,
        },
        {
          key: 'THP Home',
          title: 'THP Home',
          href: 'https://github.com/f7deat/THPHome',
          blankTarget: true,
        },
      ]} />
    ),
    rightContentRender: () => (
      <Space>
        <Question key="doc" />
        <SelectLang key="SelectLang" />
        <AvatarDropdown menu />
      </Space>
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
      const token = localStorage.getItem('wf_token');
      config.baseURL = 'https://localhost:58058/api/';
      config.headers = {
        authorization: `Bearer ${token}`,
      };
      return config;
    },
  ],
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ],
  errorConfig: {
    errorHandler: (error: any) => {
      if (error.response.data) {
        message.error(error.response.data)
      }
    }
  },
};