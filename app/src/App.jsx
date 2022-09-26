import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react'

import './App.css'

function App() {
  return (
    <div className="App">
      <div>Kappa 0.0.3</div>
      <Video />
    </div>
  )
}

export default App

const videoStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

const imageStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '60%',
  transform: 'translate(-50%,-50%)'
}

function Video() {
  const videoRef = useRef(null)

  useEffect(() => {
    const getVideo = () => {
      if (!navigator.mediaDevices) return null
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment', width: 400 } })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error("error:", err);
        });
    }
    getVideo()
  }, [])

  return (
    <div>
      <div style={{ position: 'relative', width: '90vw', height: '90vh' }}>
        <video style={videoStyle} ref={videoRef} />
        <img style={imageStyle} src='https://clipartcraft.com/images/transparent-picture-background-2.png' alt='' />
      </div>
      <button>Photo</button>
    </div>
  )
}