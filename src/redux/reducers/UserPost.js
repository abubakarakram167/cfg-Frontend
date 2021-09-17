import * as actions from '../actions/action.types';

const INIT_STATE = {
  posts: [],
  message: null,
  error: null,
};

const userPostReducer = (state = INIT_STATE, action) => {
  let payload = null;
  switch (action.type) {
    case actions.GET_POST_BY_ID:
      payload = action.payload;
      return {...state, posts: [payload, ...state.posts]};

    case actions.CREATE_USER_POST:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      }
      return state;
    case actions.GET_USER_POSTS:
      payload = action.payload;

      if (payload.error) {
        return {...state, error: 'There was an error fetching the posts.'};
      }
      let posts_array = Object.values(action.payload);
      posts_array = posts_array.filter((element) => {
        if (!state.posts.find((post) => element.id == post.id)) {
          return element;
        }
      });

      return {...state, posts: [...state.posts, ...posts_array], error: null};
    case actions.DELETE_USER_POST:
      payload = action.payload;
      if (payload.error) {
        console.log('there was an error');
      } else {
        return {
          ...state,
          posts: state.posts.filter((post) => post.id !== payload.id),
        };
      }
      return state;
    case actions.UPDATE_USER_POST:
      payload = action.payload;
      if (payload.error) {
        return {...state, error: 'There was an error while updating the post.'};
      }
      const posts = state.posts.map((post) => {
        if (post.id === action.id) {
          if (post.love_count) {
            post.love_count += 1;
          } else {
            post.love_count = 1;
          }
        }
      });

      return {...state, posts: posts};
    default:
      return state;
  }
};

export default userPostReducer;
