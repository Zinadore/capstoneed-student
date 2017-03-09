import { Component, OnInit, Input } from '@angular/core';
import { ComponentBase } from '../../../../shared/Directives/componentBase';
import { Unit } from '../../../../shared/Store/Models/unit';

@Component({
  selector: 'ced-unit-list-item',
  templateUrl: 'unit-list-item.component.html',
  styleUrls: ['unit-list-item.component.scss'],
  host: {
    class: 'row'
  }
})
export class UnitListItemComponent extends ComponentBase implements OnInit {

  @Input('unit') _unit_input: Unit;

  constructor() {
    super();
  }

  ngOnInit() {
  }


}
