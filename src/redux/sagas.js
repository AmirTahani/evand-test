import { takeLatest } from 'redux-saga';
import { LOAD as LOAD_EVENTS, loadSaga as loadSagaEvents } from './Modules/events';
import { LOAD as LOAD_PROVINCES, loadSaga as loadSagaProvinces } from './Modules/provinces';
import { LOAD as LOAD_CATEGORIES, loadSaga as loadSagaCategories } from './Modules/categories';

export default function *rootSaga(client) {
  yield [
    takeLatest(LOAD_EVENTS, loadSagaEvents, client),
    takeLatest(LOAD_PROVINCES, loadSagaProvinces, client),
    takeLatest(LOAD_CATEGORIES, loadSagaCategories, client)
  ];
}
