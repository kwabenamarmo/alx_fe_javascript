const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');
const addQuoteForm = document.getElementById('addQuoteForm');
const importFile = document.getElementById('importFile');
const categoryFilter = document.getElementById('categoryFilter');

// Create and add export button (dynamically)
const exportButton = document.createElement('button');
exportButton.textContent = "Export Quotes";
document.body.insertBefore(exportButton, document.querySelector('script'));

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Hope" },
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


function displayQuote(quote) {
    quoteDisplay.textContent = quote.text;
}

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function showRandomQuote() {
    displayQuote(getRandomQuote());
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
    saveQuotes();
    populateCategories();
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

// Category Filtering
function populateCategories() {
    const categories = new Set(quotes.map(quote => quote.category));
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categoryFilter.appendChild(option);
    });
}

function filterQuotes() {
    selectedCategory = categoryFilter.value;
    localStorage.setItem('selectedCategory', selectedCategory);

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    quoteDisplay.innerHTML = "";
    if (filteredQuotes.length === 0) {
      displayQuote({text: "No quotes found in this category."});
    } else {
        filteredQuotes.forEach(displayQuote);
    }
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
            quotes.push(...importedQuotes);
            saveQuotes();
            showRandomQuote();
            alert('Quotes imported successfully!');
        } catch (error) {
            alert('Error importing quotes: ' + error.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Export to JSON file
exportButton.addEventListener('click', () => {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});


// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', createAddQuoteForm);
importFile.addEventListener('change', importFromJsonFile);
categoryFilter.addEventListener('change', filterQuotes);

// Initial setup
populateCategories();
filterQuotes();
showRandomQuote();