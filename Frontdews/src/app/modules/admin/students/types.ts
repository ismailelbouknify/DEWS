// src/app/modules/admin/students/types.ts
export interface StudentType {
    id_eleve: string;
    id_annee: string;
    Level: string;
    MoyenneGen_i1: number;
    AdresseL_i1: string,
    cd_etab: string,
    NbrJourAbsenceNonAutorise_i1 : number,
    datenaiseleve : number,
    target_i1 : number,
}

export interface PredictionType {
    student_id: string;
    prediction: string;
    probability: number;
}
