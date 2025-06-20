import type { GraphData, Vector } from './types'
import { clamp, inverseLerp, lerp } from './utils/utils'

const PADDING = 60
const EPSILON = 0.0001

const colors: Record<string, React.CSSProperties['color']> = {
  bg: '#111109',
  plot: 'aqua',
  plotExp: 'rgb(245, 243, 112)',
  axisMajor: '#555',
  axisMinor: '#292918',
  axisTick: '#151412',
  lowerBound: 'magenta',
  upperBound: 'darkgreen',
  mouse: 'darkcyan',
}

export const drawLerpCurve = (
  canvas: HTMLCanvasElement | null,
  lerpData: GraphData,
  expData: GraphData,
  mouse: Vector,
) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const renderer = new Renderer(canvas, ctx)
  const cw = canvas.width
  const ch = canvas.height

  const normX = (x: number) => x * (cw - PADDING * 2) + PADDING
  const normY = (y: number) => (1 - y) * (ch - PADDING * 2) + PADDING

  const verticalLine = (
    x: number,
    color: React.CSSProperties['color'] = '#fff',
    width = 1,
  ) => {
    if (x < 0 - EPSILON || x > 1 + EPSILON) return
    renderer.drawLine(normX(x), normY(0), normX(x), normY(1), color, width)
  }

  const horizontalLine = (
    y: number,
    color: React.CSSProperties['color'] = '#fff',
    width = 1,
  ) => {
    if (y < 0 - EPSILON || y > 1 + EPSILON) return
    renderer.drawLine(normX(0), normY(y), normX(1), normY(y), color, width)
  }

  function label(
    text: string,
    x: number,
    y: number,
    anchor: 'right' | 'left' | 'top' | 'bottom',
    color: React.CSSProperties['color'] = 'whitesmoke',
    minNextLabel = -1,
  ) {
    const fontSize = 12
    const padding = 4
    const m = renderer.measureText(text, fontSize)
    const tWidth = m.width
    const tHeight = Math.abs(m.actualBoundingBoxAscent - m.actualBoundingBoxDescent)
    const [px, py] = (() => {
      const px = normX(x)
      const py = normY(y)
      if (anchor === 'right') {
        return [px - tWidth - padding, py + tHeight*0.5]
      } else if (anchor === 'top') {
        return [px - tWidth*0.5, py + tHeight + padding + 2]
      } else if (anchor === 'left') {
        return [px + padding, py + tHeight*0.5]
      } else if (anchor === 'bottom') {
        return [px - tWidth*0.5, py - padding]
      }
      return [px, py]
    })()
    if (minNextLabel > 0) {
      if (px < minNextLabel && anchor === 'top') {
        return minNextLabel
      }
      if (py > minNextLabel && anchor === 'right') {
        return minNextLabel
      }
    }
    renderer.text(text, clamp(px, 0, cw), clamp(py, 0, ch), color, fontSize)
    if (anchor === 'top') {
      return px + tWidth*0.5 + padding
    }
    if (anchor === 'right') {
      return py - tHeight - padding
    }
    return -1
  }

  renderer.clear()
  renderer.fill(colors.bg)

  function drawVerticalAxes() {
    let t = 0
    let minXNextLabel = -1
    while (t <= lerpData.domain + EPSILON) {
      const major = Math.round(t * 10) % 10 < EPSILON
      const minor = Math.round(t * 10) % 5 < EPSILON
      if (major) {
        verticalLine(t / lerpData.domain, colors.axisMajor)
        if (t) {
          minXNextLabel = label(t.toFixed(0), t / lerpData.domain, 0, "top", 'whitesmoke', minXNextLabel)
        }
      } else if (minor) {
        verticalLine(t / lerpData.domain, colors.axisMinor)
        if (t && lerpData.domain < 13) {
          minXNextLabel = label(t.toFixed(1), t / lerpData.domain, 0, "top", 'whitesmoke', minXNextLabel)
        }
      } else {
        if (lerpData.domain < 8) {
          verticalLine(t / lerpData.domain, colors.axisTick)
        }
      }
      t += 0.1
    }
    if (lerpData.tKnee > 0 && lerpData.tKnee < lerpData.domain) {
      verticalLine(lerpData.tKnee / lerpData.domain, 'green')
      label(lerpData.tKnee.toFixed(2), lerpData.tKnee / lerpData.domain, 1, "bottom", 'green')
    }
  }
  drawVerticalAxes()

  function drawHorizontalAxes() {
    let minXNextLabel = -1
    let y = Math.ceil(lerpData.min)
    while (y <= lerpData.max) {
      horizontalLine(inverseLerp(lerpData.min, lerpData.max, y), colors.axisMajor)
      minXNextLabel = label(String(y), 0, inverseLerp(lerpData.min, lerpData.max, y), "right", 'whitesmoke', minXNextLabel)
      y++
    }
    horizontalLine(1, colors.upperBound)
    horizontalLine(0, colors.lowerBound)
    if (lerpData.max !== 1) label(String(lerpData.max), 0, 1, "right", colors.upperBound)
    if (lerpData.min !== 0) label(String(lerpData.min), 0, 0, "right", colors.lowerBound)
  }
  drawHorizontalAxes()

  function drawMouseLines(
  ) {
    const x = inverseLerp(PADDING, cw - PADDING, mouse.x)
    const y = 1 - inverseLerp(PADDING, ch - PADDING, mouse.y)
    if (x < 0 || x > 1 || y < 0 || y > 1) return
    horizontalLine(y, colors.mouse)
    verticalLine(x, colors.mouse)
    const vx = x * lerpData.domain
    const vy = lerp(lerpData.min, lerpData.max, y)
    label(vx.toFixed(2), x, 1, "bottom", colors.mouse)
    label(vy.toFixed(2), 1, y, "left", colors.mouse)
  }
  drawMouseLines()

  function plotLine(a: Vector, b: Vector, color: React.CSSProperties['color']) {
    const ayScaled = inverseLerp(lerpData.min, lerpData.max, a.y)
    const byScaled = inverseLerp(lerpData.min, lerpData.max, b.y)
    renderer.drawLine(
      normX(a.x / lerpData.domain),
      normY(ayScaled),
      normX(b.x / lerpData.domain),
      normY(byScaled),
      color,
    )
  }

  for (let i = 1; i < expData.points.length; i++) {
    const prev = expData.points[i - 1]
    const point = expData.points[i]
    plotLine(prev, point, colors.plotExp)
  }

  for (let i = 1; i < lerpData.points.length; i++) {
    const prev = lerpData.points[i - 1]
    const point = lerpData.points[i]
    plotLine(prev, point, colors.plot)
  }
}

class Renderer {
  private ctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.canvas = canvas
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  fill(color: React.CSSProperties['color']) {
    this.drawRect(0, 0, this.canvas.width, this.canvas.height, color)
  }

  drawRect(
    ax: number,
    ay: number,
    bx: number,
    by: number,
    color: React.CSSProperties['color'] = '#fff',
  ) {
    const ctx = this.ctx
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.fillRect(ax, ay, bx, by)
  }

  drawLine(
    ax: number,
    ay: number,
    bx: number,
    by: number,
    color: React.CSSProperties['color'] = '#fff',
    width = 1,
  ) {
    const ctx = this.ctx
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(ax, ay)
    ctx.lineTo(bx, by)
    ctx.closePath()
    ctx.stroke()
  }

  drawCircle(
    x: number,
    y: number,
    radius: number,
    color: React.CSSProperties['color'] = '#fff',
  ) {
    const ctx = this.ctx
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.closePath()
    ctx.fill()
  }

  text(
    text: string,
    x: number,
    y: number,
    color: React.CSSProperties['color'] = '#fff',
    fontSize: number = 12,
  ) {
    const ctx = this.ctx
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.font = `${fontSize}px sans-serif`
    ctx.fillText(text, x, y)
  }

  measureText(text: string, fontSize: number = 12) {
    const ctx = this.ctx
    ctx.font = `${fontSize}px sans-serif`
    return ctx.measureText(text)
  }
}
