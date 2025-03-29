const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

console.log('check for con2 pipeline');

app.use(express.json());

const PV_DIR = '/jeel_PV_dir';

app.post('/process', async (req, res) => {
    try {
        const { file, product } = req.body;
        console.log(`Request received - file: ${file}, product: ${product}`);
        
        if (!file || !product) {
            console.log('Invalid input: Missing file or product');
            return res.status(400).json({
                "file": null,
                "error": "Invalid JSON input."
            });
        }

        const filePath = `${PV_DIR}/${file}`;
        console.log(`Looking for file at: ${filePath}`);

        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${filePath}`);
            return res.status(404).json({
                "file": file,
                "error": "File not found."
            });
        }

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            console.log('File content:', fileContent);
            
            const lines = fileContent.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            
            console.log('Parsed headers:', headers);
            
            if (!headers.includes('product') || !headers.includes('amount')) {
                console.log('Invalid CSV format: Missing required headers');
                throw new Error('Invalid CSV format');
            }
            
            const productIndex = headers.indexOf('product');
            const amountIndex = headers.indexOf('amount');
            
            let sum = 0;
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '') continue;
                
                const values = lines[i].split(',').map(v => v.trim());
                const rowProduct = values[productIndex];
                const rowAmount = parseInt(values[amountIndex] || 0);
                
                console.log(`Row ${i}: product=${rowProduct}, amount=${rowAmount}`);
                
                if (rowProduct === product) {
                    sum += rowAmount;
                    console.log(`Found matching product: ${rowProduct}, amount: ${rowAmount}, running sum: ${sum}`);
                }
            }
            
            console.log(`Final sum for ${product}: ${sum}`);
            
            return res.json({
                "file": file,
                "sum": sum
            });

        } catch (error) {
            console.error(`Error parsing CSV: ${error.message}`);
            return res.status(400).json({
                "file": file,
                "error": "Input file not in CSV format."
            });
        }

    } catch (error) {
        console.error(`General error: ${error.message}`);
        return res.status(400).json({
            "file": null,
            "error": "Invalid JSON input."
        });
    }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Container 2 listening on port ${PORT}`);
});