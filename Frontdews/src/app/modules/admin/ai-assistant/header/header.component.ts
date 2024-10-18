import { NgClass, NgIf } from '@angular/common';
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
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-ai-assistant-header',
    templateUrl: './header.component.html',
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
        MatMenuModule,
    ],
})
export class HeaderComponent {
    @Input() selectedChat: any;
    @Output() openSettings = new EventEmitter<void>();
    @Output() filterChats = new EventEmitter<string>();
    @Output() startNewConversation = new EventEmitter<void>();

    onOpenSettings(): void {
        this.openSettings.emit();
    }

    onFilterChats(query: string): void {
        this.filterChats.emit(query);
    }

    onStartNewConversation(): void {
        this.startNewConversation.emit();
    }
}
