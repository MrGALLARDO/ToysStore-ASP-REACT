import { Form, Formik, FormikHelpers } from "formik";
import { toyCreationDTO } from "./toys.models";
import * as Yup from "yup";
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupDate from "../utils/FormGroupDate";
import FormGroupImage from "../utils/FormGroupImage";
import Button from "../utils/Buttons";
import { Link } from "react-router-dom";
import { CategoryDTO } from "../categories/category.model";
import { useState } from "react";
import SelectorMultiple, { selectorMultipleModel } from "../utils/SelectorMultiple";
import { branchDTO } from "../branch/branch.models";

export default function FormToys(props: FormToyProps) {
    
    const schemaToys = Yup.object().shape({
        name: Yup.string()
            .min(3, "El nombre de la marca debe de tener más de 2 caracteres")
            .max(50, "El nombre de la marca debe de tener menos de 50 caracteres")
            .required("El nombre de la marca es requerido")
            .firstCapitalLetter(),
        description: Yup.string()
            .min(3, "El nombre de la marca debe de tener más de 2 caracteres")
            .max(50, "El nombre de la marca debe de tener menos de 50 caracteres")
            .required("El nombre de la marca es requerido")
            .firstCapitalLetter(),
    });

    const [categoriesSelected, setCategoriesSelected] = useState(mapped(props.categoriesSelected));
    const [categoriesNotSelected, setCategoriesNotSelected] = useState(mapped(props.categoriesNotSelected));

    const [branchesSelected, setBranchesSelected] =
    useState(mapped(props.branchesSelected));
    const [branchesNotSelected, setBranchesNotSelected] =
    useState(mapped(props.branchesNotSelected));

    // const [actoresSeleccionados, setActoresSeleccionados] = 
    // useState<actorPeliculaDTO[]>(props.actoresSeleccionados)
    
    function mapped(array: {id: number, name: string}[]): selectorMultipleModel[]{
        return array.map(value => {
            return {key: value.id, value: value.name}
        })
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) =>{
            values.categoriesIds = categoriesSelected.map(value => value.key);
            values.branchesIds = branchesSelected.map(value => value.key);
             props.onSubmit(values,actions);
            }}
            validationSchema={schemaToys}
        >
            {({ errors, isSubmitting }) => (
                <Form>
                    <FormGroupText
                        field="name"
                        label="Nombre Juguete"
                        placeholder="Nombre Juguete"
                    />

                    <FormGroupCheckbox label="En sucursal" field="atSucursal" />
                    <FormGroupText label="Descripción" field={"description"} />
                    <FormGroupDate label="Fecha Lanzamiento" field="releaseDate" />
                    <FormGroupImage field="image" label="Imagen"
                        imageLink={props.model.imageLink}
                    />
                   
                   <div className="form-group">
                        <label>Categoria:</label>
                        <SelectorMultiple selected={categoriesSelected}
                            notSelected={categoriesNotSelected}
                            onChange={(selected, notSelected) => {
                                setCategoriesSelected(selected)
                                setCategoriesNotSelected(notSelected);
                            }}
                        />
                    </div>

                           
                   <div className="form-group">
                        <label>Sucursales:</label>
                        <SelectorMultiple selected={branchesSelected}
                            notSelected={branchesNotSelected}
                            onChange={(selected, notSelected) => {
                                setBranchesSelected(selected)
                                setBranchesNotSelected(notSelected);
                            }}
                        />
                    </div>

                    {/* <div className="form-group">
                            <TypeAheadActores 
                                onAdd={actores => {
                                    setActoresSeleccionados(actores);
                                }}
                                onRemove={actor => {
                                    const actores = actoresSeleccionados.filter(x => x !== actor);
                                    setActoresSeleccionados(actores);
                                }}
                                actores={actoresSeleccionados}
                                listadoUI={(actor: actorPeliculaDTO) => 
                                <>
                                    {actor.nombre} / <input placeholder="Personaje" 
                                    type="text" value={actor.personaje} 
                                    onChange={e => {
                                        const indice = actoresSeleccionados
                                        .findIndex(x => x.id === actor.id);

                                        const actores = [...actoresSeleccionados];
                                        actores[indice].personaje = e.currentTarget.value;
                                        setActoresSeleccionados(actores);
                                    }}
                                    />
                                </>}
                            />
                    </div> */}


                    <Button
                        disabled={isSubmitting || Object.keys(errors).length > 0}
                        type="submit"
                    >
                        Guardar
                    </Button>
                    <Link className="btn btn-secondary" to="/">
                        Cancelar
                    </Link>
                </Form>
            )}
        </Formik>
    );
}

interface FormToyProps {
    model: toyCreationDTO;
    onSubmit(
        values: toyCreationDTO,
        actions: FormikHelpers<toyCreationDTO>
    ): void;
    categoriesSelected: CategoryDTO[];
    categoriesNotSelected: CategoryDTO[];
    branchesSelected: branchDTO[];
    branchesNotSelected: branchDTO[];
    // actoresSeleccionados: actorPeliculaDTO[];
}
