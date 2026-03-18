import { Document, Page } from "react-pdf";
import { useState } from "react";

export default function ReaderModal({ file, onClose }) {

  const [numPages, setNumPages] = useState(null);

  return (

    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">

      <div className="bg-[#111827] p-6 rounded-lg w-[80%] h-[90%] overflow-auto">

        <button
          onClick={onClose}
          className="mb-4 text-white bg-red-500 px-3 py-1 rounded"
        >
          Fechar
        </button>

        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
            />
          ))}
        </Document>

      </div>

    </div>

  );
}