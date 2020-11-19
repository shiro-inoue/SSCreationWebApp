let canvas;
let context;
let canvasArr = [];
let canvasNum = 1;
let outputTable;
let nextOffset;

function previewSS() {

    outputMain();

    let pop_win = window.open(
        "",
        "_blank",
        'top=0, left=0, width=800, height=1200'
    );
    if (pop_win) {
        pop_win.window.document.open();
        pop_win.window.document.write(
            '<html>'
            + '<head>'
            + '<title>' + "スキルシートプレビュー" + '</title>'
            + '</head>'
            + '<body style="margin:0;padding:0;border:0;">'
            + '<canvas id="previewMainCanvas"></canvas>'
            + '</body>'
            + '</html>'
        );
        pop_win.window.document.close();
    }
    let mainCanvas = pop_win.document.getElementById('previewMainCanvas');
    mainCanvas.width = A4_PAPER_WIDTH;
    mainCanvas.height = A4_PAPER_HEIGHT * canvasArr.length;
    let mainContext = mainCanvas.getContext('2d');
    mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    mainContext.scale(0.4, 0.4);
    let drawOffset = 0;
    // console.log("canvasArr.length = " + canvasArr.length);
    canvasArr.forEach(canvas => {
        mainContext.drawImage(canvas, 0, drawOffset);
        drawOffset += A4_PAPER_HEIGHT;
    });
}

function outputSS() {

    outputMain();

    return canvasArr;
}

function outputMain() {
    canvasArr.length = 0;
    createCanvas();

    outputHeader();

    outputTable = document.getElementById("outputTable");
    let row;
    let offset = CONTENT_ROW_Y;
    for (let i = 1; i < outputTable.children[0].children.length - 1; i++) {
        row = outputTable.children[0].children[i];
        // console.log("offset = " + offset);
        outputContents(row, offset, i);
        // console.log("nextOffset = " + nextOffset);
        if (nextOffset == TOP_MARGIN) {
            createCanvas();
        }
        offset = nextOffset;
    }

    row = outputTable.children[0].children[outputTable.children[0].children.length - 1];
    outputFooter(row, offset);

    return;
}

function createCanvas() {
    let canvasName = "previewCanvas" + canvasNum;
    canvasNum++;
    // console.log("canvasName = " + canvasName);
    canvas = document.createElement('canvas');
    canvas.id = canvasName;
    canvas.width = A4_PAPER_WIDTH;
    canvas.height = A4_PAPER_HEIGHT;
    context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    // デバッグ用の枠線
    context.strokeStyle = "red";
    context.strokeRect(0, 0, A4_PAPER_WIDTH, A4_PAPER_HEIGHT);
    context.strokeStyle = "black";

    // context.scale(0.3, 0.3);

    canvasArr.push(canvas);
}

function getIDNumber(){
    let idNum;
    let infoTable = document.getElementById("infoTable");
    // console.log("infoTable.rows.length = " + infoTable.rows.length);

    let cells = infoTable.rows[0].cells[1];
    let id = cells.getElementsByTagName("input")[0].value;
    // console.log("id = " + id);
    cells = infoTable.rows[1].cells[1];
    let lastName = cells.getElementsByTagName("input")[0].value;
    let firstName = cells.getElementsByTagName("input")[1].value;
    // console.log("lastName = " + lastName);
    // console.log("firstName = " + firstName);
    cells = infoTable.rows[2].cells[1];
    let lastNameR = cells.getElementsByTagName("input")[0].value;
    let firstNameR = cells.getElementsByTagName("input")[1].value;
    // console.log("lastNameR = " + lastNameR);
    // console.log("firstNameR = " + firstNameR);

    idNum = lastNameR.substr(0, 2) + id + lastNameR.substr(2, 2); // ローマ字未入力でも落ちはしないが

    return idNum;
}


function outputHeader() {
    context.font = "96px ＭＳ Ｐゴシック";
    context.fillText("経歴書", LEFT_MARGIN, STRING_CV_Y);

    context.fillStyle = 'rgb(255, 165, 0)'; // 塗りつぶしの色
    context.fillRect(LEFT_MARGIN, TOP_LINE_Y, DRAWING_AREA_WIDTH, 20); // 左:0上:60の位置に、幅:2160 高さ:20の四角形を描く

    let image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
        // console.log("Loaded Image = " + "img/sobal.jpg");
        let x = SOBAL_LOGO_Y;
        let y = TOP_MARGIN - 3;
        context.drawImage(image, x, y);
    }
    image.src = "img/sobalLogo.jpg";

    context.strokeStyle = 'rgb(0, 0, 0, 0))';
    context.fillStyle = 'rgb(255, 255, 255, 0)'; // 左:0上:100の位置に、幅:580高さ:800の四角の枠線を描く
    // // 大枠
    // context.strokeRect(0, 100, 580, 800);

    // 識別番号欄
    context.strokeRect(LEFT_MARGIN, ID_ROW_Y, IDTITLE_FIELD_WIDTH, ID_ROW_HEIGHT);

    // 識別番号マス
    context.strokeRect(ID_FIELD_X, ID_ROW_Y, ID_FIELD_WIDTH, ID_ROW_HEIGHT);

    // 識別番号タイトル
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("識別番号", STRING_ID_X, STRING_ID_Y);

    // 識別番号
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';

    let idNum;
//    let infoTable = document.getElementById("infoTable");
//    // console.log("infoTable.rows.length = " + infoTable.rows.length);
//
//    let cells = infoTable.rows[0].cells[1];
//    let id = cells.getElementsByTagName("input")[0].value;
//    // console.log("id = " + id);
//    cells = infoTable.rows[1].cells[1];
//    let lastName = cells.getElementsByTagName("input")[0].value;
//    let firstName = cells.getElementsByTagName("input")[1].value;
//    // console.log("lastName = " + lastName);
//    // console.log("firstName = " + firstName);
//    cells = infoTable.rows[2].cells[1];
//    let lastNameR = cells.getElementsByTagName("input")[0].value;
//    let firstNameR = cells.getElementsByTagName("input")[1].value;
//    // console.log("lastNameR = " + lastNameR);
//    // console.log("firstNameR = " + firstNameR);
//
//    idNum = lastNameR.substr(0, 2) + id + lastNameR.substr(2, 2); // ローマ字未入力でも落ちはしないが
    idNum = getIDNumber();
    context.fillText(idNum, ID_VALUE_X, ID_VALUE_Y);

    // 項番の大枠
    context.strokeRect(LEFT_MARGIN, NUMBER_ROW_Y, DRAWING_AREA_WIDTH, NUMBER_ROW_HEIGHT);

    // Noの枠
    context.strokeRect(LEFT_MARGIN, NUMBER_ROW_Y, NUMBER_FIELD_WIDTH, NUMBER_ROW_HEIGHT);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("No", STRING_NO_X, STRING_NO_Y);

    // 期間の枠
    context.strokeRect(PERIOD_FIELD_X, NUMBER_ROW_Y, PERIOD_FIELD_WIDTH, NUMBER_ROW_HEIGHT);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("期間", STRING_PERIOD_X, STRING_PERIOD_Y);

    // 経歴の枠
    context.strokeRect(CAREER_FIELD_X, NUMBER_ROW_Y, CAREER_FIELD_WIDTH, NUMBER_ROW_HEIGHT);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("経歴", STRING_CAREER_X, STRING_CAREER_Y);

    // 技術キーワードの枠
    context.strokeRect(KEYWORD_FIELD_X, NUMBER_ROW_Y, KEYWORD_FIELD_WIDTH, NUMBER_ROW_HEIGHT);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("技術キーワード", STRING_KEYWORD_X, STRING_KEYWORD_Y);

    // 種別の枠
    context.beginPath(); // 現在のパスをリセット
    context.setLineDash([2, 2]); // 点線の描画方法を指定
    for (let i = 0; i < 4; i++) {
        context.moveTo(BUSINESSTYPE_FIELD_X + BUSINESSTYPE_FIELD_WIDTH + BUSINESSTYPE_FIELD_WIDTH * i, NUMBER_ROW_Y); // 新しいサブパスの開始点を座標指定
        context.lineTo(BUSINESSTYPE_FIELD_X + BUSINESSTYPE_FIELD_WIDTH + BUSINESSTYPE_FIELD_WIDTH * i, NUMBER_ROW_Y + NUMBER_ROW_HEIGHT); // 直前の座標と指定座標を結ぶ直線を引く
        context.stroke(); // 現在の線スタイルでサブパスを輪郭表示
    }
    context.setLineDash([]); // 第一引数に空の配列を指定すると実線

    context.font = "32px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("管", STRING_BUSINESSTYPE_X, STRING_BUSINESSTYPEUP_Y);
    context.fillText("理", STRING_BUSINESSTYPE_X, STRING_BUSINESSTYPELO_Y);

    context.font = "32px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("設", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH, STRING_BUSINESSTYPEUP_Y);
    context.fillText("計", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH, STRING_BUSINESSTYPELO_Y);

    context.font = "32px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("開", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH * 2, STRING_BUSINESSTYPEUP_Y);
    context.fillText("発", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH * 2, STRING_BUSINESSTYPELO_Y);

    context.font = "32px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("評", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH * 3, STRING_BUSINESSTYPEUP_Y);
    context.fillText("価", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH * 3, STRING_BUSINESSTYPELO_Y);

    context.font = "32px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("他", STRING_BUSINESSTYPE_X + BUSINESSTYPE_FIELD_WIDTH * 4, STRING_BUSINESSTYPEMD_Y);
}

function outputContents(row, offset, index) {
    let messages;
    let isHide = row.cells[0].getElementsByTagName("input")[2].checked;
    if (isHide) {
        nextOffset = offset;
        return;
    }

    contentRowHeight = getRowHeight(row, offset, index);

    // 内容の大枠
    context.strokeRect(LEFT_MARGIN, offset, DRAWING_AREA_WIDTH, contentRowHeight);

    // 項番マス
    context.strokeRect(LEFT_MARGIN, offset, NUMBER_FIELD_WIDTH, contentRowHeight);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText(row.cells[0].firstChild.nodeValue, CONTENT_NO_X, contentRowHeight / 2 - NUMBER_LINE_PIXEL / 2 + offset);

    // 期間の枠
    context.strokeRect(PERIOD_FIELD_X, offset, 260, contentRowHeight);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText(formatingDate(row.cells[1].getElementsByTagName("input")[0].value) + "～", CONTENT_START_X, CONTENT_START_Y + offset);
    context.fillText(formatingDate(row.cells[1].getElementsByTagName("input")[1].value), CONTENT_END_X, CONTENT_END_Y + offset);
    let period = calcPeriod(row.cells[1].getElementsByTagName("input")[0].value, row.cells[1].getElementsByTagName("input")[1].value);
    context.fillText("(" + period + "ヶ月)", CONTENT_PERIOD_X, CONTENT_PERIOD_Y + offset);

    // 経歴の枠
    context.strokeRect(CAREER_FIELD_X, offset, 1380, contentRowHeight);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    messages = row.cells[2].getElementsByTagName("textarea")[0].value.split('\n');
    for (let i = 0; i < messages.length; ++i) {
        context.fillText(messages[i], CONTENT_CAREER_X, CONTENT_CAREER_Y + offset + i * NUMBER_LINE_PIXEL);
    }

    // 技術キーワードの枠
    context.strokeRect(KEYWORD_FIELD_X, offset, 470, contentRowHeight);
    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    messages = row.cells[3].getElementsByTagName("textarea")[0].value.split('\n');
    for (let i = 0; i < messages.length; ++i) {
        context.fillText(messages[i], CONTENT_KEYWORD_X, CONTENT_KEYWORD_Y + offset + i * NUMBER_LINE_PIXEL);
    }

    // 種別の枠
    context.beginPath(); // 現在のパスをリセット
    context.setLineDash([2, 2]); // 点線の描画方法を指定
    for (let i = 0; i < 4; i++) {
        context.moveTo(BUSINESSTYPE_FIELD_X + BUSINESSTYPE_FIELD_WIDTH + BUSINESSTYPE_FIELD_WIDTH * i, offset); // 新しいサブパスの開始点を座標指定
        context.lineTo(BUSINESSTYPE_FIELD_X + BUSINESSTYPE_FIELD_WIDTH + BUSINESSTYPE_FIELD_WIDTH * i, contentRowHeight + offset); // 直前の座標と指定座標を結ぶ直線を引く
        context.stroke(); // 現在の線スタイルでサブパスを輪郭表示
    }
    context.setLineDash([]); // 第一引数に空の配列を指定すると実線

    context.font = "48px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    for (let i = 0; i < 5; i++) {
        context.fillText((row.cells[4].getElementsByTagName("input")[i].checked) ? "*" : "", BUSINESSTYPE_FIELD_X + BUSINESSTYPE_FIELD_WIDTH * i + 20, NUMBER_LINE_PIXEL + offset);
    }

    return;
}

function outputFooter(row, offset) {
    let messages;

    let qualificationRowHeight = getQualificationRowHeight(row);

    // 資格の大枠
    context.strokeRect(LEFT_MARGIN, offset, DRAWING_AREA_WIDTH, qualificationRowHeight);
    context.font = "48px ＭＳ Ｐゴシック";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("資格", STRING_QUALIFICATION_X, STRING_QUALIFICATION_Y + offset);
    // context.fillText("資格", STRING_QUALIFICATION_X, offset);
    messages = row.cells[0].getElementsByTagName("textarea")[0].value.split('\n');
    for (let i = 0; i < messages.length; ++i) {
        context.fillText(messages[i], QUALIFICATION_VALUE_X, QUALIFICATION_VALUE_Y + offset + i * NUMBER_LINE_PIXEL);
    }

    context.font = "42px ＭＳ Ｐゴシック";
    context.fillStyle = 'rgb(0, 0, 0)';
    // console.log("data = " + new Date());
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let date = dt.getDate();
    let updateY = qualificationRowHeight + NUMBER_LINE_PIXEL;
    context.fillText("更新日：" + year + "/" + month + "/" + date, UPDATE_VALUE_X, updateY + offset);

    context.fillStyle = 'rgb(255, 165, 0)';
    let underLineY = qualificationRowHeight + 80;
    context.fillRect(LEFT_MARGIN, underLineY + offset, DRAWING_AREA_WIDTH, 20);
}

function getRowHeight(row, offset, index) {
    let contentRowHeight = getContentRowHeight(row);
    let drawHeight;

    if (index + 2 < outputTable.children[0].children.length) {
        let nextRow = outputTable.children[0].children[index + 1];
        let isHide = nextRow.cells[0].getElementsByTagName("input")[2].checked;

        if (isHide) {
            // console.log("isHide = " + isHide);
            return getRowHeight(row, offset, index + 1);
        }

        let nextRowHeight = getContentRowHeight(nextRow);
        // console.log("nextRowHeight = " + nextRowHeight);
        drawHeight = offset + contentRowHeight + nextRowHeight;
        // console.log("drawHeight = " + drawHeight);
    }
    else {
        let qualificationRow = outputTable.children[0].children[outputTable.children[0].children.length - 1];
        let qualificationRowHeight = getQualificationRowHeight(qualificationRow);

        let qualificationFooterRowHeight = qualificationRowHeight + 100; // 100=資格欄を除いたフッター部を高さ100で描画している

        drawHeight = offset + contentRowHeight + qualificationFooterRowHeight;
        // console.log("drawHeight = " + drawHeight);
    }

    if (A4_PAPER_HEIGHT < drawHeight) {
        contentRowHeight = A4_PAPER_HEIGHT - offset - BOTTOM_MARGIN;
        nextOffset = TOP_MARGIN;
    }
    else {
        nextOffset = offset + contentRowHeight;
    }
    // console.log("nextOffset = " + nextOffset);

    // console.log("contentRowHeight = " + contentRowHeight);
    return contentRowHeight;
}

function getContentRowHeight(row) {
    let careerHeight = (row.cells[2].getElementsByTagName("textarea")[0].value.split('\n')).length;
    let keywordHeight = (row.cells[3].getElementsByTagName("textarea")[0].value.split('\n')).length;
    // console.log("careerHeight = " + careerHeight);
    // console.log("keywordHeight = " + keywordHeight);
    let textHeight = (careerHeight > keywordHeight) ? careerHeight : keywordHeight;
    let rowHeight = NUMBER_LINE_PIXEL * textHeight + 50;
    // console.log("textHeight = " + textHeight);
    // console.log("rowHeight = " + rowHeight);

    if (rowHeight < CONTENT_ROW_HEIGHT) {
        // console.log("rowHeight -> " + rowHeight);
        rowHeight = CONTENT_ROW_HEIGHT;
        // console.log("rowHeight <- " + rowHeight);
    }
    // console.log("rowHeight = " + rowHeight);
    return rowHeight;
}

function getQualificationRowHeight(row) {
    // console.log("length = " + row.cells[0].getElementsByTagName("textarea")[0].value.split('\n').length);
    let qualificationRowHeight = NUMBER_LINE_PIXEL * (row.cells[0].getElementsByTagName("textarea")[0].value.split('\n').length + 1) + 50;
    // console.log("qualificationRowHeight = " + qualificationRowHeight);

    if (qualificationRowHeight < QUALIFICATION_ROW_HEIGHT) {
        // console.log("qualificationRowHeight -> " + qualificationRowHeight);
        qualificationRowHeight = QUALIFICATION_ROW_HEIGHT;
        // console.log("qualificationRowHeight <- " + qualificationRowHeight);
    }
    // console.log("qualificationRowHeight = " + qualificationRowHeight);
    return qualificationRowHeight;
}

function formatingDate(date) {
    // console.log("<*><*><*><*><*> date = " + date);
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    if (month[0] == "0") {
        month = month[1];
    }
    return year + "/" + month;
}