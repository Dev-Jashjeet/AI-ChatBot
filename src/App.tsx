import React from "react"
import 'remixicon/fonts/remixicon.css'
import './App.css'
import 'animate.css'

function App() {

  return(
    <div className="min-h-screen flex flex-col">

      <div className="p-3 w-full text-center bg-linear-to-r from-green-500 via-green-500 to-emerald-400 text-2xl font-bold text-white tracking-wide ">
        <i className="ri-chat-ai-4-line mr-2"></i>
        AI ChatBot - Ask Your Doubts
      </div>

      <div className="bg-green-100 flex-1 p-4 overflow-auto relative w-full">

        <div className="absolute h-[93%] w-[97.5%] flex flex-col gap-10 overflow-auto noScroll noScroll2">

          <div className="w-full flex justify-start animate__animated animate__backInLeft animate__faster" id="ai">
            <div className="p-3 rounded-tr-xl font-medium rounded-br-xl bg-green-500 text-white">
              Hello From Ai
              <br />
              <span className="text-xs">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="w-full flex justify-end" id="user">
            <div className="animate__animated animate__backInRight animate__faster p-3 rounded-tl-xl font-normal rounded-bl-xl bg-lime-300 text-black">
              Hello ai
              <br />
              <span className="text-xs">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

        </div>

      </div>

      <div className="p-5 border-t-2 border-green-500 w-full">
        <form className="flex w-full">
          <input type="text" placeholder="Chat with ai" className="bg-white text-[20px] border-2 border-green-400 focus:outline-emerald-600 rounded-xl p-4 w-full"/>
          <button>
            <i className="ri-send-ins-line bg-green-500 text-white rounded-2xl p-4 text-2xl ml-3 mr-2 hover:bg-green-600 cursor-pointer"></i>
          </button>
        </form>
      </div>

    </div>
  )
}

export default App;