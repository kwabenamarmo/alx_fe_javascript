const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');
const addQuoteForm = document.getElementById('addQuoteForm');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');
const syncStatus = document.createElement('div');
syncStatus.style.marginTop = '10px';
document.body.insertBefore(syncStatus, document.querySelector('script'));

// ... (Export button creation remains the same)

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    // ... (Your default quotes)
];

let selectedCategory = localStorage.getItem('selectedCategory') || 'all';
categoryFilter.value = selectedCategory;

loadQuotes();

function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    quotes = storedQuotes || quotes;
    showRandomQuote();
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// ... (displayQuote, getRandomQuote, showRandomQuote, createAddQuoteForm, 
//      getNewQuoteInput, validateQuoteInput, clearQuoteInput, hideAddQuoteForm,
//      populateCategories, filterQuotes remain the same)

function addNewQuote(newQuote) {
  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  syncWithServer(); // Sync after adding a new quote
}


function addQuote() {
    // ... (add quote logic remains the same)
}

// Server Simulation and Syncing
const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Example mock API

async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const serverQuotes = await response.json();

        // Transform the server data to match your quote object structure (important!)
        const transformedServerQuotes = serverQuotes.map(serverQuote => ({
            text: serverQuote.title, // Adjust properties as needed
            category: serverQuote.body, // Adjust properties as needed
        }));

        return transformedServerQuotes;
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
        return null;
    }
}


async function syncWithServer() {
    syncStatus.textContent = "Syncing...";
    const serverQuotes = await fetchQuotesFromServer();

    if (serverQuotes) {
        quotes = serverQuotes;
        saveQuotes();
        populateCategories();
        filterQuotes();
        showRandomQuote();
        syncStatus.textContent = "Sync complete (GET).";

        try {
            const postResponse = await fetch(SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quotes)
            });

            if (!postResponse.ok) {
                throw new Error(`HTTP error! status: ${postResponse.status}`);
            }

            const postData = await postResponse.json();
            console.log("Quotes sent to server:", postData);
            syncStatus.textContent = "Sync complete (GET & POST).";
            alert("Quotes synced with server!");

        } catch (error) {
            console.error("Error sending quotes to server:", error);
            syncStatus.textContent = "Sync failed (POST).";
        }

    } else {
        syncStatus.textContent = "Sync failed (GET).";
    }
}

// New function: syncQuotes (just calls syncWithServer)
function syncQuotes() {
    syncWithServer();
}


// Sync periodically (e.g., every 5 minutes)
setInterval(syncWithServer, 5 * 60 * 1000); // 5 minutes in milliseconds


// ... (Import/export functionality remains the same)

// Event listeners (remain the same)

// Initial setup (remain the same)

// Initial sync
syncWithServer();