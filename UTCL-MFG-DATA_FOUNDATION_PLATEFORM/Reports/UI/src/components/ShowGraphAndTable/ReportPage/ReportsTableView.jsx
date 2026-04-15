// import { useDispatch, useSelector } from "react-redux";

// export const ReportsTableView = () => {
//     const reportsProvider = useSelector((state) => state.reportsProvider);
//     const reportsData = reportsProvider?.reportsData?.reportsData || {};
//     const isSwapped = useSelector(
//         (state) => state.reportsProvider.isSwapped
//     );

//     const columns = reportsData?.columns || [];
//     const rows = reportsData?.rows || [];
//     const statsRows = reportsData?.statsRows || [];


//     // ✅ format timestamp
//     const formatTime = (ts) => {
//         if (!ts) return "";
//         const date = new Date(ts);

//         const day = String(date.getUTCDate()).padStart(2, "0");
//         const month = String(date.getUTCMonth() + 1).padStart(2, "0");
//         const year = date.getUTCFullYear();

//         const hours = String(date.getUTCHours()).padStart(2, "0");
//         const minutes = String(date.getUTCMinutes()).padStart(2, "0");

//         return `${day}-${month}-${year} ${hours}:${minutes}`;
//     };

//     // ✅ format tag nicely
//     const formatTag = (tag) => {
//         return tag
//             ?.replace(/_/g, " ")
//             ?.replace(/\b\w/g, (c) => c.toUpperCase());
//     };

//     // ✅ swapped logic
//     const getSwappedData = () => {
//         if (!rows.length) return { columns: [], rows: [] };

//         const timeColumns = rows.map((r) => formatTime(r.timestamp));
//         const tagColumns = columns.filter((c) => c !== "timestamp");

//         const newRows = tagColumns.map((tag) => {
//             const rowObj = { tagUID: formatTag(tag) };

//             rows.forEach((r) => {
//                 const formattedTime = formatTime(r.timestamp);
//                 rowObj[formattedTime] = r[tag];
//             });

//             return rowObj;
//         });

//         return {
//             columns: ["tagUID", ...timeColumns],
//             rows: newRows,
//         };
//     };

//     const displayData = isSwapped
//         ? getSwappedData()
//         : { columns, rows };

//     const displayColumns = displayData.columns;
//     const displayRows = displayData.rows;

//     if (!rows.length) {
//         return (
//             <div className="text-center text-gray-400 p-4 text-sm">
//                 No data available
//             </div>
//         );
//     }

//     return (
//         <div className="w-full min-h-0 pt-1">
//             <div className="w-full md:w-[95vw] lg:w-[89vw] max-w-full h-[calc(100vh-270px)] min-h-[300px] overflow-auto custom-scroll relative">

//                 <table className="border-collapse w-max min-w-max text-[10px] text-theme">

//                     {/* HEADER */}
//                     <thead className="sticky top-0 z-50 bg-theme text-theme">
//                         <tr>
//                             {displayColumns.map((col, i) => (
//                                 <th
//                                     key={i}
//                                     title={col}
//                                     className={`border border-theme px-1 py-1 text-center w-[80px] max-w-[80px] text-[9px] break-all bg-[var(--submit-button-bg)] !text-black sticky top-0

//                                     ${i === 0 ? "left-0 z-50 min-w-[180px]" : ""}`}
//                                 >
//                                     {col === "timestamp" ? "TimeStamp" : col}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>

//                     {/* BODY */}
//                     <tbody>
//                         {displayRows.map((row, rowIndex) => (
//                             <tr key={rowIndex} className="hover:bg-theme-alt">

//                                 {displayColumns.map((col, colIndex) => (
//                                     <td
//                                         key={colIndex}
//                                         className={`border border-theme px-1 py-2 text-center min-w-[75px] break-words
//                                         ${colIndex === 0
//                                                 ? "sticky left-0 z-40 bg-[var(--card-bg)] text-left min-w-[250px]"
//                                                 : ""}`}
//                                     >
//                                         {col === "timestamp"
//                                             ? formatTime(row[col])
//                                             : row[col] ?? "NA"}
//                                     </td>
//                                 ))}

//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>
//         </div>
//     );
// };







import { useSelector } from "react-redux";

export const ReportsTableView = () => {
    const reportsProvider = useSelector((state) => state.reportsProvider);
    const reportsData = reportsProvider?.reportsData?.reportsData || {};
    const isSwapped = useSelector(
        (state) => state.reportsProvider.isSwapped
    );

    const columns = reportsData?.columns || [];
    const rows = reportsData?.rows || [];
    const statsRows = reportsData?.statsRows || [];

    // ✅ convert statsRows → map (trim fix)
    const statsMap = {};
    statsRows.forEach((s) => {
        statsMap[s.tagUID.trim()] = s;
    });

    // ✅ format timestamp
    const formatTime = (ts) => {
        if (!ts) return "";
        const date = new Date(ts);

        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();

        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");

        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };

    // ✅ format tag (kept but NOT used for tagUID now)
    const formatTag = (tag) => {
        return tag
            ?.replace(/_/g, " ")
            ?.replace(/\b\w/g, (c) => c.toUpperCase());
    };

    // ✅ swapped logic (FIXED tagUID)
    const getSwappedData = () => {
        if (!rows.length) return { columns: [], rows: [] };

        const timeColumns = rows.map((r) => formatTime(r.timestamp));
        const tagColumns = columns.filter((c) => c !== "timestamp");

        const newRows = tagColumns.map((tag) => {
            const stat = statsMap[tag] || {};

            const rowObj = {
                tagUID: tag, // ✅ FIX: keep original (no formatting)

                min: stat.min ?? "NA",
                max: stat.max ?? "NA",
                std: stat.std ?? "NA",
                avg: stat.avg ?? "NA",
                count: stat.count ?? "NA",
            };

            rows.forEach((r) => {
                const formattedTime = formatTime(r.timestamp);
                rowObj[formattedTime] = r[tag];
            });

            return rowObj;
        });

        return {
            columns: [
                "tagUID",
                "min",
                "max",
                "std",
                "avg",
                "count",
                ...timeColumns,
            ],
            rows: newRows,
        };
    };

    const displayData = isSwapped
        ? getSwappedData()
        : { columns, rows };

    const displayColumns = displayData.columns;
    const displayRows = displayData.rows;

    if (!rows.length) {
        return (
            <div className="text-center text-gray-400 p-4 text-sm">
                No data available
            </div>
        );
    }

    return (
        <div className="w-full min-h-0 pt-1">
            <div className="w-full md:w-[95vw] lg:w-[89vw] max-w-full h-[calc(100vh-255px)] min-h-[300px] overflow-auto custom-scroll relative">

                <table className="border-collapse w-max min-w-max text-[10px] text-theme">

                    {/* HEADER */}
                    <thead className="sticky top-0 z-50 bg-theme text-theme">
                        <tr>
                            {displayColumns.map((col, i) => (
                                <th
                                    key={i}
                                    title={col}
                                    className={`border border-theme px-1 py-1 text-center w-[80px] max-w-[80px] text-[9px] break-all bg-[var(--submit-button-bg)] !text-black sticky top-0
                                    ${i === 0 ? "left-0 z-50 min-w-[180px]" : ""}`}
                                >
                                    {col === "timestamp" ? "TimeStamp" : col.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                        {/* 🔹 NORMAL DATA */}
                        {displayRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-theme-alt">
                                {displayColumns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`border border-theme px-1 py-2 text-center min-w-[75px] break-words
                                        ${colIndex === 0
                                                ? "sticky left-0 z-40 bg-[var(--card-bg)] text-left min-w-[250px]"
                                                : ""}`}
                                    >
                                        {col === "timestamp"
                                            ? formatTime(row[col])
                                            : row[col] ?? "NA"}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* 🔹 STATS (FIXED mapping) */}
                        {!isSwapped &&
                            ["avg", "min", "max", "std", "count"].map((statKey) => (
                                <tr key={statKey} className="bg-[var(--card-bg)] font-semibold">
                                    {displayColumns.map((col, colIndex) => {
                                        if (colIndex === 0) {
                                            return (
                                                <td
                                                    key={colIndex}
                                                    className="sticky left-0 z-40 bg-[var(--card-bg)] text-center px-2"
                                                >
                                                    {statKey.toUpperCase()}
                                                </td>
                                            );
                                        }

                                        // ✅ FIX: correct mapping
                                        const stat =
                                            statsMap[col?.trim()] ||
                                            statsMap[columns[colIndex]?.trim()];

                                        return (
                                            <td key={colIndex} className="text-center">
                                                {stat ? stat[statKey] : "NA"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};