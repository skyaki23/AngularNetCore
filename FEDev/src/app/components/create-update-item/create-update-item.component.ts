import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/interfaces/Item';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-create-update-item',
  templateUrl: './create-update-item.component.html',
  styleUrls: ['./create-update-item.component.css']
})
export class CreateUpdateItemComponent implements OnInit {

  createItem: FormGroup;
  action = '新增產品';
  id = 0;
  item: Item | undefined;

  constructor(private fb: FormBuilder,
              private _itemService: ItemService,
              private router: Router,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.createItem = this.fb.group({
      brandName: ['', Validators.required],
      processor: ['', Validators.required],
      mainMemory: ['', Validators.required],
      hardDrive: ['', Validators.required],
      graphicsCard: ['', Validators.required],
      screenSize: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.update();
  }

  update() {
    if (this.id !== 0) {
      this.action = '修改產品';
      this._itemService.getItem(this.id).subscribe(
        data => {
          this.item = data; // 將data給變數item

          this.createItem.patchValue({
            brandName: data.brandName,
            processor: data.processor,
            mainMemory: data.mainMemory,
            hardDrive: data.hardDrive,
            graphicsCard: data.graphicsCard,
            screenSize: data.screenSize,
            price: data.price
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  createUpdateItem() {
    if (this.item == undefined) {
      //新增產品
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
          this.toastr.success('產品: ' + item.brandName + ' 已新增', '新增成功');
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error('發生錯誤', '錯誤');
          console.log(error);
        }
      );
    }
    else {
      //修改產品
      const item: Item = {
        id: this.item.id,
        brandName: this.createItem.get('brandName')?.value,
        processor: this.createItem.get('processor')?.value,
        mainMemory: this.createItem.get('mainMemory')?.value,
        hardDrive: this.createItem.get('hardDrive')?.value,
        graphicsCard: this.createItem.get('graphicsCard')?.value,
        screenSize: this.createItem.get('screenSize')?.value,
        price: this.createItem.get('price')?.value
      };

      this._itemService.updateItem(this.id, item).subscribe(
        data => {
          this.toastr.info('產品: ' + item.brandName + ' 已修改', '修改成功');
          this.router.navigate(['/']);
        },
        error => {
          this.toastr.error('發生錯誤', '錯誤');
          console.log(error);
        }
      );
    }
  }

}
