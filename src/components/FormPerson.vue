<template>
  <div class="form-cadastro form-group">
    <h2>Cadastrar de Pessoa</h2>
    <p>
      Nome
      <input
        placeholder="nome"
        type="text"
        name="name"
        v-bind:class="{
          'form-control': true,
          'is-invalid': !isNameValid,
        }"
        v-model="nameInput"
      />
    </p>
    <p>
      CPF
      <input
        :disabled="editMode"
        placeholder="CPF"
        type="text"
        name="cpf"
        v-bind:class="{
          'form-control': true,
          'is-invalid': !isCpfValid,
        }"
        v-model="cpfInput"
      />
    </p>
    <p>
      Email
      <input
        placeholder="email"
        type="text"
        name="email"
        v-bind:class="{
          'form-control': true,
          'is-invalid': !isEmailValid,
        }"
        v-model="emailInput"
      />
    </p>
    <p>
      Telefone
      <input
        placeholder="telefone"
        type="text"
        name="telephone"
        v-bind:class="{
          'form-control': true,
          'is-invalid': !isTelephoneValid,
        }"
        v-model="telephoneInput"
      />
    </p>
    <div class="d-flex flex-row justify-content-around" v-if="editMode">
      <button type="submit" class="btn btn-primary p-2" v-on:click="cancelEdit">
        {{ this.cancelEditLabel }}
      </button>
      <button type="submit" class="btn btn-primary p-2" v-on:click="savePerson">
        {{ this.savePersonLabel }}
      </button>
    </div>
    <div class="d-flex justify-content-around" v-else>
      <button type="submit" class="btn btn-primary" v-on:click="addPerson">
        {{ this.addPersonLabel }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cancelEditLabel: 'Cancelar',
      savePersonLabel: 'Salvar alterações',
      addPersonLabel: 'Adicionar Pessoa',
      nameInput: this.name,
      cpfInput: this.cpf,
      emailInput: this.email,
      telephoneInput: this.telephone,
      isNameValid: true,
      isCpfValid: true,
      isEmailValid: true,
      isTelephoneValid: true,
    };
  },
  methods: {
    validateData() {
      this.isNameValid = true;
      this.isCpfValid = true;
      this.isEmailValid = true;
      this.isTelephoneValid = true;
      if (this.nameInput.trim() === '') {
        this.isNameValid = false;
      }
      if (this.cpfInput.trim() === '') {
        this.isCpfValid = false;
      }
      if (this.emailInput.trim() === '') {
        this.isEmailValid = false;
      }
      if (this.telephoneInput.trim() === '') {
        this.isTelephoneValid = false;
      }
    },
    addPerson() {
      this.validateData();
      if (
        !this.isNameValid ||
        !this.isCpfValid ||
        !this.isEmailValid ||
        !this.isTelephoneValid
      ) {
        return;
      }

      this.$emit('add-person', {
        name: this.nameInput,
        cpf: this.cpfInput,
        email: this.emailInput,
        telephone: this.telephoneInput,
      });
    },
    cancelEdit() {
      this.$emit('cancel-edit');
    },
    savePerson() {
      this.$emit('save-person', {
        name: this.nameInput,
        cpf: this.cpfInput,
        email: this.emailInput,
        telephone: this.telephoneInput,
      });
    },
  },
};
</script>
