export type FieldType =
  | "text"
  | "number"
  | "email"
  | "date"
  | "select"
  | "checkbox";

export interface FieldComponent {
  id: string;
  kind: "field";
  fieldType: FieldType;
  name: string;
  label: string;
  width?: number;
}

export interface ButtonComponent {
  id: string;
  kind: "button";
  label: string;
  variant?: "primary" | "outline" | "ghost";
  width?: number;
  action: { type: "submit" };
}

export interface TableColumn {
  id: string;
  fieldType: FieldType;
  name: string;
  label: string;
}

export interface TableComponent {
  id: string;
  kind: "table";
  name: string;
  columns: TableColumn[];
  width?: number;
}

export type ComponentNode = FieldComponent | ButtonComponent | TableComponent;

export interface Row {
  id: string;
  components: ComponentNode[];
}

export interface FormSchema {
  id: string;
  title: string;
  columns: number;
  rows: Row[];
  version: number;
}
