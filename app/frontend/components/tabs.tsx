"use client";

import { useState, useEffect } from "react";
import TableList from "./tableList";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [moviesData, setMoviesData] = useState([]);
  const [booksData, setBooksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const moviesResponse = await fetch("/data/movies.json");
        const booksResponse = await fetch("/data/books.json");
        
        const movies = await moviesResponse.json();

        const books = await booksResponse.json();
        
        setMoviesData(movies);
        setBooksData(books);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="mt-10 p-4">Loading...</div>;
  }

  return (
    <div className="mt-10">
      <div className="flex gap-4 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("tab1")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "tab1"
              ? "border-b-2 border-[#ff8000] text-black"
              : "text-gray-600"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setActiveTab("tab2")}
          className={`px-4 py-2 font-semibold ${
            activeTab === "tab2"
              ? "border-b-2 border-[#ff8000] text-black"
              : "text-gray-600"
          }`}
        >
          Books
        </button>
      </div>

      {activeTab === "tab1" && (
        <div className="mt-4 p-4">
          <TableList data={moviesData} type="movies" />
        </div>
      )}

      {activeTab === "tab2" && (
        <div className="mt-4 p-4">
          <TableList data={booksData} type="books" />
        </div>
      )}
    </div>
  );
}
