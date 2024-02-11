import express, { NextFunction, Request, Response } from 'express';
import { publicProcedure } from '../../trpc';
import { z } from 'zod';
import { MapPreviewError } from '../../helpers/errors';
import getMapPreviewService from '../../services/mapPreview';

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
    const data = await getMapPreviewService(
      req.originalUrl.replace('/api', '').replace('/mapPreview/', ''),
    );

    res.setHeader('Content-Type', 'image/png');
    res.send(data);
  } catch (error) {
    next(MapPreviewError);
  }
}

export function getMapPreviewRoute() {
  return publicProcedure.input(z.string()).query(async (opts) => {
    const data = await getMapPreviewService(opts.input);
    const base64Data = Buffer.from(data).toString('base64');
    return base64Data;
  });
}
