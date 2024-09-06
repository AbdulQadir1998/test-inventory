const getOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid userId format' });
    }

    // Ensure the query is efficient with a limit and sorting applied
    const orders = await Order.find({ userId })
      .limit(10)
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders', details: error.message });
  }
};
