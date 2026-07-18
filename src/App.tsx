import React, { useActionState, useRef, useState } from "react"
import 'remixicon/fonts/remixicon.css'
import './App.css'
import 'animate.css'
import axios from "axios"
const API_KEY = "AQ.Ab8RN6Lj1YmOuqUI4naj_EX5fte2TL5Mthxs-K8nld33_g_1iw"

interface chatsInterface {
  sender: string,
  message: string,
  createdAt: string,
};

function App() {
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<chatsInterface[]>([]);
  const inputFocus: React.RefObject<null|HTMLInputElement> = useRef(null);

  const focusInput = (): void => {
    inputFocus.current!.style.outlineColor = "red";
    return inputFocus.current!.focus();
  }

  const sendMessageChats = (): void => {
    if(message!='') {
      setChats([...chats, {
                sender: "me",
                message: message,
                createdAt: new Date().toLocaleDateString(),
              }]);
    }
    return;
  }

  const handleSubmit = async (_prevData: any, currentData: any): Promise<string|void> => {
    const message: string = currentData.get("message");
    if(message!='') {
      try {
        const {data} = await axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",{
          contents: {
            parts: {
              text: "Answer it like a normal human being don't paste special symbols and talk like ai models now take my message"+message,
            }
          }
        },{
          headers: {
            "X-goog-api-key": API_KEY,
          }
        });
        setChats((prev: chatsInterface[]) => [...prev, {
          sender: "ai",
          message: data.candidates[0].content.parts[0].text,
          createdAt: new Date().toLocaleDateString(),
        }]);
      } catch(error) {
        console.error(error);
      }
    } else {
      return focusInput();
    }
    return data;
  }
  
  const [data,action,pending] = useActionState(handleSubmit, undefined);
  
  return(
    <div className="min-h-screen flex flex-col">

      <div className="p-3 w-full text-center bg-linear-to-r from-green-500 via-green-500 to-emerald-400 text-2xl font-bold text-white tracking-wide ">
        <i className="ri-chat-ai-4-line mr-2"></i>
        AI ChatBot - Ask Your Doubts
      </div>

      <div className="bg-green-100 flex-1 p-4 overflow-auto relative w-full">

        <div className="absolute h-[93%] w-[97.5%] flex flex-col gap-10 overflow-auto noScroll noScroll2">
          

          {
            chats.map((item: chatsInterface, unique: number) => (
              item.sender==="me"? 
                <div className="w-full flex justify-end" id="user" key={unique}>
                  <div className="animate__animated animate__backInRight animate__faster p-3 rounded-tl-xl font-normal rounded-bl-xl bg-lime-300 text-black">
                    {item.message}
                    <br />
                    <span className="text-xs">{String(item.createdAt)}</span>
                  </div>
                </div>
                :
                <div className="w-full flex justify-start animate__animated animate__backInLeft animate__faster" id="ai" key={unique}>
                  <div className="p-3 rounded-tr-xl font-medium rounded-br-xl bg-green-500 text-white">
                    {item.message}
                    <br />
                    <span className="text-xs">{String(item.createdAt)}</span>
                  </div>
                </div>
            ))
          }

        </div>
        {
          pending? <div className="w-full flex justify-start animate__animated animate__backInLeft animate__faster" id="ai">Typing...</div>:null
        }

      </div>

      <div className="p-5 border-t-2 border-green-500 w-full">
        <form className="flex w-full" action={action}>
          <input ref={inputFocus} onChange={(e): void => setMessage(e.target.value)} name="message" type="text" placeholder="Chat with ai" className="bg-white text-[20px] border-2 border-green-400 focus:outline-emerald-600 rounded-xl p-4 w-full"/>
          <button disabled={pending} onClick={sendMessageChats}>
            <i className={`ri-send-ins-line ${pending? "bg-green-300":"bg-green-500 hover:bg-green-600"} text-white rounded-2xl p-4 text-2xl ml-3 mr-2`}></i>
          </button>
        </form>
      </div>
    </div>
  )
}

export default App;
