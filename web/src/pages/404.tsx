import { history } from '@umijs/max';
import { Button, ConfigProvider, Result } from 'antd';
import Settings from '../../config/defaultSettings';
import React from 'react';

const NoFoundPage: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: Settings.colorPrimary,
      },
    }}
  >
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push('/')}>
          Back Home
        </Button>
      }
    />
  </ConfigProvider>
);

export default NoFoundPage;
