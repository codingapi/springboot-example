import React from 'react';
import Icon from '@ant-design/icons'
import * as icons from '@ant-design/icons'


interface MenuProps {
  icon: string
}

const Menus: React.FC<MenuProps> = (props) => {
  if (props.icon === '-') {
    return <></>
  }

  if (props.icon) {
    return <Icon component={icons[props.icon]} />
  } else {
    return <></>
  }
}

export async function loadLayoutMenus(response: any) {
  if (response.success) {
    let childrens = response.data.children;
    if (childrens === null) {
      return [];
    }
    const fetchMenu = (data: any) => {
      data.icon = <Menus icon={data.icon} />;
      data.children = data.children || [];
      data.children.forEach((item: any) => {
        fetchMenu(item);
      });
      return data;
    }
    childrens = childrens.map((item: any) => fetchMenu(item));
    return childrens;
  } else {
    return [];
  }
}

export async function loadLoayoutMenuAuthentications(response: any) {
  if (response.success) {
    let childrens = response.data.children;
    if (childrens === null) {
      return [];
    }
    const authorities: string[] = [];
    const feathAuthorities = (data: any) => {
      authorities.push(data.path);
      if (data.children) {
        data.children.forEach((item: any) => {
          feathAuthorities(item);
        });
      }
    }
    childrens.forEach((element: any) => {
      feathAuthorities(element);
    });
    return authorities;
  }
  return [];
}
