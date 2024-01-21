let useSearchParams;
if (process.env.NEXT_PUBLIC_APP === 'next') {
  useSearchParams = require('./useSearchParams.web').default;
} else {
  useSearchParams = require('./useSearchParams.mob').default;
}

export default useSearchParams;
