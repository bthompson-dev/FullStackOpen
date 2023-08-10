import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (person) => {
  let url = baseUrl + "/" + person.id;
  const request = axios.put(url, person);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  return axios.delete(baseUrl + "/" + id);
};

const exportObject = {
  getAll,
  create,
  update,
  deletePerson,
};

export default exportObject;
