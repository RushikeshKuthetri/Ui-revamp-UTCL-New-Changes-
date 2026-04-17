// export const MillRunningStatusTable = ({ section, data }) => {
//   const { running, stopped, unreachable, total } = data;
//   return (
//     <div className="table-responsive col-6">
//       <table className="table cd_table fix-table">
//         <thead>
//           <tr>
//             <th></th>
//             <th className="th_bg">Running</th>
//             <th className="th_bg">Stopped</th>
//             <th className="th_bg">Not Reachable</th>
//             <th className="th_bg">Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{section}</td>
//             <td>{running}</td>
//             <td>{stopped}</td>
//             <td>{unreachable}</td>
//             <td>{total}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };






export const MillRunningStatusTable = ({ section, data }) => {
  const { running, stopped, unreachable, total } = data;
  const borderCellClass = "!border !border-[var(--form-border)]";
  const headerCellClass = `${borderCellClass} bg-gradient-to-r from-orange-400 to-orange-300 text-black`;

  return (
    <div className="table-responsive col-6">
      <table className="!border !border-[var(--form-border)] !border-collapse">
        <thead>
          <tr>
            <th className={borderCellClass}></th>
            <th className={headerCellClass}>Running</th>
            <th className={headerCellClass}>Stopped</th>
            <th className={headerCellClass}>Not Reachable</th>
            <th className={headerCellClass}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={borderCellClass}>{section}</td>
            <td className={borderCellClass}>{running}</td>
            <td className={borderCellClass}>{stopped}</td>
            <td className={borderCellClass}>{unreachable}</td>
            <td className={borderCellClass}>{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
