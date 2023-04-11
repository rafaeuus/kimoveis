import { z } from "zod";
import { addressSchema } from "../schemas/addresses.schemas";

type IAddress = z.infer<typeof addressSchema>;

export { IAddress };
