import { Application, Request, Response } from 'express';
import Base from '../Base';
import { requestPasswordResetEmailAndToken } from './requestPasswordReset';
import { handlePasswordReset } from './handlePasswordReset';

export default class PasswordResetController extends Base {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/password-reset', this.router);
        express.use("/api/password-reset", this.router);
        this.router.post("/", requestPasswordResetEmailAndToken);
        this.router.post("/:token", handlePasswordReset);
    }
}