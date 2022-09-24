import houmtiApi from '../../app/api';

// {
//   "feedbackType": "Comment",
//   "commentContent": "My Comment"
//   "voteOption": "opt1"
// }

export const createFeedbackAction = async (postId, feedback) => {
  if (feedback.feedbackType !== 'Comment') feedback.commentContent = undefined;
  if (feedback.feedbackType !== 'Vote') feedback.voteOption = undefined;

  const res = await houmtiApi.post(`/posts/${postId}/feedbacks/`, feedback);
  return res.data;
};

export const deleteFeedbackAction = async (postId, feedbackId) => {
  const res = await houmtiApi.delete(
    `/posts/${postId}/feedbacks/${feedbackId}`
  );
  return res.data;
};

export const getFeedbackAction = async (postId, params) => {
  const res = await houmtiApi.get(`/posts/${postId}/feedbacks`, {
    params: { ...params },
  });
  return res.data;
};

export const getCommentsAction = async (postId) => {
  const res = await houmtiApi.get(`/posts/${postId}/feedbacks`, {
    params: { feedbackType: 'Comment' },
  });
  return res.data;
};
