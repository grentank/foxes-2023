export default function authCheck(isAuthenticated) {
  return (req, res, next) => {
    if (!!req.session.user === isAuthenticated) return next();
    return res.status(401).json({ message: 'Not authorized' });
  };
}
