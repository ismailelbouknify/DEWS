import { NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
// import { FileManagerService } from 'app/modules/admin/apps/file-manager/file-manager.service';
// import { Item } from 'app/modules/admin/apps/file-manager/file-manager.types';
// import { FileManagerListComponent } from 'app/modules/admin/apps/file-manager/list/list.component';
import { Subject, takeUntil } from 'rxjs';
import { AccountDetailsComponent } from '../account-details/account-details.component';

@Component({
    selector: 'account-sensors-details',
    templateUrl: './account-sensors-details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatButtonModule, RouterLink, MatIconModule, NgIf],
})
export class AccountSensorsDetailsComponent implements OnInit, OnDestroy {
    item: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _accountDetailsComponent: AccountDetailsComponent // private _fileManagerService: FileManagerService,
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Open the drawer
        this._accountDetailsComponent.matDrawer.open();

        // Get the item
        // this._fileManagerService.item$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((item: Item) =>
        //     {
        //         // Open the drawer in case it is closed
        //         this._accountDetailsComponent.matDrawer.open();

        //         // Get the item
        //         this.item = item;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._accountDetailsComponent.matDrawer.close();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
