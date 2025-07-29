import { FiHome } from "react-icons/fi";
import { FormEditCSF } from "../FormCSF";

const TambahTematikKab = () => {
    return(
        <>
            <div className="flex items-center mb-3">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan Pemda</p>
                <p className="mr-1">/ CSF</p>
                <p className="mr-1">/ Edit</p>
            </div>
            <FormEditCSF />
        </>
    )
}

export default TambahTematikKab;