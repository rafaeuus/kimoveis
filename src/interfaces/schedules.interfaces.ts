import { z } from "zod";
import { createScheduleSchema } from "../schemas/schedules.schemas";

type ICreateScheduleRequest = z.infer<typeof createScheduleSchema>;

export { ICreateScheduleRequest };
