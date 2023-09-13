import React, { useEffect, useState } from 'react'
import UseAuth from './UseAuth'
import axios from 'axios'
import { FaBell} from 'react-icons/fa'
import {FiSearch} from 'react-icons/fi'
import Content from './Content'

import "./App.css"
import Player from './Player'

export default function Dashboard({code}) {
  const accessToken = UseAuth(code)
  const [profileData, setProfileData] = useState()
  const [lastTrackPlayed, setLastTrackPlayed] = useState()
  const [usersPlaylist, setUsersPlaylist] = useState()
 
  useEffect(() => {
    if(!accessToken) return
    axios.post('http://localhost:3001/getprofile', {accessToken})
    .then(res => {
      setProfileData(res.data.profileResponse)
      setLastTrackPlayed(res.data.lastTrackPlayed)
      setUsersPlaylist(res.data.usersPlaylist)
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [accessToken])


  return (
    <div className="page">
      <div className='header'>
      <div className="name-pfp">
      <img src={profileData?.images[0].url} alt="here comes pfp" />
      <p>{profileData?.display_name}</p>
      </div>
      <form >
        <input className='searchbar' type="text" placeholder='Search for desired songs, albums, artists...' spellCheck='false' />
        <div className='search-icon'>
          <FiSearch color='rgba(255, 255, 255, 0.505)' size={20} />
        </div>
      </form>
      <div className='nav-bar'>
        <div></div>
        <div></div>
        <div className="noticif">
          <FaBell color='#E7C40F' size={15} />
        </div>
      </div>
    </div>
    <div className='content'>
      <Content />
    </div>
    <div className='player-div'>
      <Player player={lastTrackPlayed} accessToken={accessToken} />
    </div>
    </div>
    
  )
}
