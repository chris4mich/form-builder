import { useDroppable } from "@dnd-kit/core";
import { useBuilderStore } from "../../store/builderStore";
import { Plus, Trash2 } from "lucide-react";
import type { FieldComponent, ButtonComponent, TableComponent } from "./types";

export function CanvasRow({ rowId }: { rowId: string }) {
  const { setNodeRef, isOver } = useDroppable({ id: `row-${rowId}` });
  const schema = useBuilderStore((s) => s.schema);
  const row = schema.rows.find((r) => r.id === rowId)!;
  const select = useBuilderStore((s) => s.select);
  const selectedId = useBuilderStore((s) => s.selectedId);
  const remove = useBuilderStore((s) => s.removeComponent);

  return (
    <div
      ref={setNodeRef}
      className={`min-h-20 rounded-xl border p-3 ${
        isOver ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${schema.columns}, minmax(0, 1fr))`,
        }}
      >
        {row.components.map((c) => (
          <div
            key={c.id}
            className={`rounded-xl border p-3 bg-white shadow-sm hover:shadow cursor-pointer ${
              selectedId === c.id ? "ring-2 ring-blue-500" : ""
            }`}
            style={{
              gridColumn: `span ${c.width || 1} / span ${c.width || 1}`,
            }}
            onClick={() => select(c.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {c.kind}
              </div>
              <button
                className="text-gray-500 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(c.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {c.kind === "field" && (
              <div>
                <div className="text-sm font-medium">
                  {(c as FieldComponent).label}
                </div>
                <div className="text-xs text-gray-500">
                  {(c as FieldComponent).name}
                </div>
              </div>
            )}
            {c.kind === "button" && (
              <div className="text-sm font-medium">
                Button: {(c as ButtonComponent).label}
              </div>
            )}
            {c.kind === "table" && (
              <div>
                <div className="text-sm font-medium">
                  Table: {(c as TableComponent).name}
                </div>
                <div className="text-xs text-gray-500">
                  cols: {(c as TableComponent).columns.length}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {row.components.length === 0 && (
        <div className="text-xs text-gray-500 mt-2">
          Move your Components here 👇
        </div>
      )}
    </div>
  );
}

export default function Canvas() {
  const schema = useBuilderStore((s) => s.schema);
  const addRow = useBuilderStore((s) => s.addRow);

  return (
    <div className="space-y-3">
      {schema.rows.map((r) => (
        <CanvasRow key={r.id} rowId={r.id} />
      ))}
      <button
        className="px-3 py-2 text-sm rounded-xl border hover:bg-gray-50"
        onClick={addRow}
      >
        <Plus className="inline w-4 h-4 mr-1" /> Add Row
      </button>
    </div>
  );
}
