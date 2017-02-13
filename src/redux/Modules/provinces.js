import { put } from "redux-saga/effects";

export const LOAD = 'test/provinces/LOAD';
export const LOAD_SUCCESS = 'test/provinces/LOAD_SUCCESS';

const initialState = {
  loadingProvinces: false,
  loadedProvinces: false,
  provinces: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loadingProvinces: true
      };

    case LOAD_SUCCESS:
      return {
        ...state,
        loadedProvinces: true,
        loadingProvinces: false,
        provinces: action.data
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
  const response = yield client.get('provinces');
  yield put(loadSuccess(response.data));
}