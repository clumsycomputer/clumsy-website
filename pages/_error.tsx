import { useEffect } from "react";

export default function ErrorPage() {
  useEffect(() => {
    window.location.href = window.location.origin;
  }, []);
}
