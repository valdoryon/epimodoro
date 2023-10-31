let isRunning = false
let myChrono

let milliseconds
let seconds
let minutes
let hours

function startTimer (hrs, min, sec, mil) {
  milliseconds = mil
  seconds = sec
  minutes = min
  hours = hrs

  isRunning = true
  if (!myChrono) {
    myChrono = setInterval(updateTimer, 10)
  }
}

function stopTimer () {
  isRunning = false
  clearInterval(myChrono)
  myChrono = null
}

function resetTimer () {
  milliseconds = 0
  seconds = 0
  minutes = 0
  hours = 0
  clearInterval(myChrono)
  myChrono = null
  myChrono = setInterval(updateTimer, 10)
}

function updateTimer () {
  if (isRunning) {
    milliseconds++
    if (milliseconds > 99) {
      seconds++
      milliseconds = 0
    } else if (seconds === 60) {
      minutes++
      seconds = 0
      milliseconds = 0
    } else if (minutes === 60) {
      hours++
      minutes = 0
      seconds = 0
      milliseconds = 0
    }
  }
  postMessage([hours, minutes, seconds, milliseconds])
}

addEventListener('message', (e) => {
  if (e.data[0] === 'start') {
    startTimer(e.data[1], e.data[2], e.data[3], e.data[4])
  } else if (e.data[0] === 'stop') {
    stopTimer()
  } else if (e.data[0] === 'reset') {
    resetTimer()
  }
})
