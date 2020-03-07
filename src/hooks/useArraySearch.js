import { useState, useMemo, useCallback } from 'react'
import useStopTypingCallback from './useStopTypingCallback'

export default ({
  list = [],
  isItemsObjects = true,
  keysToFilter = [],
  formatTexts = null,
}) => {
  const [searchText, setSearchText] = useState('')
  const [lastSearchedText, setLastSearchedText] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const onStartTyping = useCallback(() => {
    setIsSearching(true)
  }, [])

  const onStopTyping = useCallback((text) => {
    setIsSearching(false)
    setLastSearchedText(text)
  }, [])

  const onChangeSearchText = useStopTypingCallback({
    onSetText: setSearchText,
    onStartTyping,
    onStopTyping,
  })

  const itemsToShow = useMemo(() => {
    if (!list) return []

    return list.filter((item) => {
      if (!lastSearchedText || !lastSearchedText.trim()) return true

      if (!isItemsObjects) {
        return item.includes(lastSearchedText.toLowerCase())
      }

      const textArray = []

      keysToFilter.forEach((key) => {
        let text = item[key]

        if (formatTexts) {
          const formtFunction = formatTexts[key]
          if (formtFunction) text = formtFunction(text)
        }

        textArray.push(text)
      })

      return textArray
        .join(' ')
        .toLowerCase()
        .includes(lastSearchedText.toLowerCase())
    })
  }, [list, lastSearchedText, isItemsObjects, keysToFilter, formatTexts])

  const isShowingSearchedItems = useMemo(() => {
    const hasSearchText = searchText && searchText.trim()

    return !!(
      hasSearchText ||
      itemsToShow.length !== list.length ||
      isSearching
    )
  }, [isSearching, itemsToShow.length, list.length, searchText])

  return {
    itemsToShow,
    onChangeSearchText,
    isSearching,
    setIsSearching,
    searchText,
    setSearchText,
    lastSearchedText,
    setLastSearchedText,
    isShowingSearchedItems,
  }
}
