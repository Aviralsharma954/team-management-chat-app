import { PaperclipIcon, Plus } from 'lucide-react'
import React from 'react'

const Textbox = () => {
  return (
    <div className="flex justify-end items-center w-full absolute bottom-0">
      <div className=" h-16 bg-gray-300 m-2 w-full rounded-lg">
        <input type="text" className=" flex bg-gray-300 focus:outline-none placeholder:text-gray-500 m-1 w-[90%]" placeholder="Type your message.." />
        <div className="flex gap-2 m-1 relative">
            <div className="bg-gray-100 w-min text-gray-500 rounded-sm"><Plus/></div>
            <PaperclipIcon className=" text-gray-400"/>
            <div className=" absolute right-0 mr-1 rounded-md pr-2 pl-2 bg-gray-950 cursor-pointer text-gray-100 p-1 bottom-0">
                <div>Send now</div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Textbox
