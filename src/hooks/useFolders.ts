import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function useFolders() {
  const router = useRouter()

  const [files, setFiles] = useState('')
  const [fileName, setFileName] = useState('')

  const ctx = api.useContext()

  const allFolders = api.folders.getAll.useQuery()

  const deleteFolder = api.folders.deleteFolder.useMutation({
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
    onSuccess: () => {
      toast.success('files deleted successfully')
      void ctx.folders.getAll.invalidate()
    },
  })

  const deleteManyFolders = api.folders.deleteManyFolders.useMutation({
    onSuccess: () => {
      toast.success('files deleted successfully')
      void ctx.folders.getAll.invalidate()
    },
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
  })

  const createFolder = api.folders.createFolder.useMutation({
    onSuccess: () => {
      setFiles('')
      setFileName('')
      toast.success('file created successfully')
      void ctx.folders.getAll.invalidate()
      void router.replace({ pathname: '/', query: { folders: 'open' } })
    },
    onError: (err) => {
      // zod validation are been handled on form component so it's been ignored here
      if (err?.data?.zodError?.fieldErrors.name) {
        return
      }
      toast.error(err?.message)
    },
  })

  const updateFolderName = api.folders.updateFolderName.useMutation({
    onSuccess: () => {
      toast.success('file name updated')
      void ctx.folders.getAll.invalidate()
      void router.replace({ pathname: '/', query: { folders: 'open' } })
    },
    onError: (err) => {
      if (err?.shape?.message) {
        toast.error(err.shape.message)
      }
    },
  })

  return {
    states: { files, fileName, setFileName, setFiles },
    handlers: {
      allFolders,
      deleteFolder,
      deleteManyFolders,
      createFolder,
      updateFolderName,
    },
  }
}
