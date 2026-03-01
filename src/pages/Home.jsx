import logo from "../assets/logo-loopCode-Books.png";
import pngwing from "../assets/pngwing.com.png";
import { useEffect, useState } from "react";
import Stars from "../components/Stars";
import DownloadButton from "../components/DownloadButton";
import { getBooksByCategory } from "../services/booksService";
import { categorias } from "../data/categories";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("programming");
  const [loading, setLoading] = useState(true);
  const [mostrarMais, setMostrarMais] = useState(false);
  const [livrosVisiveis, setLivrosVisiveis] = useState(8);
  const [search, setSearch] = useState("");

  useEffect(() => {
  async function loadBooks() {
    try {
      setLoading(true);
      const data = await getBooksByCategory(categoriaAtiva);
      setBooks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  loadBooks();
}, [categoriaAtiva]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <header className="flex items-center justify-between pt-3 px-6 md:px-20 border-b border-zinc-200 pb-1">
        <div>
          <img className="w-20 md:w-18 h-auto" src={logo} alt="Logo LoopCode Books" />
        </div>

        <div className="hidden md:flex gap-8 text-gray-900 font-medium">
          <a className="border-b-2 border-transparent hover:border-blue-800 transition-colors duration-200" href="#">Home</a>
          <a className="border-b-2 border-transparent hover:border-blue-800 transition-colors duration-200" href="#">Catálogos</a>
          <a className="border-b-2 border-transparent hover:border-blue-800 transition-colors duration-200" href="#">Generos</a>
          <a className="border-b-2 border-transparent hover:border-blue-800 transition-colors duration-200" href="#">Contatos</a>
        </div>

        <div className="relative w-full md:w-64 mt-3 md:mt-0">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        </div>
      </header>

      <aside className="h-2/12 flex flex-col md:flex-row justify-evenly items-center p-4 bg-blue-950 mt-1.5 gap-4" >
        <img className="w-15 md:w-20 h-auto" src={pngwing} alt="png winglivros" />
        <div className="text-center md:text-left">
          <h1 className="text-2xl text-white mb-1">
            A maior rede social para leitores do Brasil
          </h1>
          <p className="text-white">
            O Skoob é a comunidade perfeita para quem ama livros. Organize suas leituras e descubra novos livros, autores, editoras e amigos.
          </p>
        </div>
        <div>
          <button className="p-2.5 px-10 bg-blue-500 rounded-full text-white hover:bg-blue-400">Destaques</button>
        </div>
      </aside>

      <section className="flex justify-center mt-6 px-6">
        <div className="flex w-[95%] gap-6">

          <aside className="w-[260px] shrink-0 h-screen bg-gray-50 p-4">
            <nav>
              {categorias.map((grupo, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-bold mb-2">{grupo.titulo}</h4>
                  <div className="flex flex-col gap-1">
                    {grupo.itens.map((categoria) => (
                      <button
                        key={categoria.slug}
                        onClick={() => setCategoriaAtiva(categoria.slug)}
                        className={`text-left pl-2 border-l-2 transition-all
                          ${categoriaAtiva === categoria.slug
                            ? "border-blue-800 text-blue-800 font-semibold"
                            : "border-transparent hover:border-blue-800"
                          }`}
                      >
                        {categoria.nome}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="flex flex-wrap gap-1 ">
              {filteredBooks.slice(0, livrosVisiveis).map((book) => (
                <div key={book.id} className="flex flex-col bg-white rounded-md shadow p-2 ">
                  <img
                    className="w-full src/data h-65 object-cover rounded-md"
                    src={book.image}
                    alt={book.title}
                  />
                  <h3 className="mt-2 text-sm font-semibold line-clamp-2 min-h-[40px]">
                    {book.title}
                  </h3>
                  <p className="text-xs text-zinc-500 line-clamp-1 min-h-[20px]">
                    {book.author}
                  </p>
                  <div className="mt-auto pt-2 flex flex-col gap-1">
                    <Stars rating={book.rating} />
                    <DownloadButton url={book.downloadUrl} />
                  </div>
                </div>
              ))}
            </div>

            {livrosVisiveis < books.length && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setLivrosVisiveis((prev) => prev + 4)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors"
                >
                  Ver Mais
                </button>
              </div>
            )}
          </main>

        </div>
      </section>
      <footer className="bg-blue-950 text-white mt-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold">Equipe:</h2>
            <p className="text-sm">Thomas, Gustavo, Nicolas e Marcelo</p>
          </div>

          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Portfólio</a>
          </div>

        </div>

        <div className="border-t border-blue-300 mt-2 pt-1 text-center text-sm text-gray-300 pb-2">
          © {new Date().getFullYear()} LoopCode Books. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}