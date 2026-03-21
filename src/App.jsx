import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ReadBook from "./pages/ReadBook"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* 👉 AQUI está sua nova rota */}
        <Route path="/read/:id" element={<ReadBook />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App