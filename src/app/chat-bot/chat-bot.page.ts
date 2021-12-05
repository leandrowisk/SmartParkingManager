import {Component,
        OnInit, 
        ChangeDetectorRef }   from '@angular/core';
import { Location }           from '@angular/common';
import { ChatService }        from '../services/chat.service';
import { MenuService }        from '../services/menu.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {

  public message: string = '';
  public messageSend: string = '';
  public messages: Array<any>;
  public sound: any;
  public userMessage: boolean = false;
  public chatMessage: boolean = false;
  public loading: boolean = false;
  public returnMensage: String = ""
  public isMenuOpen: boolean = false;
  constructor(
              private changeDetector: ChangeDetectorRef,
              private location: Location,
              private chatService: ChatService,
              private menuService: MenuService
              ) { }

  ngOnInit() {
    this.refreshChat();
    this.resize();
  }

  resize() {
    this.menuService.isMenuOpen.subscribe(isOpen => {
        this.isMenuOpen = isOpen;
      })   
  }

  ngAfterViewInit() {
    this.refreshChat();
    this.scroll();
    this.changeDetector.detectChanges();
  }

  comeMessageSound() {
    this.sound = new Audio();
    this.sound.src = '../../assets/sounds/chat-message.wav'; 
    this.sound.play();
  }

  refreshChat() {
    this.message = '';
    this.messages = [];
  }

  scroll() {
    let container = document.getElementById('container-messages');
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    },0.5)
  }

  sendMessage() {
    if (this.chatMessage)
      this.chatMessage = false
    this.userMessage = true;
    this.messageSend = this.message;
    this.chatService.toChat(this.message).subscribe(response =>{
      this.returnMensage = response;
      console.log(response);
      this.messageChat(this.returnMensage);
    });
    this.message = '';
    this.messages.push({
      text: this.messageSend,
      class: 'user-message'
    });
    this.loading = true;
    this.scroll();
  }

  close() {
    this.location.back();
  }

  messageChat(message) {
    this.loading = true;
    if (this.userMessage)
      this.userMessage = false;
    this.chatMessage = true;
    this.messages.push({
      text: message,
      class: 'chat-message'
    });
    this.comeMessageSound();
    this.loading = false;
    this.scroll();
    this.changeDetector.detectChanges();
  }

}
