import React from 'react'
import Navbar from './component/Navbar'
import Messagearea from './component/Messagearea'
import Textbox from './component/Textbox'
import { handleSend } from './socket'

const Main = () => {
  setTimeout(handleSend, 1000)
  return (
    <>
        <Navbar/>
        <Messagearea/>
        <Textbox/>
    </>
  )
}

export default Main
