import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolService, School } from 'app/core/services/school.service';

@Component({
    selector: 'app-schools',
    templateUrl: './schools.component.html',
})
export class SchoolsComponent implements OnInit {
    allSchools: School[] = [];
    filteredSchools: School[] = [];
    newSchoolForm: FormGroup;
    isLoading = false;
    imagePreview: string | ArrayBuffer;
    selectedFile: File;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private schoolService: SchoolService, // Inject the SchoolService
        private router: Router,
    ) { }

    ngOnInit() {
        this.fetchSchools(); // Call the method to fetch schools from the database
    }

    fetchSchools() {
        this.isLoading = true;
        this.schoolService.getSchools().subscribe(
            (data: School[]) => { 
                console.log('Fetched schools:', data); 
                this.allSchools = data;
                this.filteredSchools = data;
                this.isLoading = false;
            },
            error => {
                console.error('Error fetching schools:', error);
                this.isLoading = false;
            }
        );
    }

    onFileChange(event: any) {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result;
                this.changeDetectorRef.detectChanges();
            };
            reader.readAsDataURL(file);
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredSchools = this.allSchools.filter(school => {
            return (
                school.school_name.toLowerCase().includes(filterValue) ||
                school.address.toLowerCase().includes(filterValue)   
            );
        });

        if (filterValue === '') {
            this.filteredSchools = this.allSchools;
        }
    }
    navigateToSchoolsDetails(schoolName: string) {
        if (schoolName) {
          this.router.navigate(['/schools', schoolName]);
        } else {
          console.error('School name is null or undefined');
        }
      }
}
