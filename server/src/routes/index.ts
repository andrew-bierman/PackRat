import * as express from "express";
import AuthController from "../controllers/auth";
import PackController from "../controllers/pack";
import ItemsController from "../controllers/item";
import OpenAiController from "../controllers/openAi";
import TrailsController from "../controllers/getTrail";
import OsmController from "../controllers/getOsm";
import PacksController from "../controllers/getParks";
import TripController from "../controllers/trip";
import FavoriteController from "../controllers/favorite";
import TemplatesController from "../controllers/template";
import WeatherController from "../controllers/weather";
import GeoCodeController from "../controllers/geoCode";
import PasswordResetController from "../controllers/passwordReset";

export default function registerRoutes(app: express.Application): void {
    new AuthController(app);
    new PackController(app);
    new ItemsController(app);
    new OpenAiController(app);
    new TrailsController(app);
    new OsmController(app);
    new PacksController(app);
    new TripController(app);
    new FavoriteController(app);
    new TemplatesController(app);
    new WeatherController(app);
    new GeoCodeController(app);
    new PasswordResetController(app);
}
