import { Journey } from '../models/Journey';
import { Request, Response } from 'express';

export const dashboardView = (req: Request, res: Response) => {
    res.render("dashboard", {})
}

export const getaAllJourneys = async (req: Request, res: Response) => {
    try{
        const journeys = await Journey.find()
        res.status(200).json(journeys)

    } catch(error) {
         return res.status(500).json({ message:"Server Error"})
    }
}

export const getJourneyById = async (req: Request, res: Response) => {
    try {
        const journeyId = req.params.id;
        const journey = await Journey.findById(journeyId)

        if(!journey) { 
            return res.status(404).json({message: 'Journey not found'})
    }
         res.status(200).json(journey)
    } catch (error) {
        return res.status(500).json({message: "Server Error"})
    }
}

  
export const createJourney = async (req: Request, res: Response) => {
    try{
        if(!req.body) {
            return res.status(400).json("Fill empty filed")
        }
        const journey = req.body.journey;

        const user_id = req.user;

        const newJourney = new Journey({
            journey,
            createdBy: user_id
        })

        await newJourney.save()

        res.status(201).json({message: 'Journey created successfully', newJourney})
    } catch(error) {
        return res.status(500).send("Failed to create journey")
    }
}

export const updateJourney = async (req: Request, res: Response) => {
    try{
        const journeyId = req.params.id;
        const journey = req.body.journey;


        const updatedJourney = await Journey.findByIdAndUpdate(journeyId, {journey: journey}, {new: true})

        if(!updatedJourney){
            return res.status(404).json({message: 'Journey not found'})
        }

        res.status(202).json({message: 'Journey updated successfully', updatedJourney})
    } catch(error) {
        return res.status(500).send("Failed to update journey")
    }
}

export const deleteJourney = async (req: Request, res: Response) => {
    try {
        const journeyId = req.params.id

        const deletedJourney = await Journey.findByIdAndDelete(journeyId)

        if(!deletedJourney) {
            return res.status(404).json({message: 'Journey not found'})
        }

        res.json({message: 'Journey deleted successfully', deletedJourney})
    } catch (error) {
        return res.status(500).send("Failed to delete journey")
    }
}