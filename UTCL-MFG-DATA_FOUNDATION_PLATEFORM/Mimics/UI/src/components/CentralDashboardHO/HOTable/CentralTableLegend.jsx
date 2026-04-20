export const CentralTableLegend = () => {
  return (
    <div>
      <div className="d-flex mt-2">
        
        {/* Kiln */}
        <div>
          <p className="font-weight-bold text-[14px]">For Kiln: </p>

          <div className="d-flex align-items-center text-[13px]">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 mb-0.5"></div>
            <p>Running: If value is greater than 50</p>
          </div>

          <div className="d-flex align-items-center text-[13px]">
            <div className="w-3 h-3 dot red-color mr-2 mb-0.5"></div>
            <p>Stopped: If value is less than 50</p>
          </div>

          <div className="d-flex align-items-center text-[13px]">
            <div className="w-3 h-3 dot grey-color mr-2 mb-0.5"></div>
            <p>Not Reachable: If no data is received</p>
          </div>
        </div>

        {/* Cement Mills */}
        <div className="px-4">
          <p className="font-weight-bold text-[14px]">For Cement Mills: </p>

          <div className="d-flex align-items-center text-[13px]">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2 mb-0.5"></div>
            <p>Running: If value is greater than 10</p>
          </div>

          <div className="d-flex align-items-center text-[13px]">
            <div className="w-3 h-3 dot red-color mr-2 mb-0.5"></div>
            <p>Stopped: If value is less than 10</p>
          </div>

          <div className="d-flex align-items-center text-[13px]">
            <div className="w-3 h-3 dot grey-color mr-2 mb-0.5"></div>
            <p>Not Reachable: If no data is received</p>
          </div>
        </div>

      </div>
    </div>
  );
};