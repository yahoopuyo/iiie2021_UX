var vp = sessionStorage.getItem("visitedProjects");
var current_Image_index=0;
var prev_Image_index=0;

$("#sessionReset").click(function () {
  sessionStorage.clear();
  alert("session will be refreshed");
});

//ロード時の処理
window.addEventListener("load", () => {
  var carousels = document.querySelectorAll(".carousel");
  var artworks = document.querySelectorAll(".flex-box");
  var currImage = 0;
  //初めて全体ページを訪れた
  if (vp == null || vp == "") {
    vp = [];
    sessionStorage.setItem("visitedProjects", [].toString());
    currImage = Math.floor(Math.random() * 13); //めんどくさいので13使っちゃいます
    alert(`first time initial_id = ${currImage}`);
  } else {
    vp = vp.split(",");
    currImage = parseInt(vp[vp.length - 1]);
  }
  //カルーセル周りの処理
  carousel(carousels[0], currImage);
  // 作品リスト（カルーセルの下側）の処理
  showcase(artworks[0], currImage);
  // 訪れたページの処理
  var project_list = document.getElementsByTagName("li");
  $.each(vp, function (index, value) {
    project_list[value].children[0].style.filter = "grayscale(90%)";
  });
});

// カルーセルの処理
function carousel(root, currImage) {
  var figure = root.querySelector("figure"),
    nav = root.querySelector("nav"),
    images = figure.children,
    n = images.length,
    gap = root.dataset.gap || 0,
    bfc = "bfc" in root.dataset,
    theta = (2 * Math.PI) / n,
    able2click = true;
  setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
  window.addEventListener("resize", () => {
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
  });

  setupNavigation();

  function setupCarousel(n, s) {
    var apothem = s / (2 * Math.tan(Math.PI / n));
    figure.style.transformOrigin = `50% 50% ${-apothem}px`;

    for (var i = 0; i < n; i++) images[i].style.padding = `${gap}px`;
    for (i = 1; i < n; i++) {
      images[i].style.transformOrigin = `50% 50% ${-apothem}px`;
      images[i].style.transform = `rotateY(${i * theta}rad)`;
    }
    if (bfc)
      for (i = 0; i < n; i++) images[i].style.backfaceVisibility = "hidden";

    rotateCarousel(0, currImage, true);
  }

  //ここでは、クリックなど全般の処理をする
  function setupNavigation() {
    $("#transparent").click(function () {
      joinProjectPage();
    });
    nav.addEventListener("click", onClick_nav, true);
    figure.addEventListener("click", onClick_fig, true);
    figure.addEventListener(
      "mouseover",
      function (e) {
        var t = e.target;
        if (t.classList.contains("project"))
          if (t.classList[1] == ((currImage+10*n)%n) + 1) {
            t.style.cursor = "pointer";
          }
      },
      true
    );

    function onClick_nav(e) {
      e.stopPropagation();

      if (!able2click) return;
      able2click = false;
      setTimeout(function () {
        able2click = true;
      }, 1000);

      var t = e.target;
      // if (t.classList.contains('transparent')){
      //   joinProjectPage();
      // }
      if (t.tagName.toUpperCase() != "IMG") return;

      if (t.classList.contains("next")) {
        var prevImage = currImage;
        currImage++;
        current_Image_index = currImage;
        rotateCarousel(prevImage, currImage, false);
      } else if (t.classList.contains("prev")) {
        var prevImage = currImage;
        currImage--;
        current_Image_index = currImage;
        rotateCarousel(prevImage, currImage, false);
      } else {
        joinProjectPage();
      }
    }

    function onClick_fig(e) {
      e.stopPropagation();
      var t = e.target;
      // alert(t.classList[1]);
      if (t.classList.contains("project")) {
        if (t.classList[1] == ((currImage+10*n)%n) + 1) {
          joinProjectPage();
        }
      }
    }

    function joinProjectPage() {
      // joinの時の遷移先の処理
      var project_id = ((currImage+10*n) % 2) + 1;
      vp.push((currImage+10*n)%n);
//       alert(vp);
      sessionStorage.setItem("visitedProjects", vp.toString());
      window.location.href = `project${project_id}/index.html`;
    }
  }
  function rotateCarousel(prev_imageIndex, imageIndex, init) {
    if (init) {
      //遷移アニメーションなし
      figure.style.transition = "transform 0s";

    } else {
      images[(prev_imageIndex+10*n)%n].style.filter = "grayscale(80%)";
      figure.style.transition = "transform 1s";
      var project_list = document.getElementsByTagName("li");
      project_list[(prev_imageIndex+10*n)%n].children[0].style.border = "5px solid white";
    }
    images[(imageIndex+10*n)%n].style.filter = "grayscale(0%)";
    figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
    var project_list = document.getElementsByTagName("li");
    project_list[(imageIndex+10*n)%n].children[0].style.border = "5px solid red";
  }
}

function showcase(root, currImage) {
  var artwork_list = root.children;
  var n = artwork_list.length;
  setupNavigation();

  function setupNavigation() {
    root.addEventListener("click", onClick_fig, true);
    root.addEventListener(
      "mouseover",
      function (e) {
        var t = e.target;
        if (t.classList.contains("project")) {
          t.style.cursor = "pointer";
        }
      },
      true
    );

    function onClick_fig(e) {
      e.stopPropagation();
      var t = e.target;
      if (t.classList.contains("project")) {
        current_Image_index = parseInt(t.classList[1])-1;
        joinProjectPage();
      }
    }
  }

  function joinProjectPage() {
    // joinの時の遷移先の処理
    var project_id = ((current_Image_index + n) % 2) + 1;
    vp.push(current_Image_index % n);
    sessionStorage.setItem("visitedProjects", vp.toString());
    alert("join2");
    window.location.href = `project${project_id}/index.html`;
  }
}
