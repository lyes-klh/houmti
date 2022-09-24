import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    feedPosts: [],
    profilePosts: [],
  },
  reducers: {
    getFeedPosts: (state, action) => {
      state.feedPosts = [...action.payload];
    },
    getProfilePosts: (state, action) => {
      state.profilePosts = [...action.payload];
    },
    addPost: (state, action) => {
      state.feedPosts = [action.payload, ...state.feedPosts];
      state.profilePosts = [action.payload, ...state.profilePosts];
    },
    likePost: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.liked = true;
      post.likesCount = post.likesCount + 1;
    },
    unlikePost: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.liked = false;
      post.likesCount = post.likesCount - 1;
    },
    demandService: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.demanded = true;
      post.demandsCount = post.demandsCount + 1;
    },
    undemandService: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.demanded = false;
      post.demandsCount = post.demandsCount - 1;
    },
    participate: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.participated = true;
      post.participationsCount = post.participationsCount + 1;
    },
    unparticipate: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.participated = false;
      post.participationsCount = post.participationsCount - 1;
    },
    vote: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload.id;
      });

      post.voted = true;
      post.votedOption = action.payload.votedOption;
      post.totalVotesCount = post.totalVotesCount + 1;
      const option = post.pollOptions.find(
        (option) => option.option === action.payload.votedOption
      );

      option.votesCount += 1;
    },
    unvote: (state, action) => {
      const post = state.feedPosts.find((post) => {
        return post._id === action.payload;
      });

      post.voted = false;
      post.totalVotesCount = post.totalVotesCount - 1;

      const option = post.pollOptions.find(
        (option) => option.option === post.votedOption
      );

      option.votesCount -= 1;
      post.votedOption = undefined;
    },
  },
});

export const {
  getFeedPosts,
  getProfilePosts,
  addPost,
  likePost,
  unlikePost,
  demandService,
  undemandService,
  participate,
  unparticipate,
  vote,
  unvote,
} = postsSlice.actions;

export default postsSlice.reducer;
