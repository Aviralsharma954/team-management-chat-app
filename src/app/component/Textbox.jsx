import { PaperclipIcon, Plus, Send } from 'lucide-react'
import React, { useState } from 'react'
import { socket } from '../socket';

const Textbox = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending:', message);
      if(message){
        const UserId = localStorage.getItem("user");
        const data = {"user":UserId,"message":message}
        socket.send(JSON.stringify(data));
      }
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex justify-end items-center w-full fixed bottom-0 p-4 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent">
      <div className="h-14 w-full rounded-full backdrop-blur-md bg-[var(--input-bg)] shadow-sm border border-[var(--border-color)] flex items-center">
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex bg-transparent focus:outline-none placeholder:text-[var(--text-placeholder)] text-[var(--text-input)] px-4 w-full"
          placeholder="Type your message..." 
        />
        <div className="flex gap-1 items-center px-2">
          <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <Plus size={18} className="text-[var(--text-secondary)]"/>
          </button>
          <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <PaperclipIcon size={18} className="text-[var(--text-secondary)]"/>
          </button>
          <button 
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white rounded-full p-2 transition-all ml-1"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Textbox
