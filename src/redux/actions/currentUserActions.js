import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_FOLLOWING,
  SET_USER_ACTION_SUCCESS,
  SET_USER_ACTION_FAILURE,
  SET_CURRENT_USER_DELETING_ARTICLE,
  DELETE_CURRENT_USER_ARTICLE,
} from '../actions-types/currentUserTypes';
import fetchAPI from '../../helpers/fetchAPI';
import { setUserFollow } from './userActions';

export const setCurrentUser = payload => ({
  type: SET_CURRENT_USER,
  payload,
});

export const onUserActionSuccess = message => ({
  type: SET_USER_ACTION_SUCCESS,
  payload: message,
});

export const onUserActionFailure = message => ({
  type: SET_USER_ACTION_FAILURE,
  payload: message,
});

export const fetchCurrentUser = () => dispatch => fetchAPI('/user')
  .then(({ user }) => {
    dispatch(setCurrentUser(user));
    return user;
  })
  .catch(err => dispatch(onUserActionFailure(err.message)));

export const setUserFollowing = payload => ({
  type: SET_CURRENT_USER_FOLLOWING,
  payload,
});

export const onFollow = ({ username, method }) => (dispatch) => {
  dispatch(setUserFollowing(true));
  return fetchAPI(`/profiles/${username}/follow`, { method })
    .then(({ message, user }) => {
      dispatch(setUserFollow(user));
      dispatch(onUserActionSuccess(message));
      dispatch(setUserFollowing(false));
      return message;
    })
    .catch(({ message }) => {
      dispatch(onUserActionFailure(message));
      dispatch(setUserFollowing(false));
      return message;
    });
};

export const setUserDeletingArticle = payload => ({
  type: SET_CURRENT_USER_DELETING_ARTICLE,
  payload,
});

export const deleteCurrentUserArticle = payload => ({
  type: DELETE_CURRENT_USER_ARTICLE,
  payload,
});

export const onUserDeleteArticle = ({ articleSlug }) => (dispatch) => {
  dispatch(setUserDeletingArticle(true));
  return fetchAPI(`/articles/${articleSlug}`, { method: 'DELETE' })
    .then(({ message }) => {
      dispatch(deleteCurrentUserArticle({ articleSlug, message }));
      dispatch(setUserDeletingArticle(false));
      return message;
    })
    .catch(({ message }) => {
      dispatch(onUserActionFailure(message));
      dispatch(setUserDeletingArticle(false));
      return message;
    });
};
