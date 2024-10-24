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
  
  // Save the selected filter to local storage
  function saveFilter(filter) {
    localStorage.setItem('selectedFilter', filter);
  }
  
  // Get the selected filter from local storage
  function loadFilter() {
    return localStorage.getItem('selectedFilter') || 'all';
  }
  
  // Function to display quotes filtered by category
  function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filteredQuotes = selectedCategory === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === selectedCategory);
  
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';  // Clear previous content
  
    filteredQuotes.forEach(quote => {
      const quoteElement = document.createElement('p');
      quoteElement.innerHTML = `${quote.text} <strong>(${quote.category})</strong>`;
      quoteDisplay.appendChild(quoteElement);
    });
  
    // Save the selected filter to local storage
    saveFilter(selectedCategory);
  }
  
  // Function to dynamically populate category dropdown
  function populateCategories() {
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Clear existing options
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Set the selected filter from local storage
    const savedFilter = loadFilter();
    categoryFilter.value = savedFilter;
    filterQuotes();  // Display quotes based on the saved filter
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
  
      // Update categories and re-apply the current filter
      populateCategories();
      filterQuotes();
  
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
  
      // Update categories and apply filter after import
      populateCategories();
      filterQuotes();
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for JSON file import
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  
  // Initialize form, populate categories, and set the last filter on page load
  createAddQuoteForm();
  populateCategories();
  