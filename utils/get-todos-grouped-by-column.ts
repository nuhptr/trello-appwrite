import { databases } from '@/appwrite'

export const getTodosGrupedByColumn = async () => {
   const data = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
   )

   const todos = data.documents

   const columns = todos.reduce((previous, todo) => {
      if (!previous.get(todo.status)) {
         previous.set(todo.status, { id: todo.status, todos: [] })
      }

      previous.get(todo.status)!.todos.push({
         $id: todo.$id,
         $createdAt: todo.$createdAt,
         title: todo.title,
         status: todo.status,

         /**
          * If todo.image exists, parse it from a string to an object
          */
         ...(todo.image && { image: JSON.parse(todo.image) }),
      })

      return previous
   }, new Map<TypeColumn, Column>())

   /**
    * If a column is missing, add it to the columns map with an empty array of todoss
    */
   const columnTypes: TypeColumn[] = ['todo', 'inprogress', 'done']

   for (const columnType of columnTypes) {
      if (!columns.get(columnType)) {
         columns.set(columnType, { id: columnType, todos: [] })
      }
   }

   console.log(columns)

   /**
    * Sort columns by columnTypes
    * 1. todo first (index 0) then inprogress (index 1) then done (index 2)
    */
   const sortedColumns = new Map(
      Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
   )

   /**
    * Create a board object with the sorted columns and return it
    */
   const board: Board = { columns: sortedColumns }

   return board
}
