const FREE_DAILY_LIMIT = 1;
const PRO_DAILY_LIMIT = 5;

const Limitcontroller = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const now = new Date();
    const last = user.lastResetDate || now;

    // ✅ Check if it's a new day
    const isNewDay =
      now.getFullYear() !== last.getFullYear() ||
      now.getMonth() !== last.getMonth() ||
      now.getDate() !== last.getDate();

    if (isNewDay) {
      user.analysisCount = 0;
      user.lastResetDate = now;
      await user.save();
    }

    // ✅ Decide limit based on plan
    const DAILY_LIMIT =
      user.Plan === "Pro" ? PRO_DAILY_LIMIT : FREE_DAILY_LIMIT;

    // ✅ Enforce limit
    if (user.analysisCount >= DAILY_LIMIT) {
      return res.status(429).json({
        success: false,
        message:
          user.Plan === "Pro"
            ? "Daily Pro limit reached. Try again tomorrow."
            : "Free limit reached. Upgrade to Pro or wait for reset.",
      });
    }

    next();
  } catch (err) {
    console.error("Limitcontroller error:", err);
    return res.status(500).json({
      success: false,
      message: "Usage limit check failed",
    });
  }
};

module.exports = { Limitcontroller };