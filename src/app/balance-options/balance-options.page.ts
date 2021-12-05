import { Component, Inject, 
         OnInit }                          from '@angular/core';
import { MatDialogRef, 
         MAT_DIALOG_DATA}                  from '@angular/material/dialog';

@Component({
  selector: 'app-balance-options',
  templateUrl: './balance-options.page.html',
  styleUrls: ['./balance-options.page.scss'],
})
export class BalanceOptionsPage implements OnInit {

  public viewType: string;
  public viewMode: number;
  public threeMonths: boolean = false;
  public sixMonths: boolean = false;
  public twelveMonths: boolean = false;
  public threeDays: boolean = false;
  public fiveDays: boolean;
  public sevenDays: boolean = false;
  public hasMonthlyModeSelected: boolean = true;
  public hasDailyModeSelected: boolean = true;
  public monthlyModeSelected: string;
  public dailyModeSelected: string;
  public count: number = 0;
  public updateMode: number;

  constructor(public dialogRef: MatDialogRef<BalanceOptionsPage>,
              @Inject(MAT_DIALOG_DATA) public data) {
              this.dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.viewType = this.data.viewType;
    this.viewMode =  this.data.viewMode;
    this.getViewMode();
    this.count += 1;
  }

  getViewMode() {
    if (this.viewType == 'monthly') {
      switch(this.viewMode) {
        case 3:
          this.threeMonths = true;
          break;
        case 6:
          this.sixMonths = true;
          break;
        case 12:
          this.twelveMonths = true;
          break;
      }
      this.hasMonthlyOptionSelected();
    }

    if (this.viewType == 'daily') {
      switch(this.viewMode) {
        case 2:
          this.threeDays = true;
          break;
        case 4:
          this.fiveDays = true;
          break;
        case 6:
          this.sevenDays = true;
          break;
      }
      this.hasDailyOptionSelected();
    }
  }

  hasMonthlyOptionSelected() {
    if (!this.threeMonths && !this.sixMonths && !this.twelveMonths){
      this.hasMonthlyModeSelected = false;
    } 
    else {
      if (this.threeMonths)
        this.monthlyModeSelected = 'three';
      else if (this.sixMonths)
        this.monthlyModeSelected = 'six';
      else if (this.twelveMonths)
        this.monthlyModeSelected = 'twelve';
      console.log(this.monthlyModeSelected)
      this.hasMonthlyModeSelected = true;
    }
  }

  hasDailyOptionSelected() {
    if (!this.threeDays && !this.fiveDays && !this.sevenDays) {
      this.dailyModeSelected = '';
      this.hasDailyModeSelected = false;
    } 
    else {
      if (this.threeDays) {
        this.dailyModeSelected = 'three';
        this.hasDailyModeSelected = true;
      }
      else if (this.fiveDays) {
        this.dailyModeSelected = 'five';
        this.hasDailyModeSelected = true;
      }
      else if (this.sevenDays) {
        this.dailyModeSelected = 'seven'; 
        this.hasDailyModeSelected = true;
      }
      else
        this.hasDailyModeSelected = false;   
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  setSendMode() {
    if(this.viewType == 'daily') {
      switch(this.dailyModeSelected) {
        case 'three':
          this.updateMode = 2;
          break;
          case 'five':
            this.updateMode = 4;
            break;
            case 'seven':
              this.updateMode = 6;
              break
      }
    }
    if(this.viewType == 'monthly') {
      switch(this.dailyModeSelected) {
        case 'three':
          this.updateMode = 3;
          break;
          case 'six':
            this.updateMode = 6;
            break;
            case 'twelve':
              this.updateMode = 12;
              break
      }
  }
  }

  saveDailyOption() {
    this.setSendMode();
    this.dialogRef.close({data: this.viewType});
  }

  saveMonthlyOption() {
    this.setSendMode();
    this.dialogRef.close({data: this.viewType});
  }
}
