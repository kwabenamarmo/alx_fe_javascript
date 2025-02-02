const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');
const addQuoteForm = document.getElementById('addQuoteForm');
const importFile = document.getElementById('importFile'); // Get the import file element
const exportButton = document.createElement('button');
exportButton.textContent = "Export Quotes";
document.body.insertBefore(exportButton, document.querySelector('script')); // Insert before the script tag

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Hope" },
];

// Load quotes from localStorage on initialization
loadQuotes();

function loadQuotes() {
    const storedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (storedQuotes) {
        quotes = storedQuotes;
    }
    showRandomQuote(); // Display initial quote after loading
}


function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function displayQuote(quote) {
    quoteDisplay.textContent = quote.text;
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function showRandomQuote() {
    const randomQuote = getRandomQuote();
    displayQuote(randomQuote);
}

function createAddQuoteForm() {
    addQuoteForm.innerHTML = "";

    const textInput = document.createElement('input');
    textInput.id = "newQuoteText";
    textInput.type = "text";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement('input');
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement('button');
    addButton.textContent = "Add Quote";
    addButton.addEventListener('click', addQuote);

    addQuoteForm.appendChild(textInput);
    addQuoteForm.appendChild(categoryInput);
    addQuoteForm.appendChild(addButton);

    addQuoteForm.style.display = "flex";
}

function getNewQuoteInput() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;
    return { text: newQuoteText, category: newQuoteCategory };
}

function validateQuoteInput(newQuote) {
    return newQuote.text.trim() !== "" && newQuote.category.trim() !== "";
}

function addNewQuote(newQuote) {
    quotes.push(newQuote);
    saveQuotes(); // Save to localStorage after adding
}

function clearQuoteInput() {
    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
}

function hideAddQuoteForm() {
    addQuoteForm.style.display = "none";
}

function addQuote() {
    const newQuote = getNewQuoteInput();

    if (!validateQuoteInput(newQuote)) {
        alert("Please enter both the quote and its category.");
        return;
    }

    addNewQuote(newQuote);
    clearQuoteInput();
    hideAddQuoteForm();
    showRandomQuote();
}

// Import from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);

            if (!Array.isArray(importedQuotes)) {
                throw new Error("Invalid JSON format. Expected an array of quotes.");
            }

            quotes.push(...importedQuotes); // Add imported quotes
            saveQuotes(); // Save to localStorage
            showRandomQuote(); // Update the displayed quote
            alert('Quotes imported successfully!');
        } catch (error) {
            alert('Error importing quotes: ' + error.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}


// Export to JSON file
exportButton.addEventListener('click', () => {
    const jsonString = JSON.stringify(quotes, null, 2); // Beautified JSON
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a); // Append to the DOM
    a.click(); // Simulate click
    document.body.removeChild(a); // Remove from the DOM
    URL.revokeObjectURL(url);   // Release the URL
});

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', createAddQuoteForm);
importFile.addEventListener('change', importFromJsonFile); // Add event listener for import

// Initial quote display
showRandomQuote();