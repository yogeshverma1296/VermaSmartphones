import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    model: {
      type: String,
      required: [true, "Model name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    ram: {
      type: String,
      required: [true, "RAM is required"],
      trim: true,
    },
    storage: {
      type: String,
      required: [true, "Storage is required"],
      trim: true,
    },
    battery: {
      type: String,
      trim: true,
    },
    camera: {
      type: String,
      trim: true,
    },
    releaseYear: {
      type: Number,
      min: 2000,
      max: 2100,
    },
    color: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;
