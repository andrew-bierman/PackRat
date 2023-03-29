export default async function fetcher(url, options) {
  const res = await fetch(url, options);
  return await res.json();
}
