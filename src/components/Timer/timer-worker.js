let myTimer
let isRunning
let hours = 0
let minutes = 25
let seconds = 0

function startTimer () {
  isRunning = true
  if (!myTimer) {
    myTimer = setInterval(updateTimer, 1000)
  }
}

function stopTimer () {
  isRunning = false
  clearInterval(myTimer)
  myTimer = null
}

function resetTimer (e) {
  clearInterval(myTimer)
  myTimer = null
  hours = e.data[1]
  minutes = e.data[2]
  seconds = e.data[3]
  myTimer = setInterval(updateTimer, 1000)
}

function updateTimer () {
  if (isRunning) {
    if (seconds > 0) {
      seconds--
    } else if (minutes > 0) {
      minutes--
      seconds = 59
    } else if (hours > 0) {
      hours--
      minutes = 59
      seconds = 59
    }
  }
  postMessage([isRunning, hours, minutes, seconds])
}

onmessage = function (e) {
  hours = e.data[1]
  minutes = e.data[2]
  seconds = e.data[3]

  if (e.data[0] === 'start') {
    stopTimer()
    startTimer()
  } else if (e.data[0] === 'stop') {
    stopTimer()
  } else if (e.data[0] === 'reset') {
    resetTimer(e)
  }
}
