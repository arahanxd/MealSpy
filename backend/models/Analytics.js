import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ["Swiggy", "Zomato"],
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Analytics", analyticsSchema);
