import React, { useState } from 'react';
import './App.css';
import words from './words.json';

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const word = words[currentWordIndex];

  return (
    <div className="container">
      <h1>Spelling Bee App</h1>
      <div className="word-section">
        <h2 id="currentWord">{word.word.toUpperCase()} <span style={{fontWeight: 'normal', fontSize: '1rem', color: '#555'}}>{word.pronunciation && `(${word.pronunciation})`}</span></h2>
        <button
          onClick={() => setCurrentWordIndex((currentWordIndex + 1) % words.length)}
          className="next-button"
        >
          Next Word
        </button>
      </div>
      <div className="info-section">
        <p><strong>Meaning:</strong> <span id="meaning">{word.meaning}</span></p>
        <p><strong>Usage:</strong> <span id="usage">{word.usage}</span></p>
        <p><strong>Roots:</strong> <span id="roots">{word.roots}</span></p>
        <p><strong>Etymology:</strong> <span id="etymology">{word.etymology}</span></p>
        <div className="related-section">
          <strong>Related Words:</strong>
          <div id="relatedWords">
            {word.related.map((rel, idx) => (
              <button key={idx} className="word-button" onClick={() => {
                const index = words.findIndex(w => w.word.toLowerCase() === rel.toLowerCase());
                if (index !== -1) setCurrentWordIndex(index);
              }}>{rel}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
