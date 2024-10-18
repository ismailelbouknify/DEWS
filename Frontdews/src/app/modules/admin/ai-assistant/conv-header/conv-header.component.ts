import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AIConversationType } from '../ai-assistant.types';

@Component({
    selector: 'app-ai-assistant-conv-header',
    templateUrl: './conv-header.component.html',
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
export class ConvHeaderComponent {
    @Input() selectedConversation: AIConversationType;
}
