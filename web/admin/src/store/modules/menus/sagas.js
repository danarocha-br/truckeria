import { takeLatest, put, all, call } from 'redux-saga/effects';
import { toast } from "react-toastify";

import ActionTypes from './types';
import api from '~/services/api';
import formatCurrency from '~/utils/formatCurrency';

import {
  loadMenusSuccess,
  loadMenusFailure,
  loadMenusRequest,
  loadMenusByTypesFailure,
  loadMenusByTypesSuccess,
  createMenuSuccess,
  createMenusFailure,
  updateMenuFailure,
  updateMenuSuccess,
  deleteMenuFailure,
  deleteMenuSuccess
} from './actions';
import { hideModal } from "../modals/actions";

export function* loadAllMenus({ payload: { truck_id } }) {

  try {
    const response = yield call(api.get, `menus/${truck_id}`);

    const list = response.data.map(menu => {
      return {
        ...menu,
        price: formatCurrency(menu.price)
      }});

    yield put(loadMenusSuccess(list));
  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(loadMenusFailure(error));
  }
}

export function* loadMenusByTypes({ payload: { truck_id, type} }) {
  try {
    const response = yield call(api.get, `menus/${truck_id}/`, {
      params: {
        type
      }
    });

    const list = response.data.map(menu => {
      return {
        ...menu,
      }});

    yield put(loadMenusByTypesSuccess(list));
  } catch (error) {
    yield put(loadMenusByTypesFailure(error));
    toast.error(`An error occurred: ${error.response.data.message}`);
  }
}

export function* createMenu({ payload: { data } }) {

  const { title, description, type, options, price, photo_filename } = data.values;
  const { truck_id } = data;

  try {
    const response = yield call(api.post, 'menus', {
      truck_id,
      title,
      description,
      type,
      options,
      price,
      photo_filename
    });
    yield put(createMenuSuccess(response.data));
    yield put(hideModal());
    yield put(loadMenusRequest(truck_id));
  } catch (error) {
    yield put(createMenusFailure(error));
    toast.error(`An error occurred: ${error.response.data.message}`);
  }
}

export function* updateMenu({ payload: { data }}) {

  const {
    id,
    truck_id,
    title,
    description,
    type,
    options,
    price,
    photo_filename } = data;


  try {
    const response = yield call(api.put, 'menus', {
      menu_id: id,
      truck_id,
      title,
      description,
      type,
      options,
      price,
      photo_filename
    });

    yield put(updateMenuSuccess(response.data));
    yield put(hideModal());
    yield put(loadMenusRequest(truck_id));

  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(updateMenuFailure({message: error.response.data.message, error}));
  }
}

export function* deleteMenu({ payload: { menu_id }}) {
  try {
    yield call(api.delete, `menus/${menu_id}`);

    yield put(deleteMenuSuccess(menu_id));
    toast.success('Your menu was deleted successfully.');
    yield put(hideModal());

  } catch (error) {
    toast.error(`An error occurred: ${error.response.data.message}`);
    yield put(deleteMenuFailure({message: error.response.data.message, error}));
  }
}

export default all([
  takeLatest(ActionTypes.CREATE_MENU_REQUEST, createMenu),
  takeLatest(ActionTypes.LOAD_MENUS_BY_TYPES_REQUEST, loadMenusByTypes),
  takeLatest(ActionTypes.LOAD_MENUS_REQUEST, loadAllMenus),
  takeLatest(ActionTypes.UPDATE_MENU_REQUEST, updateMenu),
  takeLatest(ActionTypes.DELETE_MENU_REQUEST, deleteMenu),
]);
