export const ROUTE_LABELS: Record<string, string> = {
    dashboard: "Панель управления",
    project: "О проекте",
    users: 'Пользователи',
    create: 'Создание',
    edit: 'Редактирование',
    profile: 'Профиль',
    settings: 'Настройки',
};

export const getBreadcrubmsLabel = (segment: string) => {
    if (ROUTE_LABELS[segment]) {
        return ROUTE_LABELS[segment];
    }

    if (segment.length > 20) {
        return `#${segment.slice(0, 4)}...`;
    }

    return segment;
}