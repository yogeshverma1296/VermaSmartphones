import Phone from "../models/Phone.js";

// @desc    Get all smartphones
// @route   GET /api/phones
export const getPhones = async (req, res) => {
  try {
    const phones = await Phone.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: phones.length, data: phones });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while fetching phones", error: error.message });
  }
};

// @desc    Get single smartphone by ID
// @route   GET /api/phones/:id
export const getPhoneById = async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.id);
    if (!phone) {
      return res.status(404).json({ success: false, message: "Smartphone not found" });
    }
    res.status(200).json({ success: true, data: phone });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ success: false, message: "Invalid smartphone ID" });
    }
    res.status(500).json({ success: false, message: "Server error while fetching phone", error: error.message });
  }
};

// @desc    Create new smartphone
// @route   POST /api/phones
export const createPhone = async (req, res) => {
  try {
    const phone = await Phone.create(req.body);
    res.status(201).json({ success: true, data: phone });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error while creating phone", error: error.message });
  }
};

// @desc    Update smartphone
// @route   PUT /api/phones/:id
export const updatePhone = async (req, res) => {
  try {
    const phone = await Phone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!phone) {
      return res.status(404).json({ success: false, message: "Smartphone not found" });
    }
    res.status(200).json({ success: true, data: phone });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Server error while updating phone", error: error.message });
  }
};

// @desc    Delete smartphone
// @route   DELETE /api/phones/:id
export const deletePhone = async (req, res) => {
  try {
    const phone = await Phone.findByIdAndDelete(req.params.id);
    if (!phone) {
      return res.status(404).json({ success: false, message: "Smartphone not found" });
    }
    res.status(200).json({ success: true, message: "Smartphone deleted successfully", data: phone });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error while deleting phone", error: error.message });
  }
};
