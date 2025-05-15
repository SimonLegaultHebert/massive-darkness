import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-bar',
  standalone: false,
  templateUrl: './life-bar.component.html',
  styleUrl: './life-bar.component.scss'
})
export class LifeBarComponent implements OnInit, OnChanges {

  @Input() maxLife!: number;
  @Input() currentLife!: number;
  @Input() index!: any;

  calculatedWidth!: number

  constructor() { }

  ngOnInit(): void {
    this.calculatedWidth = this.currentLife / this.maxLife * 100;
  }

  ngOnChanges(): void {
    this.calculatedWidth = this.currentLife / this.maxLife * 100;
  }

}
