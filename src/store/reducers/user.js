import { User, INITIAL_STATE } from 'store/actions';

const user = (state = INITIAL_STATE.USER, action) => {
  switch (action.type) {
    case User.ADD_USER:
      return action.user;
    case User.REMOVE_USER:
      return INITIAL_STATE.USER;
    default:
      return state;
  }
};

export default user;
