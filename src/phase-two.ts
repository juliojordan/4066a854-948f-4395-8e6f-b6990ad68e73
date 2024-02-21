import "dotenv/config";

import { validateConfig } from "./lib/config";
import { logger } from "./lib/logger";
import { populateMegaversePhaseTwo } from "./services/megaverse";

export async function main() {
  logger.info("Starting phase one");

  logger.info("Validating configuration");
  validateConfig();

  logger.info("Populating Megaverse");
  await populateMegaversePhaseTwo();
}

let exitCode = 0;

main()
  .then(() => {
    logger.info("All done");
  })
  .catch((error) => {
    exitCode = 1;
    logger.error(error);
  })
  .finally(() => {
    logger.info("Cleaning up resources");
    process.exit(exitCode);
  });
