'use client'
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const TypeWriter = () => {
  return (
    <div className='text-3xl font-sans font-semibold'>
        <Typewriter 
            words={['Build', 'Test', 'Debug', 'Monitor']}
            loop={5}
            cursor
            cursorStyle='_'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000} />
    </div>
  )
}

export default TypeWriter