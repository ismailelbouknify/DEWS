import { environment } from 'environments/environment';

const API_BASE_URL = environment.baseUrl;

const APIRoutes = {
    auth: {
        login: API_BASE_URL + '/accounts/auth/login/',
        profile: API_BASE_URL + '/accounts/profile/',
    },
    account: {
        permission: API_BASE_URL + '/accounts/permissions/', // GET POST
        roles: API_BASE_URL + '/accounts/roles/', // GET POST
    },
    assistant: {
        ai: API_BASE_URL + '/assistant/ai/', // POST
        ai_conversations: API_BASE_URL + '/assistant/ai/conversations/', // GET
    },
    sonic_users: {
        list: API_BASE_URL + '/accounts/users', // GET
        create: API_BASE_URL + '/accounts/users/create/', // POST
        deactivate: API_BASE_URL + '/accounts/users/deactivate/', // PATCH
        activate: API_BASE_URL + '/accounts/users/activate/', // PATCH
        by_role: API_BASE_URL + '/accounts/users/by-role/', // GET
        assign_services: API_BASE_URL + '/accounts/users/assign-services/', // PATCH
        assign_nodes: API_BASE_URL + '/accounts/users/assign-nodes/', // PATCH
        assign_clusters: API_BASE_URL + '/accounts/users/assign-clusters/', // PATCH
        assign_role: API_BASE_URL + '/accounts/users/assign-role/', // PATCH
        delete: API_BASE_URL + '/accounts/users/delete/', // DELETE
        send_email: API_BASE_URL + '/accounts/users/send-email/', // POST
        update: API_BASE_URL + '/accounts/users/update/', // PATCH
        profile: API_BASE_URL + '/accounts/users/profile/', // GET
    },
};

export default APIRoutes;
