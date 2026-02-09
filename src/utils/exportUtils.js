/**
 * Utility function to export data to CSV
 * @param {Array<Object>} data - The data to export
 * @param {string} filename - The filename for the exported file
 */
export const exportToCSV = (data, filename) => {
    if (!data || !data.length) {
        alert('내보낼 데이터가 없습니다.');
        return;
    }

    // Get headers from the first object
    const headers = Object.keys(data[0]);

    // Create CSV content
    const csvContent = [
        headers.join(','), // Header row
        ...data.map(row => headers.map(header => {
            let value = row[header];
            // Handle quotes and commas in data
            if (typeof value === 'string') {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(','))
    ].join('\n');

    // Create Blob and download link
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' }); // Add BOM for Excel compatibility
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `${filename}.csv`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
