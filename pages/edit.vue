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
      <img ref="dummy-logo" style="display: none;" :src="require('~/assets/bn-paf-icon.png')" />
      <LayoutDesigner :components="components" />
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
import Component from 'vue-class-component'
import { TextComponent, ImageComponent, LayoutComponent } from '../lib/layout-components'

@Component
export default class EditPage extends Vue {
  $refs!: {
    'dummy-logo': HTMLImageElement,
  }

  components: LayoutComponent[] = []

  mounted() {
    const logo = this.$refs['dummy-logo']

    const imgComp = new ImageComponent(logo)
    imgComp.x = 10
    imgComp.y = 10

    const text1 = new TextComponent('${excel:column:name}')
    text1.x = 320
    text1.y = 10
    text1.width = 400
    text1.height = 60

    const text2 = new TextComponent('${excel:column:description}')
    text2.x = 10
    text2.y = 300
    text2.width = 780
    text2.height = 40

    this.components = [imgComp, text1, text2]
    console.log('created components')
  }
}
</script>
