import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface School {
  name: string;
  photo: string;
  description: string;
}

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
})
export class SchoolDetailsComponent implements OnInit {
  schoolName: string;
  schoolDetails: School | null = null;  // Déclarez et initialisez schoolDetails

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.schoolName = this.route.snapshot.paramMap.get('school_name');
    if (this.schoolName) {
      this.fetchSchoolDetails(this.schoolName);
    } else {
      console.error('School name is null or undefined');
    }
  }

  fetchSchoolDetails(schoolName: string): void {
    // Simulated fetch operation. Replace with actual data retrieval logic.
    this.schoolDetails = {
      name: schoolName,
      photo: 'path_to_school_photo.jpg',
      description: 'This is a detailed description of the school.'
    };
  }
}
