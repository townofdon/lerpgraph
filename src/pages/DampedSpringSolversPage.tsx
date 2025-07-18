import { useEffect, useRef, useState } from 'react'
import { Header } from '../components/Header'
import { Select } from '../components/Select'
import { Stack } from '../components/Stack'
import { Input } from '../components/Input'
import { Toggle } from '../components/Toggle'
import type { SolverType, Vector } from '../types'
import { computeSolverCurve } from '../utils/compute'
import { drawLerpCurve } from '../draw'
import { getSpringSolver } from '../utils/getSpringSolver'
import { DragChaseTest } from '../components/DragChaseTest'

const INITIAL_VALUE_F = 4
const INITIAL_VALUE_Z = 1
const INITIAL_VALUE_R = 0
const INITIAL_VALUE_DOMAIN = 6

export const DampedSpringSolversPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvas2Ref = useRef<HTMLCanvasElement>(null)
  const [solverType, setSolverType] = useState<SolverType>('full-euler')
  const [f, setF] = useState(INITIAL_VALUE_F)
  const [z, setZ] = useState(INITIAL_VALUE_Z)
  const [r, setR] = useState(INITIAL_VALUE_R)
  const [poleMatching, setPoleMatching] = useState(false)
  const [clampK2, setClampK2] = useState(true)
  const [domain, setDomain] = useState(INITIAL_VALUE_DOMAIN)
  const [animating, setAnimating] = useState(false)
  const [mouse, setMouse] = useState<Vector>({ x: -1, y: -1 })
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!animating) return
    let playing = true
    let prevTime = performance.now() / 1000
    const loop = () => {
      if (!playing) return
      const delta = performance.now() / 1000 - prevTime
      prevTime = performance.now() / 1000
      setTime((prev) => {
        const newVal = prev + delta
        if (newVal > domain) return 0
        return newVal
      })
      requestAnimationFrame(loop)
    }
    loop()
    return () => {
      playing = false
    }
  }, [animating, domain])

  useEffect(() => {
    const addCanvasMouseEvents = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return () => {}
      const handleMouseMove = (ev: MouseEvent) => {
        const rect = (ev.target as HTMLCanvasElement).getBoundingClientRect()
        const x = ev.clientX - rect.left + 1
        const y = ev.clientY - rect.top + 1
        setMouse({ x, y })
      }
      canvas.addEventListener('mousemove', handleMouseMove)
      return () => {
        canvas?.removeEventListener('mousemove', handleMouseMove)
      }
    }
    const cleanup1 = addCanvasMouseEvents(canvasRef.current)
    const cleanup2 = addCanvasMouseEvents(canvas2Ref.current)
    return () => {
      cleanup1()
      cleanup2()
    }
  }, [])

  useEffect(() => {
    const getSolver = () =>
      getSpringSolver({
        solverType,
        f,
        z,
        r,
        poleMatching,
        clampK2,
      })
    const data = computeSolverCurve({
      domain,
      solver: getSolver(),
    })
    const data2 = computeSolverCurve({
      domain,
      solver: getSolver(),
      variadicInput: true,
    })
    drawLerpCurve(
      canvasRef.current,
      data,
      undefined,
      mouse,
      animating ? time : -1,
    )
    drawLerpCurve(
      canvas2Ref.current,
      data2,
      undefined,
      mouse,
      animating ? time : -1,
    )
  }, [
    f,
    z,
    r,
    poleMatching,
    clampK2,
    mouse,
    domain,
    solverType,
    time,
    animating,
  ])

  return (
    <>
      <Header />
      <main>
        <Stack
          direction="row"
          align="flex-start"
          gap={50}
          className="container"
        >
          <Stack direction="column" gap={30}>
            <Select
              name="solver"
              label="Integration Solver"
              value={solverType}
              setValue={setSolverType}
              options={[
                { value: 'semi-euler', label: 'Semi-implicit Euler' },
                { value: 'full-euler', label: 'Fully-implicit Euler' },
                { value: 'verlet', label: 'Verlet Integration' },
              ]}
              style={{
                fontSize: 13,
              }}
            />
            <Input
              label="Freq (f)"
              value={f}
              setValue={setF}
              slider
              min={0.001}
              max={10}
              step={0.001}
              reset={INITIAL_VALUE_F}
              copiable
            />
            <Input
              label="Damp (z)"
              value={z}
              setValue={setZ}
              slider
              min={0}
              max={10}
              step={0.001}
              reset={INITIAL_VALUE_Z}
              copiable
            />
            <Input
              label="Resp (r)"
              value={r}
              setValue={setR}
              slider
              min={-10}
              max={10}
              step={0.001}
              reset={INITIAL_VALUE_R}
              copiable
            />
            <Input
              label="Domain"
              value={domain}
              setValue={setDomain}
              slider
              min={0.5}
              max={20}
              step={0.5}
              reset={INITIAL_VALUE_DOMAIN}
            />
            <Toggle
              name="use-pole-matching"
              label="Use Pole Matching"
              checked={poleMatching}
              toggle={setPoleMatching}
            />
            <Toggle
              name="clamp-k2"
              label="Clamp K2"
              checked={clampK2}
              toggle={setClampK2}
            />
            <Toggle
              name="preview-animation"
              label="Preview Animation"
              checked={animating}
              toggle={setAnimating}
            />
          </Stack>
          <div>
            <canvas ref={canvasRef} width="800" height="400" />
            <canvas ref={canvas2Ref} width="800" height="400" />
            <div style={{ marginTop: 30 }} />
            <DragChaseTest
              type={solverType}
              f={f}
              z={z}
              r={r}
              poleMatching={poleMatching}
              clampK2={clampK2}
            />
          </div>
        </Stack>
      </main>
    </>
  )
}
