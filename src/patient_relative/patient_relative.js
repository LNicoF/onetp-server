import { saveNewPatientRelative } from "./patient_relative_repository.js";

export const createPatientRelative = (patient, relative) => {
    saveNewPatientRelative( { patientId:patient.id, relativeId:relative.id } );
}


