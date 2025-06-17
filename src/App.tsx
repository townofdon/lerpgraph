// import React from "react";
import { Route, Routes } from "react-router";

import { HomePage } from './pages/HomePage'
import { useSlideEvents } from "./hooks/useSlideEvents";
import { Slide01 } from "./pages/slides/Slide01";
import { Slide02 } from "./pages/slides/Slide02";

const slides = [Slide01, Slide02]

import './App.css'

function App() {
  useSlideEvents(slides.length)

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {slides.map((slide, index) => (
        <Route path={`/slide-${index + 1}`} element={
          slide({
            slideIndex: index + 1,
            lastSlide: index === slides.length - 1
          })
        } />
      ))}
    </Routes>
  )
}

export default App
