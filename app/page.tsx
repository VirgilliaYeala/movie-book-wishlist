import TableList from "./frontend/components/tableList";
import Navbar from "./frontend/components/navbar";
import Tabs from "./frontend/components/tabs";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="ml-30 mr-30">
        <div className="flex items-center justify-between mt-10 mb-10">
          <h1 className="text-2xl font-bold">Movie and Book Wishlist</h1>
          <button className="rounded bg-[#ff8000] px-8 py-2 text-black text-base font-semibold">Add New Item</button>
        </div>
        <Tabs />
      </div>
    </div>
  );
}