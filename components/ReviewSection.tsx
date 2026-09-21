"use client";

import { useState, useCallback } from "react";
import { Review } from "@/lib/types";
import Toast from "@/components/Toast";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

interface ReviewSectionProps {
  reviews: Review[];
  bookId: string;
}

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  );
}

export default function ReviewSection({ reviews }: ReviewSectionProps) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const MAX = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || text.trim() === "") return;
    setShowToast(true);
    setText("");
    setRating(0);
    setHovered(0);
  };

  const handleClose = useCallback(() => setShowToast(false), []);

  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold text-slate-100 mb-4 border-b border-slate-700 pb-2">
        Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Leave review form */}
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-slate-200">
              Leave Your Review
            </h3>
            <span className="text-xs text-slate-500">
              {text.length}/{MAX}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              rows={5}
              maxLength={MAX}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts about this book..."
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
            />

            {/* Interactive star rating */}
            <div className="flex items-center gap-1" role="group" aria-label="Rating">
              {Array.from({ length: 5 }, (_, i) => {
                const val = i + 1;
                const filled = val <= (hovered || rating);
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Rate ${val} star${val > 1 ? "s" : ""}`}
                    aria-pressed={rating === val}
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHovered(val)}
                    onMouseLeave={() => setHovered(0)}
                    className="focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
                  >
                    {filled ? (
                      <StarIcon className="w-6 h-6 text-amber-400 transition-colors" />
                    ) : (
                      <StarOutline className="w-6 h-6 text-slate-600 hover:text-amber-400 transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={rating === 0 || text.trim() === ""}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Existing reviews */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {reviews.length === 0 && (
            <p className="text-slate-500 text-sm">
              No reviews yet. Be the first!
            </p>
          )}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 text-sm">
                  {review.reviewer}
                </span>
                <span className="text-xs text-slate-500">{review.date}</span>
              </div>
              <StarRatingDisplay rating={review.rating} />
              <p className="text-slate-400 text-sm leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showToast && (
        <Toast
          message="Review submitted!"
          type="success"
          onClose={handleClose}
        />
      )}
    </section>
  );
}
