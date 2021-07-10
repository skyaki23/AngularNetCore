import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  listItems: Item[] = [];

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._itemService.getListItems().subscribe(
      data => {
        this.listItems = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteItem(id: any) {
    this._itemService.deleteItem(id).subscribe(
      data => {
        this.getItems();
      },
      error => {
        console.log(error);
      }
    );
  }

}
