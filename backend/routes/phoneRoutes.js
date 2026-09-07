import express from "express";
import {
  getPhones,
  getPhoneById,
  createPhone,
  updatePhone,
  deletePhone,
} from "../controllers/phoneController.js";

const router = express.Router();

router.route("/").get(getPhones).post(createPhone);
router.route("/:id").get(getPhoneById).put(updatePhone).delete(deletePhone);

export default router;
