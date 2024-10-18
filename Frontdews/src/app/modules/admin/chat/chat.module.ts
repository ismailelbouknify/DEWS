import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ChatRoutingModule
  ],
  providers: [],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
