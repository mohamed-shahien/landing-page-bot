document.addEventListener("DOMContentLoaded", function () {
        // تهيئة Swiper الأول (الذي يتحرك تلقائيًا)
        const marqueeSwiper = new Swiper(".marqueeSwiper", {
                slidesPerView: "auto",
                spaceBetween: 0,
                loop: true,
                loopAdditionalSlides: 2,
                speed: 10000,  // يمكنك تعديل السرعة هنا حسب الحاجة
                autoplay: {
                        delay: 3000,  // تحديد تأخير التحريك التلقائي
                        disableOnInteraction: false,
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
                slidesPerView: 3,
                centeredSlides: true,
                roundLengths: true,
                loop: true,  // تكرار السلايدر
                loopAdditionalSlides: 30, // عدد الشرائح التي تُكرر
                autoplay: {
                        delay: 3000,  // تأخير التحريك التلقائي
                        disableOnInteraction: false,
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
    
            // التعامل مع جميع التبويبات
            tabs.forEach((button) => {
                button.addEventListener('click', () => {
                    // إخفاء كل التبويبات
                    document.querySelectorAll('.plans').forEach((plan) => {
                        plan.style.display = 'none';
                    });
    
                    // عرض التبويب النشط
                    document.getElementById(button.dataset.tab).style.display = 'flex';
    
                    // إعادة تعيين ألوان كل الأزرار إلى اللون الافتراضي
                    tabs.forEach(tab => tab.style.color = '#ffffff');
    
                    // إعادة ضبط تأثير السطوع لجميع العناصر
                    brightness.forEach(l => {
                        l.style.filter = "brightness(100%)"; // تعتيم جميع الصور
                    });
    
                    // تغيير لون التبويب النشط
                    button.style.color = '#000';
    
                    // تحديث المؤشر
                    updateIndicator(button);
    
                    // إعادة السطوع للصورة الخاصة بالتبويب النشط
                    const activeImage = button.querySelector('.brightness');
                    if (activeImage) {
                        activeImage.style.filter = "brightness(0%)"; // إعادة السطوع للتبويب النشط
                    }
                });
            });
        }
    });