import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from "./Buttons";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import confirm from "./Confirm";

export default function IndexEntity<T>(props: indexEntityProps<T>) {

    const [entities, setEntities] = useState<T[]>();
    const [totalPages, setTotalPages] = useState(0);
    const [recordsPerPage, setrecordsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    useEffect(() => {
        chargeData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage])

    function chargeData() {
        axios.get(props.url, {
            params: { page, recordsPerPage }
        })
            .then((answer: AxiosResponse<T[]>) => {
                const totalRegisters =
                    parseInt(answer.headers['quantityTotalRegisters'], 10);
                setTotalPages(Math.ceil(totalRegisters / recordsPerPage));
                setEntities(answer.data);
            })
    }

   async function deleteCategory(id:number) {
        try {
            await axios.delete(`${props.url}/${id}`)
            chargeData();
        }
        catch (error) {
            console.log(error.response.data);
        }
    }

    const buttons = (urlEdit: string, id: number) => <>
        <Link className="btn btn-success" to={urlEdit}>Editar</Link>
        <Button
            onClick={() => confirm(() => deleteCategory(id))}
            className="btn btn-danger">Borrar</Button>
    </>

    return (
        <>
            <h3>{props.title}</h3>
            <Link className="btn btn-primary" to={props.urlCreate}>
                Crear {props.nameEntity}
            </Link>

            <div className="form-group" style={{ width: '150px' }}>
                <label>Registros por página:</label>
                <select
                    className="form-select"
                    defaultValue={10}
                    onChange={e => {
                        setPage(1);
                        setrecordsPerPage(parseInt(e.currentTarget.value, 10))
                    }}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <Pagination 
                quantityTotalPages={totalPages}
                currentPage ={page} 
                onChange={(newPage) => setPage(newPage)} 
            />

            <GenericList list={entities}>
                <table className="table table-striped">
                    {props.children(entities!, buttons)}
                </table>
            </GenericList>
        </>
    )
}

interface indexEntityProps<T> {
    url: string;
    urlCreate: string;
    children(entities: T[],
        buttons: (urlEdit: string, id: number) => ReactElement): ReactElement;
    title: string;
    nameEntity: string;
}

