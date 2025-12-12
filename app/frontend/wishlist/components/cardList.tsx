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
						className="block rounded-xl border border-gray-200 bg-[#e7f1a8]/80 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md hover:border-[#364c84] text-left w-full cursor-pointer"
					>
						<h3 className="text-lg font-bold text-[#364c84]">{item.title}</h3>
						<p className="mt-2 text-sm text-[#364c84]/50 line-clamp-3">{item.description}</p>
						<p className="mt-3 text-sm font-semibold text-[#364c84]/80 line-clamp-1">Author: {item.author}</p>
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
