import {
    LogoutOutlined,
    SettingOutlined,
    UserOutlined,
  } from '@ant-design/icons';
  import { history, useIntl, useModel } from '@umijs/max';
  import { Avatar, Space, Spin } from 'antd';
  import { stringify } from 'querystring';
  import React, { useCallback } from 'react';
  import { flushSync } from 'react-dom';
  import HeaderDropdown from '../header-dropdown';
  
  export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
  };
  
  export const AvatarName = () => {
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
    return <span className="anticon">{currentUser?.name}</span>;
  };
  
  const AvatarLogo = () => {
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
  
    return <Avatar size="small" src={currentUser?.avatar} alt="avatar" />;
  };
  
  export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
    const intl = useIntl();
  
    const loginOut = async () => {
      localStorage.removeItem('thp_token');
      const { search, pathname } = window.location;
      const urlParams = new URL(window.location.href).searchParams;
      const redirect = urlParams.get('redirect');
      if (window.location.pathname !== '/accounts/login' && !redirect) {
        history.replace({
          pathname: '/accounts/login',
          search: stringify({
            redirect: pathname + search,
          }),
        });
      }
    };
    const { initialState, setInitialState } = useModel('@@initialState');
  
    const onMenuClick = useCallback(
      (event: any) => {
        const { key } = event;
        if (key === 'logout') {
          flushSync(() => {
            setInitialState((s) => ({ ...s, currentUser: undefined }));
          });
          loginOut();
          return;
        } else if (key === 'profile') {
          history.push(`/account/profile`);
          return;
        } else if (key === 'settings') {
          history.push(`/account/profile/edit/${initialState?.currentUser?.id}`);
          return;
        }
        history.push(`/accounts/${key}`);
      },
      [setInitialState],
    );
  
    const loading = (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    );
  
    if (!initialState) {
      return loading;
    }
  
    const { currentUser } = initialState;
  
    if (!currentUser || !currentUser.userName) {
      return loading;
    }
  
    const menuItems = [
      ...(menu
        ? [
          {
            key: 'profile',
            icon: <UserOutlined />,
            label: intl.formatMessage({
              id: 'menu.users.profile',
            }),
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: intl.formatMessage({
              id: 'menu.setting',
            }),
          },
          {
            type: 'divider' as const,
          },
        ]
        : []),
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: intl.formatMessage({
          id: 'general.logout',
        }),
        danger: true
      },
    ];
  
    return (
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems,
        }}
        arrow
      >
        <Space className='cursor-pointer min-w-32 ml-2'>
          <AvatarLogo />
          <AvatarName />
        </Space>
      </HeaderDropdown>
    );
  };