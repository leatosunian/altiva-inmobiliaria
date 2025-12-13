import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ message: "Ingresá un nombre." }).min(1, {
    message: "Ingresá un nombre.",
  }),

  bathrooms: z.string().optional().or(z.literal("")),

  dormitorios: z.string().optional().or(z.literal("")),

  rooms: z.string().optional().or(z.literal("")),

  garageCarsQuantity: z
    .string()
    .optional().or(z.literal("")),

  businessType: z.string().min(1, {
    message: "Selecciona un tipo de negocio.",
  }),

  address: z.string().min(1, {
    message: "Ingresá el domicilio.",
  }),

  city: z.string().min(1, {
    message: "Ingresá la ciudad.",
  }),

  neighborhood: z.string().min(1, {
    message: "Ingresá el barrio.",
  }),

  state: z.string().min(1, {
    message: "Seleccioná una provincia.",
  }),

  currency: z.string().min(1, {
    message: "Ingresá una moneda.",
  }),

  price: z.string().min(1, {
    message: "Ingresá un precio.",
  }),

  propertyType: z.string().min(1, {
    message: "Ingresá un tipo de propiedad.",
  }),

  metersSquare: z.string().optional().or(z.literal("")),

  coveredMetersSquare: z.string().optional().or(z.literal("")),

  uncoveredMetersSquare: z.string().optional().or(z.literal("")),

  expensas: z.string().optional().or(z.literal("")),

  antiquity: z.string().optional().or(z.literal("")),

  floors: z.string().optional().or(z.literal("")),

  status: z.string().optional().or(z.literal("")),

  show: z.boolean(),

  description: z.string().optional().or(z.literal("")),

  // -----------------------------
  // CAMPOS OPCIONALES NUEVOS
  // -----------------------------

  luminocity: z.string().optional().or(z.literal("")),
  infrastructureStatus: z.string().optional().or(z.literal("")),
  disposition: z.string().optional().or(z.literal("")),
  calefaction: z.string().optional().or(z.literal("")),
  hasElevator: z.boolean().optional(),
  hasPatio: z.boolean().optional(),
  hasPool: z.boolean().optional(),
  hasQuincho: z.boolean().optional(),
  hasTerrace: z.boolean().optional(),
});
