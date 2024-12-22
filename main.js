document.addEventListener("DOMContentLoaded", function () {
    const marqueeSwiper = new Swiper(".marqueeSwiper", {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        loopAdditionalSlides: 2,
        speed: 1000, 
        autoplay: {
            delay: 1000
        },
        observer: true,
        observeParents: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        
    });

    window.addEventListener("resize", function () {
        marqueeSwiper.update();
    });

    window.addEventListener("scroll", function () {
        marqueeSwiper.update();
    });

    const swiperContainer = new Swiper(".swiper-container", {
        spaceBetween: 10,
        centeredSlides: true,
        roundLengths: true,
        loop: true,  
        loopAdditionalSlides: 30, 
        autoplay: {
            delay: 3000,  
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.1
            },
            300: {
                slidesPerView: 1.5
            },
            768: {
                slidesPerView: 3
            }
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll('.tab-button');
    const indicator = document.querySelector('.indicator');
    const brightness = document.querySelectorAll('.brightness');

    if (tabs.length > 0 && indicator) {
        const updateIndicator = (activeTab) => {
            indicator.style.width = `${activeTab.offsetWidth}px`;
            indicator.style.height = `${activeTab.offsetHeight}px`;
            indicator.style.left = `${activeTab.offsetLeft}px`;
        };

        const firstTab = tabs[0];

        firstTab.style.color = '#000000';

        document.querySelectorAll('.plans').forEach((plan) => {
            plan.style.display = 'none';
        });

        document.getElementById(firstTab.dataset.tab).style.display = 'flex';
        updateIndicator(firstTab); 

        brightness.forEach((img, index) => {
            if (index === 0) {
                img.style.filter = "brightness(0)"; 
            } else {
                img.style.filter = "brightness(100%)"; 
            }
        });
        tabs.forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.plans').forEach((plan) => {
                    plan.style.display = 'none';
                });

                document.getElementById(button.dataset.tab).style.display = 'flex';

                tabs.forEach(tab => tab.style.color = '#ffffff');


                brightness.forEach(l => {
                    l.style.filter = "brightness(100%)"; 
                });

                button.style.color = '#000';

                updateIndicator(button);

                const activeImage = button.querySelector('.brightness');
                if (activeImage) {
                    activeImage.style.filter = "brightness(0%)";
                }
            });
        });
    }
});

const startCounting = (numberElement) => {
    const target = +numberElement.getAttribute('data-target');
    const increment = Math.ceil(target / 100); 
    let count = 0;

    const updateCounter = () => {
        count += increment;

        if (count >= target) {
            numberElement.textContent = target;
        } else {
            numberElement.textContent = count;
            requestAnimationFrame(updateCounter);
        }
    };

    updateCounter();
};

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                startCounting(numberElement);
                observer.unobserve(numberElement);
            }
        });
    },
    {
        threshold: 0.5,
    }
);
document.querySelectorAll('.number').forEach((numberElement) => {
    observer.observe(numberElement);
});








document.addEventListener("DOMContentLoaded", function () {
    // التأكد من دعم IntersectionObserver
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animName = entry.target.getAttribute("animation-boto") || "animate__fadeInUp";
          const animDelay = entry.target.getAttribute("boto-delay") || "0s";
  
          entry.target.classList.add("animate__animated", animName);
          entry.target.style.animationDelay = animDelay;
  
          observer.unobserve(entry.target);
  
          entry.target.addEventListener("animationend", () => {
            entry.target.classList.remove("animate__animated", animName);
            entry.target.style.animationDelay = "";
          });
        }
      });
    });
  
    const elements = document.querySelectorAll(".animate-on-scroll");
    if (elements.length === 0) {
      console.warn("No elements with the class 'animate-on-scroll' found.");
    }
    elements.forEach((el) => observer.observe(el));
  } else {
    console.error("IntersectionObserver is not supported by this browser.");
  }
   
    const chartSection = document.getElementById("chart-section");
    const lineChartCanvas = document.getElementById("line-chart");
    let chartInitialized = false;

    function initializeChart() {
        var lineChart = lineChartCanvas.getContext('2d');

        var options = {
            borderWidth: 2,
            cubicInterpolationMode: 'monotone', 
            pointRadius: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderWidth: 4
        };

        var gradientOne = lineChart.createLinearGradient(0, 0, 0, lineChart.canvas.clientHeight);
        gradientOne.addColorStop(0, 'rgba(51, 169, 247, 0.3)');
        gradientOne.addColorStop(1, 'rgba(0, 0, 0, 0)');

        var gradientTwo = lineChart.createLinearGradient(0, 0, 0, lineChart.canvas.clientHeight);
        gradientTwo.addColorStop(0, 'rgba(195, 113, 239, 0.15)');
        gradientTwo.addColorStop(1, 'rgba(0, 0, 0, 0)');

        new Chart(lineChart, {
            type: 'line',
            data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],

                datasets: [
                    {
                        label: 'Spending',
                        data: [310, 300, 370, 295, 350, 300, 230, 290],
                        ...options,
                        borderColor: '#c371ef',
                        fill: 'start',
                        backgroundColor: gradientTwo
                    },
                    {
                        label: 'Emergency',
                        data: [150, 230, 195, 260, 220, 300, 320, 490],
                        ...options,
                        borderColor: '#33a9f7',
                        fill: 'start',
                        backgroundColor: gradientOne
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false, 
                    },
                    tooltip: { 
                        backgroundColor: 'rgba(53, 27, 92, 0.8)',
                        caretPadding: 5,
                        boxWidth: 5,
                        usePointStyle: 'triangle',
                        boxPadding: 3
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false 
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            callback: function (value, index, values) {
                                return '$ ' + value; 
                            },
                            stepSize: 100
                        }
                    }
                }
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartInitialized) {
                chartInitialized = true;
                initializeChart();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(chartSection);
});
