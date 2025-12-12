import Tabs from "./frontend/components/tabs";

export default function Page() {
  return (
    <div className="ml-30 mr-30">
      <div className="flex items-center justify-between mt-10 mb-10">
        <h1 className="text-2xl font-bold text-[#364c84]">Movie and Book Wishlist</h1>
        <button className="rounded bg-[#e7f1a8] px-8 py-2 text-[#364c84] text-base font-semibold">Add New Item</button>
      </div>
      <Tabs />
    </div>
  );
}