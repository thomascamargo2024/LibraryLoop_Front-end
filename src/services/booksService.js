export async function getBooksByCategory(category) {

const url = `http://localhost:8080/books/search?title=${category}&limit=12`

console.log("Chamando backend:", url)

const response = await fetch(url)
const data = await response.json()

console.log("Resposta do backend:", data)

return data.map((book) => {

console.log("BOOK RAW:", book)

// 🔥 ID FLEXÍVEL (resolve de vez)
const id =
  book.id ||
  book.bookId ||
  book.olid ||
  null

// 🔥 AUTOR FLEXÍVEL
const author =
  (Array.isArray(book.authors) && book.authors.join(", ")) ||
  book.author ||
  book.authorName?.[0] ||
  "Autor desconhecido"

// 🔥 IMAGEM FLEXÍVEL (NÃO QUEBRA MAIS)
let image = "https://via.placeholder.com/150x220?text=Sem+Capa"

if (book.cover) {
  image = book.cover
} else if (book.image) {
  image = book.image
} else if (book.coverId) {
  if (typeof book.coverId === "string" && book.coverId.startsWith("http")) {
    image = book.coverId
  } else {
    image = `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
  }
}

return {
  id,
  title: book.title,
  author,
  rating: Math.floor(Math.random() * 2) + 4,
  image,
  readable: book.readable === true,
  source: book.source,
  downloadUrl: book.downloadUrl || null
}

})
}