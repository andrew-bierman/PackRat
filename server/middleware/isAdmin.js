export function isAdmin(req, res, next) {
  // Your user object might be different. This is just a sample.
  if (req.user && req.user.role === "admin") {
    next(); // pass control to the next handler
  } else {
    res.status(403).send({
      message: "Admin access is required to perform this action",
    });
  }
}
