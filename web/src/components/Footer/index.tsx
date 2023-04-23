import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import {useIntl} from '@umijs/max';
import React, {useEffect, useState} from 'react';
import {getVersion} from "@/services/api/login";

const Footer: React.FC = () => {
  const intl = useIntl();

  const defaultMessage = "Created by codingapi"

  const currentYear = new Date().getFullYear();

  const [version, setVersion] = useState('');

  useEffect(() => {
    getVersion().then(res => {
      // @ts-ignore
      setVersion(res);
    })
  }, [version]);

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'codingapi',
          title: 'CSF ' + version,
          href: '#',
          blankTarget: false,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/codingapi',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
