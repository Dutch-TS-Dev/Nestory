/* eslint-disable react/prop-types */
const Avatar = ({ name }) => {
  const colors = [
    "var(--colorPrimary)",
    "var(--colorTertiary)",
    "var(--colorSecondary)",
    "var(--pageBannerBGC)",
  ];

  // Function to generate a color based on the name (hash) and variation within predefined colors
  const generateColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Get a color index based on the hash and use a modulo operation to cycle through available colors
    const colorIndex = Math.abs(hash % colors.length);
    return colors[colorIndex];
  };

  const firstLetter = name?.charAt(0).toUpperCase();
  const backgroundColor = generateColorFromName(name);

  return (
    <div
      className="flex items-center justify-center rounded-full w-14 h-14 text-white font-bold text-2xl"
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {firstLetter || "N/A"}
    </div>
  );
};

export default Avatar;

// import tinycolor from "tinycolor2";

// const Avatar = ({ name }) => {
//   const baseColors = {
//     colorPrimary: "#0b3954",
//     colorTertiary: "#ee6352",
//     colorSecondary: "#ffb128",
//     pageBannerBGC: "#b4b4a8",
//   };

//   const generateColorFromName = (name) => {
//     let hash = 0;
//     for (let i = 0; i < name.length; i++) {
//       hash = name.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     const colorIndex = Math.abs(hash % Object.keys(baseColors).length);

//     // Uzima osnovnu boju iz palete
//     const colorKeys = Object.keys(baseColors);
//     const baseColor = baseColors[colorKeys[colorIndex]];

//     // Generišemo nijansu boje pomoću tinycolor2
//     const colorVariant = tinycolor(baseColor)
//       .lighten(5)
//       .desaturate(50)
//       .toString(); // Konvertuj u string boje (hex, rgb, ili rgba)

//     return colorVariant;
//   };

//   const firstLetter = name?.charAt(0).toUpperCase();
//   const backgroundColor = generateColorFromName(name);

//   return (
//     <div
//       className="flex items-center justify-center rounded-full w-14 h-14 text-white font-bold text-lg"
//       style={{
//         backgroundColor: backgroundColor,
//       }}
//     >
//       {firstLetter || "N/A"}
//     </div>
//   );
// };

// export default Avatar;
