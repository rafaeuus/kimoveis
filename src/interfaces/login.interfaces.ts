import { z } from "zod";
import { createLoginSchema } from "../schemas/login.schemas";

type ILoginRequest = z.infer<typeof createLoginSchema>;

export { ILoginRequest };
