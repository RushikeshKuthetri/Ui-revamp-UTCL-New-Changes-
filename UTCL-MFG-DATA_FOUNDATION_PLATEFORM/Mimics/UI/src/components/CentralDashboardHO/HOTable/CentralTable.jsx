// import { CentralTableBody } from "./CentralTableBody";

// export const CentralTable = () => {
//   return (
//     <table className="table cd_table">
//       <thead>
//         <tr>
//           <th scope="col" colSpan="3"></th>
//           <th scope="col" colSpan="4" className="th_bg">
//             Kiln (TPH / day(s))
//           </th>
//           <th scope="col" colSpan="6" className="th_bg">
//             Cement Mill (TPH / day(s))
//           </th>
//         </tr>
//         <tr>
//           <th className="th_bg">Zone</th>
//           <th className="th_bg">Type</th>
//           <th className="th_bg plant_name">Plant</th>
//           <th className="th_bg">
//             <div>Kiln 1</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Kiln 2</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Kiln 3</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Kiln 4</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Mill 1</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Mill 2</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Mill 3</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Mill 4</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Mill 5</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//           <th className="th_bg">
//             <div>Mill 6</div>
//             {/* <div>TPH / day(s)</div> */}
//           </th>
//         </tr>
//       </thead>
//       <CentralTableBody />
//     </table>
//   );
// };




import { CentralTableBody } from "./CentralTableBody";

export const CentralTable = () => {
  const borderCellClass = "!border !border-[var(--form-border)] px-1.5 py-1 text-left";
  const headerCellClass = `${borderCellClass} bg-gradient-to-r from-orange-400 to-orange-300 text-[#111111]`;

  return (
    <table className="w-full table-fixed text-[var(--text-color)] !border !border-[var(--form-border)] !border-collapse">

      <thead className="bg-[var(--bg-header)] text-[var(--header-text-color)]">

        <tr >
          <th colSpan="3" className={borderCellClass}></th>

          <th colSpan="4" className={`${headerCellClass} text-sm`}>
            Kiln (TPH / day(s))
          </th>

          <th colSpan="6" className={headerCellClass}>
            Cement Mill (TPH / day(s))
          </th>
        </tr>

        <tr className="bg-gradient-to-r from-orange-400 to-orange-300 text-[#111111]">
          <th className={`${borderCellClass} `}>
            Zone
          </th>
          <th className={`${borderCellClass}`}>
            Type
          </th>
          <th className={`${borderCellClass}`}>
            Plant
          </th>

          {[
            "Kiln 1", "Kiln 2", "Kiln 3", "Kiln 4",
            "Mill 1", "Mill 2", "Mill 3", "Mill 4", "Mill 5", "Mill 6"
          ].map((item, i) => (
            <th
              key={i}
              className={`${borderCellClass} px-3 py-1 text-center`}
            >
              {item}
            </th>
          ))}
        </tr>

      </thead>

      <CentralTableBody />
    </table>
  );
};
