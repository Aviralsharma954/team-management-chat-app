import React, {useState} from 'react'
import { socket } from '../socket';

const Messagearea = () => {
  const [messages,setMessage] = useState([]);
  const [id,setId] = useState("");
  socket.addEventListener("message",({data})=>{
    const result = JSON.parse(data);
    const myId = localStorage.getItem("user");
    setId(myId);
    if(myId == null){
        localStorage.setItem("user",result.UserId);
        setId(result.UserId);
      }
    try {
              setMessage(result.message);
              const element = document.getElementById("message-area");
              element.scrollBy(0,(element.scrollHeight*result.message.length+1)*10000);
  
    } catch (error) {
        console.log(error)
    }
})

  return (
    <div id="message-area" className="h-[calc(100vh-11rem)] overflow-y-auto p-4 scrollbar-thin">
      <div className="flex flex-col gap-3">
        {messages?.map((message) => (
          <div key={message.id} className={`flex ${message.sender == id? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
              message.sender == id 
                ? 'bg-blue-500 text-white' 
                : 'bg-[var(--message-received)] border border-[var(--border-color)]'
            }`}>
              <div className={`text-sm font-medium ${message.sender == id ? 'text-white/90' : 'text-[var(--text-primary)]'}`}>
                {message.sender}
              </div>
              <div className={`text-md mt-1 ${message.sender == id ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                {message.text}
              </div>
              <div className={`text-[10px] text-right mt-1 ${message.sender == id ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messagearea
