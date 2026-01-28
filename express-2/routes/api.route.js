const express = require('express');
const apiController = require('../controllers/api.controller');

const router = express.Router();

apiRouter.get("/test", apiController.testendpoint)