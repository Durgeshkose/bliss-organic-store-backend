import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, nutritionFacts, farmInfo } = req.body;

    // Create a new order
    const newOrder = new Order({
      user: req.user._id,
      products: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalAmount,
      status: "success",
      nutritionFacts,
      farmInfo,
    });

    // Save the order to the database
    await newOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Order placed", order: newOrder });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Order failed", error: err });
  }
};

// Get all orders for a user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ 
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch orders", error: err });
  }
};
