import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SseService {
  constructor() {}

  getServerSentEvents(): Observable<MessageEvent> {
    return new Observable((observer) => {
      const eventSource = new EventSource("http://localhost:3000/events");

      eventSource.onmessage = (event) => {
        observer.next(event);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
      };
    });
  }
}
