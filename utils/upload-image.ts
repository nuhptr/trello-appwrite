import { ID, storage } from "@/appwrite"

export default async function uploadImage(file: File) {
   if (!file) return

   const fileUploaded = await storage.createFile("64c8baf3f3e1ba2ef49d", ID.unique(), file)

   return fileUploaded
}
