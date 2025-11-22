import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbers, allowNumbers] = useState(false);
  const [characters, allowcharacters] = useState(false);
  const [password, setPassword] = useState("");
  const copy=useRef();

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numbers) str += "0123456789";
    if (characters) str += "!@#$%^&*()_+-/*";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);

  }, [length, numbers, characters]);


  const copybtn=()=>{
    copy.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-6 w-[400px] border border-amber-400">

        <h1 className="text-center text-3xl font-bold text-amber-300 mb-4">
          Password Generator 🔐
        </h1>

        {/* Password Box */}
        <div className="flex w-full mb-4">
          <input 
            type="text" 
            className="h-12 bg-gray-200 rounded-l-xl w-full text-black text-center text-lg font-semibold" 
            value={password}
            ref={copy}
            readOnly 
          />
          <button 
            className="h-12 w-24 bg-blue-600 hover:bg-blue-700 text-white rounded-r-xl text-lg font-bold cursor-pointer"
            onClick={copybtn}
          >
            Copy
          </button>
        </div>

        {/* Options */}
        <div className="space-y-4 text-white">

          {/* Length Slider */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">Length: {length}</label>
            <input 
              type="range" 
              min={4} max={20}
              className="w-32 accent-amber-400"
              onChange={(e)=> setLength(Number(e.target.value))}
            />
          </div>

          {/* Checkboxes */}
          <div className="flex justify-between items-center">
            <label className="font-semibold">Include Numbers</label>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-amber-400 cursor-pointer"
              checked={numbers}
              onChange={()=> allowNumbers(!numbers)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Include Symbols</label>
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-amber-400 cursor-pointer"
              checked={characters}
              onChange={()=> allowcharacters(!characters)}
            />
          </div>

        </div>

        {/* Generate Button */}
        <button 
          onClick={passwordGenerator}
          className="mt-6 w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-2 rounded-xl text-xl cursor-pointer"
        >
          Generate 🔄
        </button>

      </div>
    </div>
  )
}

export default App
