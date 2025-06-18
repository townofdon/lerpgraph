export interface Vector {
  x: number
  y: number
}

export interface GraphData {
  points: Vector[]
  min: number
  max: number
  domain: number
  /**
   * The estimated time where the curve has |slope| of 0.5
   */
  tKnee: number
}

export interface SlideProps {
  slideIndex: number
  lastSlide?: boolean
}

export type Easing =
  | 'in-cubic'
  | 'out-cubic'
  | 'in-out-cubic'
  | 'in-quad'
  | 'out-quad'
  | 'in-out-quad'
