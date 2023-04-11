import { z } from "zod";
import {
  allRealEstatesSchema,
  realEstateRequestSchema,
  realEstateSchema,
} from "../schemas/realEstate.schemas";

type IRealEstateResult = z.infer<typeof realEstateSchema>;
type IRealEstateRequest = z.infer<typeof realEstateRequestSchema>;
type IAllRealEstatesResult = z.infer<typeof allRealEstatesSchema>;

export { IRealEstateResult, IRealEstateRequest, IAllRealEstatesResult };
