enchant();
window.onload = function () {
    var game = new Game(320, 480);
    game.fps = 30; 
    game.preload('otoko.gif','koinobori2.gif','karasu.gif','kazaguruma.gif','poll.gif','senpuki.gif','Title.png','GameOver.png','Start.png');


// スコアセーブ
function saveScore(score) {

	var highscore = localStorage.getItem("highscore");

	if(score > highscore){
		localStorage.setItem('highscore',score);
	}

}

// スコアロード
function loadScore() {
    var highscore = localStorage.getItem("highscore");
    if(highscore == null){
    	highscore = 0; 
    }
    return highscore;
}


    game.onload = function () {


    	   /**
        * タイトルシーン
        *
        * タイトルシーンを作り、返す関数です。
        */
        var createStartScene = function() {

            var scene = new Scene();                                // 新しいシーンを作る
            // scene.backgroundColor = '#fcc800';                      // シーンの背景色を設定
            scene.backgroundColor = 'rgb(230, 230, 230)';

            // スタート画像設定
            var startImage = new Sprite(96, 40);                   // スプライトを作る
            startImage.image =  game.assets['Start.png'];     // スタート画像を設定
            startImage.x = 108;                                      // 横位置調整
            startImage.y = 206;                                     // 縦位置調整
            scene.addChild(startImage);                             // シーンに追加

            var otoko = new Sprite(32,32);
			otoko.image = game.assets['otoko.gif'];
			otoko.x = 140;
			otoko.y = 100;
			otoko.opacity = 0.9;
			otoko.scaleX = 2.5;
			otoko.scaleY = 2.5;

			// if (otoko.scaleX % 3 == 0) otoko.scaleX += 0.2;

			otoko.addEventListener('enterframe', function() {

				if(otoko.scaleX < 11){
					otoko.scaleX += 0.1;
					otoko.scaleY += 0.1;

					if(otoko.opacity > 0.0){
						otoko.opacity -= 0.01;
					}else{
						scene.removeChild(this);
					}
					// if (otoko.scaleX % 3 == 0) otoko.scaleX += 0.2;
				}
			});

			scene.addChild(otoko);

			var titleName = new Sprite(200,40);
			titleName.image = game.assets['Title.png'];
			titleName.x = 50;
			titleName.y = 120;
			titleName.opacity = 0.9;
			scene.addChild(titleName);
			

            // ハイスコア表示
            var scoreLabel = new Label('最高得点　' + loadScore() + '点');                    // ラベルを作る
            scoreLabel.textAlign = 'center';                             // 文字を中央寄せ
            scoreLabel.color = '#555555';                                // 文字を白色に
            scoreLabel.x = 40;                                           // 横位置調整
            scoreLabel.y = 290;                                           // 縦位置調整
            scoreLabel.font = '24px sans-serif';                         // 28pxのゴシック体にする
            scene.addChild(scoreLabel);                                  // シーンに追加

            // サブタイトルラベル設定
            var subTitle = new Label('〜　スレスレでよけろ　〜');  // ラベルを作る
            subTitle.textAlign = 'center';                          // 文字中央寄せ
            subTitle.x = 100;                                         // 横位置調整
            subTitle.y = 160;                                       // 縦位置調整
            subTitle.font = '14px sans-serif';                      // 14pxのゴシック体にする
            scene.addChild(subTitle);                               // シーンに追加

            // スタート画像にタッチイベントを設定
            scene.addEventListener(Event.TOUCH_START, function(e) {
                // 現在表示しているシーンをゲームシーンに置き換える
                 game.replaceScene(createGameScene());
            });

            // タイトルシーンを返します。
            return scene;

        };



                /**
        * ゲームシーン
        *
        * ゲームシーンを作り、返す関数です。
        */
        var createGameScene = function() {

            var scene = new Scene();                            // 新しいシーンを作る


			// 初期設定
			var score = 0;
		
			//haikei	
			var poll = new Sprite(4,270);
			poll.image = game.assets['poll.gif'];
			poll.x = 100;
			poll.y = 140;
			poll.scaleY = 1.5;
			scene.addChild(poll);

	        var kurukuru = new Sprite(32,32);
	        kurukuru.image = game.assets['kazaguruma.gif'];
	        kurukuru.x = 84;
	        kurukuru.y = 50;
	        scene.addChild(kurukuru);

		  	var senpuki = new Sprite(64,80);
	        senpuki.image = game.assets['senpuki.gif'];
	        senpuki.x = 250;
	        senpuki.y = 200;
	        scene.addChild(senpuki);

			var otoko = new Sprite(32,32);
			otoko.image = game.assets['otoko.gif'];
			otoko.x = otoko.y = 0;
			otoko.opacity = 0.7;
			otoko.aliveMax = 10;
			

			// player

			var player = new Sprite(72,32);
			player.image = game.assets['koinobori2.gif'];
			player.x = 32;
			player.y = 100;
			player.vy = 0;
			player.frmspd = 4;
			player.addEventListener('enterframe', function() {

				this.y += this.vy;
				if(this.y < 70){
					this.y = 70;
					this.vy = 0;
				}else if(this.y > (game.height -32))
				{
					this.y = game.height -32;
					this.vy = 0;
				}
					
				if(touched)
				{
					this.frmspd = 1;
					this.vy -= 0.1;
				}else
				{
					this.frmspd = 4;
					this.vy += 0.1;	
				}

				//anime
				if (game.frame % this.frmspd == 0){
	            	this.frame++;
	                kurukuru.frame++;
	                senpuki.frame++;
	            }

				if (otoko.alive > 0)
				{
					otoko.x = this.x + 96 + ((10 - otoko.alive) * 4);
					otoko.y = this.y - ((10 - otoko.alive) * 4);
					if(otoko.scaleX < 5)
					{
						otoko.scaleX += 0.1;
						otoko.scaleY += 0.1;
					}
					scene.addChild(otoko);
					otoko.alive--;
					if(otoko.alive == 0)
					{
						scene.removeChild(otoko);
						otoko.scaleX = 1;
						otoko.scaleY = 1;
					}
				}
				if (game.frame % 3 == 0){
					otoko.frame++;
				}
			});

	    	var touched = false;
	    	scene.addEventListener('touchstart', function() {
	        	touched = true;
	    	});
	    	scene.addEventListener('touchend', function() {
	        	touched = false;
	    	});

	       	scene.addChild(player);
			        
			// acotr
			var actorNum = 1;
	        var actor = Array(actorNum);
	        var actormaxNum = 2;
	        var actormax = 20; //actor最大数
	        var actornow = 1;
	        
			// 文字表示:
	        var txtmenu = new Label();
	        txtmenu.x = 5;
			txtmenu.y = 5;
	        txtmenu.font = "10px 'Arial'";
	        txtmenu.text = "" + score + "点";	

	        function actoradd(add) {
	            actor[add] = new Sprite(32, 32);
	            actor[add].image = game.assets['karasu.gif'];
	            actor[add].x = game.width;
	            actor[add].y = Math.floor(Math.random() * (game.height - 32)) + 16;
	            actor[add].speed = 1 + (Math.random() * 1.5);
	            actor[add].ydir = (Math.random() * 1.5) - 1;
				actor[add].scaleX = 1;
				actor[add].scaleY = 1;

	            actor[add].addEventListener('enterframe', function () {
	                this.x -= this.speed;
	                this.y += this.speed * this.ydir;

	                if ((this.y > game.height - 30) || (this.y <= 18)) this.ydir *= -1;
					if (this.x < (-this.width))
					{
						scene.removeChild(this);
						actorNum--;
						score+= 5;
			            if (actormax > actornow)
						{
	                        for (var i = 0; i < 2; i++)
							{
	                            actoradd(i);
	                            actornow++;
	                        }
	                    } else {
	                        actoradd(1);
	                    }
	                    return;
						
					}


					//あたり判定
					if(this.within(player,20))
					{
						scene.removeChild(this);
						
						saveScore(score);	//スコア保存

						// 現在表示しているシーンをゲームオーバーシーンに置き換える
                    	game.replaceScene(createGameoverScene(score));

                    	
                    	
					}
					if(this.intersect(player))
					{
						score ++;
						otoko.alive = 10;
					}
				


	                //アニメーション
	                if (game.frame % 3 == 0) this.frame++;
	            });
	            scene.addChild(actor[add]);
	        }

	        txtmenu.addEventListener('enterframe', function () {
	            if (game.frame % game.fps == 0) {
	                txtmenu.text = "" + score + "点";
	            }
	        });
	        
			for (var i = 0; i < actorNum; i++) 
			{
	            actoradd(i);
	        }
	       	scene.addChild(txtmenu);
	        scene.backgroundColor = 'rgb(230, 230, 230)';

	        return scene;
	    }

	    /**
        * ゲームオーバーシーン
        *
        * ゲームオーバーシーンを作り、返す関数です。
        * createGameoverScore(※) ※にスコアを入れると画面にスコアが表示されます
        * ※は任意の名前でOKで、カンマ区切りで複数設定できます。
        * 例) var createGameoverScore = function (resultScore, test1, test2) {
        */
        var createGameoverScene = function(resultScore) {

            var scene = new Scene();                                   // 新しいシーンを作る
            // scene.backgroundColor = '#303030';                         // シーンの背景色を設定
            scene.backgroundColor = 'rgb(230, 230, 230)';

            // ゲームオーバー画像設定
            var gameoverImage = new Sprite(120, 40);                   // スプライトを作る
            gameoverImage.image =  game.assets['GameOver.png'];  // ゲームオーバー画像を設定
            gameoverImage.x = 100;                                      // 横位置調整
            gameoverImage.y = 112;                                     // 縦位置調整
            scene.addChild(gameoverImage);                             // シーンに追加

            // スコアラベル設定
            var label = new Label(resultScore + '点');           // ラベルを作る スコアを代入
            label.textAlign = 'center';                                // 文字を中央寄せ
            label.color = '#222222';                                      // 文字を白色に
            label.x = 50;                                               // 横位置調整
            label.y = 170;                                              // 縦位置調整
            label.font = '30px sans-serif';                            // 40pxのゴシック体にする
            scene.addChild(label);                                     // シーンに追加

            // リトライラベル(ボタン)設定
            var retryLabel = new Label('男なら諦めるな！再挑戦！');                // ラベルを作る
            retryLabel.color = '#center';                              // 文字を白色に
            retryLabel.x = 60;                                          // 横位置調整
            retryLabel.y = 300;                                        // 縦位置調整
            retryLabel.font = '20px sans-serif';                       // 20pxのゴシック体にする
            scene.addChild(retryLabel);                                // シーンに追加

            retryLabel.addEventListener('enterframe', function () {
	            retryLabel.y = 300 + (Math.random() * 5.5);
	        });

            // リトライラベルにタッチイベントを設定
            retryLabel.addEventListener(Event.TOUCH_START, function(e) {
                // 現在表示しているシーンをタイトルシーンに置き換える

                 game.replaceScene(createStartScene());
            });
            return scene;

        };

        // ゲームの_rootSceneをスタートシーンに置き換える
        game.replaceScene(createStartScene());

    };
    game.start();
};
