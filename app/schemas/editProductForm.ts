import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ message: "Ingresá un nombre." }).min(1, {
    message: "Ingresá un nombre.",
  }),
  bathrooms: z
    .string({
      message: "Ingresá la cantidad de baños..",
    })
    .min(1, {
      message: "Ingresá la cantidad de baños.",
    }),
  garageCarsQuantity: z
    .string({
      message: "Ingresá la capacidad de autos del garage..",
    })
    .min(1, {
      message: "Ingresá la capacidad de autos del garage.",
    }),
  businessType: z.string().min(1, {
    message: "Selecciona un tipo de negocio.",
  }),
  address: z.string().min(1, {
    message: "Ingresá el domicilio.",
  }),
  currency: z.string().min(1, {
    message: "Ingresá una moneda.",
  }),
  city: z.string().min(1, {
    message: "Ingresá la ciudad.",
  }),
  neighborhood: z.string().min(1, {
    message: "Ingresá el barrio.",
  }),
  state: z.string().min(1, {
    message: "Selecciona una moneda.",
  }),
  price: z.string().min(1, {
    message: "Ingresá un precio.",
  }),
  propertyType: z.string().min(1, {
    message: "Ingresá un tipo de propiedad.",
  }),
  metersSquare: z.string().min(1, {
    message: "Ingresá el total de metros cuadrados.",
  }),
  coveredMetersSquare: z.string().min(1, {
    message: "Ingresá los metros cuadrados cubiertos.",
  }),
  uncoveredMetersSquare: z.string().min(1, {
    message: "Ingresá los metros cuadrados descubiertos.",
  }),
  expensas: z.string().min(1, {
    message: "Ingresá el monto de expensas.",
  }),
  antiquity: z.string().min(1, {
    message: "Ingresá la antiguedad de la propiedad.",
  }),
  floors: z.string().min(1, {
    message: "Ingresá la cantidad de pisos.",
  }),
  status: z.string().min(1, {
    message: "Ingresá la cantidad de pisos.",
  }),
  show: z.boolean(),
  rooms: z
    .string({
      message: "Ingresá la cantidad de ambientes.",
    })
    .min(1, {
      message: "Ingresá la cantidad de ambientes.",
    }),
  dormitorios: z
    .string({
      message: "Ingresá la cantidad de ambientes.",
    })
    .min(1, {
      message: "Ingresá la cantidad de ambientes.",
    }),
  imagePath: z.string(),
  description: z.string().optional().or(z.literal("")),
});
