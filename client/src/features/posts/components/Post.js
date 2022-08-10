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
      />
      <PostContent title={post.title} content={post.content} />
      {post.withImage && <Image src={post.image} />}
      {post.postType === 'service' && (
        <ServiceContent
          servicePhoneNumber={post.servicePhoneNumber}
          demandsCount={post.demandsCount}
        />
      )}
      {post.postType === 'event' && (
        <EventContent
          eventAddress={post.eventAddress}
          eventDate={post.eventDate}
          eventHour={post.eventHour}
          participationsCount={post.participationsCount}
        />
      )}
      {post.postType === 'poll' && (
        <PollContent pollOptions={post.pollOptions} />
      )}
      <Feedback
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
      />
    </PostWrapper>
  );
};

export default Post;
