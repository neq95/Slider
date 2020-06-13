const nextBtn = document.querySelector(".controls__arrow--right");
const prevBtn = document.querySelector(".controls__arrow--left");
const slides = document.querySelectorAll(".carousel__slide");
const carousel = document.querySelector(".carousel");
const sliderBox = document.querySelector(".carousel__slider");

let slideWidth;
let direction = "right";
setSliderWidth();

function setSliderWidth() {
    sliderBox.style.width = slides.length * 100 + "%";
    slideWidth = 100 / slides.length + "%";

    for(let elem of slides) {
        elem.style.width = slideWidth;
    }
}

nextBtn.addEventListener("click", changeSlide);
prevBtn.addEventListener("click", changeSlide);

function changeSlide(event) {
    let button = whichButton(event.target);

    if(button === "next") {
        if(direction != "right") {
            sliderBox.prepend(sliderBox.lastElementChild);
            carousel.style.justifyContent = "flex-start";
            direction = "right";
        }
        sliderBox.style.transform = `translateX(-${slideWidth})`;        
    } else {
        if(direction != "left") {
            sliderBox.appendChild(sliderBox.firstElementChild);
            carousel.style.justifyContent = "flex-end";
            direction = "left";
        }
        sliderBox.style.transform = `translateX(${slideWidth})`;
    }

    sliderBox.addEventListener("transitionend", function func(){
        if(direction === "right") {
            sliderBox.appendChild(sliderBox.firstElementChild);
        } else {
            sliderBox.prepend(sliderBox.lastElementChild);
        }

        sliderBox.style.transition = "none";
        sliderBox.style.transform = "translate(0)";
        setTimeout(() => {
            sliderBox.style.transition = "all .6s";
        });

        sliderBox.removeEventListener("transitionend", func);
    });
}

function whichButton(target) {
    return target.classList.contains("controls__arrow--right") ? "next" : "prev";
}