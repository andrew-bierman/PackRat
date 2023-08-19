import { Application, Request, Response } from 'express';
import Base from '../Base';
import { getTrails } from './getTrails';

export default class TrailsController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/gettrails', this.router);
        express.use("/api/gettrails", this.router);
        this.router.post("/", getTrails);
    }
}
