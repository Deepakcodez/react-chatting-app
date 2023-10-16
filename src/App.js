import "./App.css";
import { AiOutlineSend, AiOutlineWhatsApp } from "react-icons/ai";
import { useState } from "react";
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const db = getDatabase();
  const postListRef = ref(db, "chats");
  useEffect(() => {
    onChildAdded(postListRef, (data) => {
      const c = [...chat];
      c.push(data.val());
      setChat((chat) => [...chat, data.val()]);
    });
  }, []);

  const sendchat = () => {
    const newPostRef = push(postListRef);
    set(newPostRef, {
      name,
      message: msg,
    });

    setMsg("");
  };
  return (
    <>
      {name ? null : (
        <div className=" bg-green-400 h-[100vh]">
          <div className="flex justify-center">
            <input
              className=" rounded mt-5 h-[3rem] px-2 border border-green-400 w-[70%] "
              onBlur={(e) => setName(e.target.value)}
              placeholder="Enter your name here"
            />
          </div>
          <div className="flex justify-center">
            {" "}
            <AiOutlineWhatsApp className=" text-8xl scale-150 h-[20rem] opacity-50 " />
          </div>
        </div>
      )}

      {name ? (
        <div className="flex flex-col bg-pink-500">
          <div className="chat-container bg-green-200 min-h-[91vh]  max-h-[91vh]    overflow-y-auto ">
            <h1 className="text-center text-2xl bg-slate-500 py-1 text-stone-50 drop-shadow-lg">
              Profile:{name}
            </h1>
            {chat.map((c) => (
              <div
                className={`flex p-4 drop-shadow-sm ${
                  c.name === name ? "flex-row-reverse" : ""
                } `}
              >
                <p
                  className={`chat-box  py-3  drop-shadow-lg px-3 rounded ${
                    c.name === name ? "bg-slate-500 text-white" : "bg-slate-300"
                  } `}
                >
                  <strong className="">{c.name} :</strong>
                  <span> {c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div />
          {/* input  */}
          <div className="w-[100%] flex align-middle py-3 justify-center  px-3 bg-green-300  bottom-0 fixed ">
            <input
              className=" rounded h-9 px-2 border border-green-500 w-[80%]"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button
              className="px-2 flex align-middle ml-2 rounded py-2 bg-blue-500 text-white"
              onClick={(e) => sendchat()}
            >
              <span className="hidden md:flex">Send</span>
              <AiOutlineSend className="w-[1.3rem] h-full mx-1" />
            </button>
          </div>{" "}
        </div>
      ) : null}
    </>
  );
}

export default App;
