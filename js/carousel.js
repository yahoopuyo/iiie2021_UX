var vp = sessionStorage.getItem("visitedProjects");

$( "#sessionReset" ).click(function() {
  sessionStorage.clear();
	alert("session will be refreshed");
});


//ロード時の処理
window.addEventListener('load', () => {
	var carousels = document.querySelectorAll('.carousel');
	var currImage=0;
	//初めて全体ページを訪れた
	if (vp == null || vp == "") {
		vp=[];
		sessionStorage.setItem('visitedProjects', [].toString());
		currImage = Math.floor( Math.random() * 13 ) ; //めんどくさいので13使っちゃいます
		alert(`first time initial_id = ${currImage}`);
	}else{
		vp = vp.split(",");
		currImage = parseInt(vp[vp.length-1]);
	}
	//カルーセル周りの処理
	carousel(carousels[0],currImage);
});


// カルーセルの処理
function carousel(root,currImage) {
	var
		figure = root.querySelector('figure'),
		nav = root.querySelector('nav'),
    images = figure.children,
		n = images.length,
		gap = root.dataset.gap || 0,
		bfc = 'bfc' in root.dataset,

		theta =  2 * Math.PI / n,
    able2click = true
	;

	setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
	window.addEventListener('resize', () => {
		setupCarousel(n, parseFloat(getComputedStyle(images[0]).width))
	});

	setupNavigation();

	function setupCarousel(n, s) {
		var
			apothem = s / (2 * Math.tan(Math.PI / n))
		;

		figure.style.transformOrigin = `50% 50% ${- apothem}px`;

		for (var i = 0; i < n; i++)
			images[i].style.padding = `${gap}px`;
		for (i = 1; i < n; i++) {
			images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
			images[i].style.transform = `rotateY(${i * theta}rad)`;
		}
		if (bfc)
			for (i = 0; i < n; i++)
				 images[i].style.backfaceVisibility = 'hidden';

		rotateCarousel(0,currImage,true);
	}


	//ここでは、クリックなど全般の処理をする
	function setupNavigation() {
		$( "#transparent" ).click(function() {
			joinProjectPage();
		});
		nav.addEventListener('click', onClick_nav, true);
    figure.addEventListener('click', onClick_fig, true);
    figure.addEventListener('mouseover', function(e){
      var t = e.target;
      if (t.classList.contains('project')) if(t.classList[1] == (currImage+n)%n+1){
        t.style.cursor = "pointer";
      }
    },true);

		function onClick_nav(e) {
      // alert("nav clicked")
			e.stopPropagation();

      if(!able2click) return;
      able2click=false;
      setTimeout(function() {
        able2click = true;
      }, 1000);


			var t = e.target;
      // if (t.classList.contains('transparent')){
      //   joinProjectPage();
      // }
			if (t.tagName.toUpperCase() != 'IMG')
				return;

			if (t.classList.contains('next')) {
				var prevImage = currImage;
				currImage++;
        rotateCarousel(prevImage,currImage,false);
			}
			else if (t.classList.contains('prev')){
				var prevImage = currImage;
				currImage--;
        rotateCarousel(prevImage,currImage,false);
			}
      else {
        joinProjectPage();
      }

		}

    function onClick_fig(e) {
      e.stopPropagation();
      var t = e.target;
			// alert(t.classList[1]);
      if (t.classList.contains('project')){
        if (t.classList[1] == (currImage+n)%n+1) {
					joinProjectPage();
				}
      }
    }

    function joinProjectPage() {
      // joinの時の遷移先の処理
      var project_id = ((currImage+n) % 2) + 1;
			vp.push(currImage%n);
			alert(vp);
			sessionStorage.setItem("visitedProjects",vp.toString());
      window.location.href = `project${project_id}/index.html`;
    }

	}
	function rotateCarousel(prev_imageIndex,imageIndex,init) {
		if(init){
			//遷移アニメーションなし
			figure.style.transition = "transform 0s";
		}else{
			images[prev_imageIndex%n] = "grayscale(80%)"
			figure.style.transition = "transform 1s";
		}
		images[imageIndex%n].style.filter = "grayscale(0%)";
		figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
	}

}
