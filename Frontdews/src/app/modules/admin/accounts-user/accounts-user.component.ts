import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormGroup,
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { Permission } from 'app/core/models/permission';
import { Role } from 'app/core/models/role';
import { PermissionService } from 'app/core/services/permissions.service';
import { debounceTime, first, map, Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

type RoleSelect = {
    name: string;
    count: number;
};

@Component({
    selector: 'accounts-user',
    standalone: false,
    templateUrl: './accounts-user.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [
        /* language=SCSS */
        `
            .success {
                --mdc-snackbar-container-color: #4bb543 !important;
                --mdc-snackbar-supporting-text-color: white !important;
                --mat-mdc-snack-bar-button-color: white !important;
                --mat-snack-bar-button-color: white !important;
                white-space: pre-wrap;
                background: white !important;
            }

            .faild {
                --mdc-snackbar-container-color: #dc3545 !important;
                --mdc-snackbar-supporting-text-color: white !important;
                --mat-mdc-snack-bar-button-color: white !important;
                --mat-snack-bar-button-color: white !important;
                white-space: pre-wrap;
                background: white !important;
            }
        `,
    ],
})
export class AccountsUserComponent implements OnInit {
    // public createForm: FormGroup;
    // sonicUsers$: Observable<SonicUser[]>;
    public allSonicUsers: SonicUser[] = [];
    public filteredSonicUsers: SonicUser[] = [];
    public newUserForm: FormGroup;
    public allAvailableRoles: RoleSelect[] = [];
    // searchInputControl: UntypedFormControl = new UntypedFormControl();
    // selectedRoleForm: UntypedFormGroup;
    // selectedRole: Role | null = null;
    // filteredPermissions: Permission[];
    // permissions: Permission[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // permissionsEditMode: boolean = false;
    isLoading: boolean = false;
    imagePreview: string | ArrayBuffer;
    selectedFile: File;

    constructor(
        private router: Router,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private service: SonicUserService,
        private _matDialog: MatDialog,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.newUserForm = this._formBuilder.group({
            username: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            password: ['', Validators.required],
            photo: [''],
            // set default timezone
            timezone: ['Morocco/Casablanca'],
        });
    }

    ngOnInit() {
        this.getAllUsers();
    }

    /**
     * -----------
     * On file change
     * -----------
     */
    onFileChange(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.newUserForm.patchValue({
                    photo: reader.result,
                });
                // need to run CD since file load runs outside of zone
                this._changeDetectorRef.markForCheck();
            };
        }
    }

    /**
     * -----------
     * Get all users
     * -----------
     */
    getAllUsers() {
        this.isLoading = true;
        this.service.list().subscribe(
            (res: SonicUser[]) => {
                this.allSonicUsers = res;
                this.filteredSonicUsers = res;
                this.allSonicUsers.forEach((user) => {
                    if (user.role_details) {
                        const roleIndex = this.allAvailableRoles.findIndex(
                            (r) => r.name === user.role_details.name
                        );
                        if (roleIndex === -1) {
                            this.allAvailableRoles.push({
                                name: user.role_details.name,
                                count: 1,
                            });
                        } else {
                            this.allAvailableRoles[roleIndex].count++;
                        }
                    } else {
                        const roleIndex = this.allAvailableRoles.findIndex(
                            (r) => r.name === 'No role'
                        );
                        if (roleIndex === -1) {
                            this.allAvailableRoles.push({
                                name: 'No role',
                                count: 1,
                            });
                        } else {
                            this.allAvailableRoles[roleIndex].count++;
                        }
                    }
                });

                this.isLoading = false;
                this._changeDetectorRef.detectChanges();
            },
            (error) => {
                this.isLoading = false;
                this._changeDetectorRef.detectChanges();
                console.log('error', error);
            }
        );
    }

    /**
     * -----------
     * Navigate to account details
     * -----------
     */
    navigateToAccountDetails(id: string) {
        this.router.navigate(['/users/accounts', id]);
    }

    /**
     * -----------
     * uploadProfilePhoto
     * -----------
     */
    uploadProfilePhoto(event) {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.newUserForm.patchValue({ photo: file });

            // Image preview
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * -----------
     * Create new user
     * -----------
     */
    createNewUser() {
        if (this.newUserForm.valid) {
            console.log('newUserForm', this.newUserForm.value);
            this.isLoading = true;
            const formData = new FormData();
            formData.append('username', this.newUserForm.value.username);
            formData.append('first_name', this.newUserForm.value.first_name);
            formData.append('last_name', this.newUserForm.value.last_name);
            formData.append('email', this.newUserForm.value.email);
            formData.append('phone', this.newUserForm.value.phone);
            formData.append('password', this.newUserForm.value.password);
            formData.append('photo', this.selectedFile);
            formData.append('timezone', this.newUserForm.value.timezone);
            this.service.create(formData).subscribe(
                (res) => {
                    this.isLoading = false;
                    this._changeDetectorRef.detectChanges();
                    this.getAllUsers();
                    this.newUserForm.reset();
                    this.imagePreview = null;

                    this.openSnackBar('User created successfully', 'success');
                    // redirect to the new user
                    this.router.navigate(['/users/accounts', res.id]);
                },
                (error) => {
                    this.isLoading = false;
                    this._changeDetectorRef.detectChanges();
                    this.openSnackBar('Error creating user', 'error');
                    console.log('error', error);
                }
            );
        }
    }

    /**
     * -----------
     * Snackbar
     * -----------
     */
    openSnackBar(message, classe) {
        this._snackBar.open(message, 'Ok', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 7 * 1000,
            panelClass: [classe],
        });
    }

    /**
     * -----------
     * Apply filter
     * -----------
     */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.filteredSonicUsers = this.allSonicUsers.filter((user) => {
            return (
                user.first_name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()) ||
                user.last_name
                    .toLowerCase()
                    .includes(filterValue.toLowerCase()) ||
                user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.username.toLowerCase().includes(filterValue.toLowerCase())
            );
        });

        if (filterValue === '') {
            this.filteredSonicUsers = this.allSonicUsers;
        }
    }

    /**
     * -----------
     * Filter by role
     * -----------
     */
    filterByRole(role: string) {
        if (role === 'all') {
            this.filteredSonicUsers = this.allSonicUsers;
            return;
        }
        if (role === '') {
            this.filteredSonicUsers = this.allSonicUsers;
            return;
        }
        if (role === 'No role') {
            this.filteredSonicUsers = this.allSonicUsers.filter((user) => {
                return !user.role_details;
            });
            return;
        }
        this.filteredSonicUsers = this.allSonicUsers.filter((user) => {
            if (user.role_details) {
                return user.role_details.name === role;
            }
        });
        console.log('filteredSonicUsers', this.filteredSonicUsers);
        console.log('role', role);
    }
}
