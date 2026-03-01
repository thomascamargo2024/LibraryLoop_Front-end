export async function getBooksByCategory(category) {
  try {
    const response = await fetch(
      `https://openlibrary.org/subjects/${category}.json?limit=12`
    );

    const data = await response.json();

    return data.works.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.authors?.[0]?.name || "Autor desconhecido",
      rating: Math.floor(Math.random() * 2) + 4,
      image: book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
        : "https://via.placeholder.com/150x220?text=Sem+Capa",
      downloadUrl: `https://openlibrary.org${book.key}`
    }));
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
}