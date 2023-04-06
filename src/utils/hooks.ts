import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    const pervTitle = document.title;
    document.title = title;
    return () => {
      document.title = pervTitle;
    };
  });
}
