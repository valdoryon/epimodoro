let startTime
const elapsedMilliseconds = 0
let isRunning = false
let myChrono

let milliseconds
let seconds
let minutes
let hours

function startTimer () {
  startTime = performance.now() - elapsedMilliseconds
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

function resetTimer (hrs, min, sec, mill) {
  clearInterval(myChrono)
  myChrono = null
  milliseconds = mill
  seconds = sec
  minutes = min
  hours = hrs
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
    milliseconds = e.data[4]
    seconds = e.data[3]
    minutes = e.data[2]
    hours = e.data[1]
    startTimer()
  } else if (e.data[0] === 'stop') {
    stopTimer()
  } else if (e.data[0] === 'reset') {
    resetTimer(e.data[1], e.data[2], e.data[3], e.data[4])
  }
})
