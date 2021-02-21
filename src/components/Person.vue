<template>
  <div class="container">
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <h1>Desafio Qualicorp</h1>
    <FormPerson
      v-on:add-person="addPerson"
      v-on:save-person="savePerson"
      v-on:cancel-edit="cancelEdit"
      :name="name"
      :cpf="cpf"
      :email="email"
      :telephone="telephone"
      :editMode="editMode"
      :key="cpf"
    ></FormPerson>
    <ListPerson
      v-on:edit-person="editModePerson"
      v-on:delete-person="deletePerson"
      :personList="personList"
      :key="listChanged"
    ></ListPerson>
  </div>
</template>
<script>
import FormPerson from './FormPerson';
import ListPerson from './ListPerson';
import Api from '../services/api';

export default {
  components: {
    FormPerson,
    ListPerson,
  },
  data() {
    return {
      personList: [],
      successMessage: '',
      errorMessage: '',
      timeoutSuccessMessage: null,
      timeoutErrorMessage: null,
      editMode: false,
      name: '',
      cpf: '',
      email: '',
      telephone: '',
      listChanged: 0,
    };
  },
  mounted: function() {
    this.loadData();
  },
  methods: {
    loadData() {
      Api.getPeople()
        .then((response) => {
          const { data } = response.data;
          this.personList = data;
        })
        .catch((e) => {
          this.showErrorMessage(
            e + ' - Erro inesperado. Tente novamente mais tarde...'
          );
        });
    },
    showSuccessMessage(message) {
      this.successMessage = message;
      clearTimeout(this.timeoutSuccessMessage);
      this.timeoutSuccessMessage = setTimeout(() => {
        this.successMessage = '';
      }, 4000);
    },
    showErrorMessage(message) {
      this.errorMessage = message;
      clearTimeout(this.timeoutErrorMessage);
      this.timeoutErrorMessage = setTimeout(() => {
        this.errorMessage = '';
      }, 4000);
    },
    addPerson(person) {
      this.name = person.name;
      this.cpf = person.cpf;
      this.email = person.email;
      this.telephone = person.telephone;

      Api.getPerson(person.cpf).then((response) => {
        const data = response.data;
        if (Object.keys(data).length === 0) {
          Api.createPerson(person)
            .then(() => {
              this.showSuccessMessage('Cadastro realizado com sucesso!');
              this.name = '';
              this.cpf = '';
              this.email = '';
              this.telephone = '';
              this.personList.push(person);
            })
            .catch((e) => {
              this.showErrorMessage(
                e + ' - Erro inesperado. Tente novamente mais tarde...'
              );
            });
        } else {
          this.showErrorMessage('CPF já cadastrado no sistema');
        }
      });
    },
    editModePerson(index) {
      const item = this.personList[index];
      this.name = item.name;
      this.cpf = item.cpf;
      this.email = item.email;
      this.telephone = item.telephone;
      this.editMode = true;
    },
    cancelEdit() {
      this.name = '';
      this.cpf = '';
      this.email = '';
      this.telephone = '';
      this.editMode = false;
    },
    savePerson(person) {
      Api.savePerson(person)
        .then(() => {
          this.showSuccessMessage('Alteração realizada com sucesso!');
          const index = this.personList.findIndex((e) => e.cpf === person.cpf);
          this.cancelEdit();
          this.personList.splice(index, 1, person);
        })
        .catch((e) => {
          this.showErrorMessage(
            e + ' - Erro inesperado. Tente novamente mais tarde...'
          );
        });
    },
    deletePerson(index) {
      const person = this.personList[index];
      Api.deletePerson(person)
        .then(() => {
          this.showSuccessMessage('Excluído com sucesso!');
          this.personList.splice(index, 1);
        })
        .catch((e) => {
          this.showErrorMessage(
            e + ' - Erro inesperado. Tente novamente mais tarde...'
          );
        });
    },
  },
};
</script>
