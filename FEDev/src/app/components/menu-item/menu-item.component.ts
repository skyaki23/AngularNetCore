import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  id: number;
  item: Item | undefined;

  constructor(private aRoute: ActivatedRoute,
              private _itemService: ItemService) {
    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getItem();
  }

  getItem() {
    this._itemService.getItem(this.id).subscribe(
      data => {
        this.item = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
