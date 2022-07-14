import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Radio } from 'antd';
import { IEventType } from '../../types';
import { apiRequest } from '../../utils/request';
import { Content, Box } from '../../components';

const NewEventTypeFormWrapper = styled.div`
  margin-bottom: 4px;
  border-color: #666a73;
  border-right-width: 1px;
  border-left-width: 1px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 1px #666a73;
`;

const RadioGroup = styled(Radio.Group)`
  .ant-radio-wrapper {
    border: 2px solid #ccc;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }

  .ant-radio-wrapper-checked {
    border: 2px solid black;
    border-radius: 50%;
  }

  .ant-radio {
    position: absolute;
    left: -9999px;
    overflow: hidden;
  }

  .ant-radio + * {
    display: block;
    padding: 0;
    overflow: hidden;
    border-radius: 50%;
    overflow: hidden;
  }
`;

export const AccountEventTypesNewSolo: React.FC | null = () => {
  const handleFinish = (values: IEventType) => {
    apiRequest('/events/types', {
      method: 'POST',
      body: JSON.stringify(values)
    })
      .then((res: Response) => res.json())
      .then((res: IEventType) => {
        console.log(res);
      });
  };

  return (
    <Content>
      <NewEventTypeFormWrapper>
        <Box maxWidth="536px" p="32px 52px">
          <Form layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Event name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input name of event!'
                }
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Location" name="location">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Duration" name="duration">
              <InputNumber size="large" /> min
            </Form.Item>
            <Form.Item label="Description/Instructions" name="description">
              <Input.TextArea size="large" showCount maxLength={100} />
            </Form.Item>
            <Form.Item
              label="Event link"
              name="link"
              rules={[
                {
                  required: true,
                  message: 'Please input your link!'
                }
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              name="color"
              label="Event color"
              rules={[
                {
                  required: true,
                  message: 'Please input color!'
                }
              ]}
            >
              <RadioGroup>
                <Radio value="blue">
                  <Box backgroundColor="blue" width="26px" height="26px" />
                </Radio>
                <Radio value="red">
                  <Box backgroundColor="red" width="26px" height="26px" />
                </Radio>
                <Radio value="green">
                  <Box backgroundColor="green" width="26px" height="26px" />
                </Radio>
              </RadioGroup>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        </Box>
      </NewEventTypeFormWrapper>
    </Content>
  );
};
