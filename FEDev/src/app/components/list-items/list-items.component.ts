import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  listItems: Item[] = [];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  columns: string[] = ['brandName', 'processor', 'mainMemory', 'hardDrive', 'graphicsCard', 'screenSize', 'price', 'action'];

  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor(private _itemService: ItemService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._itemService.getListItems().subscribe(
      data => {
        this.listItems = data;
        this.dataSource = new MatTableDataSource(this.listItems);
      },
      error => {
        this.toastr.error('發生錯誤', '錯誤');
        console.log(error);
      }
    );
  }

  deleteItem(id: any) {
    this._itemService.deleteItem(id).subscribe(
      data => {
        this.getItems();
        this.toastr.error('產品代碼: ' + id + ' 已刪除', '刪除成功');
      },
      error => {
        this.toastr.error('發生錯誤', '錯誤');
        console.log(error);
      }
    );
  }

}
