import { NgModule }                        from '@angular/core';
import { MatTabsModule  }                  from "@angular/material/tabs";
import { MatAutocompleteModule }           from "@angular/material/autocomplete";
import { MatDividerModule}                 from '@angular/material/divider';
import { MatInputModule }                  from '@angular/material/input';
import { MatFormFieldModule }              from '@angular/material/form-field';
import { MatIconModule }                   from '@angular/material/icon';
import { MatButtonModule }                 from '@angular/material/button';
import { MatCheckboxModule }               from '@angular/material/checkbox';
import { MatSelectModule }                 from '@angular/material/select';
import { MatChipsModule }                  from '@angular/material/chips';
import { MatDatepickerModule }             from '@angular/material/datepicker';
import { MatNativeDateModule }             from '@angular/material/core';
import { MatMomentDateModule }             from '@angular/material-moment-adapter';
import { MatProgressSpinnerModule }        from '@angular/material/progress-spinner';
import { MAT_DATE_LOCALE }                 from '@angular/material/core';
import { MatSnackBarModule }               from '@angular/material/snack-bar';
import { MatTableModule }                  from '@angular/material/table';
import { MatCardModule }                   from '@angular/material/card';
import { MatDialogModule }                 from '@angular/material/dialog';
import { MatStepperModule }                from '@angular/material/stepper';
import { MatPaginatorModule }              from '@angular/material/paginator';


@NgModule({
  exports: [
     MatTabsModule,
     MatAutocompleteModule,
     MatDividerModule,
     MatInputModule,
     MatFormFieldModule,
     MatIconModule,
     MatButtonModule,
     MatCheckboxModule,
     MatSelectModule,
     MatChipsModule,
     MatDatepickerModule,
     MatNativeDateModule, 
     MatMomentDateModule,
     MatProgressSpinnerModule,
     MatSnackBarModule,
     MatTableModule,
     MatCardModule,
     MatDialogModule,
     MatStepperModule,
     MatPaginatorModule
    ],
    providers: [
      { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ]
})
export class MaterialModule { }
