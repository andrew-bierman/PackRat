import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getParks } from './getParks';

export default class PacksController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/pack', this.router);
        express.use("/api/pack", this.router);
        this.router.get("/", getParks);
    }
}
