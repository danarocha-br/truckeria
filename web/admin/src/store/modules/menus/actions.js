import ActionTypes from './types';

// LIST
export function loadMenusRequest( truck_id ) {
  return {
    type: ActionTypes.LOAD_MENUS_REQUEST,
    payload:{  truck_id  },
  };
}

export function loadMenusSuccess(list) {
  return {
    type: ActionTypes.LOAD_MENUS_SUCCESS,
    payload: { list },
  };
}

export function loadMenusFailure(error) {
  return {
    type: ActionTypes.LOAD_MENUS_FAILURE,
    payload: error,
  };
}

export function loadMenusByTypesRequest(truck_id, type) {
  return {
    type: ActionTypes.LOAD_MENUS_BY_TYPES_REQUEST,
    payload:{ truck_id, type },
  };
}

export function loadMenusByTypesSuccess(list) {
  return {
    type: ActionTypes.LOAD_MENUS_BY_TYPES_SUCCESS,
    payload: { list },
  };
}

export function loadMenusByTypesFailure(error) {
  return {
    type: ActionTypes.LOAD_MENUS_BY_TYPES_FAILURE,
    payload: error,
  };
}

// CREATE
export function createMenuRequest(data) {
  return {
    type: ActionTypes.CREATE_MENU_REQUEST,
    payload:{ data },
  };
}

export function createMenuSuccess(menu) {
  return {
    type: ActionTypes.CREATE_MENU_SUCCESS,
    payload: { menu },
  };
}


export function createMenusFailure(error) {
  return {
    type: ActionTypes.CREATE_MENU_FAILTURE,
    payload: error,
  };
}

// UPDATE
export function updateMenuRequest(data) {
  return {
    type: ActionTypes.UPDATE_MENU_REQUEST,
    payload: { data },
  };
}

export function updateMenuSuccess(schedule) {
  return {
    type: ActionTypes.UPDATE_MENU_SUCCESS,
    payload: { schedule },
  };
}

export function updateMenuFailure(error) {
  return {
    type: ActionTypes.UPDATE_MENU_FAILURE,
    payload: error,
  };
}

// DELETE
export function deleteMenuRequest(menu_id) {
  return {
    type: ActionTypes.DELETE_MENU_REQUEST,
    payload: { menu_id },
  };
}

export function deleteMenuSuccess(menu_id) {
  return {
    type: ActionTypes.DELETE_MENU_SUCCESS,
    payload: { menu_id },
  };
}

export function deleteMenuFailure(error) {
  return {
    type: ActionTypes.DELETE_MENU_FAILURE,
    payload: error,
  };
}
