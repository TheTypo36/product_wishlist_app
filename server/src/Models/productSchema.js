import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
    },
    wishlistId: {
      type: mongoose.Schema.Types.ObjectId,
      req: "Wishlist",
    },
  },
  { timeseries }
);

export const Product = model("Product", productSchema);
