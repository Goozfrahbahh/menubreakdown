import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/messages.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styles: [
    `
      #scroll::-webkit-scrollbar {
        width: 4px;
        cursor: pointer;
        /*background-color: rgba(229, 231, 235, var(--bg-opacity));*/
      }
      #scroll::-webkit-scrollbar-track {
        background-color: rgba(229, 231, 235, var(--bg-opacity));
        cursor: pointer;
        /*background: red;*/
      }
      #scroll::-webkit-scrollbar-thumb {
        cursor: pointer;
        background-color: #a0aec0;
        /*outline: 1px solid slategrey;*/
      }
    `,
  ],
})
export class MessagesComponent implements OnInit {
  logs: string[] = [];
  opened: boolean = false;

  private destroy$ = new Subject<void>();
  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.messageService.log$
      .pipe(takeUntil(this.destroy$))
      .subscribe((logs) => (this.logs = logs));
  }

  trackById(index: number, message: any) {
    return message[index];
  }

  onClick(log: any) {
    const data = JSON.stringify(log);

    console.log(data);
  }
}
