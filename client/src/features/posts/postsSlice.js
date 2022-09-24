import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    mode: 'feed',
    feedPosts: [],
    profilePosts: [],
    post: null,
    postComments: [],
  },
  reducers: {
    setModeFeed: (state) => {
      state.mode = 'feed';
    },
    setModeProfile: (state) => {
      state.mode = 'profile';
    },
    setModePost: (state) => {
      state.mode = 'post';
    },
    getPost: (state, action) => {
      state.post = action.payload;
    },
    getPostComments: (state, action) => {
      state.postComments = [...action.payload];
    },
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
    addComment: (state, action) => {
      if (state.mode === 'post') {
        state.postComments = [action.payload.comment, ...state.postComments];
      }

      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload.id;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload.id;
        });
      else if (state.mode === 'post') post = state.post;

      post.commentsCount = post.commentsCount + 1;
    },
    likePost: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

      post.liked = true;
      post.likesCount = post.likesCount + 1;
    },
    unlikePost: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

      post.liked = false;
      post.likesCount = post.likesCount - 1;
    },
    demandService: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

      post.demanded = true;
      post.demandsCount = post.demandsCount + 1;
    },
    undemandService: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

      post.demanded = false;
      post.demandsCount = post.demandsCount - 1;
    },
    participate: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

      post.participated = true;
      post.participationsCount = post.participationsCount + 1;
    },
    unparticipate: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

      post.participated = false;
      post.participationsCount = post.participationsCount - 1;
    },
    vote: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload.id;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload.id;
        });
      else if (state.mode === 'post') post = state.post;

      post.voted = true;
      post.votedOption = action.payload.votedOption;
      post.totalVotesCount = post.totalVotesCount + 1;
      const option = post.pollOptions.find(
        (option) => option.option === action.payload.votedOption
      );

      option.votesCount += 1;
    },
    unvote: (state, action) => {
      let post = undefined;
      if (state.mode === 'feed')
        post = state.feedPosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'profile')
        post = state.profilePosts.find((post) => {
          return post._id === action.payload;
        });
      else if (state.mode === 'post') post = state.post;

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
  setModeFeed,
  setModeProfile,
  setModePost,
  getPost,
  getPostComments,
  getFeedPosts,
  getProfilePosts,
  addPost,
  addComment,
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
