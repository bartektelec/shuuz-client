module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      logo: ["Princess Sofia", "serif"],
      sans: ["Raleway", "sans-serif"],
      price: ["Roboto", "sans-serif"]
    },
    extend: {
      borderRadius: {
        DEFAULT: ".25rem"
      },
      container: {
        center: true,
        padding: "1rem"
      },
      zIndex: {
        "-1": "-1",
        "-10": "-10"
      },
      translate: {
        hide: "-200%"
      },
      minHeight: {
        hero: "320px",
        summary: "calc(100vh - 15rem)"
      },
      colors: {
        primary: {
          light: "#EBF4FF",
          DEFAULT: "#3D81F5",
          dark: "#1450B8",
          darker: "#1451B8"
        },
        secondary: {
          light: "#FFFAF0",
          DEFAULT: "#F5AB3D",
          dark: "#C2620A"
        },
        dark: {
          DEFAULT: "#333333",
          light: "#555555",
          lightest: "#777777"
        },
        light: {
          dark: "#aaaaaa",
          DEFAULT: "#CCCCCC",
          light: "#fefefe"
        },
        background: {
          dark: "#4A5568",
          light: "#F7FAFC"
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
