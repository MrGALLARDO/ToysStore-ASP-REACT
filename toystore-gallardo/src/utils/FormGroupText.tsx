import { Form, Field } from "formik"
import { Link } from "react-router-dom"
import Button from "./Buttons"

export default function FormGroupText(props : formGroupTextProps){
    return(
        <>xd</>
        //     <div className="form-group">
        //         <label htmlFor="nombre">Nombre</label>
        //         <Field name="nombre" className="form-control"/>
        //         {errors.nombre && touched.nombre ? (
        //      <div>{errors.nombre}</div>
        //    ) : null}
        //     </div>
    )
}

interface formGroupTextProps{
    field: string;
    label?: string;
    placeHolder?: string;
    error: string;
    touch: string;
}