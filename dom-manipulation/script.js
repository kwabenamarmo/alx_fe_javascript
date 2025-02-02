const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');
const addQuoteForm = document.getElementById('addQuoteForm');

let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
    { text: "Innovation distinguishes between a leader and a follower.", category: "Leadership" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Hope" },
    // ... more quotes
];

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
    addQuoteForm.innerHTML = ""; // Clear previous content

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
    addButton.addEventListener('click', addQuote); // Correct event listener attachment

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

// Event listeners
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteButton.addEventListener('click', createAddQuoteForm);

// Initial quote display
showRandomQuote();