export async function getBooksByCategory(category) {

  const url = `http://localhost:8080/books/search?title=${category}&limit=12`

  console.log("Chamando backend:", url)

  const response = await fetch(url)

  const data = await response.json()

  console.log("Resposta do backend:", data)

  return data.map((book) => ({
    id: book.olid,
    title: book.title,
    author: book.authorName?.[0] || "Autor desconhecido",
    rating: Math.floor(Math.random() * 2) + 4,
    image: book.coverId
      ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`
      : "https://via.placeholder.com/150x220?text=Sem+Capa"
  }))
}