import { ArrowDownUp, ArrowLeft, ArrowLeftRight, ArrowRightLeft, ChevronRight, MoveLeft, Sun } from 'lucide-react'
import React from 'react'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className=" flex gap-2 m-2">
        <ArrowLeft className=" text-gray-600 self-center cursor-pointer"/>
        <h2 className=" text-md font-semibold font-sans">Conference Meeting</h2>
        <div className=" self-center bg-gray-200 rounded-full pl-2 p-1 pr-2 text-sm font-semibold text-gray-500">4h left</div>
        <div className=" absolute right-0 mr-2 flex gap-2 bg-gray-200 rounded-full pl-2 p-1 pr-2">
        <ArrowLeftRight className=" text-gray-500 cursor-pointer"/>
        <ArrowDownUp className=" text-gray-500 cursor-pointer"/>
        <Sun className=" text-yellow-500 cursor-pointer"/>
        </div>
        <div>
            
        </div>
      </div>
      <div className=" flex gap-2 m-2 ml-8">
        <div className="font-bold text-2xl">6:00
          <p className="text-sm font-normal ">Sat, Dec 11</p>
        </div>
        <ChevronRight className=" text-gray-500 self-center"/>
        <div className="font-bold text-2xl">7:00
          <p className="text-sm font-normal ">Sat, Dec 11</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
