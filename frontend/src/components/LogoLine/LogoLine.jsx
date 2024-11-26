/* eslint-disable react/prop-types */
// const LogoLine = () => {
//   return (
//     <div>
//       {/* linie mit logo in der mitte  */}
//       <div className="flex items-center justify-center my-8">
//         <div className="flex-grow border-t-2"></div>
//         <div className="flex items-center justify-center w-[8rem] h-[8rem] rounded-full mx-4">
//           {/* <p className="text-xs text-center">neSTory Furniture Design</p> */}

//           <img src="./images/logo/logo5.png" alt="logo" />
//         </div>
//         <div className="flex-grow border-t border-gray-300"></div>
//       </div>
//     </div>
//   );
// };

// export default LogoLine;

const LogoLine = ({ imageSrc, imageSize = "8rem" }) => {
  return (
    <div>
      {/* Line with logo in the center */}
      <div className="flex items-center justify-center my-8">
        <div className="flex-grow border-t-2"></div>
        <div
          className="flex items-center justify-center rounded-full mx-4"
          style={{ width: imageSize, height: imageSize }}
        >
          <img
            src={imageSrc}
            alt="logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
};

export default LogoLine;
