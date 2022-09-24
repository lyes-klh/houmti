import React from 'react';
import { Image } from '@chakra-ui/react';
import PostWrapper from './PostWrapper';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import Feedback from './Feedback';
import ServiceContent from './ServiceContent';
import EventContent from './EventContent';
import PollContent from './PollContent';

const Post = ({ post }) => {
  return (
    <PostWrapper>
      <PostHeader
        creator={post.creator}
        createdAt={post.createdAt}
        city={post.city.cityName}
        neighborhood={post.neighborhood.neighborhoodName}
        id={post._id}
      />
      <PostContent title={post.title} content={post.content} />
      {post.withImage && (
        <Image
          src={process.env.REACT_APP_BACKEND + '/img/posts/' + post.image}
          w='full'
        />
      )}
      {post.postType === 'service' && <ServiceContent post={post} />}
      {post.postType === 'event' && <EventContent post={post} />}
      {post.postType === 'poll' && <PollContent post={post} />}
      <Feedback
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        post={post}
      />
    </PostWrapper>
  );
};

export default Post;
