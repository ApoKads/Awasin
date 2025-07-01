/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // Definisikan nama kustom Anda di sini
        // Sesuaikan nama fontFamily dengan yang Anda muat di _layout.js
        poppins: ['Poppins_400Regular'], // Default Poppins
        'poppins-light': ['Poppins_300Light'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'], // Untuk bold
        'poppins-extrabold': ['Poppins_800ExtraBold'],
        'poppins-black': ['Poppins_900Black'],
        // Tambahkan varian lain jika Anda mengimpornya
      },
    },
  },
  plugins: [],
}