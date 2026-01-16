export default function Pagination({ page, setPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Prev</button>
      <span className="font-bold">Page {page}</span>
      <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 bg-gray-200 rounded">Next</button>
    </div>
  );
}