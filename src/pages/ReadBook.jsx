import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function ReadBook() {
const { id } = useParams()

const [page, setPage] = useState(0)
const [content, setContent] = useState("")
const [totalPages, setTotalPages] = useState(0)
const [loading, setLoading] = useState(false)
const [fade, setFade] = useState(true)

async function loadPage(pageNumber) {
if (loading) return

setLoading(true)
setFade(false) // 🔥 inicia fade out

try {
  const res = await fetch(
    `http://localhost:8080/books/${id}/pages/${pageNumber}`
  )

  const data = await res.json()

  setTimeout(() => {
    setContent(data.content)
    setPage(data.page)
    setTotalPages(data.totalPages)

    localStorage.setItem(`book-${id}-page`, data.page)

    setFade(true) // 🔥 fade in
  }, 150)

} catch (e) {
  console.error(e)
} finally {
  setLoading(false)
}

}

useEffect(() => {
const savedPage = localStorage.getItem(`book-${id}-page`)
const pageToLoad = savedPage ? Number(savedPage) : 0

loadPage(pageToLoad)

}, [id])

return (
<div
style={{
height: "100vh",
background: "#0d0d0d",
color: "#eaeaea",
display: "flex",
flexDirection: "column",
fontFamily: "serif",
}}
>

  {/* 📄 ÁREA DE LEITURA */}
  <div
  className="reader-scroll"
  style={{
    flex: 1,
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
  }}
  >
    <div
      style={{
        maxWidth: "700px",
        width: "100%",
        padding: "40px 20px",
        lineHeight: "1.9",
        fontSize: "19px",
        textAlign: "justify",
        whiteSpace: "pre-wrap",
        transition: "opacity 0.3s ease",
        opacity: fade ? 1 : 0.2,
      }}
    >
      {content || "Carregando página..."}
    </div>
  </div>

  {/* 🎮 CONTROLES */}
  <div
    style={{
      padding: "15px 25px",
      borderTop: "1px solid #222",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#0d0d0d",
    }}
  >

    {/* BOTÃO ANTERIOR */}
    <button
      onClick={() => loadPage(page - 1)}
      disabled={page === 0 || loading}
      style={buttonStyle}
    >
      ⬅
    </button>

    {/* STATUS */}
    <div style={{ fontSize: "14px", color: "#aaa" }}>
      {loading
        ? "Carregando página..."
        : `Página ${page + 1} de ${totalPages}`}
    </div>

    {/* BOTÃO PRÓXIMO */}
    <button
      onClick={() => loadPage(page + 1)}
      disabled={page >= totalPages - 1 || loading}
      style={buttonStyle}
    >
      ➡
    </button>

  </div>
</div>

)
}

// 🎨 BOTÃO MODERNO
const buttonStyle = {
background: "#1f1f1f",
border: "none",
color: "#fff",
padding: "6px 16px",
borderRadius: "8px",
cursor: "pointer",
fontSize: "16px",
transition: "all 0.2s ease",
}