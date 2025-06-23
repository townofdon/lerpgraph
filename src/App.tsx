import React from 'react'
import { Route, Routes } from 'react-router'

import { useSlideEvents } from './hooks/useSlideEvents'
import { HomePage } from './pages/HomePage'
import { Page404 } from './pages/404Page'
import { Slide01 } from './pages/slides/Slide01'
import { Slide01b } from './pages/slides/Slide01b'
import { Slide02 } from './pages/slides/Slide02'
import { Slide02b } from './pages/slides/Slide02b'
import { Slide02c } from './pages/slides/Slide02c'
import { Slide03 } from './pages/slides/Slide03'
import { Slide03b } from './pages/slides/Slide03b'
import { Slide04 } from './pages/slides/Slide04'
import { Slide05 } from './pages/slides/Slide05'
import { Slide06 } from './pages/slides/Slide06'
import { Slide07 } from './pages/slides/Slide07'
import { Slide08 } from './pages/slides/Slide08'
import { Slide09 } from './pages/slides/Slide09'
import { Slide10 } from './pages/slides/Slide10'
import { Slide11 } from './pages/slides/Slide11'
import { Slide12 } from './pages/slides/Slide12'
import { Slide13 } from './pages/slides/Slide13'
import { Slide14 } from './pages/slides/Slide14'
import { Slide15 } from './pages/slides/Slide15'
import { Slide16 } from './pages/slides/Slide16'
import { Slide17 } from './pages/slides/Slide17'
import { Slide18 } from './pages/slides/Slide18'
import { Slide19 } from './pages/slides/Slide19'

const slides = [
  Slide01,
  Slide01b,
  Slide02,
  Slide02b,
  Slide02c,
  Slide03,
  Slide03b,
  Slide04,
  Slide05,
  Slide06,
  Slide07,
  Slide08,
  Slide09,
  Slide10,
  Slide11,
  Slide12,
  Slide13,
  Slide14,
  Slide15,
  Slide16,
  Slide17,
  Slide18,
  Slide19,
]

import './App.css'

function App() {
  useSlideEvents(slides.length)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {slides.map((Slide, index) => (
        <Route
          path={`/slide-${index + 1}`}
          element={React.cloneElement(<Slide slideIndex={0} />, {
            slideIndex: index + 1,
            lastSlide: index === slides.length - 1,
          })}
        />
      ))}
      <Route path='*' element={<Page404 />} />
    </Routes>
  )
}

export default App
