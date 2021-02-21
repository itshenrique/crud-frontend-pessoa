<template>
  <div class="list-group">
    <div v-if="personList.length > 0" class="list-group-item">
      <div class="row">
        <div class="col-3">
          Nome
        </div>
        <div class="col-2">
          CPF
        </div>
        <div class="col-3">
          Email
        </div>
        <div class="col-2">
          Telefone
        </div>
        <span class="col-1"></span>
        <span class="col-1"></span>
      </div>
    </div>
    <div
      class="list-group-item"
      v-for="(person, index) in personList"
      v-bind:key="index"
    >
      <div class="row">
        <div class="col-3">
          {{ person.name }}
        </div>
        <div class="col-2">
          {{ person.cpf }}
        </div>
        <div class="col-3">
          {{ person.email }}
        </div>
        <div class="col-2">
          {{ person.telephone }}
        </div>
        <div class="col-1">
          <a href="#" title="Editar" v-on:click.prevent="editPerson(index)">
            <i class="bi bi-pencil-fill"></i>
          </a>
        </div>
        <div class="col-1">
          <a href="#" title="Excluir" v-on:click.prevent="removePerson(index)">
            <i class="bi bi-trash-fill"></i>
          </a>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    personList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editPerson(index) {
      window.scrollTo(0, 0);
      this.$emit('edit-person', index);
    },
    removePerson(index) {
      this.$emit('delete-person', index);
    },
  },
};
</script>
