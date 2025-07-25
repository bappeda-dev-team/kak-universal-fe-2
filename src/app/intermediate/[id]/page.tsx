import { FiHome } from "react-icons/fi";
import { FormEditIntermediate } from "../FormIntermediate";

const EditIntermediateKab = () => {
    return(
        <>
            <div className="flex items-center mb-3">
                <a href="/" className="mr-1"><FiHome /></a>
                <p className="mr-1">/ Perencanaan Pemda</p>
                <p className="mr-1">/ Intermediate</p>
                <p className="mr-1">/ Edit</p>
            </div>
            <FormEditIntermediate />
        </>
    )
}

export default EditIntermediateKab;