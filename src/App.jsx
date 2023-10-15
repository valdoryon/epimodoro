import { Route, Routes, Navigate } from 'react-router-dom'
import Timer from './components/Timer/Timer'
import Chrono from './components/Chrono/Chrono'

function App () {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/temporizador' />} />
      <Route path='/temporizador' element={<Timer />} />
      <Route path='/cronometro' element={<Chrono />} />
    </Routes>

  )
}

export default App
