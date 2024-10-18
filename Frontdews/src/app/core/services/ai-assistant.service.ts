// src/app/services/ai-assistant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8000/chat/';

  constructor(private http: HttpClient) { }

  sendMessage(userInput: string, conversationHistory: any[]): Observable<any> {
    return this.http.post(this.apiUrl, { user_input: userInput, conversation_history: conversationHistory });
  }
}
