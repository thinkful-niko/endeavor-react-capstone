const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {basicStrategy, jwtStrategy} = require('./strategies');

const router = express.Router();

const jsonParser = bodyParser.json();

const UsersController = require('./users');
const AuthController = require('./auth');
const DayController = require('./days');


//Register User
router.post('/register', jsonParser, UsersController.register);

//Login User
router.post('/login', passport.authenticate('basic', {session: false}), AuthController.login);

//Refresh Token
router.post('/refresh', passport.authenticate('jwt', {session: false}), AuthController.refresh);

//Add Day
router.post('/addDay', [passport.authenticate('jwt', {session: false}), jsonParser],DayController.addDay);

//Add Task
router.post('/saveTask', [passport.authenticate('jwt', {session: false}), jsonParser],DayController.saveTask);

//Update Task
// router.post('/updateTask', [passport.authenticate('jwt', {session: false}), jsonParser],DayController.updateTask);

//Get Days
router.post('/getDays', [passport.authenticate('jwt', {session: false}), jsonParser],DayController.getDays);

//Delete Task
// router.post('/deleteTask', [passport.authenticate('jwt', {session: false}), jsonParser],DayController.deleteTask);




module.exports = {router, basicStrategy, jwtStrategy};