import React, { useEffect, useState } from 'react'
import "./App.css"
import { FaForwardStep, FaBackwardStep, FaPause, FaPlay, FaStar } from "react-icons/fa6"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({player, accessToken}) {
  const [currentTrack, setCurrentTrack] = useState()
  const [isplaying, setIsplaying] = useState(false)
  

  useEffect(() => {
    setCurrentTrack(player?.uri)
   const audio = new Audio(player?.uri)
   console.log(audio)
  }, [currentTrack])

 const PlayPause = (e) => {
    e.preventDefault()
    if(!isplaying) {
      // audio.play()
      setIsplaying(true)
    }
    else {
      // audio.pause()
      setIsplaying(false)
    }
  }

  function msToMinSec(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <div className='player-container'>
      <div className='songicon'>
      <img src={player?.album.images[0].url} alt="img" />
      <div className='song-name'>
        <p>{player?.name}</p>
        <span>{player?.artists[0].name}</span>
      </div>
      </div>
      
      <div className="play-icons">
        <FaBackwardStep size={27} color='white'/>
        <div className='play-pause' onClick={PlayPause}>
          <FaPause size={25} color='white'/>
        </div>
        <FaForwardStep size={27} color='white' />
      </div>
      <div className="play-time">
        <div className="play-mover"></div>
        <div className='play-timer'>
          <p>0:00</p>
          <p>{msToMinSec(player?.duration_ms)}</p>
        </div>
      </div>
      <div className="fav-icon">
        <FaStar size={25} color='yellow'/>
      </div>
      <div className="lyrics-icon">
        <img src="/lyrics.png" alt="" />
      </div>
      {
        accessToken && (
          <SpotifyPlayer
          token={accessToken}
          uris={player?.uri}
          />
        )
      }
    </div>
  )
}
