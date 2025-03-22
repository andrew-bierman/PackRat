export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface PaginationResponse {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  prevOffset: number | false;
  nextOffset: number | false;
}

const defaultPaginationParams: PaginationParams = {
  offset: 0,
  limit: 20,
};

export function getPaginationParams(
  params?: Partial<PaginationParams>,
): PaginationParams {
  return {
    limit: params?.limit ?? defaultPaginationParams.limit,
    offset: params?.offset ?? defaultPaginationParams.offset,
  };
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

export function getPrevOffset(pagination: PaginationParams): number | false {
  const { limit, offset } = pagination;

  const prevOffset = offset - limit;

  if (prevOffset < 0) {
    return false;
  }

  return prevOffset;
}

export function getPageInfo(
  pagination: PaginationParams,
  totalCount: number,
): { currentPage: number; totalPages: number } {
  const { limit, offset } = pagination;

  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    currentPage,
    totalPages,
  };
}

export function getPaginationResponse(
  pagination: PaginationParams,
  totalCount: number,
): PaginationResponse {
  return {
    prevOffset: getPrevOffset(pagination),
    nextOffset: getNextOffset(pagination, totalCount),
    totalCount,
    ...getPageInfo(pagination, totalCount),
  };
}
