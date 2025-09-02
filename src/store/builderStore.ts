import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { FormSchema, ComponentNode } from "../components/builder/types"; // <-- import type (σημαντικό)

const uid = () => Math.random().toString(36).slice(2, 9);

export interface BuilderState {
  schema: FormSchema;
  selectedId?: string;
  setSchema: (s: FormSchema) => void;
  addRow: () => void;
  addComponentToRow: (rowId: string, comp: ComponentNode) => void;
  updateComponent: (id: string, patch: Partial<ComponentNode>) => void;
  removeComponent: (id: string) => void;
  select: (id?: string) => void;
  setColumns: (cols: number) => void;
}

const createStore: StateCreator<BuilderState> = (set, get) => ({
  schema: {
    id: "new",
    title: "Untitled Form",
    columns: 2,
    version: 1,
    rows: [{ id: uid(), components: [] }],
  },

  setSchema: (s) =>
    set(
      (): Partial<BuilderState> => ({
        schema: s,
      })
    ),

  addRow: () =>
    set(
      (st): Partial<BuilderState> => ({
        schema: {
          ...st.schema,
          rows: [...st.schema.rows, { id: uid(), components: [] }],
        },
      })
    ),

  addComponentToRow: (rowId, comp) =>
    set(
      (st): Partial<BuilderState> => ({
        schema: {
          ...st.schema,
          rows: st.schema.rows.map((r) =>
            r.id === rowId ? { ...r, components: [...r.components, comp] } : r
          ),
        },
      })
    ),

  updateComponent: (id, patch) =>
    set(
      (st): Partial<BuilderState> => ({
        schema: {
          ...st.schema,
          rows: st.schema.rows.map((r) => ({
            ...r,
            components: r.components.map((c) =>
              c.id === id ? ({ ...c, ...patch } as ComponentNode) : c
            ),
          })),
        },
      })
    ),

  removeComponent: (id) =>
    set(
      (st): Partial<BuilderState> => ({
        schema: {
          ...st.schema,
          rows: st.schema.rows.map((r) => ({
            ...r,
            components: r.components.filter((c) => c.id !== id),
          })),
        },
        selectedId: get().selectedId === id ? undefined : get().selectedId,
      })
    ),

  select: (id) =>
    set(
      (): Partial<BuilderState> => ({
        selectedId: id,
      })
    ),

  setColumns: (cols) =>
    set(
      (st): Partial<BuilderState> => ({
        schema: { ...st.schema, columns: cols },
      })
    ),
});

export const useBuilderStore = create<BuilderState>(createStore);
