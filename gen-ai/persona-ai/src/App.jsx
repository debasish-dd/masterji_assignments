import { useState } from 'react'
import React from 'react'
import main from './components/persona'


async function handleClick() {
    const res = await main();
    console.log(res);
    
  }
  handleClick();


export default function App () {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [currentPersona, setCurrentPersona] = useState('Persona 1')

  function sendMessage () {
    if (!input.trim()) return
    setMessages(prev => [
      ...prev,
      { role: 'user', text: input, persona: currentPersona }
    ])
    setInput('')
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-6'>
      <h1 className='text-2xl font-bold mb-4'>Persona</h1>

      {/* Persona Switch */}
      <div className='mb-4  space-x-2'>
        <button
          onClick={() => setCurrentPersona('Persona 1')}
          className={`px-4 shadow-xl py-2 rounded-lg ${
            currentPersona === 'Persona 1'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300'
          }`}
        >
          Persona 1
        </button>
        <button
          onClick={() => setCurrentPersona('Persona 2')}
          className={`px-4 shadow-xl py-2 rounded-lg ${
            currentPersona === 'Persona 2'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300'
          }`}
        >
          Persona 2
        </button>
      </div>

      {/* Chat Window */}
      <div className='w-full max-w-lg bg-white rounded-lg shadow-xl p-4 flex flex-col h-[500px]'>
        
        <div className='flex-1 overflow-y-auto space-y-2'>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[80%] ${
                m.role === 'user'
                  ? m.persona === 'Persona 1'
                    ? 'bg-blue-100 self-end'
                    : 'bg-green-100 self-end'
                  : 'bg-gray-200 self-start'
              }`}
            >
              <span className='block text-xs text-gray-500 mb-1'>
                {m.persona}
              </span>
              {m.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className='flex mt-3'>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className='flex-1 border rounded-l-lg p-2'
            placeholder={`Message as ${currentPersona}...`}
          />
          <button
            onClick={sendMessage}
            className='bg-blue-500 text-white px-4 rounded-r-lg'
          >
            Send
          </button>
        </div>

      </div>
    </div>
  )
}
