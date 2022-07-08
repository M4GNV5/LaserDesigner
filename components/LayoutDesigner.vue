<template>
  <canvas ref="draw-area" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { LayoutComponent, MainComponent, TextComponent } from '../lib/layout-components'

@Component
export default class LayoutDesigner extends Vue {
  mounted() {
    const canvas: HTMLCanvasElement = this.$refs['draw-area'] as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if(!ctx)
      return

    const root = new MainComponent()
    root.components.push(new TextComponent('Hallo Welt!'))
    root.components.push(new TextComponent('AAAA'))
    root.components.push(new TextComponent('BBBCCCDDDEEEFFFGGGHHHIIIJJJ'))

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
        console.log(scale, 'new width x height', resizingComponent.width, resizingComponent.height)
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
