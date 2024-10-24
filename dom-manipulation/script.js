// Array of quote objects, each with a 'text' and 'category'
const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    { text: "Don’t watch the clock; do what it does. Keep going.", category: "Perseverance" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Get the quote display element and set its innerHTML
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${randomQuote.text} <strong>(${randomQuote.category})</strong></p>`;
  }
  
  // Function to create the form to add a new quote using createElement and appendChild
  function createAddQuoteForm() {
    // Get the div where the form will be inserted
    const addQuoteFormDiv = document.getElementById('addQuoteForm');
  
    // Create the form element
    const form = document.createElement('form');
    form.setAttribute('id', 'quoteForm');
  
    // Create input for quote text
    const quoteInput = document.createElement('input');
    quoteInput.setAttribute('type', 'text');
    quoteInput.setAttribute('id', 'quoteText');
    quoteInput.setAttribute('placeholder', 'Enter quote');
    quoteInput.required = true;
  
    // Create input for quote category
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('type', 'text');
    categoryInput.setAttribute('id', 'quoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter category');
    categoryInput.required = true;
  
    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Add Quote';
  
    // Append inputs and button to the form
    form.appendChild(quoteInput);
    form.appendChild(document.createElement('br'));  // Line break for better spacing
    form.appendChild(categoryInput);
    form.appendChild(document.createElement('br'));  // Line break for better spacing
    form.appendChild(submitButton);
  
    // Append the form to the div
    addQuoteFormDiv.appendChild(form);
  
    // Handle form submission
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get input values
      const newText = document.getElementById('quoteText').value;
      const newCategory = document.getElementById('quoteCategory').value;
  
      // Add new quote to the array
      quotes.push({ text: newText, category: newCategory });
  
      // Clear the form
      form.reset();
    });
  }
  
  // Event listener to display a new random quote when button is clicked
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Automatically call createAddQuoteForm to render the form on page load
  createAddQuoteForm();
  