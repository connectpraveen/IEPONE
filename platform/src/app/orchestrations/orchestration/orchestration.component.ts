import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/orchestration/message.service';
import { Message } from '../../services/orchestration/message';

@Component({
  selector: 'app-orchestration',
  templateUrl: './orchestration.component.html',
  styleUrls: ['./orchestration.component.css'],
  providers:[MessageService]
})
export class OrchestrationComponent implements OnInit {
messages: Message[];
  constructor(private mesagService: MessageService) { }

  ngOnInit() {
    this.messages = this.mesagService.getMessages();
  }

}
