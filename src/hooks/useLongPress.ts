import { useState, useRef, type Dispatch, type SetStateAction } from 'react'
import { useRouter } from 'next/router'

export function useLongPress(
  id: string,
  folderList: string[],
  setFolderList: Dispatch<SetStateAction<string[]>>,
) {
  const router = useRouter()
  const [event, setEvent] = useState('')

  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const isLongPress = useRef(false)

  function startPressTimer() {
    isLongPress.current = false
    timerRef.current = setTimeout(() => {
      isLongPress.current = true
      setEvent('longpress')
    }, 250)
  }

  // if click the user is redirect, if is long press, update folder list
  function handleOnClick() {
    if (isLongPress.current) {
      // todo: remove the user if long pres when id is in the list
      const findFolderId = folderList.find((folderId) => folderId === id)
      if (findFolderId) {
        const deleteThisFolderFromList = folderList.filter(
          (folderId) => folderId !== id,
        )
        setFolderList(deleteThisFolderFromList)
        return
      }
      setFolderList((prev) => [...prev, id])
      return
    }
    void router.replace({ pathname: '/', query: { new: 'open' } })
    setEvent('click')
  }

  function handleOnMouseDown() {
    startPressTimer()
  }

  function handleOnMouseUp() {
    clearTimeout(timerRef.current)
  }

  function handleOnTouchStart() {
    startPressTimer()
  }

  function handleOnTouchEnd() {
    if (event === 'longpress') return
    clearTimeout(timerRef.current)
  }

  return {
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  }
}
