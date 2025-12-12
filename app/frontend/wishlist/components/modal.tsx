import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	item: any;
	cardType: "movie" | "book";
}

export default function Modal({ isOpen, onClose, item, cardType }: ModalProps) {
	if (!isOpen || !item) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
			<div
				className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl bg-white shadow-2xl overflow-hidden animate-fadeIn"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className={`px-8 py-7 bg-[#ff8000]`}>
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<h1 className="text-3xl font-bold text-white mb-1">
								{item.title || "Untitled"}
							</h1>
							<p className="text-lg text-white/90">{item.author || "Unknown Author"}</p>
							{/* Rating Display */}
							{(item.vote_average || item.rating) && (
								<div className="mt-1 flex items-center gap-2">
									<span className="text-xl text-yellow-300">★</span>
									<span className="text-xl font-semibold text-white">
										{cardType === "movie" ? item.vote_average : item.rating}
									</span>
									<span className="text-sm text-white/80">
										{cardType === "movie" ? "/ 100" : "/ 5.0"}
									</span>
									{(item.voters || item.vote_count) && (
										<span className="ml-2 text-sm text-white/80">
											{cardType === "movie" ? "(" + item.vote_count + " votes)" : "(" + item.voters + " votes)"}
										</span>
									)}
								</div>
							)}
						</div>
						<button
							onClick={onClose}
							className="ml-4 text-white hover:text-white/80 transition"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				{/* Body */}
				<div className="p-8 max-h-[57vh] overflow-y-auto">
					<div className="grid gap-8 md:grid-cols-2">
						{/* Left Column */}
						<div className="space-y-6">
							<div>
								<h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
									{cardType === "movie" ? "Overview" : "Description"}
								</h3>
								<p className="text-lg leading-relaxed text-gray-700">
									{cardType === "movie" 	
										? (item.overview || "No overview available")
										: (item.description || "No description available")
									}
								</p>
							</div>

							{/* Genre/Genres Display */}
							{cardType === "movie" && item.genre && (
								<div>
									<h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
										Genre
									</h3>
									<div className="flex flex-wrap gap-2">
										{item.genre.split(",").map((g: string, i: number) => (
											<span
												key={i}
												className="rounded-full bg-[#7dd3fc] px-4 py-1 text-base font-semibold text-white"
											>
												{g.trim()}
											</span>
										))}
									</div>
								</div>
							)}

							{cardType === "book" && item.generes && item.generes !== "none" && (
								<div>
									<h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
										Genres
									</h3>
									<div className="flex flex-wrap gap-2">
										{item.generes.split(",").map((g: string, i: number) => (
											<span
												key={i}
												className="rounded-full bg-[#7dd3fc] px-4 py-1 text-base font-semibold text-white"
											>
												{g.trim()}
											</span>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Right Column - Details Grid */}
						<div className="space-y-4">
							<h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
								{cardType === "movie" ? "Details" : "Book Information"}
							</h3>
							<div className={`space-y-3 rounded-lg p-6 bg-gray-50`}>
								{cardType === "movie" ? (
									<>
										{item.original_language && (
											<DetailRow label="Original Language" value={item.original_language} type={cardType} />
										)}
										{item.release_date && (
											<DetailRow label="Release Date" value={item.release_date} type={cardType} />
										)}
										{item.popularity && (
											<DetailRow label="Popularity" value={item.popularity} type={cardType} />
										)}
									</>
								) : (
									<>
										{item.published_date && (
											<DetailRow label="Published Date" value={item.published_date} type={cardType} />
										)}
										{item.publisher && (
											<DetailRow label="Publisher" value={item.publisher} type={cardType} />
										)}
										{item.page_count && (
											<DetailRow label="Pages" value={String(item.page_count)} type={cardType} />
										)}
										{item.language && (
											<DetailRow label="Language" value={item.language} type={cardType} />
										)}
										{item.ISBN && (
											<DetailRow label="ISBN" value={item.ISBN} type={cardType} />
										)}
										{item.price && item.currency && (
											<DetailRow label="Price" value={`${item.price} ${item.currency}`} type={cardType} />
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className={`px-8 py-4 border-t flex justify-end gap-3 bg-gray-50 border-gray-200`}>
					<button
						onClick={onClose}
						className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

function DetailRow({ label, value, type }: { label: string; value: string; type: "movie" | "book" }) {
	return (
		<div className={`flex justify-between border-b pb-2 border-gray-200`}>
			<span className="font-medium text-gray-600">{label}:</span>
			<span className="text-right font-semibold text-gray-900">{value}</span>
		</div>
	);
}