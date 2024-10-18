import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AnalyticsComponent } from 'app/modules/admin/analytics/analytics.component';
import { AnalyticsService } from 'app/modules/admin/analytics/analytics.service';

export default [
    {
        path     : '',
        component: AnalyticsComponent,
        resolve  : {
            data: () => inject(AnalyticsService).getData(),
        },
    },
] as Routes;
