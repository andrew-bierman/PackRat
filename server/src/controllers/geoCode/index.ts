import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getGeoCode } from './getGeoCode';

export default class GeoCodeController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/geocode', this.router);
        express.use("/api/geocode", this.router);
        this.router.get("/", getGeoCode);
    }
}
