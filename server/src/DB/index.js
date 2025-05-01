import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.DB_URL}/productWishlistApp`
    );

    console.log("server is running at", connection.connection.host);
  } catch (error) {
    throw new Error(error);
  }
};
