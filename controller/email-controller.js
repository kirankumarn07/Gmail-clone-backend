const Email =require("../model/email.js");
import mongoose from "mongoose";

export const saveSendEmails = async (request, response) => {
    try {
        console.log('eeeee', request.body)
        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else if (request.params.type === 'inbox') {
            emails = await Email.find({ from : "kirankumar.naga7@gmail.com" });
            console.log('kkkkkkk', emails)
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmail = async (request, response) => {
    try {   
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body }})
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
    } catch (error) {
        response.status(500).json(error.message);   
    }
}

export const getRoute = async (request, response) => {
    try{
        response.send("Server is  Running.......")
    }catch(error){

    }
}

export const loginRoute = async (req, res) => {
    const DB_URI = `mongodb+srv://kirankumarnaga7:Nkiran07@cluster0.ata8crg.mongodb.net/?retryWrites=true&w=majority`;
    const client = mongoose.connect(DB_URI, { useNewUrlParser: true });

    try 
    {
        
        const db = await client.db('Gmail_Clone')
        let user = await db.collection('All Users').aggregate([{ $match: { username: req.params.email } }]).toArray()
        if (user.length !== 0 || user.length !== 0) {
            res.status(200).send({ message: "user found", data: user })
        }
        else {
            res.send({ message: "user not found" })
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    // finally {
    //     client.close()
    // }
}