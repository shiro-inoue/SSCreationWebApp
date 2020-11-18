function readJSON() {
    const fileSelect = document.getElementById("readJSON");
    if (fileSelect.files.length == 0) {
        return;
    }

    let reader = new FileReader();
    reader.readAsText(fileSelect.files[0]);
    reader.onloadend = () => {
        console.log(reader.result);
        block_id = JSON.parse(reader.result);
        createTable(block_id);
    }
}

function writeJSON() {
    alert("writeJSON() 未実装");
}

function outputPDF() {
    canvasArr = outputSS();
    console.log("canvasArr.length = " + canvasArr.length);
    let pdf = jspdf.jsPDF('p', 'pt', 'a4');

    // A4ではwidth:595.28, height:841.89
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    console.log("pageWidth = " + pageWidth);
    console.log("pageHeight = " + pageHeight);

    let flag = true;
    canvasArr.forEach(canvas => {
        let cvsPdf = document.createElement('canvas');
        cvsPdf.width = A4_PAPER_WIDTH;
        cvsPdf.height = A4_PAPER_HEIGHT;
        let ctxPdf = cvsPdf.getContext('2d');
        console.log("cvsPdf.width = " + cvsPdf.width);
        console.log("cvsPdf.height = " + cvsPdf.height);
        ctxPdf.fillStyle = 'rgb(255,255,255)';
        ctxPdf.fillRect(0, 0, cvsPdf.width, cvsPdf.height);

        ctxPdf.drawImage(canvas, 0, 0);
        let image = cvsPdf.toDataURL('image/jpeg');
        pdf.addImage(image, 'JPG', 0, 0, pageWidth, pageHeight);
        pdf.addPage();
    });
    pdf.deletePage(canvasArr.length + 1);
    pdf.save('sample.pdf');
}
