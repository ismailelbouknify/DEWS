import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SonicUser } from 'app/core/models/sonicUser';

@Component({
    selector: 'app-accounts-user-sensors',
    templateUrl: './sensors.component.html',
    styleUrls: ['./sensors.component.scss'],
})
export class SensorsComponent implements OnInit {
    @Input() sonicUser: SonicUser;
    @Output() selectSensor = new EventEmitter<any>();

    onSelectSensor(service: any): void {
        this.selectSensor.emit(service);
    }

    ngOnInit() {}
}
