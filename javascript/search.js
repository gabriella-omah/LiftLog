function searchData({
    data = [],
    query = "",
    fields = []
}) {
    const keyword = query.trim().toLowerCase();

    if (!keyword) return [...data];

    return data.filter(item => {
        return fields.some(field => {
            const value = String(item[field] || "").toLowerCase();
            return value.includes(keyword);
        });
    });
}