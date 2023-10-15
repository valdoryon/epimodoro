const tick = 1000 // 1000 milliseconds (1 second)

function startTimer () {
  const timer = setInterval(() => {
    self.postMessage('tick')
  }, tick)
}

self.addEventListener('message', (e) => {
  if (e.data === 'start') {
    startTimer()
  }
})
