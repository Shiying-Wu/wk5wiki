'use client'
import React, { useEffect, useState } from 'react';

// Define the type for a single Wikipedia page
interface WikiPage {
  pageid: number;
  ns: number;
  title: string;
  index: number;
}

// Define the type for the Wikipedia API response
interface WikiResponse {
  batchcomplete?: string;
  continue?: any;
  query: {
    pages: {
      [key: string]: WikiPage;
    };
  };
}

const WikiComponent =() => {
  const [pages, setPages] = useState<WikiPage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchWikipediaData = async () => {
    const url =
      'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=Bendigo'; // change the result from "Bendigo" to Bundoora

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const data: WikiResponse = await response.json();
      const pagesArray = Object.values(data.query.pages);
      setPages(pagesArray);
    } catch (err: any) {
      setError(err.message);
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchWikipediaData();
  }, []);

  return (
    <div>
      <h2>Wikipedia Search Results for "La Trobe University"</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul style={{ color: 'blue' }}>
        {pages.map((page) => (
          <li key={page.pageid}>
            <a
              href={`https://en.wikipedia.org/?curid=${page.pageid}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {page.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WikiComponent;