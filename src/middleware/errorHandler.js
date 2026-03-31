const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error_code: err.code || "SERVER_ERROR"
  });
};

export default errorHandler;