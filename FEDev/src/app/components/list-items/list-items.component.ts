import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {

  listItems: Item[] = [
    { brandName: '微星(MSI)', processor: 'Intel Core i7-11800H', mainMemory: '16GB(8G*2) DDR4-3200', hardDrive: '1 TB M.2 SSD (NVMe PCIe)', graphicsCard: 'GeForce RTX 3070', screenSize: '15.6吋', price: 61900 },
    { brandName: '宏碁(ACER)', processor: 'Intel® Core™ i7-10750H', mainMemory: '1x 16GB DDR4', hardDrive: '512GB PCIe SSD', graphicsCard: 'NVIDIA® GeForce® RTX 2060', screenSize: '15.6吋', price: 38800 }
  ];

  constructor(private _itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._itemService.getListItems().subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
