import React from 'react'
import "./content.css"
import {VscLibrary} from "react-icons/vsc"
import {FaPlus} from "react-icons/fa"

export default function Content() {
  return (
    <div className='content'>
        <div className='right'>
            content
        </div>
        <div className="library">
            <div className="lib-head">
                <VscLibrary size={25} color='white' />
                <p>Your Library</p>
                <FaPlus size={25} color='white' />
            </div>
            <div className='head-line'></div>
        </div>
    </div>
  )
}
