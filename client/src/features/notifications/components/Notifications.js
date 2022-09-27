import React, { useState, useEffect } from 'react';
import { Spinner, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../notificationsSlice';
import { getNotificationsAction } from '../notificationsActions';
import Notification from './Notification';
import Error from '../../../components/ui/Error';

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotificationsAction();
        dispatch(getNotifications(res.data.notifications));
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  return isLoading ? (
    <Spinner size='xl' />
  ) : (
    <>
      <Stack spacing={1}>
        {notifications.map((notification) => (
          <Notification
            key={notification._id}
            image={notification.actor.avatar}
            content={notification.message}
            postId={notification.post._id}
            userId={notification.actor._id}
          />
        ))}
      </Stack>
      {error && <Error message={error} />}
    </>
  );
};

{
}

export default Notifications;
