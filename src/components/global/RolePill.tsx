type RolePillProps = {
    roles: string[]
    className?: string
}

const roleColor = (role: string) => {
    switch (role) {
        case "super_admin":
            return "bg-blue-700 text-slate-200"
        case "level_1":
            return "bg-red-100 text-red-700"
        case "level_2":
            return "bg-blue-100 text-blue-700"
        case "level_3":
            return "bg-green-100 text-green-700"
        case "admin_opd":
            return "bg-yellow-100 text-yellow-700"
        case "admin_kecamatan":
            return "bg-yellow-100 text-yellow-700"
        default:
            return "bg-slate-100 text-slate-700"
    }
}


export const RolePill = ({ roles = [], className = "" }: RolePillProps) => {
    const items =
        roles.length > 0
            ? roles.map((role, i) => (
                <span
                    key={`${role}-${i}`}
                    className={`px-2 py-0.5 text-xs rounded-full ${roleColor(role)}`}
                >
                    {role}
                </span>
            ))
            : [
                <span
                    key="empty"
                    className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700"
                >
                    ⚠ no roles
                </span>,
            ]

    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            {items}
        </div>
    )
}
