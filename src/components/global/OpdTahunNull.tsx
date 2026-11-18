export const OpdTahunNull = () => {
    return (
        <>
            <div className="flex flex-wrap uppercase p-5 m-3 border-2 border-gray-600 rounded-lg justify-center">
                <h1 className="text-gray-600 font-bold">Pilih Perangkat Daerah & Tahun di header terlebih dahulu</h1>
            </div>
        </>
    )
}
export const TahunNull = () => {
    return (
        <>
            <div className="flex flex-wrap uppercase p-5 m-3 border-2 border-gray-600 rounded-lg justify-center">
                <h1 className="text-gray-600 font-bold">Pilih Tahun di header terlebih dahulu</h1>
            </div>
        </>
    )
}
export const OpdNull = () => {
    return (
        <>
            <div className="flex flex-wrap uppercase p-5 m-3 border-2 border-gray-600 rounded-lg justify-center">
                <h1 className="text-gray-600 font-bold">Pilih Perangkat Daerah di header terlebih dahulu</h1>
            </div>
        </>
    )
}

export const TerjadiKesalahan = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-6 m-3 border border-gray-300 rounded-lg bg-gray-50">
            <h1 className="text-gray-700 font-bold text-lg mb-2">
                Terjadi Kesalahan
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                Maaf, terjadi kendala yang tidak terduga saat memproses
                permintaan Anda.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed max-w-lg mt-2">
                Silakan coba beberapa saat lagi. Jika kendala masih terjadi,
                silakan hubungi tim kami agar dapat segera kami tindak lanjuti.
            </p>

            <p className="text-gray-500 text-xs mt-4">
                Terima kasih atas pengertian Anda.
            </p>
        </div>
    );
};
