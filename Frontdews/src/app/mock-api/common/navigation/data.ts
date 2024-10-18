/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'Menu',
        title: 'Menu',
        subtitle: ' ',
        type: 'group',
        icon: 'heroicons_outline:home',
    },
    {
        id: 'home',
        title: 'Home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home',
    },
    {
        id: 'students',
        title: 'Students',
        type: 'basic',
        icon: 'heroicons_outline:academic-cap',
        link: '/students',
    },
   
    {
        id: 'analysis',
        title: 'Analysis',
        type: 'collapsable',
        icon: 'heroicons_outline:chart-pie',

        children: [
            {
                id: 'dashboard',
                title: 'Dashboard',
                icon: 'heroicons_outline:presentation-chart-bar',
                type: 'basic',
                link: '/charts',
            },
            {
                id: 'schools',
                title: 'Schools',
                icon: 'heroicons_outline:building-library',
                type: 'basic',
                link: '/schools',
            },
            // {
            //     id: 'levels',
            //     title: 'Levels',
            //     icon: 'heroicons_outline:bars-arrow-up',
            //     type: 'basic',
            //     link: '/levels',
            // },
        ],
    },
    
  
    // {
    //     id: 'ai-assistant',
    //     title: 'AI Assistant',
    //     type: 'basic',
    //     icon: 'heroicons_outline:chat-bubble-left-right',
    //     link: '/ai-assistant',
    // },
    {
        id: 'settings',
        title: 'Settings',
        type: 'collapsable',
        icon: 'heroicons_outline:cog-6-tooth',

        children: [
            {
                id: 'users',
                title: 'Users',
                type: 'collapsable',

                children: [
                    {
                        id: 'users.add',
                        title: 'Add user',
                        type: 'basic',
                        link: '/users/add',
                    },
                    {
                        id: 'users.ist',
                        title: 'User Index',
                        type: 'basic',
                        link: '/users/list',
                    },
                ],
            },
        ],
    },
    // {
    //     id: 'charts',
    //     title: 'Charts',
    //     type: 'basic',
    //     icon: 'heroicons_outline:chart-bar-square',
    //     link: '/charts',
    // },
];

export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-check',
        link: '/example',
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-check',
        link: '/example',
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-document-check',
        link: '/example',
    },
];
