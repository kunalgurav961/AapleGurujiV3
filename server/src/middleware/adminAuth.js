export const requireAdminKey = (req, res, next) => {
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    return res.status(503).json({
      success: false,
      message: "Admin access is not configured on the server",
    });
  }

  if (req.get("x-admin-key") !== expectedKey) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin access key",
    });
  }

  next();
};
