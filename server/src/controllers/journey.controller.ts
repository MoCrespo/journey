import { Journey } from '../models/Journey';
import { Request, Response } from 'express';
import {format} from 'date-fns'


export const newJourneyView = (req: Request, res: Response) => {
    res.render("journey-form", {})
}

export const editJourneyView = async (req: Request, res: Response) => {
    try {
        const journeyId = req.params.id;
        const journey = await Journey.findById({_id: journeyId})
        if(!journey) {
            return res.status(404).json({message: "journey not found"})
        }

        const formattedJourney = {
            ...journey.toObject(),
            date: format(journey.date, "MMMM d, yyyy 'at' hh:mm a")
        };
        
        res.render('journey-edit.ejs', {journey: formattedJourney})
        
      
        
    } catch (error) {
        return res.status(500).render('500error',{message: "Server Error"})
    }
}

export const dashboardView = async (req: Request, res: Response) => {
    try{
        const journeys = await Journey.find({createdBy: req.user}).sort({date: -1})
        const formattedJourneys = journeys.map(journey => ({
            ...journey.toObject(),
            date: format(journey.date, "MMMM d, yyyy 'at' hh:mm a")
        }));
        res.render('dashboard.ejs', {journeys: formattedJourneys})
    } catch(error) {
        return res.status(500).render('500error',{message: "Failed to fetch journeys"})
    }
}

export const getAllJourneys = async (req: Request, res: Response) => {
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
        const journey = await Journey.findById({_id: journeyId})

        if(!journey) {
            return res.status(404).json({message: "journey not found"})
        }

        const formattedJourney = {
            ...journey.toObject(),
            date: format(journey.date, "MMMM d, yyyy 'at' hh:mm a")
        };
        
        res.render('journey-details.ejs', {journey: formattedJourney})
    } catch (error) {
        return res.status(500).render('500error',{message: "Failed to fetch journey details"})
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

        res.redirect("/")
    } catch(error) {
        return res.status(500).render('500error',{message: "Failed to create journey"})
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

        res.redirect(`/journey/${journeyId}`)
    } catch(error) {
        return res.status(500).render('500error',{message: "Failed to update journey"})
    }
}

export const deleteJourney = async (req: Request, res: Response) => {
    try {
        const journeyId = req.params.id

        const deletedJourney = await Journey.findByIdAndDelete(journeyId)

        if(!deletedJourney) {
            return res.status(404).json({message: 'Journey not found'})
        }

        res.redirect('/')
    } catch (error) {
        return res.status(500).render('500error',{message: "Failed to delete journey"})
    }
}