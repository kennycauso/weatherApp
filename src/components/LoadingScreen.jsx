import React from 'react'
import "./loadingScreen.css"

const LoadingScreen = () => {
  return (
    <div className='center'>
      <div className="ring"></div>
      <span className='loading'>Loading ...</span>
    </div>
  )
}

export default LoadingScreen