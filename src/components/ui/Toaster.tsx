"use client";

import { createContext, useContext, useState } from "react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToasterContextType {
  toasts: Toast[];
  addToast: (message: string, type: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export function ToasterProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast["type"]) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error("useToaster must be used within a ToasterProvider");
  }
  return context;
}

export function Toaster() {
  const { toasts, removeToast } = useToaster();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg max-w-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          <div className="flex justify-between items-center">
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
