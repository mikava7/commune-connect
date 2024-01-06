import { fetchBooks } from "../lib/data";
import { Book } from "../lib/definitions.js";
import Image from "next/image";
import Link from "next/link.js";
export default async function Page() {
  const books: Book[] = await fetchBooks();
  console.log("data", books);
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
            className="bg-white rounded-md p-4 shadow-md mb-4 w-100 h-100"
          >
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
              <p className="text-gray-600 mb-2">
                <span className="font-bold">Wikipedia:</span>{" "}
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {link}
                </Link>
              </p>
              <Image
                src={`/${imageLink}`}
                alt={title}
                width="400"
                height="400"
                className="rounded-md shadow-md"
              />
            </div>
          </div>
        );
      })}
    </main>
  );
}
