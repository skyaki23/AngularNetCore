import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-create-update-item',
  templateUrl: './create-update-item.component.html',
  styleUrls: ['./create-update-item.component.css']
})
export class CreateUpdateItemComponent implements OnInit {

  createItem: FormGroup;

  constructor(private fb: FormBuilder,
              private _itemService: ItemService,
              private router: Router) {
    this.createItem = this.fb.group({
      brandName: ['', Validators.required],
      processor: ['', Validators.required],
      mainMemory: ['', Validators.required],
      hardDrive: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      screenSize: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  create() {
    const item: Item = {
      brandName: this.createItem.get('brandName')?.value,
      processor: this.createItem.get('processor')?.value,
      mainMemory: this.createItem.get('mainMemory')?.value,
      hardDrive: this.createItem.get('hardDrive')?.value,
      graphicsCard: this.createItem.get('graphicsCard')?.value,
      screenSize: this.createItem.get('screenSize')?.value,
      price: this.createItem.get('price')?.value
    };

    this._itemService.createItem(item).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
