// const Email =require("../model/email.js");
const { Email } = require("../model/email");
const mongoose=require("mongoose");

 const saveSendEmails = async (request, response) => {
    try {
        console.log('eeeee', request.body)
        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

 const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type  === 'starred') {
            emails = await Email.find({ starred: true, bin: false}).sort({ date: -1 });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true }).sort({ date: -1 })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({}).sort({ date: -1 });
        } else if (request.params.type === 'inbox') {
            emails = await Email.find({ from : "kirankumar77717@gmail.com", bin: false }).sort({ date: -1 });
            // console.log('kkkkkkk', emails)
            }else if (request.params.type === 'sent') {
                emails = await Email.find({ from : "kirankumar77717@gmail.com" , bin: false}).sort({ date: -1 });
                // console.log('kkkkkkk sent', emails)
        } else {
            emails = await Email.find({ type: request.params.type });
        }

       return emails;
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

 const toggleStarredEmail = async (request, response) => {
    try {   
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

 const deleteEmails = async (request, response) => {
    try {
       await Email.deleteMany({ _id: { $in: request.body }})
    //    console.log("deleteEmails");

    //    console.log(request.body);
    //    console.log("deleteEmails111255");

        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

 const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true }});
        console.log("moveEmailsToBin", request.body);
        response.status(200).json('Moved to Bin ');
   
    } catch (error) {
        response.status(500).json(error.message);   
    }
}

 const getRoute = async (request, response) => {
    try{
        response.send("Server is  Running.......")
    }catch(error){
      
    }
}

 const loginRoute = async (req, res) => {
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
module.exports={saveSendEmails,getRoute,moveEmailsToBin,deleteEmails,toggleStarredEmail,getEmails}