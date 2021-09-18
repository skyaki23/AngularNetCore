import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';
import * as XLSX from 'xlsx';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  listItems: Item[] = [];
  listItems_default: Item[] = [];
  dataSource: MatTableDataSource<Item> = new MatTableDataSource();
  
  columns: string[] = ['brandName', 'processor', 'mainMemory', 'hardDrive', 'graphicsCard', 'screenSize', 'price', 'action'];

  _sort?: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
    this._sort = sort;
  }

  _paginator?: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
    this._paginator = paginator;
  }

  minPrice = 0;
  maxPrice = 0;
  stepValue = 1000;
  currentPrices = [this.minPrice, this.maxPrice];

  keyWords: string[] = [];
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private _itemService: ItemService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setSliderRange();
    this.getItems();
  }

  getItems() {
    this._itemService.getListItems().subscribe(
      data => {
        this.listItems = data;
        this.listItems_default = data;
        this.dataSource = new MatTableDataSource(this.listItems_default);
        this.dataSource.sort = (this._sort as MatSort);
        this.dataSource.paginator = (this._paginator as MatPaginator);
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

  applyFilter() {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim();

    this.listItems = this.listItems_default.filter(item => 
      (item.price as number) >= this.currentPrices[0] && (item.price as number) <= this.currentPrices[1]);

    const dataSoruceTemp = new MatTableDataSource<Item>(this.listItems);
    for (var keyWord of this.keyWords) {
      dataSoruceTemp.filter = keyWord.trim();
      const dataSourceInsidTemp = new MatTableDataSource<Item>(dataSoruceTemp.filteredData);
      dataSoruceTemp.data = dataSourceInsidTemp.data;
      dataSoruceTemp.filteredData = dataSourceInsidTemp.filteredData;
    }

    this.dataSource.data = dataSoruceTemp.data;
    this.dataSource.filteredData = dataSoruceTemp.filteredData;
  }

  xlsxExport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.listItems);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const xlsxName = 'NBData.xlsx';
    XLSX.utils.book_append_sheet(wb, ws, xlsxName);
    XLSX.writeFile(wb, xlsxName);
  }

  setSliderRange() {
    this._itemService.getItemMinMaxPrice().subscribe(
      data => {
        this.minPrice = data[0];
        this.maxPrice = data[1];
        this.currentPrices = [this.minPrice, this.maxPrice];
      },
      error => {
        console.log(error);
      }
    );
  }

  onSliderChange(selectedValues: number[]) {
    this.currentPrices = selectedValues;

    this.listItems = this.listItems_default.filter(item => 
      (item.price as number) >= this.currentPrices[0] && (item.price as number) <= this.currentPrices[1]);
    
      const dataSoruceTemp = new MatTableDataSource<Item>(this.listItems);
      for (var keyWord of this.keyWords) {
        dataSoruceTemp.filter = keyWord.trim();
        const dataSourceInsidTemp = new MatTableDataSource<Item>(dataSoruceTemp.filteredData);
        dataSoruceTemp.data = dataSourceInsidTemp.data;
        dataSoruceTemp.filteredData = dataSourceInsidTemp.filteredData;
      }
  
      this.dataSource.data = dataSoruceTemp.data;
      this.dataSource.filteredData = dataSoruceTemp.filteredData;
  }

  removeKeyWord(removeKeyWord: string) {
    const index = this.keyWords.indexOf(removeKeyWord, 0);
    if (index > -1) {
      this.keyWords.splice(index, 1);
    }

    this.applyFilter();
  }

  addKeyWord($event: MatChipInputEvent) {
    if (($event.value || '').trim()) {
      this.keyWords = [...this.keyWords, $event.value.trim()];
    }

    $event.value = '';
    $event.input.value = '';

    this.applyFilter();
  }
}