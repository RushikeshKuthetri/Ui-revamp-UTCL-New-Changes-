import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.scss";
import { accesslogshistory } from "../../utils";
import { ScreenLoader } from "../../components";
import { ReportsFilterCard } from "../../components/ShowGraphAndTable/FilterCard/ReportsFilterCard";
import { ReportPage } from "../../components/ShowGraphAndTable/ReportPage/ReportPage";

export const Home = () => {
  const { authProvider, showPopup, filterData } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "REMOVE_PLANT_IN_NAVBAR" });
    accesslogshistory({});
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex text-[18px] font-medium font-poppins text-[var(--title)] ml-1">
        <span>Report Generation</span>
      </div>

      {authProvider?.isLogin ? (
        <>
          <div className="w-full overflow-x-auto">
            <div className="min-w-max flex flex-col">

              {/* 🔹 Filter Section */}
              <div className="shrink-0 overflow-visible bg-[var(--card-bg)] rounded-xl shadow-sm">
                <ReportsFilterCard
                  showingInTrend={false}
                  data={{
                    label: showPopup?.label,
                    plant: filterData?.plant,
                    section: filterData?.section,
                    tagname: filterData?.selectedTagnames,
                    interval: "auto",
                  }}
                />
              </div>

              {/* 🔹 Reports View Section */}
              <div className="overflow-y-auto h-[80vh] bg-[var(--card-bg)]  rounded-xl shadow-sm">
                <ReportPage />
              </div>

            </div>
          </div>
        </>
      ) : (
        <ScreenLoader />
      )}
    </div>
  );
};