const initialState = {
  message: null,
  error: null,
};
let payload = null;
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORGOT_PASSWORD':
      payload = action;
      return {...state, payload};
    case 'LOGIN':
      payload = action.payload;
      if (payload.token) {
        localStorage.setItem('auth-token', payload.token);
      }
      return {...state, ...payload};
    case 'RESET_PASSWORD':
      payload = action.payload;
      return {...state, ...payload};
    case 'REGISTER':
      payload = action.payload;
      return {...state, ...payload};
    default:
      return state;
  }
};
