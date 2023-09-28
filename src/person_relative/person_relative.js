import { saveNewPersonRelative } from "./person_relative_repository.js";

export const createPersonRelative = (person, relative) => {
    saveNewPersonRelative( { personId:person.id,  relativeId:relative.id } );
}
