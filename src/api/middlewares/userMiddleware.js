import User from 'src/models/user';

export default async (req, res, next) => {
  let userId = req.header('x-user-id');
  let user = null;

  try {
    // For TESTS/MVP purposes, we're injecting the user we've seeded if the header does not include a User id
    if (!userId) {
      user = await User.findOne({
        where: { email: 'csr.manager@greentech.com' },
      });
    } else {
      user = await User.findByPk(userId);
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error checking user:', error);
    next(error);
  }
};
