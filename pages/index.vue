<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Projekte
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
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
        <b-button type="submit" variant="primary">Start</b-button>
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
