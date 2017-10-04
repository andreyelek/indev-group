import { combineReducers } from "redux";
import {
  RECEIVE_STAFF_INFO,
  REQUEST_STAFF_INFO,
  EDIT_ID,
  SEARCH_WORKER_NAME,
  DELETE_WORKER_INFO,
  EDIT_WORKER_INFO
} from "../actions";

const workers = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STAFF_INFO:
      return action.staff;

    case DELETE_WORKER_INFO:
      return state.filter(elem => elem.id !== action.id);

    case EDIT_WORKER_INFO:
      return state.map(
        (elem, i) =>
          elem.id === action.id ? { ...elem, ...action.info } : elem
      );
    default:
      return state;
  }
};
const posts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_STAFF_INFO:
      return action.posts;
    default:
      return state;
  }
};
const isFetching = (state = true, action) => {
  switch (action.type) {
    case REQUEST_STAFF_INFO:
      return true;
    case RECEIVE_STAFF_INFO:
      return false;
    default:
      return state;
  }
};

const editElementId = (state = "1", action) => {
  switch (action.type) {
    case EDIT_ID:
      return action.id;
    case DELETE_WORKER_INFO:
    case EDIT_WORKER_INFO:
      return false;
    default:
      return state;
  }
};
const workerName = (state = "", action) => {
  switch (action.type) {
    case SEARCH_WORKER_NAME:
      return action.nameOfWorker;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  workers,
  posts,
  editElementId,
  isFetching,
  workerName
});

export default rootReducer;
