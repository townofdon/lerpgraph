import React from 'react'
import { Route, Routes } from 'react-router'

import { HomePage } from './pages/HomePage'
import { useSlideEvents } from './hooks/useSlideEvents'
import { Slide01 } from './pages/slides/Slide01'
import { Slide01b } from './pages/slides/Slide01b'
import { Slide02 } from './pages/slides/Slide02'
import { Slide02b } from './pages/slides/Slide02b'
import { Slide03 } from './pages/slides/Slide03'
import { Slide03b } from './pages/slides/Slide03b'

const slides = [Slide01, Slide01b, Slide02, Slide02b, Slide03, Slide03b]

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
    </Routes>
  )
}

export default App
