import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";

export default function PaletteItem({
  id,
  label,
  data,
}: {
  id: string;
  label: string;
  data: any;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: `palette-${id}`, data });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-2 rounded-xl border text-sm cursor-grab select-none ${
        isDragging ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <GripVertical className="w-4 h-4" />
        {label}
      </div>
    </div>
  );
}
