// ========================================
// ナイトワーク派遣LP - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // ハンバーガーメニュー
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // モバイルメニューのリンクをクリックしたら閉じる
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ========================================
    // スムーズスクロール
    // ========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // FAQ アコーディオン
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // 他のすべてのFAQを閉じる
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            // クリックされたFAQをトグル
            if (!isActive) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ========================================
    // 求人タブ切り替え
    // ========================================
    const jobTabs = document.querySelectorAll('.job-tab');

    jobTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            jobTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // ここに実際のタブコンテンツ切り替え処理を追加可能
        });
    });

    // ========================================
    // スクロールアニメーション
    // ========================================
    const fadeElements = document.querySelectorAll('.fade-in, .section-title, .flow-step, .reason-card, .voice-card, .job-card, .shop-category');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 順番にアニメーション
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // ========================================
    // ヘッダーのスクロール効果
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
        }

        lastScrollY = currentScrollY;
    });

    // ========================================
    // 数字カウントアップアニメーション
    // ========================================
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    };

    // 統計数値のアニメーション
    const statNumbers = document.querySelectorAll('.stat-number, .shops-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent.replace(/,/g, ''));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ========================================
    // ページ読み込み完了時の処理
    // ========================================
    document.body.classList.add('page-loaded');

    // ========================================
    // ハンバーガーアニメーション
    // ========================================
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // ========================================
    // LINE URLの設定（実際のURLに置き換え）
    // ========================================
    const lineButtons = document.querySelectorAll('[href="#contact"], .btn-line-final');
    lineButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // LINE URLが設定されている場合はここで処理
            // e.preventDefault();
            // window.open('https://line.me/R/ti/p/YOUR_LINE_ID', '_blank');
        });
    });
});
