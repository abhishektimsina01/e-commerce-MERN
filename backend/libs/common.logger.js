import winston from "winston";
import colors from "chalk";
const { combine, printf } = winston.format;

const myFormat = printf(({ level, message, service, batchId }) => {
  let jsonString = `{ "message": "${
    level === "error" ? colors.red(message) : colors.gray(message)
  }"`;
  jsonString += `, "level": "${level}", "service": "${colors.yellow(
    service
  )}" }`;
  return jsonString;
});

function createLogger(service) {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    defaultMeta: {
      service,
    },
    format: combine(myFormat),
    transports: [new winston.transports.Console()],
  });
}

const serviceLogger = createLogger("e-commerce-mern-logger");

export { serviceLogger };
