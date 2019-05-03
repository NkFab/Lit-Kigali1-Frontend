import {
  HANDLE_COMMENT_INPUT,
  SUBMIT_COMMENT_FORM,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  FETCH_ALL_COMMENTS_SUCCESS,
  FETCH_ALL_COMMENTS_FAILURE,
  FETCHING_COMMENTS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETING_COMMENT,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_SUCCESS,
  UPDATING_COMMENT,
  HANDLE_UPDATE_COMMENT_INPUT,
  FETCH_COMMENT_HISTORY_SUCCESS,
  FETCH_COMMENT_HISTORY_FAILURE,
} from '../actions-types';

import { comment as initialState } from '../initialState.json';

const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HANDLE_COMMENT_INPUT:
      return {
        ...state,
        body: payload.body,
      };
    case SUBMIT_COMMENT_FORM:
      return {
        ...state,
        submitting: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        success: false,
        submitting: false,
        error: payload,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        success: true,
        submitting: false,
        body: '',
        message: payload.message,
        newComment: payload.comment,
      };
    case FETCH_ALL_COMMENTS_FAILURE:
      return {
        ...state,
        message: payload.message,
        fetching: false,
      };
    case FETCH_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        message: payload.message,
        commentList: payload.comments,
        fetching: false,
      };
    case FETCHING_COMMENTS:
      return {
        ...state,
        fetching: true,
      };
    case DELETING_COMMENT:
      return {
        ...state,
        deleting: true,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        deleting: false,
        message: payload.message,
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        deleting: false,
        message: payload.message,
      };
    case UPDATING_COMMENT:
      return {
        ...state,
        updating: true,
      };
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        message: payload.message,
        error: payload,
        updating: false,
      };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        message: payload.message,
        updating: false,
      };
    case HANDLE_UPDATE_COMMENT_INPUT:
      return {
        ...state,
        updateBody: payload,
      };
    case FETCH_COMMENT_HISTORY_SUCCESS:
      return {
        ...state,
        originalComment: payload.editedComment,
      };
    case FETCH_COMMENT_HISTORY_FAILURE:
      return {
        ...state,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default commentReducer;
