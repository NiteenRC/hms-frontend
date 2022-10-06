import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertyService } from 'src/app/_services/property.service';

@Component({
    selector: 'app-create-property',
    templateUrl: './create-property.component.html',
    styleUrls: ['./create-property.component.css']
})
export class CreatePropertyComponent implements OnInit {
    myControl = new FormControl();
    dataForm: FormGroup;
    updateForm: any;
    successMsg: any;
    errorMsg: any;
    singleClickDisable = false;

    selected_dropdown: string;

    constructor(private propertyService: PropertyService,
        public dialogRef: MatDialogRef<CreatePropertyComponent>,
        @Inject(MAT_DIALOG_DATA) private data) {
        this.dataForm = new FormGroup({
            code: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            status: new FormControl(this.selected_dropdown = "Active"),
            createdDate: new FormControl(new Date(), [Validators.required]),
        });

        if (data !== null && data.data !== null) {
            this.updateForm = data?.data;
            this.dataForm.controls['code'].setValue(this.updateForm.code);
            this.dataForm.controls['name'].setValue(this.updateForm.name);
            this.dataForm.controls['createdDate'].setValue(this.updateForm.createdDate);
            this.selected_dropdown = this.updateForm.status;
        }
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

    onSubmit() {
        if (this.dataForm.valid) {
            if (this.updateForm?.id != null) {
                this.update();
            } else {
                this.save();
            }
        }
    }

    save() {
        this.singleClickDisable = true;
        let data = {
            code: this.dataForm.controls.code.value,
            name: this.dataForm.controls.name.value,
            status: this.selected_dropdown,
            createdDate: this.dataForm.controls.createdDate.value,
        };

        this.propertyService.save(data).subscribe(res => {
            if (res != null) {
                this.successMsg = 'Successfully Updated..!';
                this.closeModal();
                this.singleClickDisable = false;
            }
        }, error => {
            this.errorMsg = error.error.errorMessage;
            this.singleClickDisable = false;
        });
    }

    update() {
        let data = {
            id: this.updateForm.id,
            code: this.dataForm.controls.code.value,
            name: this.dataForm.controls.name.value,
            status: this.selected_dropdown,
            createdDate: this.dataForm.controls.createdDate.value,
        };

        this.propertyService.update(data).subscribe(res => {
            if (res != null) {
                this.successMsg = 'Successfully Created..!';
                this.closeModal();
            }
        }, error => {
            this.errorMsg = error.error.errorMessage;
        });
    }

    changeDropdown(selected: string): void {
        this.selected_dropdown = selected;
    }
}
