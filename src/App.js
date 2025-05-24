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
      <div className="spelling-section" style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'stretch', gap: 24, marginBottom: 36, justifyContent: 'center'}}>
  {/* Left column: speech buttons */}
  <div className="speech-buttons-col" style={{display: 'flex', flexDirection: 'column', gap: 14, minWidth: 170, flex: 1, maxWidth: 200, justifyContent: 'flex-start'}}>
    <button className="say-button" onClick={handleSayWord} style={{padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none', background: '#007bff', color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 2px 6px #007bff22'}}>🔊 Say Word</button>
    <button className="meaning-button" onClick={() => {
      if ('speechSynthesis' in window) {
        const utter = new window.SpeechSynthesisUtterance(word.meaning);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
      } else {
        alert('Sorry, your browser does not support speech synthesis.');
      }
    }} style={{padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none', background: '#28a745', color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 2px 6px #28a74522'}}>💡 Give me the meaning</button>
    <button className="usage-button" onClick={() => {
      if ('speechSynthesis' in window) {
        const utter = new window.SpeechSynthesisUtterance(word.usage);
        utter.lang = 'en-US';
        window.speechSynthesis.speak(utter);
      } else {
        alert('Sorry, your browser does not support speech synthesis.');
      }
    }} style={{padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none', background: '#fd7e14', color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 2px 6px #fd7e1422'}}>📝 Use it in a sentence</button>
  </div>
  {/* Right column: pronunciation, input, check */}
  <div className="input-col" style={{display: 'flex', flexDirection: 'column', gap: 14, minWidth: 200, flex: 2, maxWidth: 320, justifyContent: 'flex-start', alignItems: 'stretch'}}>
    <span style={{fontWeight: 600, fontSize: '1.25rem', color: '#555', whiteSpace: 'nowrap', marginBottom: 2}}>{word.pronunciation && `(${word.pronunciation})`}</span>
    <input
      ref={inputRef}
      type="text"
      value={input}
      onChange={e => { setInput(e.target.value); setChecked(false); }}
      onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
      placeholder="Type the word..."
      style={{fontSize: '1.11rem', padding: '0.6rem 1.1rem', borderRadius: 8, border: checked ? (isCorrect ? '2.5px solid #28a745' : '2.5px solid #dc3545') : '2.5px solid #ccc', outline: 'none', minWidth: 120, maxWidth: 240, background: '#f9fafb', boxSizing: 'border-box', width: '100%'}}
    />
    <button onClick={handleCheck} style={{padding: '0.6rem 1.25rem', borderRadius: 8, border: 'none', background: '#17a2b8', color: '#fff', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', boxShadow: '0 2px 6px #17a2b822'}}>Check</button>
    {checked && (
      isCorrect ?
        <span style={{color: '#28a745', fontSize: '2.1rem', marginTop: 2}} title="Correct">✔️</span>
        :
        <span style={{color: '#dc3545', fontSize: '2.1rem', marginTop: 2}} title="Incorrect">❌</span>
    )}
  </div>
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
      <footer style={{width: '100%', textAlign: 'center', marginTop: '2.5rem', fontSize: '0.98rem', color: '#888', padding: '1.2rem 0 0.5rem 0', borderTop: '1px solid #eee', background: 'transparent', letterSpacing: '0.2px'}}>
        © {new Date().getFullYear()} Designed by <span style={{fontWeight: 500, color: '#3b5998'}}>Veyd Kuchkula</span>
      </footer>
    </div>
  );
}

export default App;
