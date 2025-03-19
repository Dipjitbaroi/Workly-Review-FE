export type DateString = string;

type Column<T> = {
  accessorKey: keyof T; // Ensures the accessorKey is a valid key of the generic type T
  header: string;
};

export type TableColumns<T> = Column<T>[];
