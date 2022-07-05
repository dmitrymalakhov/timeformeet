import { useParams, useSearchParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useGetEventTypes } from '../../hooks';
import { apiRequest } from '../../utils/request';
import { IEventScheduled } from '../../types';
import { Box } from '../../components';

export const BookingPageEventScheduled = () => {
  const params = useParams<Record<string, string | undefined>>();
  const [searchParams] = useSearchParams();

  const eventTypeId = params.eventTypeId
    ? parseInt(params.eventTypeId, 10)
    : undefined;

  const eventTypes = useGetEventTypes();
  const eventType = eventTypes.data?.find((item) => item.id === eventTypeId);

  const handleFinish = (values: any) => {
    const newValues = Object.assign(values, {
      eventSchedulesId: params.eventSchedulesId,
      date: searchParams.get('date')
    });

    apiRequest('/events/scheduled', {
      method: 'POST',
      body: JSON.stringify(newValues)
    })
      .then((res: Response) => res.json())
      .then((res: IEventScheduled) => {
        if (res.hash)
          window.location.replace(
            `/booking-page/${eventType?.link}/invitees/${res.hash}`
          );
      });
  };

  return (
    <>
      <Box pt={25} pb={25}>
        <Box pl={30}>
          <Box fontSize={28}>{eventType?.name}</Box>
          <Box>{`${eventType?.duration} min`}</Box>
          <Box>{eventType?.location}</Box>
          <Box>{eventType?.description}</Box>
          <Box>{searchParams.get('date')}</Box>
        </Box>
      </Box>
      <Box p="25px 15px">
        <Form name="normal_name" onFinish={handleFinish}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: 'email'
              }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="comment">
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Schedule Event
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </>
  );
};
