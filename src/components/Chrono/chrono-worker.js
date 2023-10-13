const tick = 1

function startChrono () {
  setInterval(() => {
    self.postMessage(tick)
  }, 3)
}

startChrono()
