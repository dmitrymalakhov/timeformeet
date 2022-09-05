import React from 'react';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Radio, DatePicker } from 'antd';

import type { Moment } from 'moment';
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

interface IEventTypePayload extends IEventType {
  date: [Moment, Moment];
}

export const AccountEventTypesNewSolo: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: IEventTypePayload) => {
    const newValues = Object.assign({}, values);

    newValues.start_date = newValues.date[0].format('YYYY-MM-DD');
    newValues.end_date = newValues.date[1].format('YYYY-MM-DD');

    apiRequest('/events/types', {
      method: 'POST',
      body: JSON.stringify(newValues)
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
          <Form layout="vertical" onFinish={handleFinish} form={form}>
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
              <InputNumber size="large" />
            </Form.Item>
            <Form.Item label="Date" name="date">
              <DatePicker.RangePicker size="large" />
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
