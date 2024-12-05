document.addEventListener("DOMContentLoaded", function () {
    // تهيئة Swiper الأول (الذي يتحرك تلقائيًا)
    const marqueeSwiper = new Swiper(".marqueeSwiper", {
        slidesPerView: "auto",
        spaceBetween: 0,
        loop: true,
        loopAdditionalSlides: 2,
        speed: 1000,  // يمكنك تعديل السرعة هنا حسب الحاجة
        autoplay: {
            delay: 1000
        },
        observer: true,
        observeParents: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        
    });

    // تحديث السلايدر عند تغيير الحجم أو التمرير
    window.addEventListener("resize", function () {
        marqueeSwiper.update();
    });

    window.addEventListener("scroll", function () {
        marqueeSwiper.update();
    });

    // تهيئة Swiper الثاني (الذي يحتوي على 3 شرائح في المنتصف)
    const swiperContainer = new Swiper(".swiper-container", {
        spaceBetween: 10,
        centeredSlides: true,
        roundLengths: true,
        loop: true,  // تكرار السلايدر
        loopAdditionalSlides: 30, // عدد الشرائح التي تُكرر
        autoplay: {
            delay: 3000,  // تأخير التحريك التلقائي
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
        // دالة لتحديث المؤشر بناءً على التبويب النشط
        const updateIndicator = (activeTab) => {
            indicator.style.width = `${activeTab.offsetWidth}px`;
            indicator.style.height = `${activeTab.offsetHeight}px`;
            indicator.style.left = `${activeTab.offsetLeft}px`;
        };

        // تعيين التبويب الأول كقسم افتراضي عند تحميل الصفحة
        const firstTab = tabs[0];

        // تعيين لون التبويب الأول
        firstTab.style.color = '#000000';

        // إخفاء جميع التبويبات الأخرى
        document.querySelectorAll('.plans').forEach((plan) => {
            plan.style.display = 'none';
        });

        // عرض التبويب الأول
        document.getElementById(firstTab.dataset.tab).style.display = 'flex';
        updateIndicator(firstTab); // تحديث المؤشر

        // تعيين السطوع للصورة في التبويب الأول إلى "brightness(100%)"
        brightness.forEach((img, index) => {
            if (index === 0) {
                img.style.filter = "brightness(0)";  // أول تبويب له سطوع عادي
            } else {
                img.style.filter = "brightness(100%)";  // باقي التبويبات تكون مظلمة
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

// دالة العد التزايدي
const startCounting = (numberElement) => {
    const target = +numberElement.getAttribute('data-target');
    const increment = Math.ceil(target / 100); // تحديد الزيادة
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
    const chartSection = document.getElementById("chart-section");
    const lineChartCanvas = document.getElementById("line-chart");
    let chartInitialized = false;

    // Function to initialize the line chart
    function initializeChart() {
        var lineChart = lineChartCanvas.getContext('2d');

        // Line chart options
        var options = {
            borderWidth: 2,
            cubicInterpolationMode: 'monotone', // Make the line curvy over zigzag
            pointRadius: 2,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderWidth: 4
        };

        // Create linear gradients for the line chart
        var gradientOne = lineChart.createLinearGradient(0, 0, 0, lineChart.canvas.clientHeight);
        gradientOne.addColorStop(0, 'rgba(51, 169, 247, 0.3)');
        gradientOne.addColorStop(1, 'rgba(0, 0, 0, 0)');

        var gradientTwo = lineChart.createLinearGradient(0, 0, 0, lineChart.canvas.clientHeight);
        gradientTwo.addColorStop(0, 'rgba(195, 113, 239, 0.15)');
        gradientTwo.addColorStop(1, 'rgba(0, 0, 0, 0)');

        new Chart(lineChart, {
            type: 'line',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
                        display: false, // Hide display data about the dataset
                    },
                    tooltip: { // Modify graph tooltip
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
                            display: false // Set display to false to hide the x-axis grid
                        },
                        beginAtZero: true
                    },
                    y: {
                        ticks: {
                            callback: function (value, index, values) {
                                return '$ ' + value; // Prefix '$' to the dataset values
                            },
                            stepSize: 100
                        }
                    }
                }
            }
        });
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartInitialized) {
                chartInitialized = true; // Ensure the chart is initialized only once
                initializeChart();
            }
        });
    }, {
        threshold: 0.5 // Percentage of section visibility required
    });

    observer.observe(chartSection);
});
