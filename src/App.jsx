import { useEffect, useState } from 'react'
import Mat from './Mat'
import './App.css'
import TarihSaat from './TarihSaat'
import HavaDurumu from './HavaDurumu'
import Data from './Data'


function App() {
  

  return (
    <div className='App'>
      <h1>Todo App React</h1>
      <TarihSaat />
      <HavaDurumu />
      <Mat />
      <Data />
    </div>
  )
}

export default App
