/**
 * Fetches data from the specified URL using the provided options.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {Object} options - The options to use for the fetch request.
 * @return {Promise} A Promise that resolves to the parsed JSON response from the fetch request.
 */
export default async function fetcher(url, options) {
  const res = await fetch(url, options);
  return await res.json();
}
