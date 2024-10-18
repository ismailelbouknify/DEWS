import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
// import { AiAssistantModule } from '../../ai-assistant.module';
// import { AiAssistantComponent } from './modules/admin/ai-assistant/ai-assistant.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.routes'),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.routes'),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.routes'
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/admin/home/home.module').then(
                        (m) => m.HomeModule),
            },
            {
                path: 'charts',
                loadChildren: () =>
                    import('app/modules/admin/charts/charts.module').then(
                        (m) => m.ChartsModule),
            },
            {
                path: 'analytics',
                loadChildren: () =>
                    import('app/modules/admin/analytics/analytics.routes'),
            },
            
            
            {
                path: 'node',
                loadChildren: () =>
                    import('./modules/admin/node/node.module').then(
                        (m) => m.NodeModule
                    ),
            },
            {
                path: 'chat',
                loadChildren: () =>
                    import('./modules/admin/chat/chat.module').then(
                        (m) => m.ChatModule
                    ),
            },
            {
                path: 'students',
                loadChildren: () =>
                    import('./modules/admin/students/students.module').then(
                        (m) => m.StudentsModule
                )},
            {
                path: 'rules',
                loadChildren: () =>
                    import('./modules/admin/rules/rules.module').then(
                        (m) => m.RulesModule
                    ),
            },
            {
            path: 'schools',
            loadChildren: () =>
                import('./modules/admin/schools/schools.module').then(
                    (m) => m.SchoolsModule
                ),
        },
            // {
            //     path: 'ai-assistant',
            //     component: AiAssistantComponent,
            // },
            

           

        ],
    },
];
