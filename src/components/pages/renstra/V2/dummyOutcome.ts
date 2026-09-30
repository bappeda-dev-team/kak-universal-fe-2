// Data dummy outcome untuk nomenklatur (mapping outcome) pada matrix renstra
// Digunakan selama endpoint outcome backend belum tersedia
export const dummyOutcome: Record<string, string> = {
    Urusan: "Meningkatnya kualitas tata kelola",
    "Bidang Urusan": "Meningkatnya ketersediaan pelayanan dasar",
    Program: "Meningkatnya kualitas pelayanan program",
    Kegiatan: "Meningkatnya akses pelayanan kegiatan",
    "Sub Kegiatan": "Tercapai",
};

export const getDummyOutcome = (jenis: string): string => dummyOutcome[jenis] ?? "-";
