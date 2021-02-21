import axios from 'axios';

const CREATE_PERSON = '/person';
const SAVE_PERSON = '/person';
const DELETE_PERSON = '/deletePerson';
const GET_PERSON = '/person';
const GET_PEOPLE = '/getPeople';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

function createPerson(person) {
  return api.post(CREATE_PERSON, person);
}

function savePerson(person) {
  return api.put(SAVE_PERSON, person);
}

function deletePerson(person) {
  return api.post(DELETE_PERSON, person);
}

function getPerson(cpf) {
  const params = {
    cpf,
  };
  return api.get(GET_PERSON, { params });
}

function getPeople() {
  return api.get(GET_PEOPLE);
}

export default {
  createPerson,
  savePerson,
  deletePerson,
  getPerson,
  getPeople,
};
