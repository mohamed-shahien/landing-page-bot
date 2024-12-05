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
