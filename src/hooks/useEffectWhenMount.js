import { useCallback, useEffect } from 'react'

export default (effectFunction) => {
  const onExecuteEffectWhenMount = useCallback(() => {
    if (effectFunction) effectFunction()
  }, [effectFunction])

  useEffect(onExecuteEffectWhenMount, [])
}
