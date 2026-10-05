// Data dummy outcome untuk nomenklatur (mapping outcome) pada matrix renstra
// Digunakan selama endpoint outcome backend belum tersedia
export const dummyOutcome: Record<string, string> = {
    Urusan: "",
    "Bidang Urusan": "",
    Program: "",
    Kegiatan: "",
    "Sub Kegiatan": "",
};

export const getDummyOutcome = (jenis: string): string => dummyOutcome[jenis] ?? "-";
