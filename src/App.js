import './App.scss';
import React, { useState, useEffect } from 'react';
import COLORS_ARRAY from './colorsArray';

let quoteDBUrl =
  'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState('Love');
  const [author, setAuthor] = useState('all');
  const [number, setNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#4ca2f9');

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
    console.log(parsedJSON);
  };

  useEffect(() => {
    fetchQuotes(quoteDBUrl);
  }, []);

  const setQuoteandAuthor = () => {
    setQuote(quotesArray[number].quote);
    setAuthor(quotesArray[number].author);
    let randInt = Math.floor(Math.random() * quotesArray.length);
    setNumber(randInt);
    let colorNumber = Math.floor(Math.random() * COLORS_ARRAY.length);
    setAccentColor(COLORS_ARRAY[colorNumber]);
  };
  let styling = { backgroundColor: accentColor };
  return (
    <div id='top' className='App'>
      <header id='header' className='App-header' style={styling}>
        <div id='quote-box'>
          <p id='text' style={{ color: accentColor }}>
            "{quote}"
          </p>
          <p id='author' style={{ color: accentColor }}>
            -{author}
          </p>

          <button
            id='new-quote'
            onClick={setQuoteandAuthor}
            style={{ backgroundColor: accentColor }}
          >
            get inspired
          </button>
          <a
            style={{ backgroundColor: accentColor }}
            id='tweet-quote'
            href={encodeURI(
              'http://twitter.com/intent/tweet?text=${quote}-${author}'
            )}
          >
            tweet
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
