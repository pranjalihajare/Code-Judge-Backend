const rateLimit = {};
const MAX_SUBMISSIONS = 10;

module.exports = (req, res, next) => {
  const userId = req.user.id;
  const currentHour = new Date().getHours();

  if (!rateLimit[userId]) {
    rateLimit[userId] = { hour: currentHour, count: 1 };
  } else {
    if (rateLimit[userId].hour !== currentHour) {
      rateLimit[userId] = { hour: currentHour, count: 1 };
    } else {
      rateLimit[userId].count++;
    }
  }

  if (rateLimit[userId].count > MAX_SUBMISSIONS) {
    return res.status(429).json({ error: 'Too many submissions this hour' });
  }

  next();
};
