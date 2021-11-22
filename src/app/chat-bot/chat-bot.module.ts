import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { IonicModule }        from '@ionic/angular';
import { ChatBotPageRoutingModule } from './chat-bot-routing.module';
import { ChatBotPage }              from './chat-bot.page';
import { MaterialModule }           from '../material-module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatBotPageRoutingModule,
    MaterialModule
  ],
  declarations: [ChatBotPage],
  exports: [ChatBotPage]
})
export class ChatBotPageModule {}
