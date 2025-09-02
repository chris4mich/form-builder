import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  FormSchema,
  ButtonComponent,
  FieldComponent,
  TableComponent,
} from "../builder/types";
import FieldView from "./FieldView";
import TableView from "./TableView";
import { buildZod } from "./zodBuilder";
import { useMemo } from "react";

export default function RuntimeForm({ schema }: { schema: FormSchema }) {
  const zodSchema = useMemo(() => buildZod(schema), [schema]);
  const methods = useForm({ resolver: zodResolver(zodSchema) });

  const onSubmit = methods.handleSubmit((vals) => {
    alert("Submitted:\n" + JSON.stringify(vals, null, 2));
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-3">
        {schema.rows.map((r) => (
          <div
            key={r.id}
            className="grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${schema.columns}, minmax(0, 1fr))`,
            }}
          >
            {r.components.map((c) => (
              <div
                key={c.id}
                style={{
                  gridColumn: `span ${c.width || 1} / span ${c.width || 1}`,
                }}
                className="p-2"
              >
                {c.kind === "field" && <FieldView comp={c as FieldComponent} />}
                {c.kind === "table" && <TableView comp={c as TableComponent} />}
                {c.kind === "button" && (
                  <button
                    type={
                      (c as ButtonComponent).action.type === "submit"
                        ? "submit"
                        : "button"
                    }
                    className="px-4 py-2 rounded-xl border bg-black text-white hover:opacity-90"
                  >
                    {(c as ButtonComponent).label}
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </form>
    </FormProvider>
  );
}
