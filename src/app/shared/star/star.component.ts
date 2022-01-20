import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input()
  rating = 1;
  starWidth = 0;

  @Output()
  ratingClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.starWidth = this.rating * 120 / 5;
  }

  ratingSelected() {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
