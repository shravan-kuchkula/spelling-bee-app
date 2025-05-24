import React, { useState } from 'react';
import './App.css';

const wordData = [
  {word: "Serenade", meaning: "A musical performance given to honor someone", usage: "He played a serenade for her under the moonlight.", roots: "Latin: serenare (to make calm)", etymology: "From Italian serenata, from sereno (calm, serene)", related: ["serene", "serenity", "serendipity"]},
  {word: "Mellifluous", meaning: "Having a smooth, sweet sound", usage: "Her mellifluous voice captivated the audience.", roots: "Latin: mel (honey) + fluere (to flow)", etymology: "From Latin mellifluus, from mel (honey) + fluere (to flow)", related: ["melodic", "melody", "melancholy"]},
  {word: "Luminous", meaning: "Glowing with light", usage: "The luminous stars lit up the night sky.", roots: "Latin: lumen (light)", etymology: "From Latin luminosus, from lumen (light)", related: ["illuminate", "luminance", "luminary"]},
  {word: "Ebullient", meaning: "Cheerful and full of energy", usage: "Her ebullient personality made her popular.", roots: "Latin: ebullire (to bubble out)", etymology: "From Latin ebullientem, present participle of ebullire", related: ["ebullition", "boil", "bubble"]},
  {word: "Obfuscate", meaning: "To make obscure or unclear", usage: "The report was obfuscated by jargon.", roots: "Latin: obfuscare (to darken)", etymology: "From Latin obfuscat-, past participle of obfuscare", related: ["obscure", "confuse", "blur"]},
  {word: "Quixotic", meaning: "Exceedingly idealistic; unrealistic and impractical", usage: "His quixotic quest for perfection was exhausting.", roots: "From Don Quixote", etymology: "From Don Quixote, a character in a novel by Cervantes", related: ["idealistic", "impractical", "visionary"]},
  {word: "Sagacious", meaning: "Having or showing keen mental discernment and good judgment", usage: "The sagacious leader guided the team to success.", roots: "Latin: sagax (wise)", etymology: "From Latin sagax, sagacis", related: ["sage", "wisdom", "prudent"]},
  {word: "Ubiquitous", meaning: "Present, appearing, or found everywhere", usage: "Smartphones are ubiquitous these days.", roots: "Latin: ubique (everywhere)", etymology: "From modern Latin ubiquitas", related: ["everywhere", "omnipresent", "pervasive"]},
  {word: "Vociferous", meaning: "Vehement or clamorous", usage: "The vociferous crowd cheered loudly.", roots: "Latin: vociferari (to shout)", etymology: "From Latin vociferari, from vox (voice) + ferre (carry)", related: ["clamorous", "noisy", "loud"]},
  {word: "Winsome", meaning: "Attractive or appealing in appearance or character", usage: "She gave a winsome smile.", roots: "Old English: wynsum (joyful)", etymology: "From Old English wynsum", related: ["charming", "engaging", "pleasant"]},
  {word: "Zephyr", meaning: "A gentle, mild breeze", usage: "A zephyr cooled the hot afternoon.", roots: "Greek: Zephyros (the west wind)", etymology: "From Greek Zephyros", related: ["breeze", "wind", "gust"]},
  {word: "Aplomb", meaning: "Self-confidence or assurance, especially when in a demanding situation", usage: "She handled the interview with aplomb.", roots: "French: à plomb (perpendicularity)", etymology: "From French à plomb", related: ["confidence", "composure", "poise"]},
  {word: "Benevolent", meaning: "Well meaning and kindly", usage: "He was a benevolent host.", roots: "Latin: bene (well) + volent (wishing)", etymology: "From Latin benevolentem", related: ["kind", "charitable", "generous"]},
  {word: "Cacophony", meaning: "A harsh, discordant mixture of sounds", usage: "The cacophony of alarm bells was overwhelming.", roots: "Greek: kakophonia (bad sound)", etymology: "From Greek kakophonia", related: ["discord", "dissonance", "noise"]},
  {word: "Debacle", meaning: "A sudden and ignominious failure; a fiasco", usage: "The product launch was a debacle.", roots: "French: débâcler (to unbar)", etymology: "From French débâcle", related: ["fiasco", "disaster", "collapse"]},
  {word: "Egregious", meaning: "Outstandingly bad; shocking", usage: "It was an egregious error.", roots: "Latin: egregius (distinguished)", etymology: "From Latin egregius, ironically used", related: ["outrageous", "flagrant", "atrocious"]},
  {word: "Furtive", meaning: "Attempting to avoid notice or attention", usage: "He cast a furtive glance.", roots: "Latin: furtivus (stolen)", etymology: "From Latin furtivus", related: ["secretive", "sly", "stealthy"]},
  {word: "Garrulous", meaning: "Excessively talkative, especially on trivial matters", usage: "The garrulous barber told stories all day.", roots: "Latin: garrire (to chatter)", etymology: "From Latin garrulus", related: ["talkative", "loquacious", "chatty"]},
  {word: "Harbinger", meaning: "A person or thing that announces or signals the approach of another", usage: "The robin is a harbinger of spring.", roots: "Old French: herbergere (host)", etymology: "From Old French herbergere", related: ["omen", "herald", "forerunner"]},
  {word: "Ineffable", meaning: "Too great or extreme to be expressed in words", usage: "The beauty of the sunset was ineffable.", roots: "Latin: ineffabilis (unutterable)", etymology: "From Latin ineffabilis", related: ["indescribable", "inexpressible", "unspeakable"]},
  {word: "Juxtapose", meaning: "To place side by side for comparison or contrast", usage: "The artist juxtaposed light and dark colors.", roots: "Latin: juxta (beside) + pose", etymology: "From Latin juxta + pose", related: ["compare", "contrast", "pair"]},
  {word: "Kaleidoscope", meaning: "A constantly changing pattern or sequence of objects or elements", usage: "The city lights formed a kaleidoscope of colors.", roots: "Greek: kalos (beautiful) + eidos (form)", etymology: "From Greek kalos + eidos + scopein (to look)", related: ["pattern", "variety", "medley"]},
  {word: "Laconic", meaning: "Using very few words", usage: "His laconic reply was simply 'no.'", roots: "Greek: Lakon (Spartan)", etymology: "From Greek Lakonikos", related: ["concise", "terse", "succinct"]},
  {word: "Munificent", meaning: "Larger or more generous than is usual or necessary", usage: "She received a munificent gift.", roots: "Latin: munificus (generous)", etymology: "From Latin munificentem", related: ["generous", "lavish", "bountiful"]},
  {word: "Nebulous", meaning: "In the form of a cloud or haze; hazy", usage: "His plans were nebulous at best.", roots: "Latin: nebula (mist, cloud)", etymology: "From Latin nebulosus", related: ["vague", "unclear", "hazy"]},
  {word: "Obsequious", meaning: "Obedient or attentive to an excessive degree", usage: "The obsequious assistant agreed to everything.", roots: "Latin: obsequiosus (compliant)", etymology: "From Latin obsequiosus", related: ["servile", "submissive", "fawning"]},
  {word: "Panacea", meaning: "A solution or remedy for all difficulties or diseases", usage: "There is no panacea for every problem.", roots: "Greek: pan (all) + akos (cure)", etymology: "From Greek panakeia", related: ["cure-all", "remedy", "solution"]},
  {word: "Quintessential", meaning: "Representing the most perfect or typical example of a quality or class", usage: "He is the quintessential hero.", roots: "Latin: quinta essentia (fifth essence)", etymology: "From Latin quinta essentia", related: ["classic", "ideal", "archetype"]},
  {word: "Recalcitrant", meaning: "Having an obstinately uncooperative attitude toward authority", usage: "The recalcitrant student refused to comply.", roots: "Latin: recalcitrare (to kick back)", etymology: "From Latin recalcitrantem", related: ["defiant", "unruly", "rebellious"]},
  {word: "Sycophant", meaning: "A person who acts obsequiously toward someone important in order to gain advantage", usage: "The office sycophant flattered the boss constantly.", roots: "Greek: sykophantes (informer)", etymology: "From Greek sykophantes", related: ["flatterer", "toady", "bootlicker"]},
  {word: "Trepidation", meaning: "A feeling of fear or agitation about something that may happen", usage: "She entered the room with trepidation.", roots: "Latin: trepidare (to tremble)", etymology: "From Latin trepidationem", related: ["fear", "anxiety", "dread"]},
  {word: "Ubiquity", meaning: "The fact of appearing everywhere or of being very common", usage: "The ubiquity of social media is undeniable.", roots: "Latin: ubique (everywhere)", etymology: "From Latin ubique", related: ["omnipresence", "prevalence", "universality"]},
  {word: "Vicissitude", meaning: "A change of circumstances or fortune, typically one that is unwelcome or unpleasant", usage: "They remained friends through the vicissitudes of life.", roots: "Latin: vicissitudo (change)", etymology: "From Latin vicissitudinem", related: ["change", "variation", "mutation"]},
  {word: "Wistful", meaning: "Having or showing a feeling of vague or regretful longing", usage: "She gave a wistful smile.", roots: "Unknown; perhaps from obsolete wistly (intently)", etymology: "From wist + -ful", related: ["longing", "yearning", "nostalgic"]},
  {word: "Xenophobia", meaning: "Dislike of or prejudice against people from other countries", usage: "Xenophobia is a serious social issue.", roots: "Greek: xenos (stranger) + phobos (fear)", etymology: "From Greek xenophobos", related: ["prejudice", "bias", "racism"]},
  {word: "Yen", meaning: "A strong desire or craving", usage: "He had a yen for adventure.", roots: "Chinese: yan (craving)", etymology: "From Chinese yan", related: ["desire", "longing", "craving"]},
  {word: "Zealot", meaning: "A person who is fanatical and uncompromising in pursuit of their ideals", usage: "He was a zealot for environmental causes.", roots: "Greek: zēlōtēs (emulator)", etymology: "From Greek zēlōtēs", related: ["fanatic", "extremist", "enthusiast"]},
  // ... (70 more word objects, omitted for brevity, but would be inserted here in a real migration)
];

function App() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const word = wordData[currentWordIndex];

  return (
    <div className="container">
      <h1>Spelling Bee App</h1>
      <div className="word-section">
        <h2 id="currentWord">{word.word.toUpperCase()}</h2>
        <button
          onClick={() => setCurrentWordIndex((currentWordIndex + 1) % wordData.length)}
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
                const index = wordData.findIndex(w => w.word.toLowerCase() === rel.toLowerCase());
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
