import {toy} from './toys.models';
import IndividualToy from './IndividualToy';
import GenericList from '../utils/GenericList';

export default function ListToys(props: listToysProps){
    
        return (
            <GenericList list = {props.toys}>
                <div className='css.div'>
                    {props.toys?.map(toy => <IndividualToy toy={toy}
                        key= {toy.id}
                    />)}
                </div>
            </GenericList>
        )
}

interface listToysProps{
    toys?: toy[]
}