import { useEffect, useCallback } from "react";

export function useClickOutsideToClose<T>(
  setIsOpen: (arg: boolean) => void,
  ...refsToIgnore: React.RefObject<T>[]
) {
  const close = useCallback(
    (e: MouseEvent) => {
      const shouldIgnore = refsToIgnore.some((el) => el.current === e.target);
      if (shouldIgnore) return;
      setIsOpen(false);
    },
    [setIsOpen, refsToIgnore]
  );

  useEffect(() => {
    document.body.addEventListener("click", close);

    return () => document.body.removeEventListener("click", close);
  }, [close]);
}
