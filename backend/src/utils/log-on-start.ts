import { logger } from "@/lib/logger"

export const logOnStart = () => {
    logger.info("Sever started, listening on http://localhost:3001")
}