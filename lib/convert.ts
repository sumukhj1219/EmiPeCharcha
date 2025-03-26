const fs = require("fs");
const pdf = require("pdf-parse");

interface Transaction {
    date: string;
    type: string;
    amount: number;
    details?: string;
}

/**
 * Convert PDF file to structured JSON format
 * @param {string} filePath - Path to the PDF file
 * @returns {Promise<{ transactions: Transaction[] }>} - JSON representation of the PDF content
 */
async function pdfToJson(filePath: string): Promise<{ transactions: Transaction[] }> {
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        
        const transactions: Transaction[] = [];
        const lines = data.text.split('\n');

        let currentTransaction: Partial<Transaction> = {};
        let lastDate = "";

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Capture Date
            if (/\d{2} [A-Za-z]{3}, \d{4}/.test(line)) {
                lastDate = line; // Update the last known date
            }

            // Capture Transaction Type & Amount
            if (/(CREDIT|DEBIT)/.test(line)) {
                if (currentTransaction.type && currentTransaction.amount) {
                    transactions.push(currentTransaction as Transaction);
                    currentTransaction = {};
                }

                const match = line.match(/(CREDIT|DEBIT)[^\d]+([\d,.]+)/);
                if (match) {
                    currentTransaction.date = lastDate;
                    currentTransaction.type = match[1];
                    currentTransaction.amount = parseFloat(match[2].replace(/,/g, ''));
                }
            }

            // Capture "Received from" or "Paid to" details
            if (/Received from|Paid to/.test(line)) {
                currentTransaction.details = line;
            }
        }

        // Push the last transaction if it's still pending
        if (currentTransaction.type && currentTransaction.amount) {
            transactions.push(currentTransaction as Transaction);
        }

        return { transactions };
    } catch (error) {
        console.error('Error converting PDF to JSON:', error);
        throw error;
    }
}

// Replace with your actual PDF file path
const pdfPath = 'PhonePe_Statement_Feb2025_Mar2025.pdf';
pdfToJson(pdfPath)
    .then(jsonData => {
        console.log(JSON.stringify(jsonData, null, 2));
    })
    .catch(error => console.error('Error:', error));
