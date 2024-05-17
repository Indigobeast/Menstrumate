import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { periodDate, periodUser, periodDashboard } from "./models.js";


const app = express();
const port = 3000;


const mongoURI = "mongodb://localhost:27017/WellNest";


mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use(cors())
app.use(bodyParser.json())




app.post('/save-signup-data', async (req, res) => {
  const data = req.body;
  let email = data.email


  const check = await periodUser.findOne({ email })

  if (check != null) {
    return res.json({ message: "User Already Exists ", success: false })
  }

  const newUser = new periodUser({
    name: data.name,
    age: data.age,
    email: data.email,
    phone_num: data.phoneNo
  })

  newUser.save()
    .then(() => console.log("User Saved"))
    .catch(err => res.json({ success: true, message: "Data Didn't Saved ", Error: err }));

  const newDate = new periodDate({
    email: data.email,
    dates: [data.date],
    month_days: data.monthDays,
    week_days: data.weekDays
  })

  newDate.save()
    .then(() => console.log("Dates saved"))
    .catch(err => res.json({ success: true, message: "Date Didn't Saved ", Error: err }));

  const newData = new periodDashboard({
    email: data.email,
    week_days: data.weekDays,
  })

  newData.save()
    .then(() => console.log("Dashboard Data saved"))
    .catch(err => res.json({ success: true, message: "Data Didn't Saved ", Error: err }));



  res.json({ success: true, message: "Data Saved Successfully" })
});


app.get('/get-user-data', async (req, res) => {

  const email = req.query.email;
  const user_data = await periodUser.findOne({ email }, { _id: 0 })

  if (user_data == null) {
    return res.json({ message: "Email not found", success: false })
  }

  const date_data = await periodDate.findOne({ email }, { email: 0, _id: 0 })


  return res.json({ success: true, user_data: user_data, date: date_data })



})



app.patch('/update-data', async (req, res) => {
  const data = req.body;
  const email = data.email;
  const toUpdate = data.toUpdate
  const value = data.value

  const myData = await periodDate.findOne({ email })

  if (myData == null) {
    return res.json({ message: "Email not found", success: false })
  }

  if (toUpdate === "week") {
    await periodDate.updateOne({ email: email }, { week_days: value })
  }

  else {
    await periodDate.updateOne({ email: email }, { month_days: value })
  }


  return res.json({ message: "Data Updated successfully", success: true })

})


app.patch('/set-period-data', async (req, res) => {
  const data = req.body;
  const email = data.email;
  const color = data.color

  const myData = await periodDashboard.findOne({ email })

  if (myData == null) {
    return res.json({ message: "Email not found", success: false })
  }

  await periodDashboard.updateMany({ email: email }, { period_zone: color, date: new Date() })

  return res.json({ message: "Data Updated successfully", success: true })

})



app.get('/get-period-data', async (req, res) => {

  const email = req.query.email;
  const period_data = await periodDashboard.findOne({ email }, { _id: 0 })

  if (period_data == null) {
    return res.json({ message: "Data not found", success: false })
  }

  return res.json({ success: true, data: period_data })



})






app.listen(port, () => {
  console.log(`Server listening on port :- http://localhost:${port}`);
});
