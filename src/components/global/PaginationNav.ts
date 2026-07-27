export const generatePagination = (
    currentPage: number,
    totalPages: number
) => {
    const delta = 2;
    const pages: (number | string)[] = [];

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (left > 2) {
        pages.push("...");
    }

    for (let i = left; i <= right; i++) {
        pages.push(i);
    }

    if (right < totalPages - 1) {
        pages.push("...");
    }

    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return pages;
};