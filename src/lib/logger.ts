import pino, { LoggerOptions } from "pino";

const loggerOptions: LoggerOptions = {
  level: process.env.LOG_LEVEL || "info",
};

if (process.env.NODE_ENV !== "production") {
  loggerOptions.transport = {
    target: "pino-pretty",
  };
}

export const logger = pino(loggerOptions);
