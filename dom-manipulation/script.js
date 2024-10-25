const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
  { text: "Don’t watch the clock; do what it does. Keep going.", category: "Perseverance" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function notifyUser(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const serverQuotes = await response.json();

    resolveConflicts(serverQuotes);

    const newQuotes = serverQuotes.filter(serverQuote =>
      !quotes.some(localQuote => localQuote.text === serverQuote.title)
    );

    if (newQuotes.length) {
      quotes.push(...newQuotes.map(q => ({ text: q.title, category: "Server" })));
      saveQuotes();
      displayQuotes();
      notifyUser("New quotes from the server were added!");
    }
  } catch (error) {
    console.error("Failed to fetch data from the server:", error);
  }
}

async function pushQuoteToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: quote.text, body: quote.category, userId: 1 })
    });
  } catch (error) {
    console.error("Failed to push data to the server:", error);
  }
}

function syncQuotes() {
  fetchQuotesFromServer();
  quotes.forEach(pushQuoteToServer);
}

setInterval(syncQuotes, 30000);

function resolveConflicts(serverQuotes) {
  serverQuotes.forEach(serverQuote => {
    const localQuote = quotes.find(localQuote => localQuote.text === serverQuote.title);

    if (localQuote && localQuote.category !== serverQuote.body) {
      localQuote.category = serverQuote.body;
      notifyUser(`Conflict resolved for quote: "${localQuote.text}"`);
    }
  });
  saveQuotes();
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all'
    ? quotes
    : quotes.filter(quote => quote.category === selectedCategory);

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.innerHTML = `${quote.text} <strong>(${quote.category})</strong>`;
    quoteDisplay.appendChild(quoteElement);
  });

  saveFilter(selectedCategory);
}

function populateCategories() {
  const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = loadFilter();
  categoryFilter.value = savedFilter;
  filterQuotes();
}

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

    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);
    saveQuotes();
    pushQuoteToServer(newQuote);

    populateCategories();
    filterQuotes();

    form.reset();
  });
}

function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'quotes.json';
  downloadLink.click();

  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    notifyUser('Quotes imported successfully!');
    populateCategories();
    filterQuotes();
  };
  fileReader.readAsText(event.target.files[0]);
}

createAddQuoteForm();
populateCategories();
