import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Alert } from "../../Alert/Alert";

import { useEffect } from "react";
import { ReportsTableView } from "./ReportsTableView";
import ReportsNavbar from "../ReportsNavbar/ReportsNavbar";
import { ScreenLoader } from "../../Loader/Loader";

export function ReportPage({ fetch }) {
  const { userStatus } = useSelector((state) => state);
  const reportProvider = useSelector((state) => state.reportProvider);

  return (
    <div className={`mb-4`}>
      {/* <a href="https://g-e7b0d942ec.grafana-workspace.ap-southeast-1.amazonaws.com/d/bebk2qlask2yod/demo-dashboard?orgId=1&refresh=5s&var-property=5e5ae26e-0bd3-4633-829c-eb048d183a90" target="_blank">click here</a> */}
      <ReportsNavbar />
      {userStatus.error && <Alert errMsg={userStatus.error} />}
      {userStatus.loading ? <ScreenLoader /> : ""}
      {!userStatus.loading && !userStatus.error ? <ReportsTableView /> : ""}

    </div>
  );
}
