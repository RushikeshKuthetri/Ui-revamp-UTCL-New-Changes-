import { CentralTableBody } from "./CentralTableBody";

export const CentralTable = () => {
  const borderCellClass = "!border !border-[var(--form-border)]";
  const headerCellClass = `${borderCellClass} !bg-[#b5e6a2] !text-center`;

  return (
    <table className="table cd_table !border !border-[var(--form-border)] !border-collapse">
      <thead>
        <tr>
          <th scope="col" colSpan="3" className={borderCellClass}></th>
          <th scope="col" colSpan="4" className={headerCellClass}>
            Kiln (TPH / day(s))
          </th>
          <th scope="col" colSpan="6" className={headerCellClass}>
            Cement Mill (TPH / day(s))
          </th>
        </tr>
        <tr>
          <th className={headerCellClass}>Zone</th>
          <th className={headerCellClass}>Type</th>
          <th className={`${headerCellClass} plant_name`}>Plant</th>
          <th className={headerCellClass}>
            <div>Kiln 1</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Kiln 2</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Kiln 3</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Kiln 4</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Mill 1</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Mill 2</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Mill 3</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Mill 4</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Mill 5</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
          <th className={headerCellClass}>
            <div>Mill 6</div>
            {/* <div>TPH / day(s)</div> */}
          </th>
        </tr>
      </thead>
      <CentralTableBody />
    </table>
  );
};
