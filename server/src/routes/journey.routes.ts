import express from 'express';
import {
  createJourney,
  dashboardView,
  deleteJourney,
  editJourneyView,
  getJourneyById,
  newJourneyView,
  updateJourney,
} from '../controllers/journey.controller';
import { checkAuthenticated } from '../middleware/auth.middleware';

const journeyRoutes = (app: express.Application) => {
  app.get('/', checkAuthenticated, dashboardView);
  app.get('/journey/new', checkAuthenticated, newJourneyView);
  app.get('/journey/:id', checkAuthenticated, getJourneyById);
  app.get('/journey/edit/:id', checkAuthenticated, editJourneyView);

  app.post('/journey', checkAuthenticated, createJourney);
  app.patch('/journey/:id', checkAuthenticated, updateJourney);

  app.delete('/journey/:id', checkAuthenticated, deleteJourney);
};

export default journeyRoutes;
