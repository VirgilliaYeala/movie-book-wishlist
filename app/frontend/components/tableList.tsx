"use client";

import { useEffect, useMemo, useState } from "react";
import { useWishlist } from "@/app/context/WishlistContext";

interface TableListProps {
  data: any[];
  type: "movies" | "books";
}

interface Month {
  name: string;  // "Jan", "Feb", dll
  value: string; // "01", "02", dll
}

const MONTHS: Month[] = [
  { name: "Jan", value: "01" },
  { name: "Feb", value: "02" },
  { name: "Mar", value: "03" },
  { name: "Apr", value: "04" },
  { name: "May", value: "05" },
  { name: "Jun", value: "06" },
  { name: "Jul", value: "07" },
  { name: "Aug", value: "08" },
  { name: "Sep", value: "09" },
  { name: "Oct", value: "10" },
  { name: "Nov", value: "11" },
  { name: "Dec", value: "12" },
]

function getMonthValue(name: string): number | undefined {
  const month = MONTHS.find((m) => m.name.toLowerCase() === name.toLowerCase());
  return month ? Number(month.value) : undefined;
}

const ITEMS_PER_PAGE = 15;

export default function TableList({ data = [], type }: TableListProps) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");
  const { addToWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setPage(1);
  }, [data, type, sortBy]);

  const sortedData = useMemo(() => {
    const pickValue = (item: any) => {
      if (sortBy === "rating") {
        const raw = type === "movies" ? item.vote_average : item.rating;
        const num = Number(raw);
        return Number.isFinite(num) ? num : -Infinity;
      }
      if (sortBy === "title") {
        const raw = type === "movies" ? item.title : item.title;
        return raw ? String(raw).toLowerCase() : "";
      }
      if (sortBy === "date") {
        const raw = type === "movies" ? item.release_date : item.published_date;
        if (raw) {
          let dateParts;
          let newDate;
          if (type === "movies") {
            // // YYYY-MM-DD format
            // dateParts = raw.split("-");
            // console.log(dateParts);
            newDate = new Date(raw);
            console.log(newDate);
            return newDate;
          } else if (type === "books") {
            // "Sep 12, 2025" format
            const match = raw.match(/(\w+)\s+(\d+),\s+(\d+)/);
            if (match) {
              const monthValue = getMonthValue(match[1])?.toString().padStart(2, '0');
              const dayValue = match[2].padStart(2, '0');
              const newDate = new Date(`${match[3]}-${monthValue}-${dayValue}`);
              return newDate;
            }
          }
        }
        return 0;
      }
    }

    return data.map((item, index) => ({ ...item, originalIndex: index })).sort((a, b) => {
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
          className="rounded-lg bg-[#7dd3fc] px-4 py-2 text-base font-medium text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Prev
        </button>
        <span className="text-base   text-gray-500">  
          {pagedData.length} of {data.length} items
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="rounded-lg bg-[#7dd3fc] px-4 py-2 text-base font-medium text-white transition-all hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
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
              <th className="border border-black-400 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{item.title}</td>
                <td className="border border-gray-400 p-2">{item.release_date}</td>
                <td className="border border-gray-400 p-2">{item.genre || "-"}</td>
                <td className="border border-gray-400 p-2">{item.vote_average || "-"}</td>
                <td className="border border-gray-400 p-2 text-center">
                  <button
                    onClick={() => {
                      addToWishlist({
                        id: item.id,
                        type: "movie",
                        title: item.names || "Untitled",
                        description: item.overview || "No description",
                        author: item.crew || "Unknown",
                        ...item,
                      });
                    }}
                    disabled={isInWishlist(item.id, "movie")}
                    className="rounded bg-[#7dd3fc] px-2 py-2 text-white text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isInWishlist(item.id, "movie") ? "Added" : "Add to Wishlist"}
                  </button>
                </td>
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
              <th className="border border-black-400 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 p-2">{item.title}</td>
                <td className="border border-gray-400 p-2">{item.author || "-"}</td>
                <td className="border border-gray-400 p-2">{item.published_date || "-"}</td>
                <td className="border border-gray-400 p-2">{item.rating || "-"}</td>
                <td className="border border-gray-400 p-2 text-center">
                  <button
                    onClick={() => {
                      addToWishlist({
                        id: item.FIELD1,
                        type: "book",
                        title: item.title || "Untitled",
                        description: item.description || "No description",
                        author: item.author || "Unknown",
                        ...item,
                      });
                    }}
                    disabled={isInWishlist(item.FIELD1, "book")}
                    className="rounded bg-[#7dd3fc] px-2 py-2 text-white text-sm font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {isInWishlist(item.FIELD1, "book") ? "Added" : "Add to Wishlist"}
                  </button>
                </td>
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