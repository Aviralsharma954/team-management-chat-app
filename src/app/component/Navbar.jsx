import { ArrowDownUp, ArrowLeft, ArrowLeftRight, Moon, Sun, ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [positionX, setPositionX] = useState("right");
  const [positionY, setPositionY] = useState("bottom");
  const socket = new WebSocket('ws://localhost:3000');
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    setIsDark(theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme || 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleWindowPosition = async (direction) => {
    if(direction === 'left-right') {
      setPositionX(positionX === 'right' ? 'left' : 'right');
      socket.send(positionX);
    }else{
      setPositionY(positionY === 'bottom' ? 'top' : 'bottom');
      socket.send(positionY);
    }
  };

  return (
    <div className="navbar">
      <div className="flex gap-2 m-2">
        <ArrowLeft className="text-secondary self-center cursor-pointer"/>
        <h2 className="text-md font-semibold font-sans">Conference Meeting</h2>
        <div className="self-center bg-secondary rounded-full pl-2 p-1 pr-2 text-sm font-semibold text-secondary">4h left</div>
        <div className="absolute right-0 mr-2 flex gap-2 bg-secondary rounded-full pl-2 p-1 pr-2">
          <ArrowLeftRight className="text-secondary cursor-pointer" onClick={() => toggleWindowPosition('left-right')} />
          <ArrowDownUp className="text-secondary cursor-pointer" onClick={() => toggleWindowPosition('top-bottom')} />
          {isDark ? (
            <Moon className="text-blue-500 cursor-pointer" onClick={toggleTheme} />
          ) : (
            <Sun className="text-yellow-500 cursor-pointer" onClick={toggleTheme} />
          )}
        </div>
      </div>
      <div className="flex gap-2 m-2 ml-8">
        <div className="font-bold text-2xl">6:00
          <p className="text-sm font-normal text-secondary">Sat, Dec 11</p>
        </div>
        <ChevronRight className="text-secondary self-center"/>
        <div className="font-bold text-2xl">7:00
          <p className="text-sm font-normal text-secondary">Sat, Dec 11</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
