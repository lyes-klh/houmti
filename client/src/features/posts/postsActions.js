import houmtiApi from '../../app/api';

const getFeedback = async (posts, userId) => {
  for (const post of posts) {
    const params = { user: userId, post: post._id };

    const like = await houmtiApi.get(`/posts/${post._id}/feedbacks`, {
      params: {
        ...params,
        feedbackType: 'Like',
      },
    });
    if (like.data.data.length !== 0) post.liked = true;

    if (post.postType === 'poll') {
      let totalVotesCount = 0;
      for (let i = 0; i < post.pollOptions.length; i++) {
        totalVotesCount += post.pollOptions[i].votesCount;
      }
      post.totalVotesCount = totalVotesCount;
      const vote = await houmtiApi.get(`/posts/${post._id}/feedbacks`, {
        params: {
          ...params,
          feedbackType: 'Vote',
        },
      });
      if (vote.data.data.length !== 0) {
        post.voted = true;
        post.votedOption = vote.data.data[0].votedOption;
      }
    }

    if (post.postType === 'event') {
      const participation = await houmtiApi.get(
        `/posts/${post._id}/feedbacks`,
        {
          params: {
            ...params,
            feedbackType: 'Participate',
          },
        }
      );
      if (participation.data.data.length !== 0) post.participated = true;
    }

    if (post.postType === 'service') {
      const demand = await houmtiApi.get(`/posts/${post._id}/feedbacks`, {
        params: {
          ...params,
          feedbackType: 'Demand',
        },
      });
      if (demand.data.data.length !== 0) post.demanded = true;
    }

    // console.log(post, like, vote, participation, demand);
  }
  return posts;
};
export const getFeedPostsAction = async (userId) => {
  const res = await houmtiApi.get('/posts');
  const posts = await getFeedback(res.data.data, userId);

  return { data: posts };
};

export const getProfilePostsAction = async (userId, currentUserId) => {
  // const res = await houmtiApi.get('/users/my-profile/posts');
  const res = await houmtiApi.get(`/posts`, {
    params: { creator: userId },
  });
  const posts = await getFeedback(res.data.data, currentUserId);

  return { data: posts };
};

export const getPostAction = async (userId, postId) => {
  const res = await houmtiApi.get(`/posts/${postId}`);
  const posts = await getFeedback([res.data.data], userId);

  return posts[0];
};
