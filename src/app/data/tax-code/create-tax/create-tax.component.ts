import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { TaxService } from 'src/app/_services/tax.service';

@Component({
    selector: 'app-create-tax',
    templateUrl: './create-tax.component.html',
    styleUrls: ['./create-tax.component.css']
})
export class CreateTaxComponent implements OnInit {
    myControl = new FormControl();
    dataForm: FormGroup;
    updateForm: any;
    successMsg: any;
    errorMsg: any;
    singleClickDisable = false;

    selected_dropdown: string;

    constructor(private taxService: TaxService,
        public dialogRef: MatDialogRef<CreateTaxComponent>,
        @Inject(MAT_DIALOG_DATA) private data) {
        this.dataForm = new FormGroup({
            code: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            status: new FormControl(this.selected_dropdown = "Active"),
            createdDate: new FormControl(new Date(), [Validators.required]),
            taxApplicables: new FormControl(null)
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
        let taxApplicables = [];
        this.select.options.forEach((item: MatOption) => {
            if (item.selected) {
                //taxApplicables.push({ "name": item.viewValue });
                taxApplicables.push(item.viewValue);
            }
        });

        this.singleClickDisable = true;
        let data = {
            code: this.dataForm.controls.code.value,
            name: this.dataForm.controls.name.value,
            status: this.selected_dropdown,
            createdDate: this.dataForm.controls.createdDate.value,
            taxApplicables: taxApplicables,
        };

        this.taxService.save(data).subscribe(res => {
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
        let taxApplicables = [];
        this.select.options.forEach((item: MatOption) => {
            if (item.selected) {
                taxApplicables.push(item.viewValue);
            }
        });

        let data = {
            id: this.updateForm.id,
            code: this.dataForm.controls.code.value,
            name: this.dataForm.controls.name.value,
            status: this.selected_dropdown,
            createdDate: this.dataForm.controls.createdDate.value,
            taxApplicables: taxApplicables,
        };

        this.taxService.update(data).subscribe(res => {
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

    @ViewChild('select') select: MatSelect;

    allSelected = false;
    foods: any[] = [
        { viewValue: 'Banquet' },
        { viewValue: 'Point of sale' },
    ];

    toggleAllSelection() {
        if (this.allSelected) {
            this.select.options.forEach((item: MatOption) => item.select());
        } else {
            this.select.options.forEach((item: MatOption) => item.deselect());
        }
    }

    optionClick() {
        let newStatus = true;
        this.select.options.forEach((item: MatOption) => {
            if (!item.selected) {
                newStatus = false;
            }
        });
        this.allSelected = newStatus;
    }
}
