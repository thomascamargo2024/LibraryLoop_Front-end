export default function DownloadButton({ url, title, disabled = false }) {
  return (
    <a
      href={disabled ? undefined : url}
      download={disabled ? undefined : title}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        w-full text-center py-1.5 px-3 rounded-md text-sm font-medium transition-colors
        ${disabled 
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-400"}
      `}
    >
      {disabled ? "PDF Indisponível" : "Baixar PDF"}
    </a>
  );
}