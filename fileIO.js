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
    let cvsPreview = document.getElementById('previewCanvas');
    let cvsPdf = document.createElement('canvas');
    let ctxPdf = cvsPdf.getContext('2d');
    let pdf = jspdf.jsPDF('p','pt','a4');

    // A4ではwidth:595.28, height:841.89
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // サイズは暫定
    cvsPdf.width = 500;
    cvsPdf.height = 750;
    ctxPdf.fillStyle = 'rgb(255,255,255)';
    ctxPdf.fillRect(0, 0, cvsPdf.width, cvsPdf.height);
    ctxPdf.drawImage(cvsPreview, 0, 0, 600, 900, 0, 0, cvsPdf.width, cvsPdf.height);
    // ctxPdf.drawImage(cvsPreview, 0, 0, cvsPreview.width, cvsPreview.height, 0, 0, cvsPdf.width, cvsPdf.height);
    
    let image = cvsPdf.toDataURL('image/jpeg');
    pdf.addImage(image, 'JPG', 0, 0, cvsPdf.width, cvsPdf.height);
    pdf.addPage();
    pdf.addImage(image, 'JPG', (pageWidth - cvsPdf.width) / 2, (pageHeight - cvsPdf.height) / 2, cvsPdf.width, cvsPdf.height);
    pdf.save('sample.pdf');
}
