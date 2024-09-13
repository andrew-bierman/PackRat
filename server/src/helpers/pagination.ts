export interface PaginationParams {
  limit: number;
  offset: number;
}

const defaultPaginationParams: PaginationParams = {
  offset: 0,
  limit: 20,
};

export function getPaginationParams(params?: PaginationParams) {
  if (!params) {
    return defaultPaginationParams;
  }

  return params;
}

export function getNextOffset(
  pagination: PaginationParams,
  totalCount: number,
): number | false {
  const { limit, offset } = pagination;

  const nextOffset = offset + limit;

  if (nextOffset >= totalCount) {
    return false;
  }

  return nextOffset;
}
