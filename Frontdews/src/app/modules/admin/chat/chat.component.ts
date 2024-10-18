import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Message {
  sender: string;
  content: string;
}

interface Conversation {
  title: string;
  messages: Message[];
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userInput: string = '';
  conversations: Conversation[] = [
    { title: 'Conversation 1', messages: [{ sender: 'AI', content: 'Welcome to the conversation!' }] }
  ];
  currentConversation: Conversation = this.conversations[0];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Fetch initial chat history or load from memory if applicable
  }

  loadConversation(conversation: Conversation): void {
    this.currentConversation = conversation;
  }

  newConversation(): void {
    const newConv = { title: `Conversation ${this.conversations.length + 1}`, messages: [] };
    this.conversations.push(newConv);
    this.currentConversation = newConv;
  }

  sendMessage(): void {
    if (this.userInput.trim() !== '') {
      // Add user message to chat history
      this.currentConversation.messages.push({ sender: 'User', content: this.userInput });

      // Send message to backend
      this.http.post<any>('http://localhost:8000/api/chat/', { input: this.userInput }).subscribe(
        (data) => {
          // Add AI response to chat history
          this.currentConversation.messages.push({ sender: 'AI', content: data.response });
          // Clear user input
          this.userInput = '';
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}
