import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import wordsData from './words.json';

// Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  // Shuffle words on mount
  useEffect(() => {
    setWords(shuffleArray(wordsData));
  }, []);

  // Reset input and check state on word change
  useEffect(() => {
    setInput('');
    setChecked(false);
    setIsCorrect(false);
    if (inputRef.current) inputRef.current.focus();
  }, [currentWordIndex, words]);

  if (words.length === 0) return <div className="container"><h1>Loading...</h1></div>;

  const word = words[currentWordIndex];

  const handleCheck = () => {
    setChecked(true);
    setIsCorrect(input.trim().toLowerCase() === word.word.toLowerCase());
  };

  const handleNext = () => {
    setCurrentWordIndex((currentWordIndex + 1) % words.length);
  };

  const handleSayWord = () => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(word.word);
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  return (
    <div className="container" style={{maxWidth: 700, minWidth: 320, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', padding: '2.5rem 2rem', boxSizing: 'border-box', overflow: 'hidden'}}>
      <h1 style={{textAlign: 'center', marginBottom: '2.5rem', color: '#2d3a4b', letterSpacing: 1, fontWeight: 800, fontSize: '2.3rem'}}>Spelling Bee App</h1>
      <div className="spelling-section" style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18, marginBottom: 36, justifyContent: 'center'}}>
        <button className="say-button" onClick={handleSayWord} style={{padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none', background: '#007bff', color: '#fff', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 6px #007bff22'}}>🔊 Say Word</button>
        <span style={{fontWeight: 600, fontSize: '1.3rem', color: '#555', marginLeft: 10, marginRight: 10, whiteSpace: 'nowrap'}}>{word.pronunciation && `(${word.pronunciation})`}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setChecked(false); }}
          onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
          placeholder="Type the word..."
          style={{fontSize: '1.15rem', padding: '0.6rem 1.1rem', borderRadius: 8, border: checked ? (isCorrect ? '2.5px solid #28a745' : '2.5px solid #dc3545') : '2.5px solid #ccc', outline: 'none', flex: 2, minWidth: 140, maxWidth: 240, marginLeft: 10, marginRight: 10, background: '#f9fafb', boxSizing: 'border-box'}}
        />
        <button onClick={handleCheck} style={{padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none', background: '#17a2b8', color: '#fff', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', marginLeft: 10, boxShadow: '0 2px 6px #17a2b822'}}>Check</button>
        {checked && (
          isCorrect ?
            <span style={{color: '#28a745', fontSize: '2.1rem', marginLeft: 10}} title="Correct">✔️</span>
            :
            <span style={{color: '#dc3545', fontSize: '2.1rem', marginLeft: 10}} title="Incorrect">❌</span>
        )}
      </div>
      {checked && (
        <>
          <div className="word-section" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <div>
              <h2 id="currentWord" style={{margin: 0, fontWeight: 700, fontSize: '2rem', letterSpacing: 2}}>
                {word.word.toUpperCase()}
              </h2>
            </div>
          </div>
          <div className="info-section" style={{background: '#f8f9fa', borderRadius: 8, padding: '1rem', marginBottom: 24}}>
            <p><strong>Meaning:</strong> <span id="meaning">{word.meaning}</span></p>
            <p><strong>Usage:</strong> <span id="usage">{word.usage}</span></p>
            <p><strong>Roots:</strong> <span id="roots">{word.roots}</span></p>
            <p><strong>Etymology:</strong> <span id="etymology">{word.etymology}</span></p>
            <div className="related-section" style={{marginTop: 12}}>
              <strong>Related Words:</strong>
              <div id="relatedWords" style={{display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6}}>
                {word.related.map((rel, idx) => (
                  <button key={idx} className="word-button" style={{padding: '0.2rem 0.7rem', borderRadius: 5, border: '1px solid #007bff', background: '#e9f5ff', color: '#007bff', fontWeight: 500, cursor: 'pointer', marginRight: 4, marginBottom: 4}} onClick={() => {
                    const index = words.findIndex(w => w.word.toLowerCase() === rel.toLowerCase());
                    if (index !== -1) setCurrentWordIndex(index);
                  }}>{rel}</button>
                ))}
              </div>
            </div>
          </div>
          <button onClick={handleNext} className="next-button" style={{width: '100%', padding: '0.75rem', fontSize: '1.1rem', borderRadius: 8, border: 'none', background: '#ffc107', color: '#333', fontWeight: 700, cursor: 'pointer'}}>Next Random Word</button>
        </>
      )}
    </div>
  );
}

export default App;
