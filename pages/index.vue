<template>
  <div>
    <AppBar/>
    <div class="main">
      <h4 class="top"> Projekt anlegen:</h4>

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Projektname:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.name" type="text" placeholder="Projektname" required></b-form-input>
        </b-form-group>


        <b-form-group id="input-group-3" label="Material:" label-for="input-3">
          <b-form-select id="input-3" v-model="form.material" :options="materials" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-3" label="Form:" label-for="input-3">
          <b-form-select id="input-3" v-model="form.form" :options="forms" required></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-4" label="Excel-File:" label-for="input-4">
          <b-form-file id="form-image" placeholder="Excel-File hochladen..."></b-form-file>
        </b-form-group>
        <b-button type="submit">Start</b-button>
      </b-form>
    </div>
  </div>


</template>

<style scpoped>
  .main {
    padding: 50px;
    width: 70%;
  }

  .top {

    padding-top: 10px;
  }

</style>

<script lang="ts">
  import Vue from 'vue'


  export default Vue.extend({
    data() {
      return {
        form: {
          name: '',
          form: null,
          material: null,

        },
        materials: [{
          text: 'Material auswählen',
          value: null
        }, 'Stein', 'Holz', 'Metall'],
        forms: [{
          text: 'Form auswählen',
          value: null
        }, 'Rechteck', 'Kreis', 'Quadrat'],
        file1: null,
        show: true
      }
    },
    methods: {
      onSubmit() {
        alert(JSON.stringify(this.form))
      },
    }



  })

</script>
