import {
  SET_CHARACTER,
  SET_FILTER,
  SET_IS_MODAL_OPEN,
  SET_DISPLAY_CHARACTERS,
  SET_ERROR,
  SET_CHARACTER_LOADING,
  SET_CHARACTERS_LIST_LOADING,
} from "../actions/actionTypes";

const defaultState = {
  isModalOpen: false,
  filter: {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  },
  characterData: { data: null, isLoading: true },
  displayCharacters: { numPages: null, characters: [], isLoading: true },
  error: { exists: false, message: null },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_CHARACTER:
      return {
        ...state,
        characterData: {
          data: action.payload,
          isLoading: false,
        },
      };
    case SET_DISPLAY_CHARACTERS:
      return {
        ...state,
        displayCharacters: { ...action.payload, isLoading: false },
      };
    case SET_CHARACTER_LOADING:
      return {
        ...state,
        characterData: {
          isLoading: action.payload,
        },
      };
    case SET_CHARACTERS_LIST_LOADING:
      return {
        ...state,
        characterData: {
          isLoading: action.payload,
        },
      };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
