import React from "react";
import BookingDialog from "@/components/bookingDialog";
import { providerDetails } from "@/actions/client";
import Image from "next/image";
import Review from "@/components/review";
import Link from "next/link";

async function ProviderDetails({ params, searchParams }: any) {
  const { data, error } = await providerDetails(params.id);
  return (
    <section className="text-gray-900  body-font overflow-hidden">
      <div className="container px-2 py-4 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <div className="flex gap-4 space-y-2">
              <Image
                src={`${data.provider.cover_image}`}
                alt=""
                width={200}
                height={200}
                className="sm:rounded-full sm:object-cover sm:w-24 sm:h-24"
              />
              <div className="flex flex-col">
                <h1 className="text-blue-900 text-2xl title-font font-medium">
                  {data.provider.company_name}
                </h1>
                <span className="text-blue-800">
                  {" "}
                  {data.provider.speciality}
                </span>
                <span className="text-xs text-gray-700">
                  {" "}
                  {data.provider.location}
                </span>
              </div>
            </div>
            <div className="flex mb-4">
              <span className="flex-grow hover:cursor-pointer text-teal-600 border-b-2 border-teal-600 py-2 text-lg px-1">
                Description
              </span>
              <Link
                href="#details"
                className="flex-grow hover:cursor-pointer border-b-2 border-gray-200 py-2 text-lg px-1 text-gray-600"
              >
                Details
              </Link>
              <Link
                href="#reviews"
                className="flex-grow hover:cursor-pointer border-b-2 border-gray-200 py-2 text-lg px-1 text-gray-600"
              >
                Reviews
              </Link>
              <Link
                href="#portfolio"
                className="flex-grow hover:cursor-pointer border-b-2 border-gray-200 py-2 text-lg px-1 text-gray-600"
              >
                Portfolio
              </Link>
              <Link
                href="#endorsements"
                className="flex-grow hover:cursor-pointer border-b-2 border-gray-200 py-2 text-lg px-1 text-gray-600"
              >
                Endorsements
              </Link>
            </div>
            <p className="leading-relaxed mb-4 text-gray-700">
              {data.provider.description}
            </p>
            <div className="flex border-t border-gray-300 py-2">
              <span className="text-gray-500">Rating</span>
              <span className="ml-auto text-gray-900">4.6</span>
            </div>
            <div className="flex border-t border-gray-300 py-2">
              <span className="text-gray-500">Years of experience</span>
              <span className="ml-auto text-gray-900">7</span>
            </div>
            <div className="flex border-t border-b mb-6 border-gray-300 py-2">
              <span className="text-gray-500">Reviews</span>
              <span className="ml-auto text-gray-900">
                {data.reviews.length}
              </span>
            </div>
            <div className="flex flex-wrap -m-2">
              <div className="p-2 lg:w-1/2 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-300 border p-4 rounded-lg">
                  <Image
                    width={200}
                    height={200}
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src="https://dummyimage.com/80x80"
                  />
                  <div className="flex-grow">
                    <h2 className="text-blue-900 title-font font-medium">
                      Holden Caulfield
                    </h2>
                    <p className="text-gray-500">UI Designer</p>
                  </div>
                </div>
              </div>
              <div className="p-2 lg:w-1/2 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-300 border p-4 rounded-lg">
                  <Image
                    width={200}
                    height={200}
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src="https://dummyimage.com/80x80"
                  />
                  <div className="flex-grow">
                    <h2 className="text-blue-900 title-font font-medium">
                      Holden Caulfield
                    </h2>
                    <p className="text-gray-500">UI Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center">
            <section className="text-gray-900 bg-blue-100 body-font">
              <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                  <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-blue-900">
                    Book your free application
                  </h1>
                  <p className="mb-8 leading-relaxed text-gray-700">
                    Copper mug try-hard pitchfork pour-over freegan heirloom
                    neutra air plant cold-pressed tacos poke beard tote bag.
                  </p>
                  <div className="flex justify-center">
                    <BookingDialog id={params.id} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div id="reviews">
          <span className="text-blue-900 sm:text-xl">
            Reviews ({data.reviews.length})
          </span>
          {data.reviews.map((review: any, index: number) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProviderDetails;
