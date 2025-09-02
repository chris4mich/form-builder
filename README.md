# React Form Builder (Drag & Drop)

A modular **form builder** built with **React + TypeScript**, featuring drag-and-drop editing (via `@dnd-kit/core`) and live preview rendering with validation (`react-hook-form` + `zod`).  

This project is structured into two main modules:
- **Builder Module** → Palette, Canvas, Inspector for designing forms visually
- **Renderer Module** → Runtime rendering of forms with validation and mock table support

---

## ✨ Features

- 🖱️ **Drag & Drop editor** to build forms dynamically  
- 🎨 **Palette** of components (text, email, number, date, checkbox, table, button)  
- 📐 **Canvas** with rows/columns layout (configurable grid system)  
- ⚙️ **Inspector** for editing component properties (label, name, type, width, etc.)  
- 👀 **Live Preview** mode using the same schema  
- ✅ **Validation** powered by `zod` + `react-hook-form`  
- 📦 **Zustand store** for state management  
- 🧩 **Modular architecture** (builder, renderer, common)

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite** (bundler)
- **Zustand** (state management)
- **@dnd-kit/core** (drag & drop)
- **react-hook-form** + **zod** (form handling & validation)
- **Tailwind CSS** (styling)

---

