import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocumentPk from "./document-pk";
import { PkPegawaiContext } from "./pk-opd-types";

type previewPkProps = {
    logo: string
    previewData: PkPegawaiContext
    onClose: () => void;
}
export function PreviewPk({ logo, previewData, onClose }: previewPkProps) {
    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
            <div className="bg-white w-[90%] h-[90%] rounded-lg shadow-lg flex flex-col">

                {/* HEADER */}
                <div className="flex justify-between items-center px-4 py-2 border-b">
                    <h2 className="font-bold">Preview Perjanjian Kinerja</h2>

                    <div className="flex items-center gap-3">
                        {/* DOWNLOAD BUTTON */}
                        <PDFDownloadLink
                            document={
                                <DocumentPk
                                    branding={logo}
                                    data={previewData}
                                />
                            }
                            fileName={`PK-${previewData.pegawai.nama_pegawai}-${previewData.pegawai.nip}-${previewData.tahun}.pdf`}
                        >
                            {({ loading }) => (
                                <button
                                    className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? "Menyiapkan..." : "Download PDF"}
                                </button>
                            )}
                        </PDFDownloadLink>

                        {/* CLOSE BUTTON */}
                        <button
                            onClick={onClose}
                            className="text-red-500 font-semibold"
                        >
                            Tutup
                        </button>
                    </div>
                </div>

                {/* PDF PREVIEW */}
                <div className="flex-1">
                    <PDFViewer width="100%" height="100%">
                        <DocumentPk
                            branding={logo}
                            data={previewData}
                        />
                    </PDFViewer>
                </div>
            </div>
        </div>
    );
}
