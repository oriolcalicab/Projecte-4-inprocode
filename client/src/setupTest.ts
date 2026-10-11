import "@testing-library/jest-dom/vitest";import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Esborra el que ha renderitzat cada test abans de passar al següent
afterEach(() => {
  cleanup();
});