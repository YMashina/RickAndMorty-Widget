import {
  SET_CHARACTER,
  SET_CHARACTER_LOADING,
  SET_CHARACTERS_LIST_LOADING,
  SET_DISPLAY_CHARACTERS,
  SET_ERROR,
  SET_FILTER,
  SET_IS_MODAL_OPEN,
} from "./actionTypes";

export const setIsModalOpenAction = (payload) => {
  return {
    type: SET_IS_MODAL_OPEN,
    payload,
  };
};

export const setFilterAction = (payload) => {
  return {
    type: SET_FILTER,
    payload,
  };
};

export const setCharacterDataAction = (payload) => {
  return {
    type: SET_CHARACTER,
    payload,
  };
};

export const setDisplayCharactersAction = (payload) => {
  return {
    type: SET_DISPLAY_CHARACTERS,
    payload,
  };
};

export const setErrorAction = (payload) => {
  return {
    type: SET_ERROR,
    payload,
  };
};

export const setIsCharacterLoadingAction = (payload) => {
  return {
    type: SET_CHARACTER_LOADING,
    payload,
  };
};

export const setCharactersListLoadingAction = (payload) => {
  return {
    type: SET_CHARACTERS_LIST_LOADING,
    payload,
  };
};
