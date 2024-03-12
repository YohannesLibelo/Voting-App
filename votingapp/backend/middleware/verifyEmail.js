const axios = require("axios");

const verifyEmailMiddleware = async (req, res, next) => {
  try {
    // Extract the email address from the request body or query parameters
    const email = req.body.email || req.query.email;

    // Extract the domain from the email address
    const domain = email.split("@")[1];

    // Make a request to MailCheck.ai to verify the domain
    const response = await axios.get(`https://api.mailcheck.ai/domain/${domain}`);

    // Check if the domain is valid and not disposable
    if (response.data.status === 200 && !response.data.disposable) {
      // Proceed to the next middleware or route handler
      next();
    } else {
      // If the domain is invalid or disposable, send an error response
      return res.status(400).json({ message: "Invalid or disposable domain" });
    }
  } catch (error) {
    // Log and handle any errors that occur during domain verification
    console.error("Domain verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  verifyEmailMiddleware,
};
