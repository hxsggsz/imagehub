import { useState, useRef, type Dispatch, type SetStateAction } from 'react'

export function useLongPress(
  id: string,
  folderList: string[],
  setFolderList: Dispatch<SetStateAction<string[]>>,
) {
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
    const findFolderId = folderList.find((folderId) => folderId === id)
    const deleteThisFolderFromList = folderList.filter(
      (folderId) => folderId !== id,
    )

    if (folderList.length > 0) {
      if (findFolderId) {
        setFolderList(deleteThisFolderFromList)
        return
      }
      setFolderList((prev) => [...prev, id])
      return
    }

    if (isLongPress.current) {
      setFolderList((prev) => [...prev, id])
      return
    }
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
    event,
    handlers: {
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  }
}
