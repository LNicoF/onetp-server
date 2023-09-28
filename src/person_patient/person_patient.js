import { saveNewPersonPatient } from "./person_patient_repository.js";

export const createPersonPatient = (person, patient) => {
    saveNewPersonPatient( { personId:person.id,  patientId:patient.id } );
}


