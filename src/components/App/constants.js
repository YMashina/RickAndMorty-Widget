import store from "../../redux/store";

export const createFilterRequest = (filter = null) => {
  if (!filter) filter = store.getState().filter;
  let filterRequest = "";
  if (filter.name) filterRequest += `&name=${filter.name}`;
  if (filter.status) filterRequest += `&status=${filter.status}`;
  if (filter.species) filterRequest += `&species=${filter.species}`;
  if (filter.type) filterRequest += `&type=${filter.type}`;
  if (filter.gender) filterRequest += `&gender=${filter.gender}`;
  return filterRequest;
};
