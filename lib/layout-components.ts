export class LayoutComponent
{
  x: number = 0
  y: number = 0

  width: number = 200
  height: number = 100

  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    throw new Error('Not Implemented!')
  }
}

export class MainComponent extends LayoutComponent
{
  background: string = '#161618'
  anchor: string = '#ffffff'
  activeAnchor: string = '#ee4d2e'
  showAnchors: boolean = true

  components: LayoutComponent[] = []
  activeComponent: LayoutComponent | null = null

  constructor() {
    super()

    this.width = 800
    this.height = 800
  }

  drawAnchor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }

  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.width = this.width
    canvas.height = this.height

    ctx.beginPath()
    ctx.fillStyle = this.background
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.closePath()

    for(const comp of this.components) {
      comp.render(canvas, ctx)

      if(this.showAnchors) {
        if(this.activeComponent === comp)
          ctx.fillStyle = this.activeAnchor
        else
          ctx.fillStyle = this.anchor

        this.drawAnchor(ctx, comp.x, comp.y)
        this.drawAnchor(ctx, comp.x + comp.width, comp.y)
        this.drawAnchor(ctx, comp.x, comp.y + comp.height)
        this.drawAnchor(ctx, comp.x + comp.width, comp.y + comp.height)
      }
    }
  }
}

export class ImageComponent extends LayoutComponent
{
	image: HTMLImageElement

  constructor(image: HTMLImageElement) {
    super()

    this.image = image
  }
  
  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
}

export class TextComponent extends LayoutComponent
{
  text: string
  color: string
  font: string

  constructor(
    text: string,
    color: string = 'white',
    font: string = '\'Helvetica Neue\', Helvetica, sans-serif'
  ) {
    super()

    this.text = text
    this.color = color
    this.font = font

    this.height = 20
  }

  render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
		ctx.font = `bold ${this.height}px ${this.font}`
		ctx.fillStyle = this.color
		ctx.fillText(this.text, this.x, this.y + this.height, this.width)
		ctx.closePath()
  }
}
