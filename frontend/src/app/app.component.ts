import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { SseService } from "./sse.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  messages: string[] = [
    "This is a message from the component",
    "This is another message from the component",
  ];
  subscription: Subscription;

  constructor(private sseService: SseService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.sseService.getServerSentEvents().subscribe(
      (event: MessageEvent) => {
        this.messages.push(event.data.toString());
        this.cdr.detectChanges();
      },
      (error) => {
        console.error("Error receiving SSE: ", error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
/*
write template in frontend/src/app/sse-component/sse-component.component.html:
<h1>Server Sent Events</h1>
<ul>
  <li *ngFor="let message of messages">{{ message }}</li>
</ul>
*/
