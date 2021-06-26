window.addEventListener('load', () => {
	var
		carousels = document.querySelectorAll('.carousel');

	for (var i = 0; i < carousels.length; i++) {
		carousel(carousels[i]);
	}
});


// カルーセルの処理
function carousel(root) {
	var
		figure = root.querySelector('figure'),
		nav = root.querySelector('nav'),
    images = figure.children,
		// projects = figure.children,
    // images = projects.map(project => project.querySelector("img")),
		n = images.length,
		gap = root.dataset.gap || 0,
		bfc = 'bfc' in root.dataset,

		theta =  2 * Math.PI / n,
		currImage = 0,
    able2click = true;
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

		rotateCarousel(currImage);
	}

	function setupNavigation() {
		nav.addEventListener('click', onClick_nav, true);
    figure.addEventListener('click', onClick_fig, true);

    figure.addEventListener('mouseover', function(e){
      var t = e.target;
      if (t.classList.contains('project')) if(t.classList[1] == currImage+1){
        t.style.cursor = "pointer";
      }
    },true);

		function onClick_nav(e) {
      // alert("nav clicked")
			e.stopPropagation();

			var t = e.target;
      // if (t.classList.contains('transparent')){
      //   joinProjectPage();
      // }
			if (t.tagName.toUpperCase() != 'BUTTON')
				return;

			if (t.classList.contains('next')) {
				currImage++;
        rotateCarousel(currImage);
			}
			else if (t.classList.contains('prev')){
				currImage--;
        rotateCarousel(currImage);
			}
      else {
        joinProjectPage()
      }
		}

    function onClick_fig(e) {
      e.stopPropagation();
      var t = e.target;
      if (t.classList.contains('project')){
        if (t.classList[1] == currImage+1) joinProjectPage();
      }
    }

    function joinProjectPage() {
      // joinの時の遷移先の処理
      var project_id = (currImage % 2) + 1;
      window.location.href = `../project${project_id}/index.html`;
    }

	}

	function rotateCarousel(imageIndex) {
		figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
	}

}


// $("#transparent").click(function() {
//   window.location.href = "../../project1/index.html";
// }










// var carousel = $(".carousel"),
//     currdeg  = 0;
//
// $(".next").on("click", { d: "n" }, rotate);
// $(".prev").on("click", { d: "p" }, rotate);
//
// function rotate(e){
//   if(e.data.d=="n"){
//     currdeg = currdeg - 30;
//   }
//   if(e.data.d=="p"){
//     currdeg = currdeg + 30;
//   }
//   carousel.css({
//     "-webkit-transform": "rotateY("+currdeg+"deg)",
//     "-moz-transform": "rotateY("+currdeg+"deg)",
//     "-o-transform": "rotateY("+currdeg+"deg)",
//     "transform": "rotateY("+currdeg+"deg)"
//   });
// }
