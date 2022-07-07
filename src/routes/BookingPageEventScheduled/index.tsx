import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { useGetEventTypes } from '../../hooks';
import { apiRequest } from '../../utils/request';
import { IEventScheduled } from '../../types';
import { Box } from '../../components';

const DetailsTitle = styled.div`
  margin: 0;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
`;

const DetailsSubtitle = styled.div`
  margin-bottom: 12px;
  color: rgba(26, 26, 26, 0.6);
  font-weight: 700;
`;

const SidePanel = styled.div`
  min-width: 300px;
  border-right: 1px solid var(--text-color-level3, rgba(26, 26, 26, 0.1));
  transition: all 0.22s ease-out;
  word-break: break-word;
  overflow-wrap: break-word;
  padding: 25px 30px;
`;

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
            `/booking-page/invitees/${eventType?.link}/${res.hash}`
          );
      });
  };

  return (
    <>
      <SidePanel>
        <Box pl={30}>
          <Box mb="24px">
            <DetailsTitle>{eventType?.name}</DetailsTitle>
          </Box>
          <DetailsSubtitle>{`${eventType?.duration} min`}</DetailsSubtitle>
          <DetailsSubtitle>{eventType?.location}</DetailsSubtitle>
          <DetailsSubtitle>{eventType?.description}</DetailsSubtitle>
          <DetailsSubtitle>{searchParams.get('date')}</DetailsSubtitle>
        </Box>
      </SidePanel>
      <Box p="25px 30px 0 30px" maxWidth="400px" flexGrow="1">
        <Box mb="10px" fontSize="20px">
          Enter Details
        </Box>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: 'email'
              }
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item name="Comment" label="comment">
            <Input.TextArea size="large" showCount maxLength={100} />
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
