import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import PalmCardConfig, { PalmCardConfigProps } from './components/PalmCardConfig/PalmCardConfig'
import PalmCard from './components/PalmCard/PalmCard'
import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const defaultConfig: PalmCardConfigProps = {
    text: '',
    maxTextLength: 200,
    fontSize: 12,
    numberOfColumns: 2,
  }
  const [config, setConfig] = useState(defaultConfig)
  return (
    <div className='App container'>
      <div className='d-print-none'>
        <h1>Palm card maker!</h1>
      </div>
      <PalmCardConfig onComplete={(config) => setConfig(config)} {...config} />
      <PalmCard {...config} />
    </div>
  )
}

export default App
