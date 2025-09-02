import PaletteItem from "../common/PaletteItem";

export default function Palette() {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Palette</div>
      <div className="grid grid-cols-2 gap-2">
        <PaletteItem
          id="text"
          label="Text"
          data={{ kind: "field", fieldType: "text", source: "palette" }}
        />
        <PaletteItem
          id="email"
          label="Email"
          data={{ kind: "field", fieldType: "email", source: "palette" }}
        />
        <PaletteItem
          id="number"
          label="Number"
          data={{ kind: "field", fieldType: "number", source: "palette" }}
        />
        <PaletteItem
          id="table"
          label="Table"
          data={{ kind: "table", source: "palette" }}
        />
        <PaletteItem
          id="button"
          label="Button"
          data={{ kind: "button", source: "palette" }}
        />
      </div>
    </div>
  );
}
