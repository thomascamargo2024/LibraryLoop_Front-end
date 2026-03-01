export default function Stars({ rating = 4 }) {
  return (
    <div className="flex gap-1 text-yellow-400 text-sm mt-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}




