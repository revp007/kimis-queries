document.getElementById('queryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const institutionName = document.getElementById('institutionName').value;
    const branchCode = document.getElementById('branchCode').value;
    const complaint = document.getElementById('complaint').value;
    const feedback = document.getElementById('feedback').value;

    const dateTime = new Date().toLocaleString();

    // Retrieve the last token number from local storage
    let lastToken = localStorage.getItem('lastToken');
    lastToken = lastToken ? parseInt(lastToken) : 0; // Start from 0 if not set

    // Increment the token number
    lastToken += 1;

    // Format the token to be 7 digits with leading zeros
    const token = String(lastToken).padStart(7, '0');

    // Save the new last token number back to local storage
    localStorage.setItem('lastToken', lastToken);

    const queryData = {
        token,
        institutionName,
        branchCode,
        complaint,
        dateTime,
        feedback
    };

    // Save to local storage
    let queries = JSON.parse(localStorage.getItem('queries')) || [];
    queries.push(queryData);
    localStorage.setItem('queries', JSON.stringify(queries));

    // Reset form
    document.getElementById('queryForm').reset();

    // Update the query table
    displayQueries();
});

function displayQueries() {
    const queries = JSON.parse(localStorage.getItem('queries')) || [];
    const queryTableBody = document.getElementById('queryTable').getElementsByTagName('tbody')[0];
    queryTableBody.innerHTML = ''; // Clear existing rows

    queries.forEach(query => {
        const row = queryTableBody.insertRow();
        row.insertCell(0).textContent = query.token;
        row.insertCell(1).textContent = query.institutionName;
        row.insertCell(2).textContent = query.branchCode;
        row.insertCell(3).textContent = query.complaint;
        row.insertCell(4).textContent = query.dateTime;
        row.insertCell(5).textContent = query.feedback;
    });
}

// Initial call to display any existing queries
displayQueries();

document.getElementById('exportBtn').addEventListener('click', function() {
    const queries = JSON.parse(localStorage.getItem('queries')) || [];
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Token,Institution Name,Branch Code,Complaint/Issue,Date & Time,Feedback/Summary\n"; // Header

    queries.forEach(query => {
        const row = [
            query.token,
            query.institutionName,
            query.branchCode,
            query.complaint,
            query.dateTime,
            query.feedback
        ].join(",");
        csvContent += row + "\n"; // Add each row
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "queries.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "queries.csv".
});
