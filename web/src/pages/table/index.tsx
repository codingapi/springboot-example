import {list, save} from '@/services/api/table';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ModalForm, PageContainer, ProFormText, ProFormTextArea, ProTable,} from '@ant-design/pro-components';
import {Button, Form, message} from 'antd';
import React, {useRef, useState} from 'react';
import {forEach} from "lodash";


const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    await save({...fields});
    hide();
    message.success('保存成功');
    return true;
  } catch (error) {
    hide();
    message.error('保存失败，请重试!');
    return false;
  }
};


const Shadow: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm<{name:string;url:string}>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  // const [currentRow, setCurrentRow] = useState();


  const columns: ProColumns<any>[] = [
    {
      title: "服务名称",
      dataIndex: 'name',
    },
    {
      title: "地址",
      dataIndex: 'url',
      search: false,
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            for(let key in  record){
              form.setFieldValue(key,record[key])
            }
            handleModalOpen(true);
          }}
        >
          配置
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<any,any>
        headerTitle="规则配置"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={list}
        columns={columns}
      />

      <ModalForm
        title="新建规则"
        form={form}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
          },
        }}
        initialValues={
          {
            name:form?.name,
            url:form?.url
          }
        }
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          placeholder="请输入服务名称"
          rules={[
            {
              required: true,
              message: "请输入服务名称",
            },
          ]}
          name="name"
        />
        <ProFormTextArea
           rules={[
             {
               required: true,
               message: "请输入服务名称",
             },
           ]}
           placeholder="请输入服务地址"
           name="url"/>
      </ModalForm>

    </PageContainer>
  );
};

export default Shadow;
