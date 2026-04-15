import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./ReportsNavbar.css"



const QUICK_RANGES = [
  { key: "1D", label: "1D", value: { days: 1 } },
  { key: "2D", label: "2D", value: { days: 2 } },
  { key: "3D", label: "3D", value: { days: 3 } },
  { key: "5D", label: "5D", value: { days: 5 } },
  { key: "1W", label: "1W", value: { weeks: 1 } },
  { key: "1M", label: "1M", value: { months: 1 } },
];

const ReportsNavbar = () => {
  const dispatch = useDispatch();
  const reportsProvider = useSelector((state) => state.reportsProvider);
  const isSwapped = useSelector((state) => state.reportsProvider.isSwapped);
  const quickRange = reportsProvider.quickRange;
  const [loading, setLoading] = useState(false);
  const [manualDays, setManualDays] = useState("");
  const [isApplyingRange, setIsApplyingRange] = useState(false);



  //    QUICK RANGE HANDLER
  const handleQuickRange = (range) => {
    dispatch({
      type: "SET_QUICK_RANGE",
      payload: {
        ...range.value,
        key: range.key,
        _ts: Date.now(),
      },
    });
  };


  const handleManualDaysApply = async () => {
    const days = Number(manualDays);

    if (!days || days <= 0) {
      toast.error("Please enter valid number of days");
      return;
    }

    try {
      setIsApplyingRange(true);

      dispatch({
        type: "SET_QUICK_RANGE",
        payload: {
          days,
          key: "MANUAL_DAYS",
          label: `${days}D`,
          _ts: Date.now(),
        },
      });
    } finally {
      // allow Redux + effects to settle
      setManualDays("")
      setTimeout(() => setIsApplyingRange(false), 220);
    }
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "35px",
      height: "35px",
      border: `1px solid ${state.isFocused ? "var(--picker-accent)" : "var(--input-enable-border)"
        }`,
      borderRadius: "8px",
      backgroundColor: "var(--input-enable-bg)",
      fontSize: "13px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--picker-accent)",
      },
    }),

    indicatorSeparator: () => ({
      display: "none", // ← removes the vertical line
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 6px",
      height: "35px",
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: "35px",
    }),

    menu: (base) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      backgroundColor: "var(--input-enable-bg)",
      borderRadius: "8px",
      zIndex: 9999,
    }),

    option: (base, state) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      backgroundColor: state.isSelected
        ? "var(--picker-accent)"
        : state.isFocused
          ? "var(--picker-hover)"
          : "transparent",
      color: state.isSelected ? "#fff" : "var(--text-color)",
      cursor: "pointer",
      fontSize: "13px",
    }),

    multiValue: (base) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      backgroundColor: "var(--picker-hover)",
      borderRadius: "6px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      color: "var(--text-color)",
      fontSize: "12px",
    }),

    multiValueRemove: (base) => ({
      ...base,
      color: "var(--text-color)",
      ":hover": {
        backgroundColor: "var(--picker-accent)",
        color: "#fff",
      },
    }),

    singleValue: (base) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      color: "var(--text-color)",
    }),

    input: (base) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      color: "var(--text-color)",
    }),

    placeholder: (base) => ({
      ...base,
      fontFamily: "Inter, sans-serif",
      color: "var(--card-subtle)",
      fontSize: "12px",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: 170,
      overflowY: "auto",
    }),
  };


  return (
    // <div className="d-flex justify-content-between mb-2 gap-2 flex-wrap">

    <div className="flex align-items-center my-1 gap-3 w-full">
      {" "}
      {/* LEFT → Time ranges */}
      <div className="flex gap-1 ml-0.5 items-center shrink-0">
        {QUICK_RANGES.map((r) => {
          const isActive = quickRange?.key === r.key;

          return (
            <button
              key={r.key}
              onClick={() => handleQuickRange(r)}
              className={`px-2 py-1 rounded-md border transition-all duration-200 text-[10px] text-[var(--text-color)] focus:outline-none outline-none
            ${isActive
                  ? "bg-[#FE8F12] font-semibold"
                  : "border-[#FE8F12] bg-[var(--input-enable-bg)]"
                }`}
            >
              {r.label}
            </button>
          );
        })}

        {/* MANUAL DAYS */}
        <div className="flex items-center gap-2 ml-2">
          <input
            type="number"
            min="1"
            placeholder="Days"
            className="h-[30px] w-[55px] px-2 text-[11px] rounded-md border
  border-[var(--input-enable-border)]
  text-[var(--text-color)] bg-[var(--input-enable-bg)]
  flex items-center
  [appearance:textfield]
  [&::-webkit-outer-spin-button]:appearance-none
  [&::-webkit-inner-spin-button]:appearance-none"
            value={manualDays}
            onChange={(e) => setManualDays(e.target.value)}
          />
          <button
            className="px-2 py-1 text-sm rounded-md h-[33px] min-w-[70px]
          flex items-center justify-center
          bg-[var(--submit-button-bg)]
          text-[#111111]
          transition-all duration-200
          hover:bg-[var(--submit-button-hover-bg)]"
            onClick={handleManualDaysApply}
            disabled={isApplyingRange || manualDays.length === 0}
          >
            {isApplyingRange ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>


      <div className="">
        <button
          className="focus:outline-none outline-none"
          onClick={() =>
            dispatch({
              type: "SET_SWAP_STATE",
              payload: !isSwapped,
            })
          }
        >
          Swap
        </button>
      </div>
    </div>
  );

};

export default ReportsNavbar;
