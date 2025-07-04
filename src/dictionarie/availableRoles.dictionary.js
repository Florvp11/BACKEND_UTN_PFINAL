//roles disponibles en la aplicacion

export const AVAILABLE_ROLES_WORKSPACE_MEMBERS = {
    //roles posibles en el workspace
    MEMBER: "member",
    CO_ADMIN: "co_admin",
    ADMIN: "admin",
};

const vectorRoles = Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS); // ["member","co_admin","admin"]
Object.keys(AVAILABLE_ROLES_WORKSPACE_MEMBERS); // [MEMBER,CO_ADMIN,ADMIN]
