import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../config';
import { MapPreviewError } from '../../helpers/errors';

/**
 *  Responds with map preview image from mapbox api
 *
 * @param {Request} req - Request object
 * @param {Response} res - Respone object
 * @param {NextFunction} next - The next middleware
 * @returns {Promise} - Resolves with the preview image
 */
export default async function getMapPreview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const queryParams = Object.entries(req.query).reduce(
      (acc, [key, val], i, arr) =>
        `${acc}${key}=${val}${i == arr.length - 1 ? '' : '&'}`,
      '',
    );
    const { data } = await axios.get(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${req.originalUrl
        .replace('/api', '')
        .replace('/mapPreview/', '')
        .replace(
          '?' + queryParams,
          '',
        )}?access_token=${MAPBOX_ACCESS_TOKEN}&${queryParams}`,
      { responseType: 'arraybuffer' },
    );

    res.setHeader('Content-Type', 'image/png');
    res.send(data);
  } catch (error) {
    next(MapPreviewError);
  }
}
