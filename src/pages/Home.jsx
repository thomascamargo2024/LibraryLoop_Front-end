import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-loopCode-Books.png";
import { useEffect, useState, useMemo, useRef } from "react";
import Stars from "../components/Stars";
import DownloadButton from "../components/DownloadButton";
import { getBooksByCategory } from "../services/booksService";
import { categorias } from "../data/categories";
import { Bell, Download, Search } from "lucide-react";
import "../styles/home.css";

export default function Home() {

const navigate = useNavigate();
const scrollRef = useRef(null);

const [books, setBooks] = useState([]);
const [categoriaAtiva, setCategoriaAtiva] = useState("programming");
const [loading, setLoading] = useState(true);
const [livrosVisiveis, setLivrosVisiveis] = useState(10);
const [search, setSearch] = useState("");

// DRAG STATE
const [isDown, setIsDown] = useState(false);
const [startX, setStartX] = useState(0);
const [scrollLeft, setScrollLeft] = useState(0);

useEffect(() => {
async function loadBooks() {
try {
setLoading(true);
const data = await getBooksByCategory(categoriaAtiva);
setBooks(data);
} catch (e) {
console.error("Erro ao carregar livros:", e);
} finally {
setLoading(false);
}
}


loadBooks();


}, [categoriaAtiva]);

const filteredBooks = useMemo(() => {
return books.filter((book) =>
(book.title || "").toLowerCase().includes(search.toLowerCase()) ||
(book.author || "").toLowerCase().includes(search.toLowerCase())
);
}, [books, search]);

const handleRead = (book) => {
const id = book.id || book.olid;


if (!id) {
  console.error("❌ Livro sem ID:", book);
  return;
}

navigate(`/read/${id}`);


};

// DRAG FUNCTIONS
const handleMouseDown = (e) => {
setIsDown(true);
setStartX(e.pageX - scrollRef.current.offsetLeft);
setScrollLeft(scrollRef.current.scrollLeft);
};

const handleMouseLeave = () => setIsDown(false);
const handleMouseUp = () => setIsDown(false);

const handleMouseMove = (e) => {
if (!isDown) return;
e.preventDefault();
const x = e.pageX - scrollRef.current.offsetLeft;
const walk = (x - startX) * 1.5;
scrollRef.current.scrollLeft = scrollLeft - walk;
};

return ( <div className="min-h-screen bg-[#0f172a] text-white">

  {/* HEADER */}
  <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#111827] border-b border-[#1f2937]">

    <div className="flex items-center gap-3">
      <div className="bg-purple-600 p-2 rounded-lg">
        <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
      </div>

      <div>
        <h1 className="font-semibold text-sm">ExpoBooks</h1>
        <p className="text-xs text-gray-400">Library</p>
      </div>
    </div>

    {/* SEARCH */}
    <div className="flex-1 flex justify-center px-2 sm:px-10">
      <div className="relative w-full max-w-xl">
        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />

        <input
          type="text"
          placeholder="Pesquise por título, autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#1f2937] pl-9 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
    </div>

  </header>

  <div className="flex flex-col lg:flex-row">

    {/* 📱 CATEGORIAS COM DRAG */}
    <div
      ref={scrollRef}
      className="category-scroll lg:hidden mt-20 px-4 flex gap-2 pb-3 overflow-x-auto cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {categorias.map((grupo) =>
        grupo.itens.map((categoria) => (
          <button
            key={categoria.slug}
            onClick={() => setCategoriaAtiva(categoria.slug)}
            className={`px-3 py-1 rounded-full text-xs whitespace-nowrap
            ${categoriaAtiva === categoria.slug
                ? "bg-purple-600"
                : "bg-[#1f2937]"
              }`}
          >
            {categoria.nome}
          </button>
        ))
      )}
    </div>

    {/* SIDEBAR DESKTOP */}
    <aside className="w-64 bg-[#111827] p-6 hidden lg:flex flex-col gap-6 mt-20">

      <input
        type="text"
        placeholder="Buscar livros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-[#1f2937] rounded-lg px-3 py-2 text-sm outline-none"
      />

      <div className="flex flex-col gap-2">
        <p className="text-xs text-gray-400 uppercase">Categorias</p>

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

    {/* MAIN */}
    <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-6 lg:pt-24">

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Todos os Livros</h1>
        <p className="text-sm text-gray-400">
          {filteredBooks.length} livros encontrados
        </p>
      </div>

      {loading ? (
        <p>Carregando livros...</p>
      ) : (

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {filteredBooks.slice(0, livrosVisiveis).map((book, index) => (

            <div
              key={book.id || index}
              className="bg-[#1f2937] rounded-lg overflow-hidden shadow hover:scale-[1.03] transition"
            >

              <img
                src={book.image}
                className="w-full h-40 sm:h-56 object-cover"
              />

              <div className="p-2 flex flex-col gap-2">

                <h3 className="text-xs sm:text-sm font-semibold line-clamp-2 min-h-[40px]">
                  {book.title}
                </h3>

                <p className="text-[10px] sm:text-xs text-gray-400">
                  {book.author}
                </p>

                <Stars rating={book.rating} />

                <button
                  onClick={() => handleRead(book)}
                  className="bg-purple-600 hover:bg-purple-700 text-xs py-1 rounded"
                >
                  Ler
                </button>

                <DownloadButton url={book.downloadUrl} />

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
