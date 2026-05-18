import Table from "./comp/Table";
import { FiHome } from "react-icons/fi";

const CariPegawaiPage = () => {
    return (
        <>
            <div className="flex items-center">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Data Master</p>
                <p className="mr-1">/ Cari Pegawai</p>
            </div>
            <Table />
        </>
    )
}

export default CariPegawaiPage;