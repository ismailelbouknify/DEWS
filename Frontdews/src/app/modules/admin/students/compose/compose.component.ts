import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PredictService } from 'app/core/services/predict.service';

import { QuillEditorComponent } from 'ngx-quill';
import { Observable } from 'rxjs';

@Component({
    selector: 'mailbox-compose',
    templateUrl: './compose.component.html',
    styleUrls: ['./compose.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatDialogModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, QuillEditorComponent],
})
export class MailboxComposeComponent {
    selectedYear: number= 1;
    selectedModel: string ='model1';
    predictionResults: any[] = []; // Array to store prediction results
    studentIds: number[] = []; // Array to store student IDs
    matDialogRef: any;
    public preResults: string;
    public preProba: number;


    modelChange(e: any) {
        this.selectedModel = e.target.value;  // Assign the selected model
        console.log("Selected Model: ", this.selectedModel);
    }

    yearChange(e: any) {
        this.selectedYear = e.target.value;   // Assign the selected year
        console.log("Selected Year: ", this.selectedYear);
    }
    // Inject ApiService
    constructor(private apiService: PredictService, private _changeDetectorRef: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: any,) { }


    public predict(studentId: number): void {
        console.log("Predicting with Year:", Number(this.selectedYear), "Model:", this.selectedModel, "Student ID:", studentId);
    
        this.apiService.predict(Number(this.selectedYear), this.selectedModel, studentId).subscribe({
            next: (response: any) => {
                console.log("Prediction response: ", response);
                this.preProba = response.probability;
                this.preResults = response.prediction;
                this._changeDetectorRef.detectChanges();  // Update the view
            },
            error: (err) => {
                console.error('Error predicting for student', studentId, ':', err);
            },
            complete: () => {
                this._changeDetectorRef.markForCheck();
                this._changeDetectorRef.detectChanges();
            }
        });
    }
    
    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the copy field with the given field name
     *
     * @param name
     */


    saveAndClose(): void {
        // Perform predictions for each student
        // for (const studentId of this.studentIds) {
        //     this.predict(studentId);
        // }

        // Close the dialog
        this.matDialogRef.close();
    }
    discard(): void {
    }

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {
    }

    // Function to send the form data


    // Function to predict with the selected model


    // Example function to send form data to the server
    sendFormData(year: number, model: string) {
        // Your implementation here
    }

    // Example function to perform prediction using selected year and model
    performPrediction(year: number, model: string) {
        // Your implementation here
    }

}
