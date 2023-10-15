let startTime
let elapsedMilliseconds = 0
let isRunning = false

function startTimer () {
  startTime = performance.now() - elapsedMilliseconds
  isRunning = true
  setInterval(updateTimer, 1) // Update every 1 millisecond
}

function stopTimer () {
  isRunning = false
}

function updateTimer () {
  if (isRunning) {
    const currentTime = performance.now()
    elapsedMilliseconds = currentTime - startTime
    self.postMessage(elapsedMilliseconds)
  }
}

self.addEventListener('message', (e) => {
  if (e.data === 'start') {
    startTimer()
  }
})
