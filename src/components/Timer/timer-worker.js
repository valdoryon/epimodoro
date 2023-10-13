const tick = 1

function startTimer () {
  setInterval(() => {
    self.postMessage(tick)
  }, 1000)
}

startTimer()
