import React from "react";
import { Star, StarHalf } from "lucide-react";

const Review = ({ review }: { review: any }) => {
  return (
    <article className="sm:my-4">
      <div className="flex items-start gap-4">
        <div>
          <div className="flex ">
            <Star fill="orange" size={20} strokeWidth={0} />
            <Star fill="orange" size={20} strokeWidth={0} />
            <Star fill="orange" size={20} strokeWidth={0} />
            <StarHalf fill="orange" size={20} strokeWidth={0} />
          </div>

          <p className="line-clamp-2 text-sm text-gray-900">{review.content}</p>

          <div className="mt-2 sm:flex sm:items-center sm:gap-2">
            <p className="hidden sm:block sm:text-sm sm:text-gray-500">
              {review.reviewer.first_name + " " + review.reviewer.last_name}
            </p>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>
            <p className="hidden sm:block sm:text-sm sm:text-gray-500">
              Verified User
            </p>

            <span className="hidden sm:block" aria-hidden="true">
              &middot;
            </span>

            <div className="flex items-center gap-1 text-gray-500">
              <p className="text-sm">
                {(review.date_created as string).split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Review;
