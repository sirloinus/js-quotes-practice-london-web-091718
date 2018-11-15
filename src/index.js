const quotesUrl = 'http://localhost:3000/quotes'
const quoteInput = document.querySelector('#new-quote')
const authorInput = document.querySelector('#author')
const form = document.querySelector('#new-quote-form')
const quoteList = document.querySelector('#quote-list')

state = {
    quotes: []
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded and Parsed!')
    const quotes = await getQuotes(quotesUrl)
    state.quotes = quotes
    renderAllQuotes(quotes)
})

const renderQuote = quote => {
    const quoteEl = document.createElement('li')
    quoteEl.classList.add('quote-card')
    quoteEl.innerHTML = `
        <blockquote class='blockquote'>
            <p class="mb-0">${quote.quote}</p>
            <footer class='blockquote-footer'>${quote.author}</footer>
            <br>
            <button class='btn-success' data-id='${quote.id}'>Likes: <span>${quote.likes}</span></button>
            <button class='btn-danger' data-id='${quote.id}'>Delete</button>
        </blockquote>
    `
    quoteList.appendChild(quoteEl) 
}


const renderAllQuotes = quotes => {
    quoteList.innerHTML = ''
    quotes.forEach(quote => renderQuote(quote))
}

form.addEventListener('submit', async event => {
    event.preventDefault()
    const quote = {
        author: authorInput.value,
        quote: quoteInput.value,
        likes: 1
    }
    state.quotes.push(quote)

    await createQuote(quotesUrl, quote)
    const quotes = await getQuotes(quotesUrl)
    renderAllQuotes(quotes)

    authorInput.value = ''
    quoteInput.value = ''
})

document.addEventListener('click', async event => {
    if(event.target.className === 'btn-danger'){
        const quoteId = event.target.dataset.id 
        const foundQuote = state.quotes.find(quote => quote.id === parseInt(quoteId))
        deleteQuote(quotesUrl, foundQuote)
        const quotes = await getQuotes(quotesUrl)
        renderAllQuotes(quotes)
    } 
    if(event.target.className === 'btn-success') {
        const quoteId = event.target.dataset.id
        const foundQuote = state.quotes.find(quote => quote.id === parseInt(quoteId))
        // edit values of found quote
        const updatedQuote = await updateQuote(quotesUrl, foundQuote)
    }
})
