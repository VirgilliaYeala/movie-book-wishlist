"use client";

import { useEffect, useMemo, useState } from "react";

interface TableListProps {
  data: any[];
  type: "movies" | "books";
}

const ITEMS_PER_PAGE = 15;

export default function TableList({ data = [], type }: TableListProps) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    setPage(1);
  }, [data, type, sortBy]);

  const sortedData = useMemo(() => {
    const pickValue = (item: any) => {
      if (sortBy === "rating") {
        const raw = type === "movies" ? item.score : item.rating;
        const num = Number(raw);
        return Number.isFinite(num) ? num : -Infinity;
      }
      if (sortBy === "title") {
        const raw = type === "movies" ? item.names : item.title;
        return raw ? String(raw).toLowerCase() : "";
      }
      if (sortBy === "date") {
        const raw = type === "movies" ? item.date_x : item.published_date;
        if (raw) {
          let dateParts;
          if (type === "movies") {
            // MM/DD/YYYY format
            dateParts = raw.split("/");
            return dateParts.length === 3 ? new Date(`${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`).getTime() : 0;
          } else if (type === "books") {
            // "Sep 12, 2025" format
            const match = raw.match(/(\w+)\s+(\d+),\s+(\d+)/);
            if (match) {
              const month = new Date(`${match[1]} 1`).getMonth() + 1; // Get month number
              return new Date(`${match[3]}-${month}-${match[2]}`).getTime();
            }
          }
        }
        return 0;
      }
    }

    return [...data].sort((a, b) => {
      const va = pickValue(a);
      const vb = pickValue(b);

      if (sortBy === "rating") {
        return (vb as number) - (va as number);
      }
      if (sortBy === "title") {
        return String(va || "").localeCompare(String(vb || ""));
      }
      if (sortBy === "date") {
        return (vb as number) - (va as number);
      }
      return 0;
    });
  }, [data, sortBy, type]);

  const { pagedData, totalPages } = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return {
      pagedData: sortedData.slice(start, end),
      totalPages: Math.max(1, Math.ceil(sortedData.length / ITEMS_PER_PAGE)),
    };
  }, [page, sortedData]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const renderPagination = () => (
    <div className="mt-6 flex items-center justify-between">
      <span className="text-base font-medium text-gray-600">
        Page <span className="font-semibold text-gray-900">{page}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>
      <div className="flex items-center gap-3">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="rounded-lg bg-[#47f7fc] px-4 py-2 text-base font-medium text-black transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Prev
        </button>
        <span className="text-base   text-gray-500">
          {pagedData.length} of {data.length} items
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="rounded-lg bg-[#47f7fc] px-4 py-2 text-base font-medium text-black transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );

  const renderSorter = () => (
    <div className="mb-6 flex justify-end">
      <label className="flex items-center gap-3">
        <span className="text-base font-semibold text-gray-700">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-900 transition-all hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="rating">Rating (highest)</option>
          <option value="title">Title (A-Z)</option>
          <option value="date">Date (newest)</option>
        </select>
      </label>
    </div>
  );

  if (type === "movies") {
    return (
      <div>
        {renderSorter()}
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-[#ff8000]">
              <th className="border border-black-400 p-2">Title</th>
              <th className="border border-black-400 p-2">Date Released</th>
              <th className="border border-black-400 p-2">Genre</th>
              <th className="border border-black-400 p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{item.names}</td>
                <td className="border border-gray-400 p-2">{item.date_x}</td>
                <td className="border border-gray-400 p-2">{item.genre || "-"}</td>
                <td className="border border-gray-400 p-2">{item.score || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    );
  }

  if (type === "books") {
    return (
      <div>
        {renderSorter()}
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-[#ff8000]">
              <th className="border border-black-400 p-2">Title</th>
              <th className="border border-black-400 p-2">Author</th>
              <th className="border border-black-400 p-2">Date Released</th>
              <th className="border border-black-400 p-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{item.title}</td>
                <td className="border border-gray-400 p-2">{item.author || "-"}</td>
                <td className="border border-gray-400 p-2">{item.published_date || "-"}</td>
                <td className="border border-gray-400 p-2">{item.rating || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderPagination()}
      </div>
    );
  }

  return <div>No data available</div>;
}