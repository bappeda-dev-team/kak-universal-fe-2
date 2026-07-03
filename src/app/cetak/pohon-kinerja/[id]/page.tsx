'use client'

import { LoadingButtonClip } from "@/components/global/Loading";
import { TbPrinter } from "react-icons/tb";
import { useState, useRef } from "react";
import { ButtonBlackBorder } from "@/components/global/Button";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

const CetakPohon = () => {

    const modalRef = useRef<HTMLDivElement | null>(null);
    const linkDownload = ""
    const [LoadingCetak, setLoadingCetak] = useState<boolean>(false);

    const handleDownloadPdf = async () => {
        if (!modalRef.current) return;

        const elementsToHide = document.querySelectorAll(".hide-on-capture") as NodeListOf<HTMLElement>;
        elementsToHide.forEach((el) => (el.style.display = "none"));

        try {
            setLoadingCetak(true);
            const element = modalRef.current;
            const canvas = await html2canvas(element, {
                scale: 1, // Higher scale for better quality
                // width: element.scrollWidth + 50, // Use full scrollable width
                // height: element.scrollHeight + 250, // Use full scrollable height
                windowWidth: element.scrollWidth + 250, // Force full width rendering
                windowHeight: element.scrollHeight + 250, // Force full height rendering
                // useCORS: true, // For cross-origin images
            });

            // Create a new canvas with extra padding
            const paddingTop = 50 // Extra padding for the top of the canvas
            const newCanvas = document.createElement("canvas");
            newCanvas.width = canvas.width;
            newCanvas.height = canvas.height + paddingTop;

            const ctx = newCanvas.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "white"; // Optional: Background color
                ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
                ctx.drawImage(canvas, 0, paddingTop);

                //hitung posisi horizontal untuk centering
                const horizontalOffset = (newCanvas.width - canvas.width) / 2;

                // Gambar canvas di tengah horizontal
                ctx.drawImage(canvas, horizontalOffset, paddingTop);
            }

            const imgData = newCanvas.toDataURL("image/png");
            const pdf = new jsPDF({
                orientation: newCanvas.width > newCanvas.height ? "landscape" : "portrait",
                unit: "px",
                format: [newCanvas.width, newCanvas.height],
            });

            pdf.addImage(imgData, "PNG", 0, 0, newCanvas.width, newCanvas.height);

            pdf.save(`TEMATIK ${linkDownload || "nama unknown"}}.pdf`
            );
        } catch (error) {
            alert("Error capturing the element");
            console.error("Error capturing the element:", error);
        } finally {
            // Ensure elements are restored even if an error occurs
            elementsToHide.forEach((el) => (el.style.display = ""));
            setLoadingCetak(false);
        }
    };

    return (
        <div className="flex flex-col p-1">
            <div className="flex items-center gap-1">
                <ButtonBlackBorder
                    className="w-full flex items-center gap-1"
                    onClick={handleDownloadPdf}
                >
                    {LoadingCetak ?
                        <>
                            <LoadingButtonClip />
                            Loading
                        </>
                        :
                        <>
                            <TbPrinter />
                            Download
                        </>
                    }
                </ButtonBlackBorder>
            </div>
        </div>
    )
}

export default CetakPohon;