import React, { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tshirtColor, setTshirtColor] = useState('#ffffff'); // default white

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const resp = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt, top_k: 1 })
      });

      const data = await resp.json();
      if (data.results && data.results.length > 0) {
        let first = data.results[0];
        let url = first.url;

        if (url.startsWith('/')) {
          url = 'http://localhost:8000' + url;
        }

        setResult({ ...first, url });
      } else {
        setResult(null);
      }
    } catch (err) {
      console.error(err);
      setResult(null);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>T-Shirt Design Recommender</h1>

      {/* 🔵 Color Dropdown */}
      <div className="color-picker">
        <label>Select T-shirt Color: </label>
        <select value={tshirtColor} onChange={(e) => setTshirtColor(e.target.value)}>
          <option value="#ffffff">White</option>
          <option value="#000000">Black</option>
          <option value="#ff0000">Red</option>
          <option value="#0000ff">Blue</option>
          <option value="#008000">Green</option>
          <option value="#ffff00">Yellow</option>
          <option value="#ff8c00">Orange</option>
          <option value="#800080">Purple</option>
          <option value="#808080">Grey</option>
          <option value="#964B00">Brown</option>

          <option value="#ffb3ba">Pastel Pink</option>
          <option value="#bae1ff">Pastel Blue</option>
          <option value="#baffc9">Pastel Green</option>
          <option value="#ffffba">Pastel Yellow</option>
          <option value="#ffdfba">Pastel Peach</option>
          <option value="#e0bbff">Pastel Purple</option>
          <option value="#cce6ff">Pastel Sky</option>
          <option value="#ffd6e0">Pastel Rose</option>
          <option value="#e6ffcc">Pastel Mint</option>
          <option value="#ffe5b4">Pastel Cream</option>
        </select>
      </div>

      <div className="controls">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a prompt, e.g., 'cute anime cat'"
        />
        <button onClick={handleGenerate} disabled={loading}>Generate</button>
      </div>

      {loading && <p>Searching...</p>}

      {/* 🔵 Always show T-shirt mockup static */}
      <div className="tshirt-mockup" style={{ backgroundColor: tshirtColor }}>
  {/* Static T-shirt Base */}
  <img
    src={process.env.PUBLIC_URL + '/mockups/plain_tshirt_front.png'}
    alt="tshirt"
    className="tshirt"
  />

  {/* Design ABOVE T-shirt */}
  {result && (
    <img src={result.url} alt="design" className="design" />
  )}
</div>


      {result && <p>{result.filename}</p>}

      {!result && !loading && <p>Type a prompt and click Generate.</p>}
    </div>
  );
}

export default App;
