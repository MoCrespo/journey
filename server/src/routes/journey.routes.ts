import express from 'express'
import { createJourney, deleteJourney, getJourneyById, getaAllJourneys, updateJourney } from '../controllers/journey.controller'

const journeyRoutes = (app: express.Application) => {
    app.get('/journey', getaAllJourneys)
    app.get('/journey/:id', getJourneyById)

    app.post('/journey', createJourney)
    app.patch('/journey/:id', updateJourney)

    app.delete('/journey/:id', deleteJourney)
}

export default journeyRoutes