import { put } from 'redux-saga/effects';

export const LOAD = 'test/test/LOAD';
export const LOAD_SUCCESS = 'test/test/LOAD_SUCCESS';
export const LOAD_FAILURE = 'test/test/LOAD_FAILURE';

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  meta: [],
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS :
      return {
        ...state,
        loaded: true,
        loading: false,
        data: action.data,
        meta: action.meta,
        error: null
      };
    case LOAD_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export function load(url) {
  return {
    type: LOAD,
    url
  };
}

export function loadSuccess({data, meta}) {
  return {
    type: LOAD_SUCCESS,
    data,
    meta
  };
}

export function loadFailure(error) {
  return {
    type: LOAD_FAILURE,
    error
  }
}

export function* loadSaga(client, {url}) {
  try {
    const response = yield client.get(`events?${url}`);
    yield put(loadSuccess(response));
  }
  catch (error) {
    yield put(loadFailure(error));
  }
}