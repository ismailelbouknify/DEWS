import { DatePipe, NgClass, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AIConversationType } from '../ai-assistant.types';

@Component({
    selector: 'app-ai-assistant-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        NgIf,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        NgClass,
        RouterLink,
        DatePipe,
    ],
})
export class SidebarItemComponent {
    @Input() conversation: AIConversationType;
    @Input() isSelected: boolean = false;
    @Output() selectConversation = new EventEmitter<string>();

    onSelectConversation(id: string): void {
        this.selectConversation.emit(id);
    }
}
