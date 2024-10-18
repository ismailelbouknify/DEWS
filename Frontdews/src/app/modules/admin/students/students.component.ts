import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RulesService } from 'app/core/services/rules.service';
import { PredictionType, StudentType } from './types'; // Update this path as necessary
import { MailboxComposeComponent } from './compose/compose.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
    selector: 'students',
    templateUrl: './students.component.html',
    // styleUrls: ['./students.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent implements OnInit {
    public createForm: UntypedFormGroup;
    students$: Observable<StudentType[]>;
    predictions$: Observable<PredictionType[]>;
    allStudents: StudentType[] = [];
    allPredictions: PredictionType[] = [];
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedStudentForm: UntypedFormGroup;
    selectedStudent: StudentType | null = null;
    selectedPrediction: PredictionType | null = null; // New variable to store the selected student's prediction

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private service: RulesService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.refresStudents();
        this.refreshPrediction();
    }
    getTargetStatus(target: number): string {
        switch (target) {
            case 0:
                return 'Passed';
            case 1:
                return 'Failed';
            case 2:
                return 'Dropped';
            default:
                return 'Unknown';
        }
    }
    formatYear(id_annee: number): string {
        const yearMap = {
          8: '2015/2016',
          9: '2016/2017',
          10: '2017/2018',
          11: '2018/2019',
          12: '2019/2020'
        };
        return yearMap[id_annee] || id_annee.toString();
      }

    refresStudents() {
        this.students$ = this.service.getAvailableRulesData().pipe(
            map((res) => res)
        );
        this.selectedStudentForm = this._formBuilder.group({
            id_eleve: [''],
            id_annee: [''],
            Level: [''],
            MoyenneGen_il: [''],
            AdresseL_i1: [''],
            cd_etab: [''],
            NbrJourAbsenceAutorise_i1 : [''],
            datenaiseleve : [''],
            target_i1 : [''],
        });

        this.students$.subscribe((students) => {
            this.allStudents = students;
            this._changeDetectorRef.markForCheck();
        });
    }

    refreshPrediction() {
        this.predictions$ = this.service.getPredictionBaseline().pipe(
            map((res) => res)
        );

        this.predictions$.subscribe((predictions) => {
            this.allPredictions = predictions;
            this._changeDetectorRef.markForCheck();
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.allStudents = this.allStudents.filter(student =>
            student.id_eleve.toLowerCase().includes(filterValue.toLowerCase()) ||
            student.id_annee.toLowerCase().includes(filterValue.toLowerCase()) ||
            student.Level.toLowerCase().includes(filterValue.toLowerCase()) ||
            student.MoyenneGen_i1.toString().toLowerCase().includes(filterValue.toLowerCase())
        );
        this._changeDetectorRef.markForCheck();
    }

    toggleDetails(id: string): void {
        if (this.selectedStudent && this.selectedStudent.id_eleve === id) {
            this.closeDetails();
            return;
        }

        this.selectedStudent = this.allStudents.find((student) => student.id_eleve === id);
        if (this.selectedStudent) {
            this.selectedStudentForm.patchValue(this.selectedStudent);
            this.selectedPrediction = this.allPredictions.find(prediction => prediction.student_id === this.selectedStudent!.id_eleve);
        }

        this._changeDetectorRef.markForCheck();
    }

    closeDetails(): void {
        this.selectedStudent = null;
        this.selectedStudentForm.reset();
        this.selectedPrediction = null;
        this._changeDetectorRef.markForCheck();
    }

    openSnackBar(message: string, classe: string) {
        this._snackBar.open(message, 'Ok', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 7 * 1000,
            panelClass: [classe],
        });
    }

    isDetailsVisible(): boolean {
        return this.selectedStudent !== null;
    }

    openComposeDialog(student_id ): void {
        const dialogRef = this._matDialog.open(MailboxComposeComponent,{data: {student_id: student_id}});
        dialogRef.afterClosed().subscribe((result) => {
            console.log('Compose dialog was closed!');
        });
    }
}
