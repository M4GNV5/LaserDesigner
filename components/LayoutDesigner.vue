<template>
  <div>
    <img ref="dummy-logo" style="display: none;" :src="require('~/assets/bn-paf-icon.png')" />
    <canvas ref="draw-area" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { LayoutComponent, MainComponent, TextComponent, ImageComponent } from '../lib/layout-components'

@Component
export default class LayoutDesigner extends Vue {
  mounted() {
    const logo: HTMLImageElement = this.$refs['dummy-logo'] as HTMLImageElement
    const canvas: HTMLCanvasElement = this.$refs['draw-area'] as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if(!ctx)
      return

    const root = new MainComponent()

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

    root.components.push(imgComp, text1, text2)

    let draggingComponent: LayoutComponent | null = null
    let resizingComponent: LayoutComponent | null = null
    let mouseStartX = 0
    let mouseStartY = 0
    let originalWidth = 0
    let originalHeight = 0


    root.render(canvas, ctx)

    canvas.onmousedown = ev => {
      for(let comp of root.components) {
        if(ev.offsetX >= comp.x + comp.width - 3 && ev.offsetX <= comp.x + comp.width + 3
          && ev.offsetY >= comp.y + comp.height - 3 && ev.offsetY <= comp.y + comp.height + 3) {
          root.activeComponent = comp
          resizingComponent = comp
          originalWidth = comp.width
          originalHeight = comp.height
        }
        else if(ev.offsetX >= comp.x && ev.offsetX <= comp.x + comp.width - 3
          && ev.offsetY >= comp.y && ev.offsetY <= comp.y + comp.height - 3) {
          root.activeComponent = comp
          draggingComponent = comp
          mouseStartX = ev.offsetX - comp.x
          mouseStartY = ev.offsetY - comp.y
        }
      }
    }

    canvas.onmousemove = ev => {
      if(draggingComponent) {
        draggingComponent.x = ev.offsetX - mouseStartX
        draggingComponent.y = ev.offsetY - mouseStartY
        root.render(canvas, ctx)
      }
      if(resizingComponent) {
        const scaleW = Math.max(0, ev.offsetX - resizingComponent.x) / originalWidth
        const scaleH = Math.max(0, ev.offsetY - resizingComponent.y) / originalHeight
        const scale = Math.min(scaleW, scaleH)

        resizingComponent.width = Math.floor(originalWidth * scale)
        resizingComponent.height = Math.floor(originalHeight * scale)
        root.render(canvas, ctx)
      }
    }

    canvas.onmouseup = ev => {
      draggingComponent = null
      resizingComponent = null
    }
  }
}
</script>
