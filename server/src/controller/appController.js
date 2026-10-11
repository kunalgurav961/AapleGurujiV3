import pujaModel from "../model/pujaModel.js";

export const getPuja = async (req, res) => {
  try {
    const pujas = await pujaModel.find({});
    res.status(200).json({
      success: true,
      data: pujas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const getPujaById = async (req, res) => {
  try {
    const { id } = req.params;
    const puja = await pujaModel.findById(id);
    
    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }
    
    res.status(200).json({
      success: true,
      data: puja,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}