import { User } from "../models/User";
import { Request, Response } from "express";

// services 
import { hashPassword, checkUserExistence, confirmedPassword } from "../services/login.service";


//For Register Page
export const registerView =  (req: Request, res: Response) => {
    res.render("register", {});
  };

  export const loginView = (req: Request, res: Response) => {
    res.render("login", {})
  }

  
export const registerUser = async (req: Request, res: Response) => {
    try {
        if (!req.body) {
            return res.json("Body undefined");
        }
       

        const { userName, firstName, lastName, password, confirm } = req.body;

        if (!userName || !firstName || !lastName || !password || !confirm) {
            return res.status(400).json("Fill empty fields");
        }
      
        
        const checkPassword = await confirmedPassword(password,confirm);
        if (!checkPassword) {
            return res.status(400).json("Passwords must match ");
        }
        
        const userExists = await checkUserExistence(userName);
        
        if (userExists) {
            
          return  res.send("user is exist")
        }

    
        const hash = await hashPassword(password);

        const newUser = new User({
            userName,
            firstName,
            lastName,
            password: hash,
        });

        await newUser.save();
        res.redirect("/login");
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send('Server Error');
    }
};


