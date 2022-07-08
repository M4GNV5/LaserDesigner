<template>
  <div>
    <AppBar/>
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
