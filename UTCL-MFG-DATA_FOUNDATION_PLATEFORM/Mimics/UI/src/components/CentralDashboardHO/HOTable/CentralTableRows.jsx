import { CMTableRow, KilnTableRow } from "../index";
export const CentralTableRows = ({ value, lengthCondition }) => {
  const borderCellClass = "!border !border-[var(--form-border)] text-wrap px-1.5";

  return (
    <tr className={lengthCondition ? "cluster-last-row" : ""}>
      <th scope="row" className={borderCellClass}>{value.Cluster}</th>
      <th scope="row" className={borderCellClass}>{value.Type}</th>
      <th scope="row" className={borderCellClass}>{value.Plant_Full_Name}</th>
      <td className={`text-center ${borderCellClass}`}>
        {value["Kiln-1"]?.tagName ? (
          <KilnTableRow
            tagname={value["Kiln-1"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Kiln-1"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Kiln-2"]?.tagName ? (
          <KilnTableRow
            tagname={value["Kiln-2"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Kiln-2"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Kiln-3"]?.tagName ? (
          <KilnTableRow
            tagname={value["Kiln-3"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Kiln-3"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Kiln-4"]?.tagName ? (
          <KilnTableRow
            tagname={value["Kiln-4"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Kiln-4"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Cement Mill-1"]?.tagName ? (
          <CMTableRow
            tagname={value["Cement Mill-1"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Cement Mill-1"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Cement Mill-2"]?.tagName ? (
          <CMTableRow
            tagname={value["Cement Mill-2"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Cement Mill-2"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Cement Mill-3"]?.tagName ? (
          <CMTableRow
            tagname={value["Cement Mill-3"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Cement Mill-3"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Cement Mill-4"]?.tagName ? (
          <CMTableRow
            tagname={value["Cement Mill-4"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Cement Mill-4"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Cement Mill-5"]?.tagName ? (
          <CMTableRow
            tagname={value["Cement Mill-5"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Cement Mill-5"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
      <td className={`text-center ${borderCellClass}`}>
        {value["Cement Mill-6"]?.tagName ? (
          <CMTableRow
            tagname={value["Cement Mill-6"].tagName}
            plant={value["Generic Code"]}
            taguid={value["Cement Mill-6"].tagUid}
          />
        ) : (
          <div></div>
        )}
      </td>
    </tr>
  );
};
