export interface Todo {
  id?: string; // Optional because Firebase will generate the ID for us
  title: string;
  status: boolean;
}
