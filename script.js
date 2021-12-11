// Global Variables

const quoteContainer = document.getElementById('quote-container');
const quoteTextContainer = document.getElementById('quote-text-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading

function loading() {
    loader.hidden = false;
    quoteTextContainer.hidden = true;


}

// Hide Loading  

function complete() {
    loader.hidden = true;
    quoteTextContainer.hidden = false;


}

// Show New Quote

function newQuote() {
    loading();

    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //check if author field is blank and replace it with "unknown"

    if (!quote.author) {
        authorText.innerHTML= "Unknown";
    } else {
        authorText.innerHTML = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {

        quoteText.classList.remove('long-quote');
    }

    // Set quote, hide loading
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API

async function getQuotes() {

    loading();
    const apiUrl = 'https://type.fit/api/quotes'
    try {

        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert('Did not catch API')
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// On Twitter Button Click

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);




// On Load 
// getQuotes();
getQuotes();