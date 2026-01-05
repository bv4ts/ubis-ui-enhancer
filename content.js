// UBIS UI Enhancer Content Script

const iconMap = {
    // English
    'Home': 'fa-house',
    'E-Mail': 'fa-envelope',
    'UZEM Exams': 'fa-laptop-code',
    'Account Settings': 'fa-gear',
    'Exemption Exam Schedule': 'fa-calendar-check',
    '2. Yabancı Dil Sınav Programı': 'fa-language',
    'My Courses': 'fa-book-open',
    'Course Program': 'fa-calendar-week',
    'Department Course Plan': 'fa-sitemap',
    'Attendance Timetable': 'fa-clock',
    'Course Notes': 'fa-note-sticky',
    'Homeworks': 'fa-pencil',
    'Course Structure': 'fa-layer-group',
    'Prerequisites of the Courses': 'fa-list-check',
    'Electronic Examination System': 'fa-desktop',
    'My Online Courses': 'fa-wifi',
    'UZEM – Moodle': 'fa-graduation-cap',
    'Transcription': 'fa-file-invoice',
    'Graduation Exam Application': 'fa-user-graduate',
    'Sosyal Karne': 'fa-id-card',
    'Training Information System': 'fa-chalkboard-user',
    'Exam Program': 'fa-calendar-days',
    'My Exam Results': 'fa-square-check',
    'Mazeret Sınavı Başvurusu': 'fa-file-circle-exclamation',
    'Online CV Form': 'fa-file-user',
    'Required Documents for Residence Permit Application': 'fa-passport',
    'Academic Calendar': 'fa-calendar',
    'PDPA Student Information Text': 'fa-file-shield',
    'Registration Info': 'fa-address-card',
    'Internship Info': 'fa-briefcase',
    'YUM-III Prerequisites': 'fa-list-ol',
    'Work Placement (YUM)': 'fa-building',
    'Finance Information': 'fa-coins',
    'Sürekli Eğitim Merkezi Online Eğitimleri': 'fa-video',
    'Surveys & Forms': 'fa-square-poll-vertical',
    'Forms and Documents': 'fa-folder-open',
    'Campus Map': 'fa-map-location-dot',
    'Library': 'fa-book',
    'Smart Card System': 'fa-id-badge',
    'Logout': 'fa-right-from-bracket',
    
    // Turkish Maps
    'Anasayfa': 'fa-house',
    'E-Posta': 'fa-envelope',
    'UZEM Sınavları': 'fa-laptop-code',
    'Hesap Ayarları': 'fa-gear',
    'Muafiyet Sınav Programı': 'fa-calendar-check',
    'Yazıldığım Dersler': 'fa-book-open',
    'Ders Programım': 'fa-calendar-week',
    'Bölüm Ders Programı': 'fa-sitemap',
    'Devamsızlık Çizelgem': 'fa-clock',
    'Ders Notlarım': 'fa-note-sticky',
    'Ödevlerim': 'fa-pencil',
    'Bölüm Derslerim': 'fa-layer-group',
    'Ders Ön Koşulları': 'fa-list-check',
    'Elektronik Sınav Sistemi': 'fa-desktop',
    'Online Derslerim': 'fa-wifi',
    'Transkript': 'fa-file-invoice',
    'Tek Ders Sınav Başvurusu': 'fa-user-graduate',
    'Eğitim Bilgi Sistemi': 'fa-chalkboard-user',
    'Sınav Programım': 'fa-calendar-days',
    'Sınav Sonuçlarım': 'fa-square-check',
    'Online CV Formu': 'fa-file-user',
    'Oturma İzni Başvurusu için Gerekli Belgeler': 'fa-passport',
    'Akademik Takvim': 'fa-calendar',
    'KVKK Öğrenci Aydınlatma Metni': 'fa-file-shield',
    'Kayıt Bilgilerim': 'fa-address-card',
    'Staj Bilgilerim': 'fa-briefcase',
    'YUM-III Ön Koşulları': 'fa-list-ol',
    'Yerinde Uygulama (YUM)': 'fa-building',
    'Finans Bilgilerim': 'fa-coins',
    'Anketler & Formlar': 'fa-square-poll-vertical',
    'Form ve Belgeler': 'fa-folder-open',
    'Kampüs Haritası': 'fa-map-location-dot',
    'Bilgi Merkezi': 'fa-book',
    'Kartlı Geçiş Sistemi': 'fa-id-badge',
    'Çıkış': 'fa-right-from-bracket'
};

const translations = {
    EN: {
        hello: "Hello",
        quickAccess: "Quick Access",
        lessonAnnouncements: "Lesson Announcements",
        noAnnouncements: "No announcements found.",
        mailBox: "mailBox",
        noShortcuts: "No shortcuts added. Click the star icon in the sidebar to add some!",
        fullStack: "Full Stack Developer",
        developedBy: "Developed by",
        clear: "Clear All",
        clearConfirm: "Are you sure you want to remove all favorites?",
        clearTitle: "Clear Shortcuts"
    },
    TR: {
        hello: "Merhaba",
        quickAccess: "Hızlı Erişim",
        lessonAnnouncements: "Ders Duyuruları",
        noAnnouncements: "Duyuru bulunamadı.",
        mailBox: "Posta Kutusu",
        noShortcuts: "Kısayol eklenmedi. Eklemek için menüdeki yıldız simgesine tıklayın!",
        fullStack: "Full Stack Geliştirici",
        developedBy: "Geliştiren:",
        clear: "Tümünü Temizle",
        clearConfirm: "Tüm kısayolları silmek istediğinize emin misiniz?",
        clearTitle: "Kısayolları Temizle"
    }
};

const logos = {
    dark: chrome.runtime.getURL('Uni_logo_DarkMode.png'),
    light: chrome.runtime.getURL('Uni_logo_LightMode.png'),
    girly: chrome.runtime.getURL('Uni_logo_GirlyMode.png')
};

let currentLang = 'EN'; // Default

function getTx(key) {
    return translations[currentLang][key] || translations['EN'][key];
}

function getIcon(title) {
    if (iconMap[title]) return iconMap[title];
    const lower = title.toLowerCase();
    if (lower.includes('exam') || lower.includes('sınav')) return 'fa-pen-to-square';
    if (lower.includes('course') || lower.includes('ders')) return 'fa-book';
    if (lower.includes('calendar') || lower.includes('takvim')) return 'fa-calendar';
    if (lower.includes('info') || lower.includes('bilgi')) return 'fa-circle-info';
    return 'fa-circle-dot';
}

function scrapeNews() {
    const newsSections = [];
    
    // 1. Generic Scraper (classes .content)
    const contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(div => {
        const header = div.querySelector('#cHeader')?.textContent?.trim();
        if (!header) return;
        
        const items = [];
        const rows = div.querySelectorAll('table.list tr');
        rows.forEach(row => {
            if (row.querySelector('th')) return;
            const cells = row.querySelectorAll('td');
            
            let course = '';
            let link = null;
            let date = '';

            // Layout 1: 5 Columns (Turkish Lessons: Index, Code, Name, Title, Date)
            if (cells.length >= 5) {
                const code = cells[1].textContent.trim();
                const name = cells[2].textContent.trim();
                course = code && name ? `${code} - ${name}` : code || name;
                link = cells[3].querySelector('a');
                date = cells[4].textContent.trim();
            }
            // Layout 2: 4 Columns (English Lessons: Index, Course, Title, Date)
            else if (cells.length >= 4) {
               course = cells[1].textContent.trim();
               link = cells[2].querySelector('a');
               date = cells[3].textContent.trim();
            } 
            // Layout 3: 3 Columns (Generic: Index, Title, Date)
            else if (cells.length >= 3) {
               link = cells[1].querySelector('a');
               date = cells[2].textContent.trim() || row.querySelector('.r')?.textContent.trim();
            }
            
            if (link) {
                items.push({
                    course: course,
                    title: link.textContent.trim(),
                    url: link.href,
                    date: date
                });
            }
        });

        if (items.length > 0) {
            newsSections.push({ title: header, items });
        }
    });

    // 3. Fallback: Structural Scraper (Find Table by Headers)
    const hasLessonStruct = newsSections.some(s => s.title === 'Lesson Announcements');
    
    if (!hasLessonStruct) {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const headerRow = table.querySelector('tr');
            if (!headerRow) return;
            
            const headerText = headerRow.innerText.toLowerCase();
            if ((headerText.includes('course') && headerText.includes('news')) || 
                (headerText.includes('ders') && headerText.includes('başlık'))) {
                
                const items = [];
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                     if (row.querySelector('th')) return; 
                     const cells = row.querySelectorAll('td');
                     if (cells.length < 2) return;

                     let course = '';
                     let codePart = '';
                     let namePart = '';
                     let link = null;
                     let date = '';

                     // Smart Column Detection
                     cells.forEach(cell => {
                         const text = cell.innerText.trim();
                         if (!text) return;

                         // Check for Date (DD.MM.YYYY)
                         if (/^\d{2}\.\d{2}\.\d{4}$/.test(text)) {
                             date = text;
                         }
                         // Check for Link (Title)
                         else if (cell.querySelector('a')) {
                             link = cell.querySelector('a');
                         }
                         // Check for Course Code (e.g., SEN431)
                         // If we find a code pattern, save it.
                         else if (/^[A-Z]{3,4}\s?\d{3}/.test(text)) { 
                              codePart = text;
                         }
                         // Check for Course Name (Text that is NOT code, NOT date, NOT link)
                         // We assume generic text might be the course name if we haven't found a "name" yet.
                         // Ignore short numbers (indices)
                         else if (text.length > 2 && !/^\d+$/.test(text)) {
                              // If we already have a codePart that includes this text, ignore.
                              if (!codePart || !codePart.includes(text)) {
                                  namePart = text;
                              }
                         }
                     });

                     // Combine Code and Name if both exist and are different
                     if (codePart && namePart && !codePart.includes(namePart)) {
                         course = `${codePart} - ${namePart}`;
                     } else if (codePart) {
                         course = codePart;
                     } else if (namePart) {
                         course = namePart; // If only name found
                     }

                     if (link) {
                        items.push({
                            course: course,
                            title: link.textContent.trim(),
                            url: link.href,
                            date: date
                        });
                     }
                });

                if (items.length > 0) {
                    newsSections.push({ title: 'Lesson Announcements', items });
                }
            }
        });
    }

    return newsSections;
}

// ... existing init ...

function startNewsObserver() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };
    
    let lastJson = JSON.stringify(scrapeNews()); // Initial state

    const callback = (mutationsList, observer) => {
        // Debounce? Or just check simplified
        // We only care if meaningful content changed.
        const currentNews = scrapeNews();
        const currentJson = JSON.stringify(currentNews);
        
        if (currentJson !== lastJson && currentNews.length > 0) {
            console.log("DOM updated, refreshing announcements...");
            lastJson = currentJson;
            renderAnnouncements(currentNews);
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

function init() {
    // Check master switch logic
    chrome.storage.local.get(['enhancerEnabled'], (res) => {
        if (res.enhancerEnabled === false) {
             console.log("[UBIS Enhancer] Disabled by user.");
             return;
        }
        startEnhancement();
    });
}

function startEnhancement() {
    console.log("UBIS UI Enhancer Starting...");

    // 0. Cloudflare / Security Check Detection
    // If the page is a Cloudflare challenge, STOP everything.
    const pageText = document.body.innerText;
    if (document.title.includes('Just a moment') || 
        pageText.includes('Verifying you are human') || 
        pageText.includes('security of your connection')) {
        console.log("[UBIS Enhancer] Cloudflare detected. Aborting to show original page.");
        return; // EXIT: Do not touch the page.
    }

    // If safe, apply the scope class to enabling text styling
    // document.body.classList.add('ubis-enhanced'); // MOVED: Scoping only if logged in

    // 0. Inject FontAwesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // 1. Scrape User Info & Logged-In Check
    const memberBlock = document.querySelector('#block_MemberBlock');
    
    // IF NOT LOGGED IN (Public Page / Login Page) -> ABORT
    if (!memberBlock) {
        console.log("[UBIS Enhancer] No user detected (Public Page). Aborting.");
        return; 
    }

    // NOW we are confirmed logged in, apply global styles
    document.body.classList.add('ubis-enhanced');

    const userImg = memberBlock.querySelector('img')?.src || '';
   
    let userEmail = '';
    
    if (memberBlock) {
        const emailLink = memberBlock.querySelector('a[href^="mailto"]');
        if (emailLink && emailLink.href) {
            // Safe extraction from href (cleans "mailto:" and params)
            userEmail = emailLink.href.replace('mailto:', '').split('?')[0].trim();
        } 
        
        if (!userEmail || userEmail.length > 50) { // Regex Fallback if href fail or text was garbage
             const mailMatch = memberBlock.innerText.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
             if (mailMatch) {
                 userEmail = mailMatch[0];
             }
        }
    }
    
    // User-provided fallback if scraping completely fails
    if (!userEmail) userEmail = 'karrom345@gmail.com';

    const nameEl = document.querySelector('#block_MemberBlock b');
    const userName = nameEl ? nameEl.textContent.trim() : 'Student';
    
    let studentId = '';
    if (nameEl && nameEl.nextSibling && nameEl.nextSibling.nodeType === 3) {
         studentId = nameEl.nextSibling.textContent.trim();
    } else if (nameEl && nameEl.nextSibling && nameEl.nextSibling.tagName === 'BR') {
        studentId = nameEl.nextSibling.nextSibling.textContent.trim();
    }

    // 2. Scrape Menu
    const menuItems = [];
    const menuLinks = document.querySelectorAll('#Menu_1 li a');
    
    // Fix: Check for both English 'Home' and Turkish 'Anasayfa'
    const hasHome = Array.from(menuLinks).some(a => {
        const t = a.innerText.trim();
        return t === 'Home' || t === 'Anasayfa';
    });
    
    if (!hasHome) {
        // Only add default if neither exists
        menuItems.push({ title: 'Home', url: '?Pointer=Main&', icon: 'fa-house' });
    }

    menuLinks.forEach(link => {
        const title = link.innerText.trim();
        if (title) {
            menuItems.push({
                title: title,
                url: link.href,
                icon: getIcon(title)
            });
        }
    });

    // 3. Scrape News (Initial)
    const newsData = scrapeNews();

    // 4. Logo Logic (Dynamic)
    // Default logo based on current mode
    // We can't know the mode for sure until storage load, but 'dark' is default.
    let logoSrc = logos.dark; 

    // 5. Determine Page Type
    const urlParams = new URLSearchParams(window.location.search);
    const pointer = urlParams.get('Pointer');
    const isHomePage = !pointer || pointer === 'Main' || pointer === 'Login';
    const ucLang = urlParams.get('ucLang');

    // LANGUAGE DETECTION
    if (ucLang === 'TR') currentLang = 'TR';
    else if (ucLang === 'EN') currentLang = 'EN';
    else {
        // Fallback detection
        const hasTurkishMenu = menuItems.some(i => i.title === 'Anasayfa');
        currentLang = hasTurkishMenu ? 'TR' : 'EN';
    }

    // 6. Load Favorites & Inject
    chrome.storage.local.get(['quickAccessFavorites'], (result) => {
        let favorites = result.quickAccessFavorites; 
        
        // MIGRATION / INITIALIZATION: Ensure favorites are URLs now, not Titles
        // If we detect Titles (no 'Pointer' or 'http'), we might want to clear or map them.
        // For simplicity in this dev environment, if it's empty or looks legacy, we can reset.
        // Or we just default if empty.
        
        if (favorites === undefined) {
            // Default URLs (mapped manually for reliability)
            // We'll try to find them in menuItems to get correct URLs
            const defaultTitles = [
                'Course Program', 'Ders Programım', 
                'Course Notes', 'Ders Notlarım',
                'Homeworks', 'Ödevlerim',
                'Transcription', 'Transkript',
                'Exam Program', 'Sınav Programım', 
                'My Exam Results', 'Sınav Sonuçlarım'
            ];
            
            favorites = menuItems
                .filter(item => defaultTitles.includes(item.title))
                .map(item => item.url);
            
            // Remove duplicates
            favorites = [...new Set(favorites)];
            
            chrome.storage.local.set({ quickAccessFavorites: favorites });
        } else {
            // Ensure initialized if empty array came back (for safety in rendering)
            if (!favorites) favorites = [];
        }

        injectUI(isHomePage, { name: userName, id: studentId, email: userEmail, img: userImg, logo: logoSrc }, menuItems, newsData, favorites);
        
        // 7. Dynamic Observer (Polling for News Updates)
        if (isHomePage) {
            startNewsObserver();
        }
    });
}

function startNewsObserver() {
    let lastJson = '';
    
    // Poll every 1.5 seconds to see if news block appeared/changed
    setInterval(() => {
        const currentNews = scrapeNews();
        const currentJson = JSON.stringify(currentNews);
        
        // If data changed (e.g. Lesson Announcements appeared), re-render
        if (currentJson !== lastJson && currentNews.length > 0) {
            console.log("New news data detected, re-rendering...");
            lastJson = currentJson;
            renderAnnouncements(currentNews);
        }
    }, 1500);
}

function toggleFavorite(url, btnElement) {
    chrome.storage.local.get(['quickAccessFavorites'], (result) => {
        let favorites = result.quickAccessFavorites || [];
        const index = favorites.indexOf(url);
        
        if (index === -1) {
            // Add
            favorites.push(url);
            btnElement.classList.add('active');
            btnElement.innerHTML = '<i class="fa-solid fa-star"></i>';
        } else {
            // Remove
            favorites.splice(index, 1);
            btnElement.classList.remove('active');
            btnElement.innerHTML = '<i class="fa-regular fa-star"></i>';
        }
        
        chrome.storage.local.set({ quickAccessFavorites: favorites }, () => {
             if (window.currentMenuItems) {
                 renderQuickAccess(favorites, window.currentMenuItems);
             }
        });
    });
}

function renderQuickAccess(favorites, menuItems) {
    const quickAccessGrid = document.querySelector('.shortcuts-grid');
    if (!quickAccessGrid) return;
    
    quickAccessGrid.innerHTML = ''; 
    
    const favItems = menuItems.filter(item => favorites.includes(item.url));
    
    if (favItems.length === 0) {
        quickAccessGrid.innerHTML = `<p style="color:var(--text-muted);width:100%;text-align:center;padding:1rem;">${getTx('noShortcuts')}</p>`;
        return;
    }

    favItems.forEach(item => {
        const btn = document.createElement('a');
        btn.className = 'shortcut-card';
        btn.href = item.url;
        btn.innerHTML = `
            <div class="icon-box"><i class="fa-solid ${item.icon}"></i></div>
            <span>${item.title}</span>
        `;
        quickAccessGrid.appendChild(btn);
    });
}

function renderAnnouncements(newsData) {
    const grid = document.querySelector('.dashboard-grid');
    if (!grid) return;
    
    grid.innerHTML = ''; // Clear existing
    
    if (newsData.length === 0) {
        grid.innerHTML = `<div class="announce-card"><p>${getTx('noAnnouncements')}</p></div>`;
        return;
    }

    // Prioritize 'Lesson Announcements' or 'Ders Duyuruları'
    newsData.sort((a, b) => {
        const isLessonA = a.title.includes('Lesson') || a.title.includes('Ders');
        const isLessonB = b.title.includes('Lesson') || b.title.includes('Ders');
        if (isLessonA && !isLessonB) return -1;
        if (!isLessonA && isLessonB) return 1;
        return 0; // Keep original order for others
    });

    newsData.forEach(section => {
        const card = document.createElement('div');
        card.className = 'announce-card';
        
        // Add specific class for styling
        if (section.title.includes('Lesson') || section.title.includes('Ders')) {
            card.classList.add('card-lessons');
        }
        
        let listHtml = '';
        section.items.forEach(item => {
            const courseBadge = item.course ? `<span class="course-badge">${item.course}</span>` : '';
            
            listHtml += `
                <li class="announce-item">
                    <div class="announce-main">
                        ${courseBadge}
                        <a href="${item.url}">${item.title}</a>
                    </div>
                    <span class="announce-date">${item.date}</span>
                </li>
            `;
        });

        card.innerHTML = `
            <div class="announce-header">
                <h3>${section.title}</h3>
            </div>
            <ul class="announce-list">
                ${listHtml}
            </ul>
        `;
        grid.appendChild(card);
        
        // Add separator
        if (section.title.includes('Lesson') || section.title.includes('Ders')) {
            const separator = document.createElement('div');
            separator.className = 'grid-separator';
            grid.appendChild(separator);
        }
    });
}

function injectUI(isHomePage, user, menuItems, newsData, favorites) {
    // Load Theme Preference immediately
    chrome.storage.local.get(['theme'], (result) => {
        const logoImg = document.querySelector('#sidebar-logo');
        if (result.theme === 'light') {
            document.body.classList.add('light-mode');
            if(logoImg) logoImg.src = logos.light;
        } else if (result.theme === 'girly') {
            document.body.classList.add('girly-mode');
            if(logoImg) logoImg.src = logos.girly;
        } else {
             if(logoImg) logoImg.src = logos.dark;
        }
    });

    window.currentMenuItems = menuItems;

    const appContainer = document.createElement('div');
    appContainer.id = 'ubis-app';

    // 0. Define Dropdown Items (Move from Sidebar)
    const dropdownTitles = [
        // English
        'Account Settings', 'Logout', 'E-Mail', 'Smart Card System', 'Registration Info', 'Finance Information',
        // Turkish
        'Hesap Ayarları', 'Çıkış', 'E-Posta', 'Kartlı Geçiş Sistemi', 'Kayıt Bilgilerim', 'Finans Bilgilerim'
    ];
    
    // items meant for the dropdown
    const dropdownItems = menuItems.filter(item => dropdownTitles.some(t => item.title.toLowerCase().includes(t.toLowerCase())));

    // 1. Sidebar (Filter out dropdown items)
    const sidebar = document.createElement('div');
    sidebar.id = 'ubis-sidebar';
    sidebar.innerHTML = `
        <div class="sidebar-header" style="padding-bottom:2rem;text-align:center;">
             <img id="sidebar-logo" src="${user.logo}" style="max-width:80%;height:auto;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3));transition:all 0.3s ease;">
        </div>
        <div class="sidebar-nav"></div>
    `;
    
    const navContainer = sidebar.querySelector('.sidebar-nav');
    // Filter logic
    menuItems.filter(item => !dropdownTitles.some(t => item.title.toLowerCase().includes(t.toLowerCase()))).forEach(item => {
        const linkContainer = document.createElement('div');
        linkContainer.className = 'sidebar-link'; 
        
        const isFav = favorites.includes(item.url);
        
        const linkContent = document.createElement('a');
        linkContent.className = 'sidebar-link-content';
        linkContent.href = item.url;
        linkContent.style.textDecoration = 'none';
        linkContent.style.color = 'inherit';
        linkContent.innerHTML = ` <i class="fa-solid ${item.icon}"></i> ${item.title} `;
        
        if (window.location.href.includes(item.url)) {
            linkContainer.classList.add('active');
        }

        const starBtn = document.createElement('button');
        starBtn.className = `star-btn ${isFav ? 'active' : ''}`;
        starBtn.innerHTML = isFav ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
        starBtn.title = isFav ? "Remove from Quick Access" : "Add to Quick Access";
        
        starBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            toggleFavorite(item.url, starBtn);
        });

        linkContainer.appendChild(linkContent);
        linkContainer.appendChild(starBtn);
        
        linkContainer.addEventListener('click', (e) => {
            if (e.target !== starBtn && !starBtn.contains(e.target)) {
                 if (e.target.tagName !== 'A') {
                     window.location.href = item.url;
                 }
            }
        });

        navContainer.appendChild(linkContainer);
    });

    appContainer.appendChild(sidebar);

    // 2. Main Content
    const mainContent = document.createElement('div');
    mainContent.id = 'ubis-main';
    appContainer.appendChild(mainContent);

    // --- SHARED LAYOUT (Header + Quick Access) ---
    // Moved outside isHomePage to show on all pages
    
    const emailItem = menuItems.find(item => item.title.includes('E-Mail') || item.title.includes('E-Posta') || item.title.includes('Mail'));
    const emailUrl = emailItem ? emailItem.url : `mailto:${user.email}`;

    // Header
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    
    // Generate Dropdown HTML
    let dropdownHtml = '';
    dropdownItems.forEach(item => {
            const isLogout = item.title.toLowerCase().includes('logout') || item.title.toLowerCase().includes('çıkış');
            const extraClass = isLogout ? 'logout-item' : '';
            dropdownHtml += `<a href="${item.url}" class="${extraClass}"><i class="fa-solid ${item.icon}"></i> ${item.title}</a>`;
    });

    header.innerHTML = `
        <div class="user-info">
            <h1>${getTx('hello')}, ${user.name} 👋</h1>
            <p>
                ${user.id} <span style="margin:0 10px;color:var(--card-border)">|</span> 
                <a href="${emailUrl}" title="Go to Inbox">${getTx('mailBox')} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.8em; margin-left:5px;"></i></a>
            </p>
        </div>
        
        <div class="header-actions" style="display:flex;align-items:center;gap:1.5rem;">
            <!-- Theme Switcher -->
            <button id="theme-toggle" class="header-btn" title="Toggle Light/Dark Mode" style="padding:0.5rem;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;">
                <i class="fa-solid fa-sun"></i>
            </button>

                <!-- Language Switcher -->
                <div class="lang-switcher" style="display:flex;gap:0.5rem;background:var(--header-btn-bg);padding:0.25rem 0.5rem;border-radius:20px;">
                <button id="btn-lang-tr" class="header-btn" style="background:transparent;opacity:${currentLang==='TR'?'1':'0.5'};width:auto;">TR</button>
                <span style="color:var(--text-muted);">|</span>
                <button id="btn-lang-en" class="header-btn" style="background:transparent;opacity:${currentLang==='EN'?'1':'0.5'};width:auto;">EN</button>
                </div>

            <div class="user-details">
                <div class="user-profile-container">
                    <img src="${user.img}" class="profile-img">
                    <img src="${chrome.runtime.getURL('ribbon.png')}" class="ribbon-decoration">
                    <div class="profile-dropdown">
                        ${dropdownHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
    mainContent.appendChild(header);

    // Attach Language Switcher Events
    const switchLang = (lang) => {
            const url = new URL(window.location.href);
            url.searchParams.set('ucLang', lang);
            window.location.href = url.toString();
    };

    // Theme Toggle Logic (3-Way: Dark -> Light -> Girly -> Dark)
    const themeBtn = header.querySelector('#theme-toggle');
    const updateThemeIcon = () => {
        const logoImg = document.querySelector('#sidebar-logo');
        // Determine current state based on body class
        if (document.body.classList.contains('light-mode')) {
            themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            if(logoImg) logoImg.src = logos.light;
        } else if (document.body.classList.contains('girly-mode')) {
            themeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>'; 
            if(logoImg) logoImg.src = logos.girly;
        } else {
            themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            if(logoImg) logoImg.src = logos.dark;
        }
        // Style is handled by CSS class
    };
    
    // Initial check
    setTimeout(updateThemeIcon, 50); 

    // Sound Effect 🔊
    const girlySound = new Audio(chrome.runtime.getURL('iamjustgirl.MP3'));

    // Sprinkles Animation Logic
    const triggerSprinkles = () => {
        const colors = ['#db2777', '#f472b6', '#fce7f3', '#fbbf24', '#ffffff'];
        for (let i = 0; i < 50; i++) {
            const el = document.createElement('div');
            el.className = 'sprinkle';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            el.style.animationDuration = (Math.random() * 2 + 1) + 's'; // 1-3s
            el.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(el);
            
            // Remove after animation
            setTimeout(() => el.remove(), 3000);
        }
    };

    themeBtn.addEventListener('click', () => {
        // Cycle logic
        if (document.body.classList.contains('light-mode')) {
            // Light -> Girly
            document.body.classList.remove('light-mode');
            document.body.classList.add('girly-mode');
            chrome.storage.local.set({ theme: 'girly' });
            triggerSprinkles(); // ✨ Trigger Animation
            girlySound.play().catch(e => console.log('Audio play failed:', e)); // 🔊 Play Sound
        } else if (document.body.classList.contains('girly-mode')) {
            // Girly -> Dark
            document.body.classList.remove('girly-mode');
            chrome.storage.local.set({ theme: 'dark' });
        } else {
            // Dark (default) -> Light
            document.body.classList.add('light-mode');
            chrome.storage.local.set({ theme: 'light' });
        }
        updateThemeIcon();
    });

    const btnTR = header.querySelector('#btn-lang-tr');
    if (btnTR) btnTR.addEventListener('click', () => switchLang('TR'));

    const btnEN = header.querySelector('#btn-lang-en');
    if (btnEN) btnEN.addEventListener('click', () => switchLang('EN'));

    // Quick Access
    const quickAccess = document.createElement('div');
    quickAccess.className = 'dashboard-shortcuts';
    quickAccess.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="margin:0;">${getTx('quickAccess')}</h3>
            <button id="clear-favorites" style="background:transparent;border:1px solid var(--card-border);color:var(--text-muted);padding:0.2rem 0.6rem;border-radius:4px;cursor:pointer;font-size:0.8rem;transition:0.2s;">
                <i class="fa-solid fa-trash-can"></i> ${getTx('clear')}
            </button>
        </div>
        <div class="shortcuts-grid"></div>
    `;
    mainContent.appendChild(quickAccess);
    
    // Clear Favorites Event
    const clearBtn = quickAccess.querySelector('#clear-favorites');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            showConfirmModal(
                getTx('clearTitle'), 
                getTx('clearConfirm'), 
                () => {
                    // On Confirm
                    chrome.storage.local.set({ quickAccessFavorites: [] }, () => {
                            // Update UI
                            renderQuickAccess([], menuItems);
                            // Also update sidebar stars
                            document.querySelectorAll('.star-btn').forEach(btn => {
                                btn.classList.remove('active');
                                btn.innerHTML = '<i class="fa-regular fa-star"></i>';
                            });
                    });
                }
            );
        });
        
        // Hover effect via JS since it is inline style (simple way)
        clearBtn.addEventListener('mouseenter', () => { clearBtn.style.color = '#ff4d4d'; clearBtn.style.borderColor = '#ff4d4d'; });
        clearBtn.addEventListener('mouseleave', () => { clearBtn.style.color = 'var(--text-muted)'; clearBtn.style.borderColor = 'var(--card-border)'; });
    }

    // Always render Quick Access (it's now global)
    document.body.appendChild(appContainer);
    renderQuickAccess(favorites, menuItems);


    // --- PAGE SPECIFIC CONTENT ---

    if (isHomePage) {
        document.body.classList.add('ubis-dashboard-active');

        // Announcements Grid Container
        const grid = document.createElement('div');
        grid.className = 'dashboard-grid';
        mainContent.appendChild(grid);
        
        // Footer (Added per user request)
        const footer = document.createElement('div');
        footer.className = 'ubis-footer';
        footer.innerHTML = `
            <div class="footer-left">
                <span><i class="fa-solid fa-code" style="color:var(--primary-color)"></i> ${getTx('fullStack')}</span>
                <span class="sep">|</span>
                <span>${getTx('developedBy')} <strong>Baraa Alshugri</strong></span>
            </div>
            <div class="footer-socials">
                <a href="https://github.com/bv4ts" target="_blank" title="GitHub"><i class="fa-brands fa-github"></i></a>
                <a href="https://www.instagram.com/bv4ts" target="_blank" title="Instagram"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/baraaalshugri" target="_blank" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>
                <a href="mailto:karrom345@gmail.com" title="Email"><i class="fa-solid fa-envelope"></i></a>
            </div>
        `;
        mainContent.appendChild(footer); // Append footer after grid so it's not wiped by updates
        
        // Inject Loading Overlay
        const loader = document.createElement('div');
        loader.className = 'ubis-loading-overlay';
        loader.innerHTML = '<div class="ubis-spinner"></div>';
        document.body.appendChild(loader);
        
        // Remove after 2 seconds
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 1000);

        renderAnnouncements(newsData);

        // Hide legacy main
        const legacyMain = document.querySelector('.nl2-main');
        if (legacyMain) legacyMain.style.display = 'none';

    } else {
        // --- INNER PAGE MODE ---
        document.body.classList.add('ubis-inner-page');
        const centerContainer = document.querySelector('#centerContainer');
        if (centerContainer) {
            const innerWrapper = document.createElement('div');
            innerWrapper.className = 'inner-page-container';
            innerWrapper.appendChild(centerContainer);
            mainContent.appendChild(innerWrapper);
            const legacyMain = document.querySelector('.nl2-main');
            if (legacyMain) legacyMain.style.display = 'none';
        }
    }
}

function showConfirmModal(title, message, onConfirm) {
    // Check if modal exists, remove if so
    const existing = document.querySelector('.ubis-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'ubis-modal-overlay';
    
    overlay.innerHTML = `
        <div class="ubis-modal">
            <div class="ubis-modal-header">
                <div class="ubis-modal-icon">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="ubis-modal-title">${title}</div>
            </div>
            <div class="ubis-modal-body">
                ${message}
            </div>
            <div class="ubis-modal-actions">
                <button class="ubis-btn ubis-btn-cancel">Cancel</button>
                <button class="ubis-btn ubis-btn-danger">Delete</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Trigger animation
    requestAnimationFrame(() => overlay.classList.add('active'));
    
    const close = () => {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
    };
    
    overlay.querySelector('.ubis-btn-cancel').addEventListener('click', close);
    overlay.querySelector('.ubis-btn-danger').addEventListener('click', () => {
        onConfirm();
        close();
    });
    
    // Close on outside click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
}

// Run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
