import logo from "../assets/logo-loopCode-Books.png";
import { useEffect, useState } from "react";
import Stars from "../components/Stars";
import DownloadButton from "../components/DownloadButton";
import { getBooksByCategory } from "../services/booksService";
import { categorias } from "../data/categories";
import { Bell, Download, Search } from "lucide-react";
import "../styles/home.css";

export default function Home() {

  const [books, setBooks] = useState([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState("programming");
  const [loading, setLoading] = useState(true);
  const [livrosVisiveis, setLivrosVisiveis] = useState(10);
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

  const handleReadLink = async (bookId) => {
    try {
      const response = await getReadLink(bookId);
      if (response.readOnline) return response.url;
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return (

    <div className="min-h-screen bg-[#0f172a] text-white">

      <header className="fixed top-1 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#111827] border-b border-[#1f2937]">

        <div className="flex items-center gap-3">

          <div className="bg-purple-600 p-2 rounded-lg">

            <img
              src={logo}
              alt="Logo"
              className="w-6 h-6 object-contain"
            />

          </div>

          <div>
            <h1 className="font-semibold text-sm">ExpoBooks</h1>
            <p className="text-xs text-gray-400">Library</p>
          </div>

        </div>


        <div className="flex-1 flex justify-center px-10">

          <div className="relative w-full max-w-xl">

            <Search
              size={16}
              className="absolute left-3 top-2.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Pesquise por título, autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1f2937] pl-9 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-600"
            />

          </div>

        </div>

        <div className="flex items-center gap-5">


          <button className="relative text-gray-400 hover:text-white transition">

            <Bell size={20} />

            <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>

          </button>

          <div className="flex items-center gap-2 bg-[#1f2937] px-3 py-1.5 rounded-full text-sm text-gray-300">

            <Download size={16} />

            <span>
              0 baixados
            </span>

          </div>

          <div className="w-9 h-9 rounded-full border-2 border-purple-500 overflow-hidden">

            <img
              src="https://i.pravatar.cc/100"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </header>


      <div className="flex">


        <aside className="w-64 bg-[#111827] p-6 flex flex-col gap-6 hidden lg:flex">

          <input
            type="text"
            placeholder="Buscar livros..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1f2937] rounded-lg px-3 py-2 text-sm outline-none"
          />

          <div className="flex flex-col gap-2">

            <p className="text-xs text-gray-400 uppercase">
              Categorias
            </p>

            {categorias.map((grupo) =>
              grupo.itens.map((categoria) => (
                <button
                  key={categoria.slug}
                  onClick={() => setCategoriaAtiva(categoria.slug)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition
                  ${categoriaAtiva === categoria.slug
                      ? "bg-purple-600"
                      : "hover:bg-[#1f2937]"
                    }`}
                >
                  {categoria.nome}
                </button>
              ))
            )}

          </div>

        </aside>


        <main className="flex-1 p-8 pt-20" >

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-2xl font-bold">
                Todos os Livros
              </h1>

              <p className="text-sm text-gray-400">
                {filteredBooks.length} livros encontrados
              </p>
            </div>

          </div>

          {loading ? (
            <p>Carregando livros...</p>
          ) : (

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

              {filteredBooks.slice(0, livrosVisiveis).map((book) => (

                <div
                  key={book.id}
                  className="bg-[#1f2937] rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all w-full max-w-xs"
                >

                  <img
                    src={book.image}
                    className="w-full h-48 sm:h-72 object-cover"
                  />

                  <div className="p-2 flex flex-col gap-2">

                    <h3 className="text-sm font-semibold line-clamp-2">
                      {book.title}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {book.author}
                    </p>

                    <Stars rating={book.rating} />

                    <DownloadButton
                      url={book.downloadUrl}
                      readLinkFetcher={() => handleReadLink(book.id)}
                    />

                  </div>

                </div>

              ))}

            </div>
          )}

          {livrosVisiveis < books.length && (

            <div className="flex justify-center mt-8">

              <button
                onClick={() => setLivrosVisiveis((prev) => prev + 6)}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg"
              >
                Ver mais
              </button>

            </div>

          )}

        </main>

      </div>

    </div>

  );
}