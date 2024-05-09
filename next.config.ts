import fs from "fs";
import path from "path";

module.exports = {
  server: {
    https: {
      key: fs.readFileSync(path.resolve("/localhost-key.pem")),
      cert: fs.readFileSync(path.resolve("/localhost.pem")),
    },
  },
};
