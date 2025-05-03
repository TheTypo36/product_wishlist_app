import { Router } from "express";
import {
  create,
  getWishlists,
  deleteWishlist,
  inviteCollaborator,
} from "../Controllers.js/wishlistController.js";

const router = Router();

router.route("/create").post(create);
router.route("/get-wishlists/:id").post(getWishlists);
router.route("invite/:wishlistId").post(inviteCollaborator);
router.route("/delete-wishlist/:wishlistId").delete(deleteWishlist);
export default router;
