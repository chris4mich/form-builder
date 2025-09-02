import { z } from "zod";
import type { FormSchema, FieldComponent } from "../builder/types";

export function buildZod(schema: FormSchema) {
  const shape: Record<string, any> = {};
  schema.rows.forEach((r) =>
    r.components.forEach((c) => {
      if (c.kind === "field") {
        const ft = (c as FieldComponent).fieldType;
        let zf: any = z.any();
        if (ft === "text") zf = z.string().optional();
        if (ft === "email") zf = z.string().email("Invalid email").optional();
        if (ft === "number") zf = z.coerce.number().optional();
        if (ft === "date") zf = z.string().optional();
        if (ft === "checkbox") zf = z.boolean().optional();
        shape[(c as FieldComponent).name] = zf;
      }
    })
  );
  return z.object(shape);
}
