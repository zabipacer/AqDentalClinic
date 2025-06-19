import { useState } from 'react'

import './App.css'
import HeroSection from './components/Hero'

import FeaturedServices from './components/Feature'

import Testimonials from './components/Testimonial'
import LocalSEOSection from './components/LocalMAp'
import FaqAccordion from './components/FAQS'

import AboutSection from './components/Why'
import TransformationGallery from './components/Gallery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<HeroSection/>

<FeaturedServices/>
<AboutSection/>
<TransformationGallery/>
<Testimonials/>
<LocalSEOSection/>
<FaqAccordion/>

    </>
  )
}

export default App
