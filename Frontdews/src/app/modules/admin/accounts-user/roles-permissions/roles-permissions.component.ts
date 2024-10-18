import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Permission } from 'app/core/models/permission';
import { SonicUser } from 'app/core/models/sonicUser';

@Component({
    selector: 'app-accounts-user-roles-permissions',
    templateUrl: './roles-permissions.component.html',
    styleUrls: ['./roles-permissions.component.scss'],
})
export class RolesPermissionsComponent {
    @Input() sonicUser: SonicUser;
    @Input() authPermissions: any[];
    @Input() editPermissions: Permission[];
    @Input() viewPermissions: Permission[];
    @Output() trackByFn = new EventEmitter<any>();
}
