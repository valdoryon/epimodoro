import { Route, Routes, Navigate } from 'react-router-dom'
import Temporizador from './components/Temporizador/Temporizador'
import Cronometro from './components/Cronometro/Cronometro'

function App () {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/temporizador' />} />
        <Route path='/temporizador' element={<Temporizador />} />
        <Route path='/cronometro' element={<Cronometro />} />
      </Routes>
    </>
  )
}

export default App
