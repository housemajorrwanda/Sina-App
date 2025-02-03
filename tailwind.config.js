/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
     
        colors: {
          primary: "#93BD68",
          secondary: "#2B6128",
          third:"#F1A10C",
          muted_text:'#7A7A7A',
        pomme_green:'#93BD68',
        dark_green:'#2B6128',
        bg_second:'#D9D9D9',
        icon_color:'#F1A10C'
          
        }
     
    },
  },
  plugins: [],
}