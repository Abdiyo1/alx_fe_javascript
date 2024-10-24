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
  
  // Function to create the form to add a new quote
  function createAddQuoteForm() {
    const formHTML = `
      <form id="quoteForm">
        <input type="text" id="quoteText" placeholder="Enter quote" required><br>
        <input type="text" id="quoteCategory" placeholder="Enter category" required><br>
        <button type="submit">Add Quote</button>
      </form>
    `;
  
    const addQuoteFormDiv = document.getElementById('addQuoteForm');
    addQuoteFormDiv.innerHTML = formHTML;
  
    // Handle form submission
    const quoteForm = document.getElementById('quoteForm');
    quoteForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get input values
      const newText = document.getElementById('quoteText').value;
      const newCategory = document.getElementById('quoteCategory').value;
  
      // Add new quote to the array
      quotes.push({ text: newText, category: newCategory });
  
      // Clear the form
      quoteForm.reset();
    });
  }
  
  // Event listener to display a new random quote when button is clicked
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
  // Automatically call createAddQuoteForm to render the form on page load
  createAddQuoteForm();
  
