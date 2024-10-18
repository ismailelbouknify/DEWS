import { NgClass, NgFor, NgIf } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// import { ProfileComponent } from '../users/accounts-user/profile/profile.component';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { AIConversationType, Chat, Profile } from './ai-assistant.types';
import { ChatService } from './ai-assistant.service';
// import { AiAssistantSettingsComponent } from './settings/settings.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { HeaderComponent } from './header/header.component';
import { ConvHeaderComponent } from './conv-header/conv-header.component';

const dummyHistoryConversation: AIConversationType[] = [
    {
        id: '1',
        title: 'Conversation 1',
        created_at: '2021-07-01T00:00:00Z',
        history: [],
    },
    {
        id: '2',
        title: 'Conversation 2',
        created_at: '2021-07-02T00:00:00Z',
        history: [],
    },
    {
        id: '3',
        title: 'Conversation 3',
        created_at: '2021-07-03T00:00:00Z',
        history: [],
    },
    {
        id: '4',
        title: 'Conversation 4',
        created_at: '2021-07-04T00:00:00Z',
        history: [],
    },
    {
        id: '5',
        title: 'Conversation 5',
        created_at: '2021-07-05T00:00:00Z',
        history: [],
    },
];

@Component({
    selector: 'ai-assistant',
    templateUrl: './ai-assistant.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatSidenavModule,
        NgIf,
        // AiAssistantSettingsComponent,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        NgFor,
        NgClass,
        RouterLink,
        RouterOutlet,
        SidebarItemComponent,
        HeaderComponent,
        ConvHeaderComponent,
    ],
})
export class AiAssistantComponent implements OnInit, OnDestroy {
    chats: Chat[];
    drawerComponent: 'new-chat' | 'settings';
    drawerOpened: boolean = false;
    filteredChats: Chat[];
    profile: Profile;
    selectedChat: Chat;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public selectedConversation: AIConversationType;
    public allConversations: AIConversationType[] = [];
    public newConversation: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * Start new conversation
     */
    startNewConversation(): void {
        this.selectedConversation = null;
        this.newConversation = true;
    }
    /**
     * On init
     */
    ngOnInit(): void {
        // Chats
        this._chatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: Chat[]) => {
                this.chats = this.filteredChats = chats;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
        // set the selected conversation
        this.allConversations = dummyHistoryConversation;

        // Profile
        this._chatService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profile: Profile) => {
                this.profile = profile;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Selected chat
        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: Chat) => {
                this.selectedChat = chat;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Reset the chat
        this._chatService.resetChat();
    }

    /**
     * Set the selected conversation
     * TODO: Implement this method
     */
    selectConversation(id: string): void {
        this.selectedConversation = dummyHistoryConversation.find(
            (conversation) => conversation.id === id
        );
        console.log(id);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter the chats
     *
     * @param query
     */
    filterChats(query: string): void {
        // Reset the filter
        if (!query) {
            this.filteredChats = this.chats;
            return;
        }

        this.filteredChats = this.chats.filter((chat) =>
            chat.contact.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    /**
     * Open the new chat sidebar
     */
    openNewChat(): void {
        this.drawerComponent = 'new-chat';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Open the profile sidebar
     */
    openSettings(): void {
        this.drawerComponent = 'settings';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
