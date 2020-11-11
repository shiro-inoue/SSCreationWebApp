let context;

function previewSS() {
    // 描画コンテキストの取得
    let canvas = document.getElementById('previewCanvas');
    context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = "32px ＭＳ ゴシック";
    context.fillText("経歴書", 0, 50);

    context.fillStyle = 'rgb(255, 165, 0)'; // 塗りつぶしの色
    context.fillRect(0, 60, 580, 5); // 左:0上:60の位置に、幅:580 高さ:5の四角形を描く

    let image = new Image();
    image.onload = () => {
        // console.log("Loaded Image = " + "img/sobal.jpg");
        let x = 400;
        let y = 0;
        context.drawImage(image, x, y);
    }
    image.src = "img/sobal.jpg";

    context.strokeStyle = 'rgb(0, 0, 0, 0))';
    context.fillStyle = 'rgb(255, 255, 255, 0)'; // 左:0上:100の位置に、幅:580高さ:800の四角の枠線を描く
    // // 大枠
    // context.strokeRect(0, 100, 580, 800);

    // 識別番号欄
    context.strokeRect(0, 100, 580, 30);

    // 識別番号マス
    context.strokeRect(0, 100, 80, 30);

    // 識別番号タイトル
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("識別番号", 10, 120);

    // 識別番号
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';

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
    context.fillText(idNum, 110, 120);

    // 項番の大枠
    context.strokeRect(0, 130, 580, 40);

    // 項番の枠
    context.strokeRect(0, 130, 20, 40);
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("No", 5, 150);

    // 期間の枠
    context.strokeRect(0, 130, 80, 40);
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("期間", 35, 150);

    // 経歴の枠
    context.strokeRect(0, 130, 350, 40);
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("経歴", 175, 150);

    // 技術キーワードの枠
    context.strokeRect(0, 130, 480, 40);
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("技術キーワード", 375, 150);

    // 種別の枠
    context.beginPath(); // 現在のパスをリセット
    context.setLineDash([2, 2]); // 点線の描画方法を指定
    context.moveTo(500, 130); // 新しいサブパスの開始点を座標指定
    context.lineTo(500, 170); // 直前の座標と指定座標を結ぶ直線を引く
    context.stroke(); // 現在の線スタイルでサブパスを輪郭表示

    // context.beginPath();
    // context.setLineDash([2, 2]);
    context.moveTo(520, 130);
    context.lineTo(520, 170);
    context.stroke();

    // context.beginPath();
    // context.setLineDash([2, 2]);
    context.moveTo(540, 130);
    context.lineTo(540, 170);
    context.stroke();

    // context.beginPath();
    // context.setLineDash([2, 2]);
    context.moveTo(560, 130);
    context.lineTo(560, 170);
    context.stroke();

    context.setLineDash([]); // 第一引数に空の配列を指定すると実線

    context.font = "10px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("管", 485, 145);
    context.fillText("理", 485, 160);

    context.font = "10px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("設", 505, 145);
    context.fillText("計", 505, 160);

    context.font = "10px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("開", 525, 145);
    context.fillText("発", 525, 160);

    context.font = "10px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("評", 545, 145);
    context.fillText("価", 545, 160);

    context.font = "10px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("他", 565, 152);

    canvasOutput();

    // canvas.style.display = "none";
}

function canvasOutput() {
    let outputTable = document.getElementById("outputTable");
    let row;
    let offset = 0;
    let messages;
    // console.log("outputTable.children[0].children.length = " + outputTable.children[0].children.length);

    // テーブルのコントロール値を取得
    for (let i = 1; i < outputTable.children[0].children.length - 1; i++) { //i=0はヘッダ i=lengthは資格欄
        row = outputTable.children[0].children[i];
        // console.log(row.cells[1].getElementsByTagName("input")[0].value);
        // console.log(row.cells[1].getElementsByTagName("input")[1].value);
        // console.log(row.cells[2].getElementsByTagName("textarea")[0].value);
        // console.log(row.cells[3].getElementsByTagName("textarea")[0].value);
        // console.log(row.cells[4].getElementsByTagName("input")[0].checked);
        // console.log(row.cells[4].getElementsByTagName("input")[1].checked);
        // console.log(row.cells[4].getElementsByTagName("input")[2].checked);
        // console.log(row.cells[4].getElementsByTagName("input")[3].checked);
        // console.log(row.cells[4].getElementsByTagName("input")[4].checked);

        // 内容の大枠
        context.strokeRect(0, 170 + offset, 580, 160);

        // 項番マス
        context.strokeRect(0, 170 + offset, 20, 160);
        context.font = "14px ＭＳ 明朝";
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillText(i, 5, 230 + offset);

        // 期間の枠
        context.strokeRect(0, 170 + offset, 80, 160);
        context.font = "14px ＭＳ 明朝";
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillText(row.cells[1].getElementsByTagName("input")[0].value, 22, 185 + offset);
        context.fillText(row.cells[1].getElementsByTagName("input")[1].value, 22, 205 + offset);
        let period = calcPeriod(row.cells[1].getElementsByTagName("input")[0].value, row.cells[1].getElementsByTagName("input")[1].value);
        context.fillText("(" + period + "ヶ月)", 22, 225 + offset);

        // 経歴の枠
        context.strokeRect(0, 170 + offset, 350, 160);
        context.font = "14px ＭＳ 明朝";
        context.fillStyle = 'rgb(0, 0, 0)';
        messages = row.cells[2].getElementsByTagName("textarea")[0].value.split('\n');
        for (let i = 0; i < messages.length; ++i) {
            context.fillText(messages[i], 85, 185 + offset + i * 15);
        }

        // 技術キーワードの枠
        context.strokeRect(0, 170 + offset, 480, 160);
        context.font = "14px ＭＳ 明朝";
        context.fillStyle = 'rgb(0, 0, 0)';
        messages = row.cells[3].getElementsByTagName("textarea")[0].value.split('\n');
        for (let i = 0; i < messages.length; ++i) {
            context.fillText(messages[i], 355, 185 + offset + i * 15);
        }

        // 種別の枠
        context.beginPath(); // 現在のパスをリセット
        context.setLineDash([2, 2]); // 点線の描画方法を指定
        context.moveTo(500, 170 + offset); // 新しいサブパスの開始点を座標指定
        context.lineTo(500, 330 + offset); // 直前の座標と指定座標を結ぶ直線を引く
        context.stroke(); // 現在の線スタイルでサブパスを輪郭表示

        // context.beginPath();
        // context.setLineDash([2, 2]);
        context.moveTo(520, 170 + offset);
        context.lineTo(520, 330 + offset);
        context.stroke();

        // context.beginPath();
        // context.setLineDash([2, 2]);
        context.moveTo(540, 170 + offset);
        context.lineTo(540, 330 + offset);
        context.stroke();

        // context.beginPath();
        // context.setLineDash([2, 2]);
        context.moveTo(560, 170 + offset);
        context.lineTo(560, 330 + offset);
        context.stroke();

        context.setLineDash([]); // 第一引数に空の配列を指定すると実線

        context.font = "14px ＭＳ 明朝";
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fillText((row.cells[4].getElementsByTagName("input")[0].checked) ? "*" : "", 485, 185 + offset);
        context.fillText((row.cells[4].getElementsByTagName("input")[1].checked) ? "*" : "", 505, 185 + offset);
        context.fillText((row.cells[4].getElementsByTagName("input")[2].checked) ? "*" : "", 525, 185 + offset);
        context.fillText((row.cells[4].getElementsByTagName("input")[3].checked) ? "*" : "", 545, 185 + offset);
        context.fillText((row.cells[4].getElementsByTagName("input")[4].checked) ? "*" : "", 565, 185 + offset);

        offset += 160;
    }
    row = outputTable.children[0].children[outputTable.children[0].children.length - 1];
    // console.log(row.cells[0].getElementsByTagName("textarea")[0].value);

    // 資格の大枠
    context.strokeRect(0, 170 + offset, 580, 80);
    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillText("資格", 5, 185 + offset);
    messages = row.cells[0].getElementsByTagName("textarea")[0].value.split('\n');
    for (let i = 0; i < messages.length; ++i) {
        context.fillText(messages[i], 15, 205 + offset + i * 15);
    }

    context.font = "14px ＭＳ 明朝";
    context.fillStyle = 'rgb(0, 0, 0)';
    // context.fillText("202001-0041", 5, 270 + offset);
    // console.log("data = " + new Date());
    let dt = new Date();
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let date = dt.getDate();
    context.fillText("更新日：" + year + "/" + month + "/" + date, 450, 270 + offset);

    context.fillStyle = 'rgb(255, 165, 0)'; // 塗りつぶしの色
    context.fillRect(0, 280 + offset, 580, 5); // 左:0上:60の位置に、幅:580 高さ:5の四角形を描く
}
