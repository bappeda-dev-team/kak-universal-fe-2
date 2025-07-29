import { FiHome } from "react-icons/fi";
import { FormIntermediate } from "../FormIntermediate";

const TambahIntermediateKab = () => {
    return(
        <>
            <div className="flex items-center mb-3">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan Pemda</p>
                <p className="mr-1">/ Intermediate</p>
                <p className="mr-1">/ Tambah</p>
            </div>
            <FormIntermediate />
        </>
    )
}

export default TambahIntermediateKab;