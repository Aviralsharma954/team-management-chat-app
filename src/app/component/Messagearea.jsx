import React from 'react'

const Messagearea = () => {
  const messages = [
    { id: 1, sender: 'John', text: 'Hey, how\'s the project going?', time: '6:05 PM', isSent: true },
    { id: 2, sender: 'Alice', text: 'Making good progress! The new features are almost ready.', time: '6:07 PM', isSent: false },
    { id: 3, sender: 'John', text: 'Great to hear that!', time: '6:08 PM', isSent: true },
  ];

  return (
    <div className="h-[calc(100vh-11rem)] overflow-y-auto p-4 scrollbar-thin">
      <div className="flex flex-col gap-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
              message.isSent 
                ? 'bg-blue-500 text-white' 
                : 'bg-[var(--message-received)] border border-[var(--border-color)]'
            }`}>
              <div className={`text-sm font-medium ${message.isSent ? 'text-white/90' : 'text-[var(--text-primary)]'}`}>
                {message.sender}
              </div>
              <div className={`text-md mt-1 ${message.isSent ? 'text-white' : 'text-[var(--text-primary)]'}`}>
                {message.text}
              </div>
              <div className={`text-[10px] text-right mt-1 ${message.isSent ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
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
