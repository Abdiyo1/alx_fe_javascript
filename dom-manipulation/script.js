// Load quotes from local storage or use default quotes if none exist
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Perseverance" }
  ];
  
  // Save quotes array to local storage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text} <strong>(${randomQuote.category})</strong></p>`;
  
    // Store the last displayed quote in session storage
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
  }
  
  // Load the last displayed quote from session storage (optional)
  function loadLastQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      const quoteDisplay = document.getElementById('quoteDisplay');
      quoteDisplay.innerHTML = `<p>${lastQuote.text} <strong>(${lastQuote.category})</strong></p>`;
    }
  }
  
  // Create form to add a new quote using createElement and appendChild
  function createAddQuoteForm() {
    const addQuoteFormDiv = document.getElementById('addQuoteForm');
  
    const form = document.createElement('form');
    form.setAttribute('id', 'quoteForm');
  
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('id', 'quoteText');
    quoteInput.setAttribute('placeholder', 'Enter quote');
    quoteInput.required = true;
  
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('id', 'quoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter category');
    categoryInput.required = true;
  
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add Quote';
  
    form.appendChild(quoteInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(categoryInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitButton);
  
    addQuoteFormDiv.appendChild(form);
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const newText = document.getElementById('quoteText').value;
      const newCategory = document.getElementById('quoteCategory').value;
  
      // Add new quote and save to local storage
      quotes.push({ text: newText, category: newCategory });
      saveQuotes();
  
      form.reset();
    });
  }
  
  // Function to export quotes to a JSON file
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  
    URL.revokeObjectURL(url);  // Free up memory after the download
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);  // Merge new quotes
      saveQuotes();  // Save updated quotes to local storage
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener to show a random quote
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Event listener for JSON file import
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Automatically load last quote from session and create add quote form on page load
  loadLastQuote();
  createAddQuoteForm();
  
  // Add event listener to export button
  document.getElementById('exportButton').addEventListener('click', exportQuotes);
  