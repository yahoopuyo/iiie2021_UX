function randomzawa(id){

  //関数の引数に設定したid要素を変数に代入
  var box = $(id);

  //画像配列（ファイル名や連番等を入れる）

  var x = Math.floor(Math.random() * 50);
  var y = Math.floor(Math.random() * 50);

  // box.style.margin = `${y}vh ${x}vw`;
  box.css('margin',`${y}vh ${x}vw`);

  //配列の数だけ繰り返し処理
  // for( var i = 0; i < imageList.length; i++){
  //
  //   //縦横軸用の乱数生成
  //   var x = Math.floor(Math.random() * 100);
  //   var y = Math.floor(Math.random() * 100);
  //
  //   //box要素にimgタグを追加（乱数を代入した変数をポジションに設定）
  //   box.append('<img src="assets/images/icon/'+imageList[i]+'.png" alt="" style="top:'+y+'%; left:'+x+'%;">');
  // }
}

//関数実行
randomzawa('#zawa1');
