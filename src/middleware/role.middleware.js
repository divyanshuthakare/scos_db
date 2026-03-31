export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role_id;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
          error_code: "FORBIDDEN"
        });
      }

      next();

    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Role check failed",
        error_code: "ROLE_ERROR"
      });
    }
  };
};