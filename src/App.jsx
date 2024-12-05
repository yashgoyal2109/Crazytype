import axios from "axios";
import { useState, useEffect } from "react";
import { symbol, keypic, settings, info, crown, bell, user } from "./assets/Index";



function App() {
  const [word, setWord] = useState('hi my name is yash goyal');
  const [inputValue, setInputValue] = useState('');
  const [caret, changeCaret] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(e.ctrlKey) {
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        setInputValue(prev => prev.slice(0, -1));
        changeCaret(prev => Math.max(0, prev - 1));
      } else if (e.key.length === 1) {
        e.preventDefault();
        setInputValue(prev => prev + e.key);
        changeCaret(prev => Math.min(word.length, prev + 1));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [word.length]);


  useEffect(() => {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(response => {
        setData(response.data)
        setWord(response.data.value);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log('Input Value:', inputValue);
  }, [inputValue]);

  return (
    <>
      <div className="flex flex-col items-center h-screen justify-between px-[7rem] py-10 bg-main_bg">


        <div className="flex flex-row justify-between w-full items-center">

          <div className="w-1/3">

            <div className="flex items-baseline justify-evenly">
              <img src={symbol} alt="gerhe" className="w-10 cursor-pointer" />
              <p className="text-2xl font-bold cursor-pointer text-heading_color">CrazyType</p>
              <img src={keypic} alt="" className="image-small cursor-pointer" />
              <img src={crown} alt="" className="image-small cursor-pointer" />
              <img src={info} alt="" className="image-small cursor-pointer" />
              <img src={settings} alt="" className="image-small cursor-pointer" />
            </div>

          </div>

          <div className="w-1/6">
            <div className="flex items-center justify-evenly">
              <img src={bell} alt="" className="image-small cursor-pointer" />
              <img src={user} alt="" className="image-small cursor-pointer" />
              <p className="text-l cursor-pointer text-text_color">Lucifer</p>
            </div>
          </div>
        </div>



        <div>
          <div className="p-8 font-mono">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                console.log("Input onChange:", e.target.value);
                setInputValue(e.target.value);
              }}
              className="sr-only"
              autoFocus
            />

            <div className="relative inline-block text-xl leading-relaxed">
              {[...word].map((letter, index) => (
                <span
                  key={index}
                  className={`${inputValue[index] === undefined
                    ? "text-text_color"
                    : inputValue[index] === letter
                      ? "text-green-500"
                      : "text-red-500"
                    } inline-block w-[1ch]`}
                >
                  {letter}
                </span>
              ))}

              <span
                className="absolute top-0 animate-pulse bg-yellow-500 w-0.5 h-7"
                style={{
                  left: `${caret}ch`
                }}
              />
            </div>
          </div>
        </div>



        <div>
          greg
        </div>



      </div>
    </>

  );

}

export default App;