import type express from 'express';
import { RECORDS_PER_PAGE } from 'src/utils/constant';

export function responseHandler(
  res: express.Response,
  message: string = 'Success',
) {
  const data = res.locals?.data ?? { message: 'Success' };

  // Set the custom header
  res.setHeader('X-Response-Message', message);

  res.setHeader('Access-Control-Expose-Headers', 'X-Response-Message');

  console.log('message', message);

  return res.status(200).json({
    data,
    pageNo: res.locals?.pageNo || 1,
    recordsPerPage: res.locals?.recordsPerPage || RECORDS_PER_PAGE,
    totalRecords: res.locals?.totalRecords || 0,
  });
}
