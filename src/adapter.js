
const getQuotes = async url => {
    const response = await fetch(url)
    return response.json()
}

const createQuote = async (url, quote) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote) 
    })
    return response.json()
}

const deleteQuote = async (url, quote) => {
    const response = await fetch(`${url}/${quote.id}`, {
        method: 'DELETE'
    })
}

const updateQuote = async (url, quote) => {
    const response = await fetch(`${url}/${quote.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(quote)
    })
    return response.json()
}