import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/templateList.css";
import { Button, Image, Table } from "react-bootstrap";
import Loader from "react-js-loader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { config } from "../config";
import { AuthenticatedTemplate } from "@azure/msal-react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import C4 from "./assets/C4.png";
import C5 from "./assets/C5.png";
import C6 from "./assets/C6.png";
import K4 from "./assets/K4.png";
import K5 from "./assets/K5.png";
import K6 from "./assets/K6.png";
import { IoClose } from "react-icons/io5";

import moment from "moment";
import { BiChevronLeft } from "react-icons/bi";
import { accessLogApi } from "../utils/AccessLogApi";
import { ScreenLoader } from "./Loader/Loader";
export const CycloneView = () => {
  const loader = (
    // <Loader
    //   type="spinner-circle"
    //   bgColor={"#000000"}
    //   title={"bubble-scale"}
    //   color={"#FFFFFF"}
    //   size={50}
    // />
    <ScreenLoader />
  );
  let webSocket = useRef(null);

  const today = moment().toDate();
  const yesterday = moment().subtract(10, "hours").toDate();

  const [templateData, setTemplateData] = useState([]);
  const [cycloneData, setCycloneData] = useState(
    JSON.parse(sessionStorage.getItem("CycloneView"))
  );
  const [submitLoader, setSubmitLoader] = useState("");
  const [tableLoader, setTableLoader] = useState(false);
  const [submitCopyLoader, setSubmitCopyLoader] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(today);
  const [T1, setT1] = useState("");
  const [T2, setT2] = useState("");
  const [plant, setPlant] = useState("")
  const [diff, setdiff] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const [options, setOptions] = useState({
    chart: {
      type: "line",
      backgroundColor: "var(--bg-color)",
      style: {
        color: "var(--text-color)",
      },
      width: 1300,
      height: 500,
      renderTo: "container",
      spacing: [50, 50, 50, 50],
      zoomType: "x",

      events: {
        load: function () {
          var svg = this.container.getElementsByTagName("svg")[0];

          svg.style.width = "1300px"    // ✅ responsive
          svg.style.height = "350px";  // ✅ 700 → 380
        },
      },
    },
    title: {
      text: null,
      style: {
        color: "var(--text-color)",
        fontSize: "14px",
      },
    },
    legend: {
      layout: "horizontal", // 'horizontal' to display legend items in a single row
      align: "center", // 'center' to horizontally align the legend in the middle
      verticalAlign: "top", // 'top' to position the legend above the chart
      itemMarginTop: 0, // Optional: Increase the margin between legend items and chart
      itemStyle: {
        color: "var(--text-color)",
        fontSize: "14px",
      },
      itemHoverStyle: {
        color: "var(--text-color)",
      },
    },
    xAxis: {
      tickPositions: [],
      title: {
        text: "", // Set the x-axis title
        style: {
          color: "var(--text-color)",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          color: "var(--text-color)",
          fontSize: "14px",
        },
      },
      reversed: true,
      // offset: 200
    },
    yAxis: {
      title: {
        text: "",
        style: {
          color: "var(--text-color)",
          fontSize: "14px",

        },
      },
      labels: {
        style: {
          color: "var(--text-color)",
          fontSize: "14px",

        },
      },
      gridLineColor: "rgba(130, 130, 130, 0.15)",
      lineColor: "rgba(130, 130, 130, 0.6)",
      tickColor: "rgba(130, 130, 130, 0.6)",
    },
    tooltip: {
      style: {
        color: "var(--text-color)",
        fontWeight: "600",
      },
      backgroundColor: "var(--bg-main-container)",
      borderColor: "rgba(100,100,100,0.25)",
    },
    // plotOptions: {
    //     column: {
    //         // Adjust the spacing between data points
    //         pointPadding: 1, // Increase or decrease this value as needed
    //         groupPadding: 1, // Increase or decrease this value as needed
    //     },
    // },
    series: [
      {
        data: [],
        gapSize: 5, // Adjust the gap size as needed
        pointInterval: 10,
      },
    ],
    plotOptions: {
      line: {
        connectNulls: false,
        // pointInterval : 1,
        // pointPadding: 1
      },
    },
  });

  const getCycloneDataEffSocket = () => {
    const { token } = JSON.parse(localStorage.getItem("login"));
    // const webSocket = new WebSocket(`${config.BaseUrl}`, [token]);
    // console.log("wss", webSocket);
    if (!webSocket?.current) {
      const ws = new WebSocket(`${config.BaseSocketUrl}`);
      webSocket.current = ws;
    } else {
      webSocket.current.close();
      const ws = new WebSocket(`${config.BaseSocketUrl}`);
      webSocket.current = ws
    }
    webSocket.current.onopen = () => {
      console.log("connected Event Server", cycloneData);
      const payload = {
        action: "fetchCycloneView",
        userid: JSON.parse(sessionStorage.getItem("accountDetails"))?.username,
        plantName: cycloneData.PlantName,
        parameters: cycloneData.Parameters,
      };
      webSocket.current.send(JSON.stringify(payload));
    };

    webSocket.current.onerror = () => {
      console.log("connection to Event Server failed");
    };

    webSocket.current.onmessage = (message) => {
      if (message.data !== "Connected") {
        const cycloneDataws = JSON.parse(message.data);
        if (cycloneDataws?.latestCycloenEffData) {
          let tempData = { ...cycloneData };
          tempData.Parameters = cycloneDataws.latestCycloenEffData.result;
          setCycloneData(tempData);
        }
      }
    };
  };

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    accessLogCBM();
    if (!sessionStorage.getItem("CycloneView")) {
      // console.log(!sessionStorage.getItem("CycloneView"));
      navigate("/cyclonelist");
      return;
    }
    getEfficicncyData();
    getCycloneDataEffSocket();
    let intervalId = setInterval(() => {
      if (webSocket.current) {
        if (`${webSocket?.current?.readyState}` === `${WebSocket.OPEN}`) {
          const payload = {
            action: "fetchCycloneView",
            userid: JSON.parse(sessionStorage.getItem("accountDetails"))?.username,
            plantName: cycloneData.PlantName,
            parameters: cycloneData.Parameters,
          };
          webSocket.current.send(JSON.stringify(payload));
        } else {
          console.log("WebSocket is not open. Current state: ", webSocket?.current?.readyState);
          getCycloneDataEffSocket();
        }
      }
    }, 60000) // 1min
    return () => {
      // webSocket.close();
      // console.log("closing");
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (`${webSocket?.current?.readyState}` !== `${WebSocket.CLOSED}`) {
        webSocket?.current?.close();
      }
    };
  }, []);

  const accessLogCBM = () => {
    let payload = {
      userId: JSON.parse(sessionStorage.getItem("accountDetails"))?.username,
      ip: "",
      module: "CBM",
      plant: cycloneData.PlantName,
      url: window.location.href,
      options: "",
      plant_or_section: "CBM",
    };
    accessLogApi(payload);
  };

  const getEfficicncyData = () => {
    if (Object.keys(cycloneData).length <= 0) {
      console.log("empty");
      return;
    }
    // console.log(cycloneData)

    let payload = {
      userid: JSON.parse(sessionStorage.getItem("accountDetails"))?.username,
      plantName: cycloneData.PlantName,
      parameters: cycloneData.Parameters,
    };

    axios
      .post(config.BaseUrl + "/cbm/template/getCycloneDataEff", payload, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("login"))?.token
            }`,
        },
      })
      .then((res) => {
        setTableLoader(false);
        res = res.data.result;

        let tempData = { ...cycloneData };
        tempData.Parameters = res;
        setCycloneData(tempData);
      })
      .catch((err) => {
        // setTableLoader(false)
        // setNodataFlag(true);
        toast.error(
          err?.response?.data?.message
            ? err?.response?.data?.message
            : err.message
        );
      });
  };

  let ImageMap = {
    4: {
      Cyclone: C4,
      Klin: K4,
    },
    5: {
      Cyclone: C5,
      Klin: K5,
    },
    6: {
      Cyclone: C6,
      Klin: K6,
    },
  };

  const graphFunction = (graphApiPayload) => {
    const token = JSON.parse(localStorage.getItem("login"))?.token;
    axios
      .post(
        config.BaseUrl + "/cbm/template/getCycloneEffTrends",
        graphApiPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        let arrayData = res.data.result;
        arrayData = arrayData.sort((a, b) => {
          return new Date(b.Timestamp) - new Date(a.Timestamp);
        });
        //  console.log(arrayData);
        setIsLoading(false);

        const graphPointData = await arrayData.map((val) => val.Efficiency);

        const processedData = graphPointData.map((value) =>
          value === 0 ? null : value
        );
        //  let label = arrayData[0]?.Tag_Tgo + " "  + arrayData[0]?.Tag_Tmo
        //  console.log(label,"llllllllll")
        const displayTstamp = arrayData.map((val) => val.Timestamp);
        const startPoint = displayTstamp[0];
        const endPoint = displayTstamp[displayTstamp.length - 1];
        const startTime = moment(startPoint).toDate();
        const endTime = moment(endPoint).toDate();
        const timeDiffInMilliseconds = Math.abs(startTime - endTime);
        const duration = moment.duration(timeDiffInMilliseconds);

        // Get the difference in days, hours, and minutes
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        const xlabel =
          days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m`;
        //  console.log(xlabel);

        setOptions({
          ...options,
          chart: {
            ...options.chart,
            backgroundColor: "var(--bg-color)",
            style: {
              ...options.chart?.style,
              color: "var(--text-color)",
            },
          },
          series: [{ name: "Efficiency", data: processedData }],
          xAxis: {
            ...options.xAxis,
            categories: displayTstamp,
            tickPositions: [0, displayTstamp.length - 1],
            title: {
              ...options.xAxis?.title,
              text: xlabel, // Set the x-axis title
              style: {
                ...options.xAxis?.title?.style,
                color: "var(--text-color)",
                 fontSize: "14px",
              },
            },
            labels: {
              ...options.xAxis?.labels,
              style: {
                ...options.xAxis?.labels?.style,
                color: "var(--text-color)",
                fontSize: "14px",   // ✅ add this
              },
            },
            reversed: true,
            // offset: 200
          },
          yAxis: {
            ...options.yAxis,
            title: {
              ...options.yAxis?.title,
              style: {
                ...options.yAxis?.title?.style,
                color: "var(--text-color)",
              },
            },
            labels: {
              ...options.yAxis?.labels,
              style: {
                ...options.yAxis?.labels?.style,
                color: "var(--text-color)",
                fontSize: "14px",   // ✅ add this
              },
            },
          },
          tooltip: {
            ...options.tooltip,
            style: {
              ...options.tooltip?.style,
              color: "var(--text-color)",
               fontSize: "14px",
            },
          },
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleModal = (event, data, plantName) => {
    const { T1, T2 } = data;
    setT1(T1);
    setT2(T2);
    setPlant(plantName)
    // if(event.detail==2){
    setShowModal(true);
    setIsLoading(true);
    // }

    const graphApiPayload = {
      startTime: startDate,
      endTime: endDate,
      T1: T1,
      T2: T2,
      interval: `${diff}m`,
      plantName
    };
    graphFunction(graphApiPayload);
  };

  const handleClose = () => {
    setShowModal(false);
    setStartDate(yesterday);
    setEndDate(today);
    setdiff(10);
  };

  const graphApiDataPayload = () => {
    const graphApiPayload = {
      startTime: startDate,
      endTime: endDate,
      T1: T1,
      T2: T2,
      interval: `${diff}m`,
      plantName: plant
    };
    // console.log("jeee", graphApiPayload);
    // console.log("toekn", token);
    graphFunction(graphApiPayload);
  };

  // console.log(graphData);
  let minutes = [];
  for (let i = 1; i <= 60; i++) {
    minutes.push(i);
  }

  const trendsModal = () => {
    return (
      <Modal
        show={showModal}
        onHide={handleClose}
        animation={false}
        className="cyclone-trends-modal"
        dialogClassName="!max-w-4xl"
      >

       <Modal.Header className="cyclone-trends-modal-header mt-2 position-relative">
        <button
    onClick={handleClose}
    className="absolute text-[var(--text-color)] top-2 -right-20 text-[20px] font-bold cursor-pointer"
  >
 <IoClose />
  </button>
          <div className="cyclone-trends-modal-nav ">

            {/* Start Date */}
            <div>
              <label className="modal-label">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                dateFormat="d/MM/yyyy h:mm aa"
                className="modal-input"
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: "offset",
                    options: { offset: [0, -80] },
                  },
                  {
                    name: "preventOverflow",
                    options: { padding: 8 },
                  },
                ]}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="modal-label">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                dateFormat="d/MM/yyyy h:mm aa"
                className="modal-input"
                popperPlacement="bottom-start"
                popperModifiers={[
                  {
                    name: "offset",
                    options: { offset: [0, -80] },
                  },
                  {
                    name: "preventOverflow",
                    options: { padding: 8 },
                  },
                ]}
              />
            </div>

            {/* Interval */}
            <div>
              <label className="modal-label">Interval (minutes)</label>
              <select
                value={diff}
                onChange={(e) => setdiff(e.target.value)}
                className="modal-input"
              >
                {minutes.map((val) => (
                  <option key={val}>{val}</option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                className="px-3 py-1 flex justify-center rounded-md !border !border-[var(--button-border)] bg-[var(--submit-button-bg)] hover:bg-[var(--submit-button-hover-bg)] cursor-pointer transition-all duration-200 text-[14px] text-[#111111] font-medium active:scale-95"
                onClick={() => {
                  graphApiDataPayload();
                  setIsLoading(true);
                }}
              >
                Submit
              </button>
            </div>

          </div>
        </Modal.Header>

        <Modal.Body className="cyclone-trends-modal-body">
          {isLoading ? (
            <div
              className="d-flex align-items-center cyclone-trends-modal-loader"
              style={{ minHeight: "200px" }}
            >
              {loader}
            </div>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )}
        </Modal.Body>
        <Modal.Footer className="">
          <Button variant="secondary" onClick={handleClose}  className="px-2 py-1
            text-[14px]
            rounded-lg
           !border !border-[var(--button-border)]
            bg-[var(--button-bg)]
            hover:bg-[var(--button-hover-bg)]
            text-[var(--text-color)] font-medium
            transition-all focus:outline-none focus:ring-0 outline-none">
            Close
          </Button>
        </Modal.Footer>

      </Modal>
    );
  };

  return (
    <AuthenticatedTemplate>
      {/* <div className="dash-top pb-2"> */}
      {/* // changed by trdiai to fit the cyclone view in the screen as per the requirement on 30-03-2026 */}
      <div className="pb-2">
        <div className="mycard  cycloneView mt-2">
          <div className="d-flex align-items-center mb-3">
            <div className="back">
              <BiChevronLeft
                size={25}
                onClick={() => {
                  navigate("/cyclonelist");
                }}
              />
            </div>
            <h4 className="mb-0">
              {" "}
              Cyclone View - {cycloneData?.TemplateName}
            </h4>
          </div>
          <div className="d-flex justify-content-between h-100">
            <div className="d-flex justify-content-center align-items-start p-4 w-50 position-relative">
              {cycloneData &&
                Object.keys(cycloneData).length > 0 &&
                cycloneData?.Parameters?.Cyclone && (
                  <Image
                    className="Cyclone-image"
                    src={
                      ImageMap[
                        Object.keys(cycloneData?.Parameters?.Cyclone).length
                      ].Cyclone
                    }
                  />
                )}

              {cycloneData &&
                Object.keys(cycloneData).length > 0 &&
                cycloneData?.Parameters?.Cyclone &&
                Object.keys(cycloneData?.Parameters?.Cyclone).map(
                  (val, index) => {
                    return (
                      <div
                        key={val + index}
                        className={
                          "containerforEff " +
                          val +
                          (index % 2 === 0
                            ? " align-items-end"
                            : " align-items-start")
                        }
                      >
                        {/* {console.log(cycloneData?.Parameters.Cyclone[val].T1val, cycloneData?.Parameters.Cyclone[val].T2val, "valllll")} */}
                        <h6>
                          Tgo -{" "}
                          {Number(
                            cycloneData?.Parameters?.Cyclone[val]?.T1val
                          ).toFixed(2)}{" "}
                          -{" "}
                          {moment(
                            cycloneData?.Parameters?.Cyclone[val]?.T1TimeStamp
                          )
                            .utc()
                            .format("DD-MM-YYYY HH:mm:ss")}
                        </h6>
                        {/* <h6>Tgo -  {Number(cycloneData?.Parameters.Cyclone[val].T1val).toFixed(2)} - {moment(cycloneData?.Parameters.Cyclone[val].T1TimeStamp).utc().format("DD-MM-YYYY HH:mm:ss")}</h6> */}
                        {
                          <h6
                            onDoubleClick={(event) =>
                              handleModal(
                                event,
                                cycloneData?.Parameters?.Cyclone[val],
                                cycloneData?.PlantName
                              )
                            }
                            className={
                              index % 2 === 0
                                ? "efficiency-C-odd"
                                : "efficiency-C-even"
                            }
                          >
                            {moment(
                              cycloneData?.Parameters?.Cyclone[val]?.T1TimeStamp
                            ).isSame(
                              cycloneData?.Parameters?.Cyclone[val]?.T2TimeStamp
                            )
                              ? Number(
                                (1 -
                                  (Number(
                                    cycloneData?.Parameters?.Cyclone[val]
                                      ?.T1val
                                  ) -
                                    Number(
                                      cycloneData?.Parameters?.Cyclone[val]
                                        ?.T2val
                                    )) /
                                  Number(
                                    cycloneData?.Parameters?.Cyclone[val]
                                      ?.T1val
                                  )) *
                                100
                              ).toFixed(0) + "%"
                              : "N/A"}
                          </h6>
                        }
                        <h6>
                          Tmo -{" "}
                          {Number(
                            cycloneData?.Parameters?.Cyclone[val]?.T2val
                          ).toFixed(2)}{" "}
                          -{" "}
                          {moment(
                            cycloneData?.Parameters?.Cyclone[val]?.T2TimeStamp
                          )
                            .utc()
                            .format("DD-MM-YYYY HH:mm:ss")}
                        </h6>
                        {/* <h6>{moment(cycloneData?.Parameters.Cyclone[val].T1TimeStamp).utc().format("DD-MM-YYYY HH:mm:ss")}</h6> */}
                      </div>
                    );
                  }
                )}
            </div>
            <div className=" d-flex justify-content-center align-items-start p-4 w-50 position-relative">
              {cycloneData && Object.keys(cycloneData).length > 0 && (
                <Image
                  className="Cyclone-image"
                  src={
                    ImageMap[
                      Object.keys(cycloneData?.Parameters?.Cyclone).length
                    ].Klin
                  }
                />
              )}
              {cycloneData &&
                Object.keys(cycloneData).length > 0 &&
                cycloneData?.Parameters?.Klin &&
                Object.keys(cycloneData?.Parameters?.Klin).map((val, index) => {
                  return (
                    <div
                      key={val + index}
                      className={
                        "containerforEff " +
                        val +
                        (index % 2 === 0
                          ? " align-items-end"
                          : " align-items-start")
                      }
                    >
                      {/* {console.log(cycloneData?.Parameters.Klin[val].T1val, cycloneData?.Parameters.Klin[val].T2val, "valllll")} */}
                      <h6>
                        Tgo -{" "}
                        {Number(
                          cycloneData?.Parameters?.Klin[val]?.T1val
                        ).toFixed(2)}{" "}
                        -{" "}
                        {moment(cycloneData?.Parameters?.Klin[val]?.T1TimeStamp)
                          .utc()
                          .format("DD-MM-YYYY HH:mm:ss")}
                      </h6>
                      {
                        <h6
                          onDoubleClick={(event) =>
                            handleModal(
                              event,
                              cycloneData?.Parameters?.Klin[val],
                              cycloneData?.PlantName
                            )
                          }
                          className={
                            index % 2 === 0
                              ? "efficiency-K-odd"
                              : "efficiency-K-even"
                          }
                        >
                          {moment(
                            cycloneData?.Parameters?.Klin[val]?.T1TimeStamp
                          ).isSame(
                            cycloneData?.Parameters?.Klin[val]?.T2TimeStamp
                          )
                            ? Number(
                              (1 -
                                (Number(
                                  cycloneData?.Parameters?.Klin[val]?.T1val
                                ) -
                                  Number(
                                    cycloneData?.Parameters?.Klin[val]?.T2val
                                  )) /
                                Number(
                                  cycloneData?.Parameters?.Klin[val]?.T1val
                                )) *
                              100
                            ).toFixed(0) + "%"
                            : "N/A"}{" "}
                        </h6>
                      }

                      <h6>
                        Tmo -{" "}
                        {Number(
                          cycloneData?.Parameters?.Klin[val]?.T2val
                        ).toFixed(2)}{" "}
                        -{" "}
                        {moment(cycloneData?.Parameters?.Klin[val]?.T2TimeStamp)
                          .utc()
                          .format("DD-MM-YYYY HH:mm:ss")}
                      </h6>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {showModal && trendsModal()}
    </AuthenticatedTemplate>
  );
};
