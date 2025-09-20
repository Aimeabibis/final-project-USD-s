import { Pencil, Trash } from "lucide-react";

export interface Column<T> {
  key: keyof T;
  label: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (id: string) => void;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  return (
    <table className="w-full  border-collapse bg-white dark:bg-gray-800 rounded-lg shadow">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          {columns.map((col) => (
            <th key={col.key as string} className="p-3 text-left">
              {col.label}
            </th>
          ))}
          {(onEdit || onDelete) && <th className="p-3 text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="border-t dark:border-gray-700">
            {columns.map((col) => (
              <td key={col.key as string} className="p-3">
                {String(row[col.key])}
              </td>
            ))}
            {(onEdit || onDelete) && (
              <td className="p-3 flex gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg cursor-pointer"
                  >
                    <Pencil size={20} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(row.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg cursor-pointer"
                  >
                    <Trash size={20} />
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
