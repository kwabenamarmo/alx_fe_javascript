function createAddQuoteForm() {
    addQuoteForm.innerHTML = ""; // Clear previous content

    const textInput = document.createElement('input'); // createElement
    textInput.id = "newQuoteText";
    textInput.type = "text";
    textInput.placeholder = "Enter a new quote";

    const categoryInput = document.createElement('input'); // createElement
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";

    const addButton = document.createElement('button'); // createElement
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote; // Attach the event handler

    addQuoteForm.appendChild(textInput); // appendChild
    addQuoteForm.appendChild(categoryInput); // appendChild
    addQuoteForm.appendChild(addButton); // appendChild

    addQuoteForm.style.display = "flex";
}