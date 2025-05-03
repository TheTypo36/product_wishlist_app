import { User } from "../Models/userSchema.js";
import { Wishlist } from "../Models/wishlistSchema.js";

export const create = async (req, res) => {
  try {
    const userId = req.userId;
    const { name } = req.body;
    if (!userId) {
      return res.status(404).json({ message: "no user found!!" });
    }
    if (!name) {
      return res.status(404).json({ message: "name is required field" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "invalid userId" });
    }
    const existingWishlist = await Wishlist.findOne({ name, userId });
    if (existingWishlist) {
      return res.status(400).json({ message: "wishlist already exists" });
    }

    const wishlist = await wishlist.created({
      name: name,
      createdBy: userId,
      collaborators: [userId],
    });

    if (!wishlist) {
      return res.status(500).json({ message: "error in creating wishlist" });
    }

    return res
      .status(202)
      .json(202, wishlist, { message: "successfully created the wishlist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json("internval server error in creating wishlist");
  }
};

export const getWishlists = async (req, res) => {
  try {
    const userId = req.params || req.userId;
    if (!user) {
      return res.status(404).json({ message: "required the userId" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user don't exists" });
    }

    const wishlists = await Wishlist.findById(userId).populate("products");
    if (!wishlists) {
      return res.status(500).json({ message: "error in getting the wishlist" });
    }
    return res
      .status(202)
      .json(202, wishlists, { message: "successfully fetch the wishlists" });
  } catch (error) {
    return res.status(500).json(500, {
      message: "interval server error in fetching the wishlists",
    });
  }
};

export const inviteCollaborator = async (req, res) => {
  try {
    const { wishlistId } = req.params;
    const { email } = req.body;
    if (!wishlistId || !email) {
      return res
        .status(404)
        .json(404, { message: "wishlistId and email are required fields" });
    }
    const wishlist = await Wishlist.findById(wishlistId);
    if (!wishlist) {
      return res.status(404).json(404, { message: "no wishlist found" });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json(404, { message: "no user found" });
    }

    wishlist.collaborators.push(user._id);
    return res.status(202).json(202, wishlist, {
      message: "sucessfull updated the collabrator's list",
    });
  } catch (error) {
    return res
      .status(500)
      .json(500, { message: "internal server error in collaboration" });
  }
};

export const deleteWishlist = async (req, res) => {
  const { wishlistId } = req.params;

  const userId = req.user;

  const result = await Wishlist.findOneAndDelete({
    wishlistId,
    userId,
  });

  return res.status(200).json({ message: "deleted" });
};
