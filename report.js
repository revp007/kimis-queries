function displayQueries() {
    const queries = JSON.parse(localStorage.getItem('queries')) || [];
    const queryTableBody = document.getElementById('queryTable').getElementsByTagName('tbody')[0];
    queryTableBody.innerHTML = ''; // Clear existing rows

    queries.forEach((query, index) => {
        const row = queryTableBody.insertRow();
        row.insertCell(0).textContent = query.token;
        row.insertCell(1).textContent = query.institutionName;
        row.insertCell(2).textContent = query.branchCode;
        row.insertCell(3).textContent = query.complaint;
        row.insertCell(4).textContent = query.dateTime;
        row.insertCell(5).textContent = query.feedback;

        // Create a delete button
        const deleteCell = row.insertCell(6);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function() {
            deleteQuery(index);
        };
        deleteCell.appendChild(deleteButton);
    });
}

function deleteQuery(index) {
    let queries = JSON.parse(localStorage.getItem('queries')) || [];
    queries.splice(index, 1);
    localStorage.setItem('queries', JSON.stringify(queries));
    displayQueries();
}

document.getElementById('exportBtn').addEventListener('click', function() {
    const queries = JSON.parse(localStorage.getItem('queries')) || [];
    
    if (queries.length === 0) {
        alert('No queries to export!');
        return;
    }

    // Use the xlsx library for proper Excel formatting
    const data = queries.map(query => ({
        "Token No": query.token,
        "Institution Name": query.institutionName,
        "Branch Code": query.branchCode,
        "Complaint/Issue": query.complaint,
        "Date & Time": query.dateTime,
        "Feedback/Summary": query.feedback
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Queries");
    XLSX.writeFile(wb, "kimis_queries_report.xlsx");
});

// Initial call to display queries
displayQueries();
