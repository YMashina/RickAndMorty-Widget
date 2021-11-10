import axios from "axios";
import {
  setCharacterDataAction,
  setCharactersListLoadingAction,
  setDisplayCharactersAction,
  setErrorAction,
  setIsCharacterLoadingAction,
} from "./actions";

export const fetchCharacters = (page, filterRequest) => {
  return async (dispatch) => {
    try {
      dispatch(setCharactersListLoadingAction(true));
      const response = await axios.get(
        `character?page=${page}${filterRequest}`
      );
      dispatch(setErrorAction({ exists: false, message: null }));
      return dispatch(
        setDisplayCharactersAction({
          numPages: response.data.info.pages,
          characters: response.data.results,
        })
      );
    } catch (e) {
      console.error({ ...e });
      if (e.response.status !== 404) {
        dispatch(
          setErrorAction({ exists: true, message: e.response.data.error })
        );
      } else {
        dispatch(setErrorAction({ exists: false, message: null }));
      }
      return dispatch(
        setDisplayCharactersAction({
          numPages: null,
          characters: [],
        })
      );
    }
  };
};

export const fetchCharacter = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setIsCharacterLoadingAction(true));
      const { data } = await axios.get(`character/${id}`);
      dispatch(setErrorAction({ exists: false, message: null }));
      return dispatch(setCharacterDataAction(data));
    } catch (e) {
      console.error({ ...e });
      if (e.response.status !== 404) {
        dispatch(
          setErrorAction({ exists: true, message: e.response.data.error })
        );
      } else {
        dispatch(setErrorAction({ exists: false, message: null }));
      }
      return dispatch(setCharacterDataAction(null));
    }
  };
};
