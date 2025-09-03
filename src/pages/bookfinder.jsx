import { useState, useEffect } from "react";
import axios from "axios";

function Bookfinder() {
  const [bookName, setBookName] = useState("");
  const [bookDetails, setBookDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [presentPage, setPresentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [error, setError] = useState(false);

  const getData = async () => {
    if (!bookName) {
      return setError(true);
    }
    try {
      setError(false);
      setLoading(true);
      const result = await axios.get(
        `https://openlibrary.org/search.json?title=${bookName}&page=${presentPage}&limit=10`
      );
      if (!result.data || !result.data.docs.length) {
        console.log("no data found");
        alert("no data found");
        setBookDetails([]);
        setLoading(false);
        return;
      }
      setBookDetails(result.data.docs);
      setTotalPage(Math.ceil(result.data.numFound / 10));
      setLoading(false);
    } catch (error) {
      console.error("not able to get data", error);
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    if (bookName) {
      getData();
    }
  }, [presentPage]);

  return (
    <div className="w-full h-screen relative flex flex-col">
      <section className="h-30 lg:h-20 md:h-20 w-full bg-gray-900 relative shrink-0 flex justify-center items-center">
        <form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
        >
          <input
            className="border px-2 py-1 mr-2 rounded lg:w-lg text-white"
            type="text"
            placeholder="Enter Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 lg:py-1 
                        rounded-full shadow-md hover:from-blue-600 
                        hover:to-indigo-700 transition-all duration-300 ease-in-out cursor-pointer
                        disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none`}
          >
            {loading ? "searching..." : "Search"}
          </button>
        </form>
      </section>

      {loading ? (
        <p className="flex-1 w-full bg-gray-800 overflow-y-auto relative flex flex-col items-center gap-2 text-white">
          Loading...
        </p>
      ) : (
        <section className="flex-1 w-full bg-gray-800 overflow-y-auto relative flex flex-col items-center gap-2 ">
          {error && (
            <p className="text-red-700 text-sm">Please enter the text</p>
          )}
          {bookDetails.map((item) => (
            <div
              key={item.key}
              className="w-9/12 h-auto lg:h-60 bg-gray-600 border-b-2 border-b-black flex flex-col md:flex-row lg:flex-row p-4 rounded"
            >
              {item.cover_i ? (
                <a
                  href={
                    item.ia && item.ia.length > 0
                      ? `https://archive.org/details/${item.ia[0]}`
                      : `https://openlibrary.org${item.key}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-3"
                >
                  <img
                    src={`https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
                    alt={item.title}
                    className="h-32 w-24 object-cover mr-3 hover:brightness-75 transition duration-200"
                  />
                </a>
              ) : (
                <div className="h-32 w-24 bg-gray-300 flex items-center justify-center mr-3">
                  No Cover
                </div>
              )}
              <div className="flex relative w-full flex-col lg:flex-row justify-between">
                <div>
                  <a
                    href={
                      item.ia && item.ia.length > 0
                        ? `https://archive.org/details/${item.ia[0]}`
                        : `https://openlibrary.org${item.key}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    <h1 className="font-bold text-2xl text-white mb-1">
                      {item.title}
                    </h1>
                  </a>

                  <h2 className="text-sm text-gray-300 mb-2">
                    by:{" "}
                    {item.author_name ? (
                      item.author_name.map((author, index) => {
                        const isLast = index === item.author_name.length - 1;
                        const isSecondLast =
                          index === item.author_name.length - 2;

                        return (
                          <span key={index}>
                            <a
                              className="text-blue-300 hover:text-blue-400 cursor-pointer"
                              href={`https://openlibrary.org/authors/${item.author_key[index]}`}
                              target="_blank"
                            >
                              {author}
                            </a>
                            {!isLast && (isSecondLast ? " and " : ", ")}
                          </span>
                        );
                      })
                    ) : (
                      <span className="italic">Unknown author</span>
                    )}
                  </h2>

                  {item.first_publish_year ? (
                    <p className="text-gray-200">
                      <span className="font-bold">First published:</span>{" "}
                      {item.first_publish_year} —{" "}
                      {/* {item.edition_count} editions */}
                      <a
                        className="text-blue-300 hover:text-blue-400"
                        href={`https://openlibrary.org/books/${item.cover_edition_key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.edition_count} editions
                      </a>
                    </p>
                  ) : null}
                  {item.number_of_pages_median ? (
                    <p>{item.number_of_pages_median}</p>
                  ) : null}
                  {item.language ? (
                    <p className="text-gray-200">
                      <span className="font-bold">Language: </span>{" "}
                      {item.language.join(", ")}
                    </p>
                  ) : null}
                  <a
                    href={`https://openlibrary.org${item.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline hover:text-blue-400"
                  >
                    View Details
                  </a>
                </div>
                <div className="relative flex justify-center items-center mt-4 lg:mt-0">
                  {item.ia && item.ia.length > 0 && (
                    <a
                      href={`https://archive.org/details/${item.ia[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-200 rounded underline bg-green-600 hover:bg-green-900 p-2 relative
                            transition-all duration-100 ease-in-out"
                    >
                      Read Online
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!loading && bookDetails.length === 0 && (
            <p className="text-white mt-4">
              No books found. Try another search.
            </p>
          )}
          <div className="flex justify-center items-center gap-2 my-4">
            <button
              disabled={presentPage === 1}
              onClick={() => setPresentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <span className="text-white">
              Page
              <input
                type="number"
                min="1"
                max={totalPage}
                value={presentPage}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value > totalPage) value = totalPage;
                  if (value < 1) value = 1;
                  setPresentPage(value);
                  //   getData(value);
                }}
                className="w-16 mx-2 text-center bg-gray-700 border border-gray-500 rounded px-2 py-1 text-white"
              />
              of {totalPage}
            </span>

            <button
              disabled={presentPage === totalPage}
              onClick={() => setPresentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Bookfinder;
