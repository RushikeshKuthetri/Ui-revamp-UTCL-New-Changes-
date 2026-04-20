import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Download, Eye, X } from "lucide-react";
import { fetchDocuments, handleDownload } from "../../utils/apicalls/fetchDocuments";

export const ViewDocuments = () => {
    const dispatch = useDispatch();
    const { authProvider } = useSelector((state) => state);

    const [selectedItem, setSelectedItem] = useState(null);
    const files = authProvider?.documents?.files || [];
    const videos = authProvider?.documents?.videos || [];
    // const dummyVideos = [
    //     {
    //         key: "dummy-video-1",
    //         name: "KEPServerEX License Activation Procedure.pdf",
    //         url: "https://www.w3schools.com/html/mov_bbb.mp4",
    //     },
    //     {
    //         key: "dummy-video-2",
    //         name: "KEPServerEX License Activation Procedure.pdf",
    //         url: "https://www.w3schools.com/html/movie.mp4",
    //     },
    //     {
    //         key: "dummy-video-3",
    //         name: "Screen Development Training Final Version V2.pdf",
    //         url: "https://www.w3schools.com/html/mov_bbb.mp4",
    //     },
    // ];
    // const videosToDisplay = videos.length > 0 ? videos : dummyVideos;

    useEffect(() => {
        fetchDocuments(dispatch);
    }, [dispatch]);

    // ✅ FULL PREVIEW VIEW
    if (selectedItem) {
        return (
            <div className="bg-[var(--card-bg)] rounded-xl shadow">
                {/* Header */}
                <div className="flex justify-between items-center p-3 border-b border-[var(--card-border)]">
                    <span className="font-medium text-[var(--text-color)]">
                        {selectedItem.name}
                    </span>

                    <button
                        onClick={() => setSelectedItem(null)}
                        className="flex items-center gap-1 text-sm hover:text-orange-500"
                    >

                        {/* Close */}
                        <X size={20} />
                    </button>
                </div>

                {/* Preview */}
                {selectedItem.type === "pdf" ? (
                    <iframe
                        src={selectedItem.url}
                        title={`Preview of ${selectedItem.name}`}
                        className="w-full h-[75vh] rounded-b-xl"
                    />
                ) : (
                    <video
                        src={selectedItem.url}
                        controls
                        className="w-full h-[70vh] rounded-b-xl"
                    />
                )}
            </div>
        );
    }
    

    return (
        <div>
            {/* Header */}
            <div className="flex text-[18px] font-medium text-[var(--title)] ml-1 mb-2">
                <span>Help</span>
            </div>

            {/* Split Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* 🔵 FILES */}
                <div className="rounded-xl px-3 py-2  !border !border-[var(--form-border)]">
                    <div className="font-medium text-[var(--text-color)] mb-2 ">
                        Files
                    </div>

                    <div className="
  w-full overflow-x-auto rounded-xl !border !border-[var(--form-border)] mb-2
">
                        <table className="w-full text-sm border-collapse text-[var(--text-color)] ">
                            <thead>
                                <tr className="bg-gradient-to-r from-orange-400 to-orange-300">
                                    <th className="py-1 text-left text-[#111111] text-[14px]">Sr.No</th>
                                    <th className="py-1 text-left text-[#111111] text-[14px]">Name</th>
                                    <th className="py-1 text-left text-[#111111] text-[14px]">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {files.map((file, index) => (
                                    <tr
                                        key={file.key}
                                        className="hover:bg-[var(--hover-bg)]"
                                    >
                                        <td className="py-1 text-left text-[13px]">{index + 1}</td>

                                        <td className="py-1 text-left text-[13px]">
                                            {file.name}
                                        </td>

                                        <td className="py-1 text-left text-[13px]">
                                            <div className="flex gap-3">
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedItem({
                                                            ...file,
                                                            type: "pdf",
                                                        })
                                                    }
                                                >
                                                    <Eye
                                                        size={18}
                                                        className="text-[var(--text-color)] hover:text-[var(--card-border)]"
                                                    />
                                                </span>
                                                {/* Download */}
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // keep this same
                                                        handleDownload(file.key, file.name);
                                                    }}
                                                >
                                                    <Download
                                                        size={18}
                                                        className="text-[var(--text-color)] hover:text-[var(--card-border)]"
                                                    />
                                                </span>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {files.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="text-center py-4 text-[var(--card-subtle)]"
                                        >
                                            No documents available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 🔴 VIDEOS */}
                <div className="rounded-xl px-3 py-2  !border !border-[var(--form-border)]">
                    <div className="font-medium text-[var(--text-color)] mb-2">
                        Videos
                    </div>

                    <div className=" w-full overflow-x-auto rounded-xl !border !border-[var(--form-border)] mb-2">
                        <table className="w-full text-sm border-collapse text-[var(--text-color)] rounded-lg">
                            <thead>
                                <tr className="bg-gradient-to-r from-orange-400 to-orange-300">
                                    <th className="py-1 text-left text-[#111111] text-[14px]">Sr.No</th>
                                    <th className="py-1 text-left text-[#111111] text-[14px]">Name</th>
                                    <th className="py-1 text-left text-[#111111] text-[14px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videos.map((video, index) => (
                                    <tr
                                        key={video.key}
                                        className="hover:bg-[var(--hover-bg)]"
                                    >
                                        <td className="py-1 text-left text-[13px]">{index + 1}</td>

                                        <td className="py-1 text-left text-[13px]">
                                            {video.name}
                                        </td>

                                        <td className="py-1 text-left text-[13px]">
                                            <div className="flex gap-3">

                                                {/* Preview */}
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedItem({
                                                            ...video,
                                                            type: "video",
                                                        })
                                                    }
                                                >
                                                    <Eye
                                                        size={18}
                                                        className="text-[var(--text-color)] hover:text-[var(--card-border)]"
                                                    />
                                                </span>

                                                {/* Download */}
                                                <span
                                                    className="cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // keep this
                                                        handleDownload(video.key, video.name);
                                                    }}
                                                >
                                                    <Download
                                                        size={18}
                                                        className="text-[var(--text-color)] hover:text-[var(--card-border)]"
                                                    />
                                                </span>

                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {videos.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center py-4 text-[var(--card-subtle)]">
                                            No videos available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
