import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
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
import { debounceTime, map, Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SonicUser } from 'app/core/models/sonicUser';
import { SonicUserService } from 'app/core/services/school.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { ClusterType, NodeType, SensorType } from './account-details.type';

@Component({
    selector: 'accounts-details',
    standalone: false,
    templateUrl: './account-details.component.html',
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
export class AccountDetailsComponent implements OnInit {
    accountId: string;
    // public createForm: FormGroup;
    // sonicUsers$: Observable<SonicUser[]>;
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    drawerMode: 'side' | 'over';
    public sonicUser: SonicUser;
    public viewPermissions: Permission[];
    public editPermissions: Permission[];
    public authPermissions: Permission[];
    public updateUserForm: FormGroup;
    // searchInputControl: UntypedFormControl = new UntypedFormControl();
    // selectedRoleForm: UntypedFormGroup;
    // selectedRole: Role | null = null;
    // filteredPermissions: Permission[];
    // permissions: Permission[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    // permissionsEditMode: boolean = false;
    isLoading: boolean = false;
    public editMode: boolean = false;
    imagePreview: string | ArrayBuffer;
    selectedFile: File;
    public selectedSensor: SensorType;
    public selectedCluster: ClusterType;
    public selectedNode: NodeType;

    constructor(
        private route: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: UntypedFormBuilder,
        private service: SonicUserService,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _snackBar: MatSnackBar,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.updateUserForm = this._formBuilder.group({
            username: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            photo: [''],
        });
    }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            // Retrieve the id parameter from the URL
            this.accountId = params['id'];
        });
        this.getUserById();
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
                this.updateUserForm.patchValue({
                    photo: reader.result,
                });
                // need to run CD since file load runs outside of zone
                this._changeDetectorRef.markForCheck();
            };
        }
    }

    /**
     * -----------
     * Get user by id
     * -----------
     */
    getUserById() {
        this.isLoading = true;
        this.service.profile(this.accountId).subscribe(
            (res) => {
                this.sonicUser = res;
                this.isLoading = false;
                this._changeDetectorRef.detectChanges();
                this.getPermissionsGroups();
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
     * Filter permissions to 3 groups, Auth, Edit and View
     * -----------
     */
    getPermissionsGroups() {
        this.viewPermissions = this.sonicUser.role_details.permissions.filter(
            (permission) =>
                permission.name.includes('view') ||
                permission.name.includes('View')
        );
        this.editPermissions = this.sonicUser.role_details.permissions.filter(
            (permission) =>
                permission.name.includes('edit') ||
                permission.name.includes('Edit')
        );
        this.authPermissions = this.sonicUser.role_details.permissions.filter(
            (permission) =>
                permission.name.includes('auth') ||
                permission.name.includes('Auth')
        );
        console.log('viewPermissions', this.viewPermissions);
        console.log('editPermissions', this.editPermissions);
        console.log('authPermissions', this.authPermissions);
        console.log('role_details', this.sonicUser.role_details);
    }

    /**
     * -----------
     * toggleEditMode
     * -----------
     */
    toggleEditMode() {
        this.editMode = !this.editMode;
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
     * uploadProfilePhoto
     * -----------
     */
    uploadProfilePhoto(event) {
        const file: File = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.updateUserForm.patchValue({ photo: file });

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
     * Update user
     * -----------
     */
    updateUser() {
        this.isLoading = true;
        const formData = new FormData();
        formData.append('username', this.updateUserForm.value.username);
        formData.append('first_name', this.updateUserForm.value.first_name);
        formData.append('last_name', this.updateUserForm.value.last_name);
        formData.append('email', this.updateUserForm.value.email);
        formData.append('phone', this.updateUserForm.value.phone);
        formData.append('photo', this.selectedFile);

        this.service.update(this.accountId, formData).subscribe(
            (res) => {
                this.isLoading = false;
                this.openSnackBar('User updated successfully', 'success');
                this.getUserById();
            },
            (error) => {
                this.isLoading = false;
                this.openSnackBar('Error updating user', 'faild');
                console.log('error', error);
            }
        );
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Open mat drawer
     */
    openMatDrawer() {
        this.matDrawer.open();
    }

    /**
     * Close mat drawer
     */
    closeMatDrawer() {
        this.matDrawer.close();
        this.selectedSensor = null;
        this.selectedCluster = null;
        this.selectedNode = null;
    }

    /**
     * Select specific sensor
     */
    selectSensor(sensor: SensorType) {
        this.selectedSensor = sensor;
        console.log('selectedSensor', this.selectedSensor);
        this.openMatDrawer();
    }
}
