import { Role } from './enums/role.enum';

export const ROLE_HIERARCHY: Record<Role, Role[]> = {
    [Role.Admin]: [Role.User],
    [Role.BedManager]: [Role.Doctor, Role.Nurse, Role.User],
    [Role.Doctor]: [Role.Cleaner, Role.User],
    [Role.Nurse]: [Role.Cleaner, Role.User],
    [Role.Cleaner]: [Role.User],
    [Role.User]: []
};

export function expandRoles(roles: Role[]): Set<Role> {
    const expanded = new Set<Role>();

    function addWithInheritance(role: Role) {
        if (!expanded.has(role)) {
            expanded.add(role);
            for (const inherited of ROLE_HIERARCHY[role] || []) {
                addWithInheritance(inherited);
            }
        }
    }

    roles.forEach(addWithInheritance);
    return expanded;
}
