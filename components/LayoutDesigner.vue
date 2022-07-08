<template>
  <div>
    <canvas ref="draw-area" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { LayoutComponent, MainComponent } from '../lib/layout-components'

@Component
export default class LayoutDesigner extends Vue {
  $refs!: {
    'draw-area': HTMLCanvasElement,
  }

  root: MainComponent = new MainComponent()
  ctx: CanvasRenderingContext2D | null = null

  @Prop(Array)
  readonly components: LayoutComponent[] | undefined

  @Watch('components')
  onComponentsChanged(val: LayoutComponent[], oldVal: LayoutComponent[]) {
    console.log('components changed', val, oldVal)
    this.root.components = val
    if(this.ctx)
      this.root.render(this.$refs['draw-area'], this.ctx)
  }

  mounted() {
    const canvas = this.$refs['draw-area']
    const ctx = canvas.getContext('2d')
    this.ctx = ctx

    if(!ctx)
      return

    let draggingComponent: LayoutComponent | null = null
    let resizingComponent: LayoutComponent | null = null
    let mouseStartX = 0
    let mouseStartY = 0
    let originalWidth = 0
    let originalHeight = 0

    this.root.render(canvas, ctx)

    canvas.onmousedown = ev => {
      for(let comp of this.root.components) {
        if(ev.offsetX >= comp.x + comp.width - 3 && ev.offsetX <= comp.x + comp.width + 3
          && ev.offsetY >= comp.y + comp.height - 3 && ev.offsetY <= comp.y + comp.height + 3) {
          this.root.activeComponent = comp
          resizingComponent = comp
          originalWidth = comp.width
          originalHeight = comp.height
        }
        else if(ev.offsetX >= comp.x && ev.offsetX <= comp.x + comp.width - 3
          && ev.offsetY >= comp.y && ev.offsetY <= comp.y + comp.height - 3) {
          this.root.activeComponent = comp
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
        this.root.render(canvas, ctx)
      }
      if(resizingComponent) {
        const scaleW = Math.max(0, ev.offsetX - resizingComponent.x) / originalWidth
        const scaleH = Math.max(0, ev.offsetY - resizingComponent.y) / originalHeight
        const scale = Math.min(scaleW, scaleH)

        resizingComponent.width = Math.floor(originalWidth * scale)
        resizingComponent.height = Math.floor(originalHeight * scale)
        this.root.render(canvas, ctx)
      }
    }

    canvas.onmouseup = ev => {
      draggingComponent = null
      resizingComponent = null
    }
  }
}
</script>
