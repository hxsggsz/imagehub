import { api } from '@/utils/api'
import toast from 'react-hot-toast'

export function useFiles(folderId: string | undefined) {
  const ctx = api.useContext()
  const allFiles = api.files.getAll.useQuery({ id: folderId! })
  const createFile = api.files.newFile.useMutation({
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
    onSuccess: () => {
      toast.success('image added successfully')
      void ctx.files.getAll.invalidate()
    },
  })
  const deleteFile = api.files.deleteFile.useMutation({
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
    onSuccess: () => {
      toast.success('image deleted successfully')
      void ctx.files.getAll.invalidate()
    },
  })

  const deleteAllFiles = api.files.deleteManyFiles.useMutation({
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
    onSuccess: () => {
      toast.success('all images deleted successfully')
      void ctx.files.getAll.invalidate()
    },
  })

  return {
    handlers: {
      allFiles,
      createFile,
      deleteFile,
      deleteAllFiles,
    },
  }
}
