const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function saveToExcel(data, fileName) {

    const formattedData = data.map(item => ({
        'Тэг': item.Tag,
        'Кол-во повторений': item.Count
    }));

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(formattedData);

    worksheet['!cols'] = [
        { wch: 40 },
        { wch: 20 }
    ];

    xlsx.utils.book_append_sheet(workbook, worksheet, 'Tags');

    const outputDir = path.join(__dirname, 'output');

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, fileName);

    xlsx.writeFile(workbook, filePath);

    console.log(`Файл ${fileName} создан в папке output`);
}

module.exports = { saveToExcel };
