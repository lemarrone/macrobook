import { Component, OnInit, ViewChild } from '@angular/core';
import { MacroService } from '../macro.service';
import { Macro } from '../model/macro';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from "@angular/cdk/collections";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  macrosArray: Macro[];
  macroSelecionada: Macro = new Macro;
  dataSource: MatTableDataSource<Macro>;
  isLoadingResults = false;
  selectedRowIndex: number = -1;
  src = "assets/pdf/macro.pdf";


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'macro'];

  constructor(
    private service: MacroService
  ) { }

  ngOnInit() {
    this.getMacros();
  }

  public getMacros = () => {
    this.isLoadingResults = true;
    this.service.getMacros()
      .subscribe(res => {
        console.log(res);
        this.macrosArray = res;
        this.dataSource = new MatTableDataSource(res as Macro[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  highlight(row, index) {
    this.selectedRowIndex = row.id;
    this.macroSelecionada = this.macrosArray.find(x => x.id == row.id);   
  }

}

export interface Element {
  checked: boolean;
  name: string;
  position: number;
  weight: number;
  symbol: string;
  highlighted?: boolean;
  hovered?: boolean;
}


