// fuseSearch.js
import Fuse from 'fuse.js';

// Desc: Fuse search function
export const fuseSearch = (data, searchTerm, keys, options = {}) => {
  const defaultOptions = {
    includeScore: true,
    includeMatches: true,
    // isCaseSensitive: false,  // Indicates whether comparisons should be case sensitive
    // shouldSort: true,  // Whether to sort the result list by score
    // includeMatches: false,  // Whether the matches set should be included in each record
    // findAllMatches: false,  // When true, the matching function will continue to the end of a search pattern even if a perfect match has been located in the string
    // minMatchCharLength: 1,  // Specifies the minimum number of characters in the string that must be matched
    // location: 0,  // Determines approximately where in the text is the pattern expected to be found
    // threshold: 0.6,  // At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything.
    // distance: 100,  // Determines how close the match must be to the fuzzy location (specified by `location`)
    // useExtendedSearch: false,  // Indicates whether the algorithm should use an extended search mode
    // ignoreLocation: false,  // When true, the computation of the location is completely ignored. Boosts performance.
    // ignoreFieldNorm: false,  // When true, the function ignores the `fieldNorm` computed during the indexing stage, and uses a constant norm value of 1
  };

  const fuse = new Fuse(data, {
    keys,
    ...defaultOptions,
    ...options,
  });
  console.log('fuse', fuse)
  // const results = fuse?.search(searchTerm) ?? [];

  // return full search results, not just items
  return searchTerm ? results : data;
};
