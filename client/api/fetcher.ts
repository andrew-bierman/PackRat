/**
 * Fetches data from the specified URL using the provided options.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - The options to use for the fetch request.
 * @return {Promise<any>} A Promise that resolves to the parsed JSON response from the fetch request.
 */
export default async function fetcher(
  url: string,
  options: RequestInit,
): Promise<any> {
  const res = await fetch(url, options);
  return await res.json();
}
