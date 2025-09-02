import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { useBuilderStore } from "./store/builderStore";
import Palette from "./components/builder/Palette";
import Canvas from "./components/builder/Canvas";
import Inspector from "./components/builder/Inspector";
import BuilderHeader from "./components/builder/BuilderHeader";
import RuntimeForm from "./components/renderer/RuntimeForm";
import type { FieldType, ComponentNode } from "./components/builder/types";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function App() {
  const [preview, setPreview] = useState(false);
  const schema = useBuilderStore((s) => s.schema);

  const onDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    if (!over) return;
    const overId = String(over.id);
    if (!overId.startsWith("row-")) return;
    const rowId = overId.replace("row-", "");

    const data: any = active.data?.current;
    if (data?.source !== "palette") return;

    let comp: ComponentNode | null = null;
    if (data.kind === "field") {
      const ft: FieldType = data.fieldType || "text";
      const fieldName =
        ft === "text"
          ? "name"
          : ft === "email"
          ? "email"
          : ft === "number"
          ? "amount"
          : ft;
      comp = {
        id: uid(),
        kind: "field",
        fieldType: ft,
        name: fieldName,
        label: fieldName.replace(/\b\w/g, (c: string) => c.toUpperCase()),
        width: 1,
      };
    } else if (data.kind === "button") {
      comp = {
        id: uid(),
        kind: "button",
        label: "Submit",
        action: { type: "submit" },
        width: 1,
      };
    } else if (data.kind === "table") {
      comp = {
        id: uid(),
        kind: "table",
        name: "orders",
        width: 2,
        columns: [
          { id: uid(), name: "product", label: "Product", fieldType: "text" },
          { id: uid(), name: "qty", label: "Qty", fieldType: "number" },
        ],
      };
    }

    if (comp) {
      const addToRow = useBuilderStore.getState().addComponentToRow;
      addToRow(rowId, comp);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <BuilderHeader preview={preview} setPreview={setPreview} />
      <DndContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <div className="p-3 rounded-xl border bg-white sticky top-4">
              <Palette />
            </div>
          </div>
          <div className="col-span-6">
            <div className="p-3 rounded-xl border bg-white">
              {!preview ? <Canvas /> : <RuntimeForm schema={schema} />}
            </div>
          </div>
          <div className="col-span-3">
            <div className="p-3 rounded-xl border bg-white sticky top-4">
              <Inspector />
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
