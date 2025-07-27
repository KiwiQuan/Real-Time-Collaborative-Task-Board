import { useState } from "react";

export function useHello() {
  const [msg] = useState("Hello from  hook!");
  return msg;
}
