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
  const { name, email, age, phone_num, date, month_days, week_days } = req.body;
  console.log(name, email, age, phone_num, date, month_days, week_days)

  try {
    // Check for existing user
    const existingUser = await periodUser.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User Already Exists", success: false });
    }

    // Create user and period data sequentially
    const newUser = new periodUser({ name, email, age, phone_num });
    await newUser.save(); // Save user

    const newDate = new periodDate({ email, dates: [date], month_days, week_days });
    await newDate.save(); // Save period data

    const newData = new periodDashboard({ email, week_days });
    await newData.save(); // Save dashboard data

    res.json({ success: true, message: "Data Saved Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error saving data" });
  }
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
