import "crypto-browserify";
import "stream-browserify"; 

import jwt from "jsonwebtoken";
const path = require("path");

module.exports = {
  fallback: {
    buffer: require.resolve("buffer/"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    resolve: {},
    target: "web",
  },
};
