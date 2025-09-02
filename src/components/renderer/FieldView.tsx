import { useFormContext } from "react-hook-form";
import type { FieldComponent } from "../builder/types";

export default function FieldView({ comp }: { comp: FieldComponent }) {
  const { register } = useFormContext();
  const common = "w-full px-3 py-2 rounded-xl border";

  switch (comp.fieldType) {
    case "checkbox":
      return (
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" {...register(comp.name)} className="rounded" />
          <span>{comp.label}</span>
        </label>
      );
    default:
      return (
        <div className="space-y-1">
          <div className="text-sm text-gray-700">{comp.label}</div>
          <input
            type={
              comp.fieldType === "number"
                ? "number"
                : comp.fieldType === "date"
                ? "date"
                : comp.fieldType
            }
            className={common}
            {...register(comp.name)}
          />
        </div>
      );
  }
}
