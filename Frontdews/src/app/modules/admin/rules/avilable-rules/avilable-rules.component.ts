import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RulesService } from 'app/core/services/rules.service';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'apexcharts';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector     : 'home',
    standalone   : false,
    templateUrl  : './avilable-rules.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AvilableRulesComponent
{
    /**
     * Constructor
     */
    @ViewChild('recentTransactionsTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;

    data: any;
    accountBalanceOptions: ApexOptions;
    rulesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    public rulesTableColumns: string[] = ['id_eleve', 'id_annee', 'Level', 'MoyenneGen_i1'];
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    /**
     * Constructor
     */
    constructor(private _rulesService: RulesService)
    {
    }

    ngOnInit(): void
    {
        // Get the data
        this._rulesService.avilableRulesData$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) =>
            {
                // Store the data
                this.data = data;
                console.log(data)

                // Store the table data
                this.rulesDataSource.data = data.recentTransactions;

                // Prepare the chart data
                this._prepareChartData();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */


    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Make the data source sortable
        this.rulesDataSource.sort = this.recentTransactionsTableMatSort;
    }

    /**
     * On destroy
     */


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // Account balance
        this.accountBalanceOptions = {
            chart  : {
                animations: {
                    speed           : 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                width     : '100%',
                height    : '100%',
                type      : 'area',
                sparkline : {
                    enabled: true,
                },
            },
            colors : ['#A3BFFA', '#667EEA'],
            fill   : {
                colors : ['#CED9FB', '#AECDFD'],
                opacity: 0.5,
                type   : 'solid',
            },
            series : this.data.accountBalance.series,
            stroke : {
                curve: 'straight',
                width: 2,
            },
            tooltip: {
                followCursor: true,
                theme       : 'dark',
                x           : {
                    format: 'MMM dd, yyyy',
                },
                y           : {
                    formatter: (value): string => value + '%',
                },
            },
            xaxis  : {
                type: 'datetime',
            },
        };
    }

}
