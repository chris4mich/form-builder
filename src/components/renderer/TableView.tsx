import type { TableComponent } from "../builder/types";

export default function TableView({ comp }: { comp: TableComponent }) {
  // Mock demo rows
  const rows = [
    { product: "Apples", qty: 2 },
    { product: "Bananas", qty: 5 },
  ];
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {comp.columns.map((c) => (
              <th
                key={c.id}
                className="text-left px-3 py-2 font-medium text-gray-600"
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {comp.columns.map((c) => (
                <td key={c.id} className="px-3 py-2">
                  {(row as any)[c.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
