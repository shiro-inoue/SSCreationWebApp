// ===== ▼グローバル変数の定義 =====
// ヘルプポップアップ用のタイマーのID
var timerID ;
// ===== ▲グローバル変数の定義 =====


/**
* 引数で指定したIDを参照し、そのエレメント内の文字列をカーソル位置よりポップアップで表示させる。
* 指定した要素にマウスオーバーした際に呼び出される(ように使う事が多い)。
*/
function showHelpPopUp(help_id, id, e){
  var help_explanation_area = document.getElementById(id) ;
  help_explanation_area.innerHTML = document.getElementById(help_id).innerHTML ;
  timerID = setTimeout(function(){
    help_explanation_area.style.display = "block" ;
  }, 400) ;
  var isMSIE = /*@cc_on!@*/false;   // IEのみTrueになる
  // IE
  if(isMSIE){
    help_explanation_area.style.left = document.body.scrollLeft  + event.clientX + 15 ;
    help_explanation_area.style.top  = document.body.scrollTop   + event.clientY + 15 ;
  // IE以外
  }else{
    help_explanation_area.style.left = e.pageX + 15 ;
    help_explanation_area.style.top  = e.pageY + 15 ;
  }
  return ;
}

/**
* テーブル内のカラムから非マウスオーバー状態になった時に、
* showhelpExplanationで表示したポップアップを消去する。
*/
function hideHelpPopUp(id){
  document.body.style.cursor = "default";
  var help_explanation_area = document.getElementById(id) ;
  help_explanation_area.style.display = "none" ;
  
  // 次回のポップアップの時間差表示にズレが生じない様にする為の処理
  clearTimeout(timerID) ;
  
  return ;
}