


document.addEventListener("DOMContentLoaded", function () {
    // Select elements once
    const toggles = document.querySelectorAll(".toggle");
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const langToggle = document.getElementById("lang-toggle");
    const header = document.querySelector("header");

    // Toggle functionality for tree structure
    toggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const nestedList = this.nextElementSibling;
            if (nestedList) {
                nestedList.classList.toggle("show");
                this.classList.toggle("expanded");
                this.querySelector(".arrow").textContent = this.classList.contains("expanded") ? "▼" : "►";
            }
        });
    });

    // Hamburger Menu Toggle
    hamburger.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (hamburger.classList.contains("active")) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.classList.remove("no-scroll");
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".nav-menu") && !event.target.closest("#hamburger") && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });

    // Header scroll effect
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 100);
    });
});

// script.js - Language toggle functionality

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function () {
    // Get language toggle button
    const langToggleBtn = document.getElementById('lang-toggle');

    // Set default language from localStorage or default to English
    const currentLang = localStorage.getItem('language') || 'en';
    applyLanguage(currentLang);

    // Set button text based on current language
    updateToggleButtonText(currentLang);

    // Add click event listener to language toggle button
    langToggleBtn.addEventListener('click', function () {
        // Toggle between languages
        const newLang = localStorage.getItem('language') === 'ja' ? 'en' : 'ja';
        localStorage.setItem('language', newLang);

        // Apply the new language
        applyLanguage(newLang);

        // Update button text
        updateToggleButtonText(newLang);
    });
});

// Function to update the toggle button text
function updateToggleButtonText(language) {
    const langToggleBtn = document.getElementById('lang-toggle');
    if (language === 'en') {
        langToggleBtn.textContent = '日本語';
    } else {
        langToggleBtn.textContent = 'English';
    }
}

// Apply selected language to the page
function applyLanguage(language) {
    // If the language is English, remove all translations
    if (language === 'en') {
        document.querySelectorAll('[data-original]').forEach(element => {
            // Restore original content
            element.textContent = element.getAttribute('data-original');
            // Remove the data-original attribute
            element.removeAttribute('data-original');
        });
        return;
    }

    // If the language is Japanese, apply translations
    translatePage();
}

// Main translation function
function translatePage() {
    // Translations dictionary
    const translations = {
        

        // Home page
        'NoteSphere': 'ノートスフィア',
        'Welcome to IT Club Resources Hub': 'ITクラブリソースハブへようこそ',
        'Your one-stop platform to discover, share, and collaborate on educational resources for IT enthusiasts.': 'IT愛好家のための教育リソースを発見、共有、コラボレーションするためのワンストップ・プラットフォーム。',
        'Explore Courses': 'コースを探す',
        'Browse Notes': 'ノートを見る',
        'Featured Resources': '注目のリソース',
        'Discover our most popular learning materials': '最も人気のある学習教材を発見する',
        'Latest Courses': '最新のコース',
        'Explore our comprehensive collection of IT courses, including Software Engineering, University of Greenwich programs, and more.': 'ソフトウェア工学、グリニッジ大学のプログラムなど、充実したITコースのコレクションをご覧ください。',
        'University Of Greenwitch': 'グリニッジ大学',
        'Software Engineering': 'ソフトウェア工学',
        'Study Resources': '学習リソース',
        'Access a variety of study materials, guides, and reference documents to enhance your learning experience.': '様々な学習教材、ガイド、参考資料にアクセスして、学習体験を向上させましょう。',
        'Lecture Notes': '講義ノート',
        'Practice Exercises': '練習問題',
        'Project Templates': 'プロジェクトテンプレート',
        'Exam Preparation': '試験対策',
        'View More': 'もっと見る',
        'Upcoming Events': '今後のイベント',
        'Join our workshops, webinars, and community meetups': 'ワークショップ、ウェビナー、コミュニティミートアップにご参加ください',
        'Web Development Workshop': 'ウェブ開発ワークショップ',
        'Learn how to build responsive web applications using modern frameworks': '最新のフレームワークを使用したレスポンシブウェブアプリケーションの構築方法を学ぶ',
        'Online': 'オンライン',
        'Register': '登録する',
        'AI & Machine Learning Meetup': 'AI & 機械学習ミートアップ',
        'Join us for a discussion on the latest trends in artificial intelligence': '人工知能の最新トレンドについての議論にご参加ください',
        'Room 203, Tech Building': '技術棟203号室',

        // Courses page
        'Explore Our Courses': 'コースを探索する',
        'Comprehensive learning resources for IT enthusiasts at all levels.': 'あらゆるレベルのIT愛好家のための包括的な学習リソース。',
        'Available Courses': '利用可能なコース',
        'Browse through our collection of carefully curated educational materials': '厳選された教育資料のコレクションをご覧ください',
        'Programming Fundamentals': 'プログラミングの基礎',
        'Introduction to Python': 'Pythonの入門',
        'Data Types & Variables': 'データ型と変数',
        'Control Structures': '制御構造',
        'Web Development': 'ウェブ開発',
        'HTML & CSS Basics': 'HTML & CSSの基礎',
        'JavaScript Essentials': 'JavaScript の基本',
        'Responsive Design': 'レスポンシブデザイン',
        'Popular': '人気',
        'Enroll Now': '今すぐ登録',
        'Semester 1': '第1学期',
        'Computer Science Basics': 'コンピュータサイエンスの基礎',
        'Software Development': 'ソフトウェア開発',
        'Semester 2': '第2学期',
        'Advanced Programming': '高度なプログラミング',
        'Database Systems': 'データベースシステム',
        'Networking & Security': 'ネットワーキングとセキュリティ',
        'Machine Learning': '機械学習',
        'Recommended': 'おすすめ',

        // Notes page
        'Lecture Notes': '講義ノート',
        'Access comprehensive notes for various IT courses and topics.': '様々なITコースやトピックの包括的なノートにアクセスできます。',
        'Search for notes...': 'ノートを検索...',
        'All Topics': 'すべてのトピック',
        'Programming': 'プログラミング',
        'Databases': 'データベース',
        'Web Development': 'ウェブ開発',
        'Networking': 'ネットワーキング',
        'AI & Machine Learning': 'AI & 機械学習',
        'Most Recent': '最新',
        'Most Popular': '最も人気',
        'A-Z': 'A-Z',
        'Z-A': 'Z-A',
        'Introduction to Python for Data Science': 'データサイエンスのためのPython入門',
        'Comprehensive notes covering Python basics, NumPy, Pandas, and data visualization with Matplotlib.': 'Python基礎、NumPy、Pandas、Matplotlibによるデータ可視化をカバーする包括的なノート。',
        'By Prof. Sarah Johnson': 'サラ・ジョンソン教授による',
        'Downloads': 'ダウンロード',
        'Preview': 'プレビュー',
        'Download': 'ダウンロード',
        'SQL Fundamentals & Database Design': 'SQLの基礎とデータベース設計',
        'Complete guide to SQL queries, database normalization, and relational database management systems.': 'SQLクエリ、データベース正規化、関係データベース管理システムの完全ガイド。',
        'By Dr. Michael Chen': 'マイケル・チェン博士による',
        'Modern Frontend Development with React': 'Reactを使用したモダンフロントエンド開発',
        'In-depth notes on React.js, component architecture, state management, and React hooks.': 'React.js、コンポーネントアーキテクチャ、状態管理、React hooksに関する詳細なノート。',
        'By Prof. Alex Rodriguez': 'アレックス・ロドリゲス教授による',
        'Computer Networks & Security Protocols': 'コンピュータネットワークとセキュリティプロトコル',
        'Detailed notes on TCP/IP, network layers, routing algorithms, and network security principles.': 'TCP/IP、ネットワーク層、ルーティングアルゴリズム、ネットワークセキュリティ原則に関する詳細なノート。',
        'By Dr. Emma Williams': 'エマ・ウィリアムズ博士による',
        'Machine Learning Algorithms & Applications': '機械学習アルゴリズムとアプリケーション',
        'Comprehensive lecture notes on supervised/unsupervised learning, neural networks, and practical ML implementations.': '教師あり/教師なし学習、ニューラルネットワーク、実用的なML実装に関する包括的な講義ノート。',
        'By Prof. David Kumar': 'デビッド・クマール教授による',
        'Advanced Data Structures & Algorithms': '高度なデータ構造とアルゴリズム',
        'Detailed notes on complex data structures, algorithm design, and problem-solving techniques.': '複雑なデータ構造、アルゴリズム設計、問題解決技術に関する詳細なノート。',
        'By Dr. James Wilson': 'ジェームズ・ウィルソン博士による',

        // About page
        'About IT Club Resources Hub': 'ITクラブリソースハブについて',
        'Learn about our mission, team, and the story behind our platform.': '私たちのミッション、チーム、そしてプラットフォームの背景についてご紹介します。',
        'Our Mission': '私たちのミッション',
        'The IT Club Resources Hub was founded in 2023 with a simple mission: to create an accessible and collaborative platform where students and IT enthusiasts can share knowledge, resources, and experiences.': 'ITクラブリソースハブは2023年に創設され、シンプルなミッションを持っています：学生とIT愛好家が知識、リソース、経験を共有できるアクセスしやすく協力的なプラットフォームを作ること。',
        'Our goal is to bridge the gap between theoretical education and practical application by providing high-quality learning materials, study notes, and project examples that help our community develop valuable IT skills.': '私たちの目標は、高品質な学習教材、勉強ノート、プロジェクト例を提供することで、理論的な教育と実践的な応用の間のギャップを埋め、コミュニティが貴重なITスキルを開発するのを助けることです。',
        'We believe that technology education should be accessible to everyone, regardless of their background or location. By fostering a community where knowledge is freely shared and collaboration is encouraged, we aim to empower the next generation of IT professionals.': '私たちは、テクノロジー教育は背景や場所に関係なく、誰にでもアクセスできるべきだと考えています。知識が自由に共有され、協力が奨励されるコミュニティを育成することで、次世代のIT専門家に力を与えることを目指しています。',
        'Our Team': '私たちのチーム',
        'Hiroshi Tanaka': '田中宏',
        'Founder & Lead Developer': '創設者兼主任開発者',
        'Computer Science graduate with 5+ years of experience in web development and a passion for teaching technology.': 'ウェブ開発で5年以上の経験を持ち、テクノロジーを教えることに情熱を持つコンピュータサイエンス卒業生。',
        'Yuki Sato': '佐藤有紀',
        'Content Director': 'コンテンツディレクター',
        'Educational technology specialist with experience in curriculum development and digital content creation.': 'カリキュラム開発とデジタルコンテンツ作成の経験を持つ教育技術の専門家。',
        'Akira Nakamura': "中村明",
        'Community Manager': 'コミュニティマネージャー',
        'Former IT instructor with expertise in building and nurturing online learning communities.': 'オンライン学習コミュニティの構築と育成の専門知識を持つ元IT講師。',
        'Mei Yamamoto': '山本芽衣',
        'UX/UI Designer': 'UX/UIデザイナー',
        'Designer specialized in creating intuitive and accessible interfaces for educational platforms.': '教育プラットフォーム向けの直感的でアクセスしやすいインターフェースの作成を専門とするデザイナー。',
        'Our Story': '私たちの物語',
        'The IT Club was founded by a group of computer science students at Tokyo University who wanted to create a collaborative learning environment.': 'ITクラブは、協力的な学習環境を作りたいと考えた東京大学のコンピュータサイエンスの学生グループによって設立されました。',
        'Launched the first version of the Resources Hub to share study materials among club members and other university students.': 'クラブメンバーと他の大学生の間で学習教材を共有するためのリソースハブの最初のバージョンを立ち上げました。',
        'Expanded the platform to include contributions from multiple universities and IT professionals, creating a comprehensive resource library.': 'プラットフォームを拡張して複数の大学やIT専門家からの貢献を含め、包括的なリソースライブラリを作成しました。',
        'Future': '将来',
        'We\'re working on developing interactive learning modules, community events, and expanding our resources to cover emerging technologies.': 'インタラクティブな学習モジュール、コミュニティイベントの開発、そして新興技術をカバーするためのリソースの拡大に取り組んでいます。',

        // Contact page
        'Get in Touch': 'お問い合わせ',
        'Have questions or want to join the IT Club? We\'d love to hear from you!': '質問がありますか？またはITクラブに参加したいですか？ぜひご連絡ください！',
        'Contact Form': 'お問い合わせフォーム',
        'Name': '名前',
        'Your name': 'あなたの名前',
        'Email': 'メールアドレス',
        'Your email address': 'あなたのメールアドレス',
        'Subject': '件名',
        'Select a subject': '件名を選択してください',
        'General Inquiry': '一般的なお問い合わせ',
        'Membership': 'メンバーシップ',
        'Event Information': 'イベント情報',
        'Resource Sharing': 'リソース共有',
        'Other': 'その他',
        'Message': 'メッセージ',
        'Your message': 'あなたのメッセージ',
        'Send Message': 'メッセージを送信',
        'Contact Information': '連絡先情報',
        'Phone': '電話',
        'Location': '場所',
        'University Campus, Building C, Room 302': '大学キャンパス、Cビル、302号室',
        'Office Hours': '営業時間',
        'Monday - Friday: 9:00 AM - 5:00 PM': '月曜 - 金曜: 午前9時 - 午後5時',
        'All rights reserved.': 'すべての権利を保有します。'
    };

    // Function to translate all text content in the document
    function translateTextNodes(node) {
        // Skip script and style tags
        if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') {
            return;
        }

        // If the node has children, process them recursively
        if (node.hasChildNodes()) {
            node.childNodes.forEach(translateTextNodes);
        }

        // Only process text nodes with content
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
            const originalText = node.nodeValue.trim();
            if (translations[originalText]) {
                // Store the original text if not already stored
                if (!node.parentElement.hasAttribute('data-original')) {
                    node.parentElement.setAttribute('data-original', originalText);
                }
                node.nodeValue = node.nodeValue.replace(originalText, translations[originalText]);
            }
        }
    }

    // Process all elements with text content
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, label, option, li').forEach(element => {
        const text = element.textContent.trim();
        if (translations[text]) {
            // Store the original text if not already stored
            if (!element.hasAttribute('data-original')) {
                element.setAttribute('data-original', text);
            }
            element.textContent = translations[text];
        }
    });

    // Process input placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(element => {
        const placeholder = element.getAttribute('placeholder');
        if (translations[placeholder]) {
            // Store original placeholder if not already stored
            if (!element.hasAttribute('data-original-placeholder')) {
                element.setAttribute('data-original-placeholder', placeholder);
            }
            element.setAttribute('placeholder', translations[placeholder]);
        }
    });

    // Process data attributes for elements that use them for translation
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        // Get translated content for this key if it exists
        const translatedContent = getTranslationByKey(key);
        if (translatedContent) {
            // Store original text if not already stored
            if (!element.hasAttribute('data-original')) {
                element.setAttribute('data-original', element.textContent);
            }
            element.textContent = translatedContent;
        }
    });

    // Process any text nodes that might have been missed
    translateTextNodes(document.body);
}

// Helper function to get translations by data-key
function getTranslationByKey(key) {
    // Map data-keys to their expected translations
    const keyMap = {
        'home': 'ホーム',
        'courses': 'コース',
        'notes': 'ノート',
        'about': '私たちについて',
        'contact': 'お問い合わせ',
        'notes-title': '講義ノート',
        'notes-subtitle': '様々なITコースやトピックの包括的なノートにアクセスできます。',
        'about-title': 'ITクラブリソースハブについて',
        'about-subtitle': '私たちのミッション、チーム、そしてプラットフォームの背景についてご紹介します。',
        'our-mission': '私たちのミッション',
        'our-team': '私たちのチーム',
        'our-story': '私たちの物語',
        'contact-title': 'お問い合わせ',
        'contact-subtitle': '質問がありますか？またはITクラブに参加したいですか？ぜひご連絡ください！',
        'contact-form': 'お問い合わせフォーム',
        'contact-info': '連絡先情報'
    };

    return keyMap[key] || null;
}


// Toggle functionality for the folder tree
document.addEventListener('DOMContentLoaded', function () {
    // Get all toggle elements
    const toggles = document.querySelectorAll('.toggle');

    // Add click event listeners to each toggle
    toggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            // Toggle the active class on the next nested ul
            const nestedList = this.nextElementSibling;
            if (nestedList && nestedList.classList.contains('nested')) {
                nestedList.classList.toggle('active');
                this.classList.toggle('toggle-open');
            }
        });
    });

    // Get all note items
    const noteItems = document.querySelectorAll('.note-item');

    // Add click event listeners to each note item
    noteItems.forEach(item => {
        item.addEventListener('click', function () {
            // Get the note ID from the data attribute
            const noteId = this.getAttribute('data-note-id');

            // Here you would typically load the note content
            // For now, we'll just show an alert
            openNote(noteId);
        });
    });
});

// Function to open a note (you would implement the actual content loading)
function openNote(noteId) {
    // This is a placeholder - you would implement this to display the note
    // or navigate to a note page
    console.log(`Opening note with ID: ${noteId}`);

    // Example implementation:
    // 1. Show a modal or redirect to a note page
    // 2. Fetch the note content via AJAX

    // For demonstration, show an alert
    alert(`Loading note: ${noteId}`);

    // You could also implement a fetch request to get note content:
    /*
    fetch(`/api/notes/${noteId}`)
        .then(response => response.json())
        .then(data => {
            // Display the note content
            displayNoteContent(data);
        })
        .catch(error => {
            console.error('Error loading note:', error);
        });
    */
}

// Optional: Function to expand all folders in a path to a specific note
function expandPathToNote(noteId) {
    const noteElement = document.querySelector(`.note-item[data-note-id="${noteId}"]`);
    if (noteElement) {
        // Find all parent nested lists
        let parent = noteElement.parentElement;
        while (parent) {
            if (parent.classList.contains('nested')) {
                parent.classList.add('active');
                // Also toggle the parent toggle button
                const toggle = parent.previousElementSibling;
                if (toggle && toggle.classList.contains('toggle')) {
                    toggle.classList.add('toggle-open');
                }
            }
            parent = parent.parentElement;
        }
    }
}
// Add this to your existing script.js file

// Implement smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
    // Select all links that point to sections (those starting with #)
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without causing page refresh
                history.pushState(null, null, targetId);
            }
        });
    });
});
// Add to your existing script.js file

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    let lastScrollTop = 0;
    let isMouseNearTop = false;
    const showNavThreshold = 100; // pixels from top to trigger showing the nav

    // Handle scroll events
    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // If scrolling down and not overridden by mouse position
        if (scrollTop > lastScrollTop && scrollTop > 50 && !isMouseNearTop) {
            header.classList.add("nav-hidden");
        }
        // If scrolling up or mouse is near top
        else if (scrollTop < lastScrollTop || isMouseNearTop) {
            header.classList.remove("nav-hidden");
        }

        lastScrollTop = scrollTop;
    });

    // Track mouse position
    document.addEventListener("mousemove", function (e) {
        // Check if mouse is near the top of the viewport
        isMouseNearTop = e.clientY <= showNavThreshold;

        if (isMouseNearTop) {
            header.classList.remove("nav-hidden");
        } else if (window.pageYOffset > 50) {
            // Only hide if we've scrolled down a bit
            header.classList.add("nav-hidden");
        }
    });

    // Initialize state
    if (window.pageYOffset > 50) {
        header.classList.add("nav-hidden");
    }
});

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const langToggleBtn = document.getElementById('lang-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    let isJapanese = false;

    // Initialize button text
    langToggleBtn.textContent = '日本語';

    langToggleBtn.addEventListener('click', function () {
        isJapanese = !isJapanese;

        // Update button text
        langToggleBtn.textContent = isJapanese ? 'English' : '日本語';

        // Toggle language for each navigation link
        navLinks.forEach(link => {
            // Get the appropriate text based on current language state
            const newText = isJapanese ? link.getAttribute('data-ja') : link.getAttribute('data-en');

            // Update the link text
            if (newText) {
                link.textContent = newText;
            }
        });
    });
});

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select all sections in the document
    const sections = document.querySelectorAll("section");
    // Select all navigation menu links
    const navLinks = document.querySelectorAll(".nav-menu li a");

    // Function to update the active link based on the current section in view
    function updateActiveLink() {
        let currentSection = "";

        // Loop through each section to determine which one is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop; // Get the distance of the section from the top of the page
            const sectionHeight = section.clientHeight; // Get the height of the section

            // Check if the user has scrolled past at least one-third of the section
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id"); // Store the ID of the current section
            }
        });

        // Loop through each navigation link to highlight the active one
        navLinks.forEach(link => {
            link.classList.remove("active"); // Remove the active class from all links
            // Add the active class only to the link that matches the current section
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    }

    // Add a scroll event listener to update the active link when the user scrolls
    window.addEventListener("scroll", updateActiveLink);
});
