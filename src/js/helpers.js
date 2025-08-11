export const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU') + ', ' +
        date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
};
