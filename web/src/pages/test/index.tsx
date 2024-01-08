import { Button } from "antd";
import React from "react";
import { useModel } from '@umijs/max';

const TestPage: React.FC = () => {

  const { initialState, setInitialState } = useModel('@@initialState');

  const handleReload = () => {
    //@ts-ignore
    initialState.reloadLayout();
  }

  return (
    <div>
      <Button onClick={handleReload}>reload Menu</Button>
    </div>
  )
};

export default TestPage;

