import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/Item';

@Component({
  selector: 'app-create-update-item',
  templateUrl: './create-update-item.component.html',
  styleUrls: ['./create-update-item.component.css']
})
export class CreateUpdateItemComponent implements OnInit {

  createItem: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createItem = this.fb.group({
      brand: ['', Validators.required],
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
    console.log(this.createItem);

    const item: Item = {
      brand: this.createItem.get('brand')?.value,
      processor: this.createItem.get('processor')?.value,
      mainMemory: this.createItem.get('mainMemory')?.value,
      hardDrive: this.createItem.get('hardDrive')?.value,
      graphicsCard: this.createItem.get('graphicsCard')?.value,
      screenSize: this.createItem.get('screenSize')?.value,
      price: this.createItem.get('price')?.value
    };

    console.log(item);
  }
}
