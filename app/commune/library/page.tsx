import { fetchBooks } from "../../lib/data";
import { Book } from "../../lib/definitions.js";
import Image from "next/image";
import Link from "next/link.js";
export default async function Page() {
  const books: Book[] = await fetchBooks();
  //   console.log("data", books);
  return (
    <main>
      {books.map((book) => {
        const {
          id,
          author,
          country,
          link,
          title,
          imageLink,
          language,
          pages,
          year,
        } = book;
        return (
          <div
            key={id}
            className="inline-grid p-6 m-6 items-center bg-white outline-red"
          >
            <Image
              src={`/${imageLink}`}
              alt={title}
              width="300"
              height="300"
              className="rounded-md shadow-md items-center"
            />
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <div className="flex flex-col">
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Author:</span> {author}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Year:</span> {year}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Country:</span> {country}
              </p>
              <p className="text-gray-600 mb-2 overflow-x-scroll">
                <span className="font-bold ">Wikipedia:</span>{" "}
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 outline-red"
                >
                  {link}
                </Link>
              </p>
            </div>
          </div>
        );
      })}
    </main>
  );
}
