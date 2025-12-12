"use client";

import React, { useState } from "react";
import Modal from "./modal";

export type WishlistCard = {
	id: number | string;
	title: string;
	description: string;
	author: string;
	type?: "movie" | "book";
};

interface CardListProps {
	items: WishlistCard[];
	emptyText?: string;
	cardType: "movie" | "book";
}

// Simple card grid used on the wishlist page.
export default function CardList({ items, emptyText = "No items yet", cardType }: CardListProps) {
	const [selectedItem, setSelectedItem] = useState<WishlistCard | null>(null);

	if (!items || items.length === 0) {
		return <p className="text-sm text-gray-500">{emptyText}</p>;
	}

	const openModal = (item: WishlistCard) => {
		setSelectedItem(item);
	};

	const closeModal = () => {
		setSelectedItem(null);
	};

	return (
		<>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{items.map((item) => (
					<button
						key={item.id}
						onClick={() => openModal(item)}
						className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-[#ff8000] text-left w-full cursor-pointer"
					>
						<h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
						<p className="mt-2 text-sm text-gray-600 line-clamp-3">{item.description}</p>
						<p className="mt-3 text-sm font-semibold text-gray-700 line-clamp-1">Author: {item.author}</p>
					</button>
				))}
			</div>

			<Modal
				isOpen={!!selectedItem}
				onClose={closeModal}
				item={selectedItem}
				cardType={cardType}
			/>
		</>
	);
}
