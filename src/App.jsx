import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [word,setWord] = useState('hi my name is yash goyal');
  const [inputValue, setInputValue] = useState('');
  const [caret, changeCaret] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
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
      .then(response => { setData(response.data)
        setWord(response.data.value);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    console.log('Input Value:', inputValue);
  }, [inputValue]);

  return (
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
                ? "text-gray-800"
                : inputValue[index] === letter
                  ? "text-green-500"
                  : "text-red-500"
              } inline-block w-[1ch]`}
          >
            {letter}
          </span>
        ))}

        <span
          className="absolute top-0 animate-pulse bg-blue-500 w-0.5 h-6"
          style={{
            left: `${caret}ch`
          }}
        />
      </div>

    </div>

  );

}

export default App;