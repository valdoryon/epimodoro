import { Route, Routes } from 'react-router-dom'
import Timer from './components/Timer/Timer'
import Chrono from './components/Chrono/Chrono'
import TimeWorker from './components/Timer/timer-worker?worker'
import ChronoWorker from './components/Chrono/chrono-worker?worker'

function App () {
  const timerWorker = new TimeWorker()
  const chronoWorker = new ChronoWorker()

  return (
    <Routes>
      <Route path='/' element={<Timer timerWorker={timerWorker} />} />
      <Route path='/cronometro' element={<Chrono chronoWorker={chronoWorker} />} />
    </Routes>

  )
}

export default App
