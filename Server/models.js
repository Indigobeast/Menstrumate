import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_num: {
    type: Number,
    required: true,
  },
});

const PeriodDateSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dates: {
    type: Array,
    required: true,
  },
  month_days: {
    type: Number,
    required: true,
  },

  week_days: {
    type: Number,
    required: true,
  },
  period_zone: {
    type: String,
    required: false,
  },
});

const PeriodDashboardSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: false,
  },

  bleeding_meter: {
    type: Number,
    required: false,
  },

  cramp_meter: {
    type: Number,
    required: false,
  },

  week_days: {
    type: Number,
    required: true,
  },

  period_zone: {
    type: String,
    required: false,
  },
});

export const periodDashboard = mongoose.model(
  "periodDashboard",
  PeriodDashboardSchema
);
export const User = mongoose.model("User", UserSchema);
export const periodDate = mongoose.model("periodDate", PeriodDateSchema);
