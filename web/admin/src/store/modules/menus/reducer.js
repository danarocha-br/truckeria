import produce from 'immer';

import ActionTypes from './types';

const INITIAL_STATE = { menu: null, list: null, error: null, loading: false };

export default function truckProfile(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {

      case ActionTypes.LOAD_MENUS_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.LOAD_MENUS_SUCCESS: {
        draft.loading = false;
        draft.list = action.payload.list
        break;
      }
      case ActionTypes.LOAD_MENUS_FAILURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      // list
      case ActionTypes.LOAD_MENUS_BY_TYPES_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.LOAD_MENUS_BY_TYPES_SUCCESS: {
        draft.loading = false;
        draft.list = action.payload.list
        break;
      }
      case ActionTypes.LOAD_MENUS_BY_TYPES_FAILURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      // create
      case ActionTypes.CREATE_MENU_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.CREATE_MENU_SUCCESS: {
        draft.loading = false;
        draft.menu = [action.payload.menu];
        draft.list = [...draft.list.filter(menu => (
          menu.id !== action.payload.menu.id
         )), action.payload.menu ]
        draft.error = null;
        break;
      }
      case ActionTypes.CREATE_MENU_FAILTURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      //update
      case ActionTypes.UPDATE_MENU_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.UPDATE_MENU_SUCCESS: {
        draft.loading = false;
        draft.menu = [action.payload.menu];
        draft.list = [...draft.list.filter(menu => (
         menu.id !== action.payload.menu.id
        )), action.payload.menu ]
        draft.error = null;
        break;
      }
      case ActionTypes.UPDATE_MENU_FAILURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      //delete
      case ActionTypes.DELETE_MENU_REQUEST: {
        draft.loading = true;
        break;
      }
      case ActionTypes.DELETE_MENU_SUCCESS: {
        draft.loading = false;
        draft.list = [...draft.list.filter(menu => (
         menu.id !== action.payload.menu_id
        ))]
        draft.error = null;
        break;
      }
      case ActionTypes.DELETE_MENU_FAILURE: {
        draft.loading = false;
        draft.error = [ action.payload ];
        break;
      }

      default:
        return state;
    }
  });
}
