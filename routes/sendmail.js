
const express = require('express');
const { getEmails, toggleStarredEmail , deleteEmails, moveEmailsToBin } = require('../controller/email-controller');

const emailRouter = express.Router();

emailRouter.get("/data/:type",async(req,res)=>{
try {
  const data = await getEmails(req,res)
    return res.send(data).status(200)
} catch (error) {
  return res.send(error).status(400)
  
}
  })

  emailRouter.post("/starred",async(req,res)=>{
    try {
      const data = await toggleStarredEmail(req,res)
        return res.send(data).status(200)
    } catch (error) {
      return res.send(error).status(400)
      
    }
      })
emailRouter.patch("/bin",async(req,res)=>{
  try {
    const data = await moveEmailsToBin(req,res)
     console.log("bin" ,req); //moveEmailsToBin
    return res.send(data).status(200)
  } catch (error) {
   return res.send(error).status(400)
  }
})

emailRouter.patch("/delete",async(req,res)=>{
  try {
    const data = await deleteEmails(req,res)
    // console.log("bindd" ,req.body);
    return res.send(data)
  } catch (error) {
   return res.send(error).status(400)
  }
})



module.exports = emailRouter;
