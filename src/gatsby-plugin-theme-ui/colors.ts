import prism from "./prism";

export const colors = {
  prism,
  primary: "#000",
  secondary: "#73737D",
  grey: "#73737D",
  background: "#fff",
  accent: "#6166DC",
  hover: "rgba(0, 0, 0, 0.07)",
  gradient: "linear-gradient(180deg, rgba(217, 219, 224, 0) 0%, #D9DBE0 100%)",
  articleText: "#08080B",
  track: "rgba(8, 8, 11, 0.3)",
  progress: "#000",
  card: "#fff",
  horizontalRule: "rgba(8, 8, 11, 0.15)",
  modes: {
    dark: {
      grey: "#73737D",
      primary: "#fff",
      secondary: "#fff",
      accent: "#E9DAAC",
      background: "#111216",
      hover: "rgba(255, 255, 255, 0.07)",
      gradient:
        "linear-gradient(180deg, #111216 0%, rgba(66, 81, 98, 0.36) 100%)",
      articleText: "#fff",
      track: "rgba(255,255,255, 0.3)",
      progress: "#fff",
      card: "#1D2128",
      horizontalRule: "rgba(255,255,255, 0.15)",
    },
  },
};

export type ColorKeys = keyof typeof colors
