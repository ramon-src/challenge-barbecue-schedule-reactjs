/*
 * action types
 */
export const User = {
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER'
};

export const INITIAL_STATE = {
  USER: { id: null, username: '', email: '' }
};

/*
 * action creators
 */
export function addUser(user) {
  return { type: User.ADD_USER, user };
}

export function removeUser(user) {
  return { type: User.REMOVE_USER, user };
}
