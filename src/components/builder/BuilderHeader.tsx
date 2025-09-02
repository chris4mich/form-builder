import { Eye, EyeOff } from "lucide-react";
import { useBuilderStore } from "../../store/builderStore";

export default function BuilderHeader({
  preview,
  setPreview,
}: {
  preview: boolean;
  setPreview: (v: boolean) => void;
}) {
  const schema = useBuilderStore((s) => s.schema);
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="text-lg font-semibold">{schema.title}</div>
      <button
        className="px-3 py-2 rounded-xl border hover:bg-gray-50 flex items-center gap-2"
        onClick={() => setPreview(!preview)}
      >
        {preview ? (
          <>
            <EyeOff className="w-4 h-4" /> Hide Preview
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" /> Show Preview
          </>
        )}
      </button>
    </div>
  );
}
