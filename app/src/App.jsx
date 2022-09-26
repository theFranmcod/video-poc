import { useEffect } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react'

import './App.css'

function App() {
  return (
    <div className="App">
      <div>Kappa</div>
      <Video />
    </div>
  )
}

export default App

function VideoCanvasPhoto() {

  const videoRef = useRef(null)
  const videoCanvas = useRef(null)

  useEffect(() => {
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 400 }, facingMode: 'environment' })
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

  const capturePhoto = useCallback(() => {
    const canvas = videoCanvas.current
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)

    const img = new Image()
    img.onload = function () {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    }
    img.src = 'https://clipartcraft.com/images/transparent-picture-background-2.png'

  }, [])

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      capturePhoto()
    }, 6);

    return () => {
      clearInterval(refreshInterval)
    }
  }, [capturePhoto])

  return (
    <div>
      <button onClick={capturePhoto}>Photo</button>
      <video hidden ref={videoRef} />
      <canvas ref={videoCanvas} />
    </div>
  )
}


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
        .getUserMedia({ video: { width: 400 } })
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