export type ITodos = {
  name: string;
  status: string;
};

export type ITodoFilterRequest = {
  search?: string;
};

// for search
export const TodoSearchAbleFields = ['name', 'status'];

// for filter
export const TodoFilterAbleFields = ['search', 'name', 'status'];


