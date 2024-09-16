import SearchBar from "@/components/searchbar";
import Image from "next/image";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="text-gray-900 bg-blue-100">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div className="flex flex-col items-center justify-center text-center lg:w-4/5">
            <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-black">
              Connect with verified and trusted financial experts
            </h1>
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="flex mt-5 justify-center">
        <div className="px-12">
          <div className="flex flex-col w-full">
            <h1 className="text-2xl font-medium title-font text-center text-black">
              Over 200 of the most popular firms and experts use Findr
            </h1>
            <p className="text-center text-gray-700">
              Get matched according to your custom needs with AI
            </p>
          </div>

          <div className="flex flex-wrap -m-4 text-center">
            {[1, 2, 3, 4, 5].map((index: number) => (
              <div key={index} className="p-4 w-42">
                <div className=" bg-white p-2 rounded-lg shadow hover:cursor-pointer">
                  <Image src="/graph.png" width={100} height={200} alt="img" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
