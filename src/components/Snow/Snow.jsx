import React, { useCallback } from 'react'
import Particles from 'react-tsparticles'
import './Snow.css'
import particlesConfig from './particles-config'
import { loadSlim } from 'tsparticles-slim'

const Snow = () => {
  const particlesInit = useCallback(async (engine) => {
    loadSlim(engine)
  }, [])

  return (
    <Particles
      id='tsparticles' init={particlesInit} options={
      particlesConfig
    }
    />

  )
}

export default Snow
