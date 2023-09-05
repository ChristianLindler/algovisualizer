import { setRef } from "@material-ui/core"

export const getArray = (size, max, min) => {
  if (size <= 0 || min >= max) {
    return []
  }

  const step = (max - min) / (size - 1)
  const array = []

  for (let i = 0; i < size; i++) {
    array.push(min + i * step)
  }
  return array
}

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const bubbleSort = async (array, setArray, setHighlighted, timeoutLength) => {
  for(let i = array.length - 1; i > 0; i--) {
    let numSwaps = 0
    for (let j = 0; j < i; j++) {
      setHighlighted([j, j + 1])
      await new Promise(resolve => setTimeout(resolve, timeoutLength))
      if (array[j] > array[j + 1]) {
        let tempVal = array[j + 1]
        array[j + 1] = array[j]
        array[j] = tempVal
        numSwaps++
      }
      setArray(array)
      await new Promise(resolve => setTimeout(resolve, timeoutLength))
      setHighlighted([])
    }
    if (numSwaps === 0) {
      return
    }
  }
}

export const insertionSort = async (array, setArray, setHighlighted, timeoutLength) => {
  for (let i = 1; i < array.length; i++) {
    let j = i - 1
    let tempVal = array[i]
    setHighlighted([i, j - 1])
    while (j >= 0 && array[j] > tempVal) {
        await new Promise(resolve => setTimeout(resolve, timeoutLength))
        array[j + 1] = array[j]
        j--
        setArray(array)
        await new Promise(resolve => setTimeout(resolve, timeoutLength))
        setHighlighted([])
    }
    array[j + 1] = tempVal
  }
}

const swap = (array, a, b) => {
  const temp = array[a]
  array[a] = array[b]
  array[b] = temp
}

const partition = async (array, left, right, setArray, setHighlighted, timeoutLength) => {
  const pivot = array[Math.floor((right + left) / 2)]
  let i = left
  let j = right

  while (i <= j) {
    while (array[i] < pivot) {
      i++
    }
    while (array[j] > pivot) {
      j--
    }
    setHighlighted([i, j])
    await new Promise((resolve) => setTimeout(resolve, timeoutLength))
    if (i <= j) {
      swap(array, i, j)
      i++
      j--
      setArray([...array]) // Update the array state
    }
  }
  return i
}

export const quickSort = async (
  array,
  left,
  right,
  setArray,
  setHighlighted,
  timeoutLength
) => {
  if (left < right) {
    const index = await partition(array, left, right, setArray, setHighlighted, timeoutLength)
    setHighlighted([index])
    await new Promise((resolve) => setTimeout(resolve, timeoutLength))

    await quickSort(array, left, index - 1, setArray, setHighlighted, timeoutLength)
    await quickSort(array, index, right, setArray, setHighlighted, timeoutLength)
  }

  setHighlighted([])
}