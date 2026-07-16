export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "DealLens AI backend is running",
    timestamp: new Date().toISOString(),
  });
};
