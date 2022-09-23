import houmtiApi from '../../app/api';
import axios from 'axios';

// post

// {
//   "title": "Post",
//   "content": "hello world",
//   "postType": "post"
// }

// {
//   "title": "Post",
//   "content": "look at this image !",
//   "postType": "post",
//   "withImage": true
// }

export const createPostAction = async (post) => {
  const create = {
    title: post.title,
    content: post.content,
    withImage: post.withImage,
    postType: 'post',
  };
  const res = await houmtiApi.post('/posts', create);

  return res.data;
};

export const uploadImage = async (formData, id) => {
  const res = await axios.patch(
    process.env.REACT_APP_API + '/posts/' + id,
    formData,
    { withCredentials: true }
  );

  return res.data;
};

// event

// {
//   "title": "Event",
//   "content": "Let's meet !",
//   "postType": "event",
//   "eventAddress": "Area 51",
//   "eventDate": "{{timestamp}}",
//   "eventHour": "2PM"
// }

export const createEventAction = async (event) => {
  const create = {
    title: event.title,
    content: event.content,
    eventAddress: event.eventAddress,
    eventDate: event.eventDate,
    eventHour: event.eventHour,
    postType: 'event',
  };
  const res = await houmtiApi.post('/posts', create);

  return res.data;
};

// service

// {
//   "title": "Service",
//   "content": "I'm offering this service...",
//   "postType": "service",
//   "servicePhoneNumber": "0770000000"
// }

export const createServiceAction = async (service) => {
  const create = {
    title: service.title,
    content: service.content,
    servicePhoneNumber: service.servicePhoneNumber,
    postType: 'service',
  };

  const res = await houmtiApi.post('/posts', create);
  return res.data;
};

// poll

// {
//   "title": "Poll",
//   "content": "Please vote...",
//   "postType": "poll",
//   "pollOptions": ["opt1",  "opt2", "opt3"]
// }

export const createPollAction = async (poll) => {
  const create = {
    title: poll.title,
    content: poll.content,
    pollOptions: [...poll.pollOptions],
    postType: 'poll',
  };
  const res = await houmtiApi.post('/posts', create);

  return res.data;
};
