export function isAdmin(c) {
  if (c.req.user && c.req.user.role === 'admin') {
    c.next();
  } else {
    c.json(
      {
        message: 'Admin access is required to perform this action',
      },
      403,
    );
  }
}
