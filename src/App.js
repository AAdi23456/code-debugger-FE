import React, { useState } from 'react';
import './App.css'; 

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('c#');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleButtonClick = async (action) => {
    try {
      const response = await fetch(`https://learn-coding-gamma.vercel.app/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: inputText,language:selectedLanguage }),
      });

      const data = await response.json();
      //console.log(data.bot[0]);
      setOutputText(JSON.stringify(data.bot));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app">
      <div className="left-panel">
        <textarea
          className="input-textarea"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your input here"
        />
        <div className="button-group">
          <button onClick={() => handleButtonClick('convert')}>Convert</button>
          <button onClick={() => handleButtonClick('Debug')}>Debug</button>
          <button onClick={() => handleButtonClick('quality')}>Check Quality</button>
        </div>
      </div>
      <div className="right-panel">
        <select value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="c#">C#</option>
          <option value="c++">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="php">PHP</option>
          <option value="golang">GoLang</option>
        </select>
        <div className="output-div">{outputText}</div>
      </div>
    </div>
  );
}

export default App;
