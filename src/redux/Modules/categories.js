import { put } from "redux-saga/effects";

export const LOAD = 'test/categories/LOAD';
export const LOAD_SUCCESS = 'test/categories/LOAD_SUCCESS';

const initialState = {
  loadingCategories: false,
  loadedCategories: false,
  categories: [],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loadingCategories: true
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loadedCategories: true,
        loadingCategories: false,
        categories: action.data
      };

    default:
      return state;
  }
};

export function load() {
  return {
    type: LOAD
  };
}

export function loadSuccess(data) {
  return {
    type: LOAD_SUCCESS,
    data
  }
}

export function* loadSaga(client) {
    const response = yield client.get('categories');
    yield put(loadSuccess(response));
}