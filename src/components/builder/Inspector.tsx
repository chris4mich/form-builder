import { useMemo } from "react";
import { useBuilderStore } from "../../store/builderStore";
import type {
  FieldType,
  FieldComponent,
  ButtonComponent,
  TableComponent,
  ComponentNode,
} from "./types";
import { Settings } from "lucide-react";

export default function Inspector() {
  const { schema, selectedId, updateComponent, setColumns } = useBuilderStore();
  const selected = useMemo(
    () =>
      schema.rows.flatMap((r) => r.components).find((c) => c.id === selectedId),
    [schema, selectedId]
  );

  if (!selected) {
    return (
      <div className="p-3 rounded-xl border">
        <div className="text-sm font-medium mb-2">Form Settings</div>
        <label className="text-xs text-gray-500">Columns</label>
        <input
          type="number"
          min={1}
          max={6}
          className="w-full mt-1 px-2 py-1 rounded-lg border"
          value={schema.columns}
          onChange={(e) =>
            setColumns(Math.max(1, Math.min(6, Number(e.target.value))))
          }
        />
        <div className="text-xs text-gray-500 mt-2">
          Select component on canvas for properties.
        </div>
      </div>
    );
  }

  const onPatch = (patch: Partial<ComponentNode>) =>
    updateComponent(selected.id, patch);

  return (
    <div className="p-3 rounded-xl border space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Settings className="w-4 h-4" /> Properties
      </div>
      {selected.kind === "field" && (
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">Label</label>
            <input
              className="w-full px-2 py-1 rounded-lg border"
              value={(selected as FieldComponent).label}
              onChange={(e) => onPatch({ label: e.target.value } as any)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Name</label>
            <input
              className="w-full px-2 py-1 rounded-lg border"
              value={(selected as FieldComponent).name}
              onChange={(e) => onPatch({ name: e.target.value } as any)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Type</label>
            <select
              className="w-full px-2 py-1 rounded-lg border"
              value={(selected as FieldComponent).fieldType}
              onChange={(e) =>
                onPatch({ fieldType: e.target.value as FieldType } as any)
              }
            >
              {(
                [
                  "text",
                  "number",
                  "email",
                  "date",
                  "select",
                  "checkbox",
                ] as FieldType[]
              ).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500">Width (columns)</label>
            <input
              type="number"
              min={1}
              max={6}
              className="w-full px-2 py-1 rounded-lg border"
              value={selected.width || 1}
              onChange={(e) =>
                onPatch({ width: Number(e.target.value) } as any)
              }
            />
          </div>
        </div>
      )}
      {selected.kind === "button" && (
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">Label</label>
            <input
              className="w-full px-2 py-1 rounded-lg border"
              value={(selected as ButtonComponent).label}
              onChange={(e) => onPatch({ label: e.target.value } as any)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Width (columns)</label>
            <input
              type="number"
              min={1}
              max={6}
              className="w-full px-2 py-1 rounded-lg border"
              value={selected.width || 1}
              onChange={(e) =>
                onPatch({ width: Number(e.target.value) } as any)
              }
            />
          </div>
        </div>
      )}
      {selected.kind === "table" && (
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">Name</label>
            <input
              className="w-full px-2 py-1 rounded-lg border"
              value={(selected as TableComponent).name}
              onChange={(e) => onPatch({ name: e.target.value } as any)}
            />
          </div>
          <div className="text-xs text-gray-500">
            Columns: {(selected as TableComponent).columns.length} (mock)
          </div>
          <div>
            <label className="text-xs text-gray-500">Width (columns)</label>
            <input
              type="number"
              min={1}
              max={6}
              className="w-full px-2 py-1 rounded-lg border"
              value={selected.width || 1}
              onChange={(e) =>
                onPatch({ width: Number(e.target.value) } as any)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
