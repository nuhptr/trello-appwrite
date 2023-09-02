import { databases } from '@/appwrite';

export const getTodosGrupedByColumn = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
  );

  const todos = data.documents;

  const columns = todos.reduce((previous, todo) => {
    if (!previous.get(todo.status)) {
      previous.set(todo.status, { id: todo.status, todos: [] });
    }

    previous.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return previous;
  }, new Map<TypedColumn, Column>());

  // if columns doesnt have inprogress, todo and done add them with empty todos
  const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done'];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, { id: columnType, todos: [] });
    }
  }

  console.log(columns);

  // sort columns by column type
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) =>
        columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
