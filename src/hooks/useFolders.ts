import { api } from '@/utils/api'
import { useRouter } from 'next/router'
import { useState } from 'react'

export function useFolders() {
  const router = useRouter()

  const [files, setFiles] = useState('')
  const [fileName, setFileName] = useState('')

  const ctx = api.useContext()

  const allFolders = api.folders.getAll.useQuery()

  const deleteFolder = api.folders.deleteFolder.useMutation({
    onSuccess: () => ctx.folders.getAll.invalidate(),
  })

  const deleteManyFolders = api.folders.deleteManyFolders.useMutation({
    onSuccess: () => ctx.folders.getAll.invalidate(),
  })

  const createFolder = api.folders.createFolder.useMutation({
    onSuccess: () => {
      setFiles('')
      setFileName('')
      void ctx.folders.getAll.invalidate()
      void router.replace({ pathname: '/', query: { folders: 'open' } })
    },
  })

  const updateFolderName = api.folders.updateFolderName.useMutation({
    onSuccess: () => {
      void ctx.folders.getAll.invalidate()
      void router.replace({ pathname: '/', query: { folders: 'open' } })
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
