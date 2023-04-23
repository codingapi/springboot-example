import { list, save, del } from '@/services/api/table';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ModalForm, PageContainer, ProFormText, ProFormTextArea, ProTable, } from '@ant-design/pro-components';
import { Button, Form, message,Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';

const Shadow: React.FC = () => {

  const actionRef = useRef<ActionType>();
  const [form] = Form.useForm<{id:string;name:string;url:string}>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

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


  const handleDel = async (id:string) => {
    const hide = message.loading('正在删除');
    try {
      await del({id:id});
      hide();
      message.success('删除成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试!');
      return false;
    }
  };

  const columns: ProColumns<any>[] = [
    {
      title: "编号",
      dataIndex: 'id',
      search: false,
    },
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
            // eslint-disable-next-line guard-for-in
            for(let key in  record){
              form.setFieldValue(key,record[key])
            }
            handleModalOpen(true);
          }}
        >
          修改
        </a>,
        <Popconfirm
          key="delete"
          title="删除提示"
          description="确认要删除这条数据吗?"
          onConfirm={async ()=>{
            await handleDel(record.id);
          }}
          okText="确认"
          cancelText="取消"
        >
          <a key="delete">
            删除
          </a>
        </Popconfirm>
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<any,any>
        headerTitle="服务节点配置"
        actionRef={actionRef}
        rowKey="key"
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
        request={async (params, sort, filter)=>{
          const res = await list(params);
          return {
            data: res.data.list,
            success: res.success,
            total: res.data.total
          };
        }
        }
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
          hidden={true}
          name="id"
        />
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
