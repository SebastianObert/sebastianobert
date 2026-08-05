-- Seed Data for Sebastian Obert Portfolio
-- Supabase PostgreSQL

-- =============================================
-- ms_profile
-- =============================================
INSERT INTO ms_profile (id, greeting, name, tagline, description, focus_text, profile_image, brand_name, github_url)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'HELLO, FOLKS! 👋',
  'Sebastian Obert',
  'A third-year Informatics student at Multimedia Nusantara University.',
  'I build end-to-end digital solutions, from Android applications and interactive web platforms to backend systems. Specialized in cross-platform development with a user-centric design approach and security-first mindset.',
  'Currently focused on continuous learning and practical implementation in mobile development, game logic, and AI/Machine Learning.',
  '/profil_sebastian.jpeg',
  'SoC',
  'https://github.com/SebastianObert'
);

-- =============================================
-- ms_social_link
-- =============================================
INSERT INTO ms_social_link (id, platform, url, icon_type, icon_url, hover_color, sort_order) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Instagram', 'https://instagram.com/sebasobet', 'simpleicons_url', 'https://cdn.simpleicons.org/instagram/E4405F', '#E4405F', 1),
  ('b0000000-0000-0000-0000-000000000002', 'WhatsApp', 'https://wa.me/6281314412184', 'simpleicons_url', 'https://cdn.simpleicons.org/whatsapp/25D366', '#25D366', 2),
  ('b0000000-0000-0000-0000-000000000003', 'LINE', 'https://line.me/ti/p/~sebastianobert', 'simpleicons_url', 'https://cdn.simpleicons.org/line/00C300', '#00C300', 3),
  ('b0000000-0000-0000-0000-000000000004', 'LinkedIn', 'https://www.linkedin.com/in/sebastian-obert-cen/', 'inline_svg', NULL, '#0A66C2', 4);

-- =============================================
-- ms_project
-- =============================================
INSERT INTO ms_project (id, slug, name, description, image, image_alt, video_src, video_poster, project_url, accent_color, grid_span, layout_direction, has_image_click, sort_order) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'aegis', 'Aegis Call',
   'Aegis Call is an integrated emergency response application prototype designed using a User-Centered Design approach to ensure ease of use, speed, and clarity in critical situations. The application consolidates multiple emergency services into a single platform, featuring direct emergency calls, media-based incident reporting, and real-time assistance tracking. With a strong focus on usability, accessibility, and user experience under extreme conditions, Aegis Call aims to reduce user panic and enable faster, more accurate, and well-coordinated emergency responses.',
   '/aegis.png', 'Aegis Call UI', NULL, NULL,
   'https://www.figma.com/proto/qLd5xU8g1rZm0nehm53wqV/UAS-HCI?node-id=605-4407&t=ZrwxJHFBdqvFLnBZ-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=52%3A363',
   'orange', 'md:col-span-2', 'flex-row', true, 1),

  ('c0000000-0000-0000-0000-000000000002', 'jebs', 'JEBS',
   'JEBS is a third-person Action-RPG combat prototype that successfully delivers an intense, skill-based sword-fighting experience. The game emphasizes timing, precision, and mastery of defensive mechanics, particularly parry and posture management—over traditional health-based combat.',
   NULL, NULL, '/trailer.mp4', '/jebs.png',
   'https://sebastian-obert-95634.itch.io/jebs-umn',
   'purple', 'md:col-span-1', 'column', false, 2),

  ('c0000000-0000-0000-0000-000000000003', 'grow', 'Grow Community',
   'This application provides an integrated, secure, and efficient solution for managing children''s check-in and check-out activities in a church environment. By replacing manual processes with a centralized web-based system, it improves accuracy, enhances child safety through identity verification, and enables real-time attendance monitoring.',
   '/grow_church.png', 'Grow Community', NULL, NULL,
   'https://share.google/r5Mqn1b554MBURZj2',
   'blue', 'md:col-span-1', 'column', true, 3),

  ('c0000000-0000-0000-0000-000000000004', 'aircare', 'AirCare Mobile App',
   'AirCare is a mobile application designed to help users monitor and understand air quality around them in real time, with the main goal of supporting healthier daily decisions. By providing accurate AQI data based on the user''s location, storing air quality history, delivering smart notifications during hazardous conditions, and offering health recommendations.',
   '/aircare_mobile.png', 'AirCare App', NULL, NULL,
   'https://github.com/SebastianObert/AirCare',
   'cyan', 'md:col-span-2', 'flex-row-reverse', true, 4),

  ('c0000000-0000-0000-0000-000000000005', 'aljatim', 'Al-Jatim Web Platform',
   'Al-Jatim is a web-based application designed to introduce and showcase East Java (Jawa Timur) through an informative and visually engaging digital platform. Built using React.js, the application aims to promote regional knowledge and cultural appreciation while delivering a modern, interactive, and user-friendly browsing experience.',
   '/aljatim.png', 'Al-Jatim Web Platform', NULL, NULL,
   'https://all-jatim.vercel.app/',
   'teal', 'md:col-span-3', 'flex-row', true, 5),

  ('c0000000-0000-0000-0000-000000000006', 'dataviz', 'Air Quality Data Visualization of Jakarta',
   'Analyzes air quality trends in DKI Jakarta (2016-2023) using Tableau. Features interactive dashboards with spatial analysis, trend monitoring, and forecasting. Highlights PM2.5 as the dominant pollutant, with East and North Jakarta showing the highest pollution levels.',
   '/datviz.png', 'Air Quality Data Visualization', NULL, NULL,
   'https://public.tableau.com/app/profile/sebastian.obert/viz/dashboard1_17651964590990/Story1IndeksKualitasUdaraProvinsiJakartaTahun2016-2023Revisi?publish=yes',
   'pink', 'md:col-span-3', 'flex-row', true, 6),

  ('c0000000-0000-0000-0000-000000000007', 'indotext', 'Indo-Text Classification',
   'A Natural Language Processing project that analyzes Indonesian forum discussions for sentiment analysis, emotion detection, and toxicity classification. Built with Python and Scikit-learn, using TF-IDF vectorization and comparing SVM vs Naive Bayes models.',
   '/machinelearning.png', 'Indo-Text Classification', NULL, NULL,
   'https://github.com/SebastianObert/indo-text-classification',
   'emerald', 'md:col-span-3', 'flex-row', true, 7),

  ('c0000000-0000-0000-0000-000000000008', 'snort', 'SSH Brute Force Detection',
   'An experimental cybersecurity project analyzing the effectiveness of Snort IDS in detecting SSH brute force attacks within a controlled local network. The simulation involved using Hydra on Kali Linux to attack an Ubuntu Server, utilizing custom Snort rules to identify and alert on suspicious login patterns in real-time.',
   NULL, NULL, '/snort_demo.mp4', NULL,
   NULL,
   'red', 'md:col-span-3', 'flex-row', false, 8);

-- =============================================
-- ms_project_tag
-- =============================================
INSERT INTO ms_project_tag (id, project_id, tag_name) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Figma'),
  ('d0000000-0000-0000-0000-000000000002', 'c0000000-0000-0000-0000-000000000001', 'UI/UX'),
  ('d0000000-0000-0000-0000-000000000003', 'c0000000-0000-0000-0000-000000000002', 'Unity'),
  ('d0000000-0000-0000-0000-000000000004', 'c0000000-0000-0000-0000-000000000002', 'C#'),
  ('d0000000-0000-0000-0000-000000000005', 'c0000000-0000-0000-0000-000000000003', 'PHP'),
  ('d0000000-0000-0000-0000-000000000006', 'c0000000-0000-0000-0000-000000000003', 'Laravel'),
  ('d0000000-0000-0000-0000-000000000007', 'c0000000-0000-0000-0000-000000000003', 'MySQL'),
  ('d0000000-0000-0000-0000-000000000008', 'c0000000-0000-0000-0000-000000000004', 'Kotlin'),
  ('d0000000-0000-0000-0000-000000000009', 'c0000000-0000-0000-0000-000000000004', 'Firebase'),
  ('d0000000-0000-0000-0000-000000000010', 'c0000000-0000-0000-0000-000000000005', 'React.js'),
  ('d0000000-0000-0000-0000-000000000011', 'c0000000-0000-0000-0000-000000000005', 'Tailwind CSS'),
  ('d0000000-0000-0000-0000-000000000012', 'c0000000-0000-0000-0000-000000000005', 'Interactive'),
  ('d0000000-0000-0000-0000-000000000013', 'c0000000-0000-0000-0000-000000000006', 'Tableau'),
  ('d0000000-0000-0000-0000-000000000014', 'c0000000-0000-0000-0000-000000000006', 'Data Visualization'),
  ('d0000000-0000-0000-0000-000000000015', 'c0000000-0000-0000-0000-000000000007', 'Python'),
  ('d0000000-0000-0000-0000-000000000016', 'c0000000-0000-0000-0000-000000000007', 'NLP'),
  ('d0000000-0000-0000-0000-000000000017', 'c0000000-0000-0000-0000-000000000008', 'Kali Linux'),
  ('d0000000-0000-0000-0000-000000000018', 'c0000000-0000-0000-0000-000000000008', 'Cybersecurity');

-- =============================================
-- ms_skill
-- =============================================
INSERT INTO ms_skill (id, name, icon, icon_type, category, sort_order) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Kotlin', 'https://cdn.simpleicons.org/kotlin/7F52FF', 'simpleicons_url', 'Mobile Development', 1),
  ('e0000000-0000-0000-0000-000000000002', 'Unity', 'https://cdn.simpleicons.org/unity/white', 'simpleicons_url', 'Game Development', 2),
  ('e0000000-0000-0000-0000-000000000003', 'C#', 'https://cdn.simpleicons.org/csharp/9B4F96', 'simpleicons_url', 'Game Development', 3),
  ('e0000000-0000-0000-0000-000000000004', 'Next.js', 'https://cdn.simpleicons.org/nextdotjs/white', 'simpleicons_url', 'Web Frontend', 4),
  ('e0000000-0000-0000-0000-000000000005', 'React', 'https://cdn.simpleicons.org/react/61DAFB', 'simpleicons_url', 'Web Frontend', 5),
  ('e0000000-0000-0000-0000-000000000006', 'TypeScript', 'https://cdn.simpleicons.org/typescript/3178C6', 'simpleicons_url', 'Web Frontend', 6),
  ('e0000000-0000-0000-0000-000000000007', 'Tailwind', 'https://cdn.simpleicons.org/tailwindcss/06B6D4', 'simpleicons_url', 'Web Frontend', 7),
  ('e0000000-0000-0000-0000-000000000008', 'Java', '/java.png', 'local_image', 'Backend & Database', 8),
  ('e0000000-0000-0000-0000-000000000009', 'Firebase', 'https://cdn.simpleicons.org/firebase/FFCA28', 'simpleicons_url', 'Backend & Database', 9),
  ('e0000000-0000-0000-0000-000000000010', 'PHP', 'https://cdn.simpleicons.org/php/777BB4', 'simpleicons_url', 'Backend & Database', 10),
  ('e0000000-0000-0000-0000-000000000011', 'Laravel', 'https://cdn.simpleicons.org/laravel/FF2D20', 'simpleicons_url', 'Backend & Database', 11),
  ('e0000000-0000-0000-0000-000000000012', 'MySQL', 'https://cdn.simpleicons.org/mysql/4479A1', 'simpleicons_url', 'Backend & Database', 12),
  ('e0000000-0000-0000-0000-000000000013', 'Python', 'https://cdn.simpleicons.org/python/3776AB', 'simpleicons_url', 'Data Analysis', 13),
  ('e0000000-0000-0000-0000-000000000014', 'RStudio', '/rstudio.webp', 'local_image', 'Data Analysis', 14),
  ('e0000000-0000-0000-0000-000000000015', 'Tableau', '/tableau.jpg', 'local_image', 'Data Visualization', 15),
  ('e0000000-0000-0000-0000-000000000016', 'Figma', 'https://cdn.simpleicons.org/figma/F24E1E', 'simpleicons_url', 'UI/UX Design', 16),
  ('e0000000-0000-0000-0000-000000000017', 'Kali Linux', 'https://cdn.simpleicons.org/kalilinux/557C94', 'simpleicons_url', 'Cybersecurity', 17),
  ('e0000000-0000-0000-0000-000000000018', 'Snort', 'https://cdn.simpleicons.org/snort/EC1C24', 'simpleicons_url', 'Cybersecurity', 18);

-- =============================================
-- ms_organization
-- =============================================
INSERT INTO ms_organization (id, slug, name, full_name, logo, logo_alt, role, date_range, description, sort_order) VALUES
  ('f0000000-0000-0000-0000-000000000001', 'kspm', 'KSPM UMN', 'Kelompok Studi Pasar Modal', '/kspm.jpg', 'Logo KSPM', 'Internal Education', 'Apr 2025 - Dec 2025', 'Developed weekly investment-related educational content and delivered capital market presentations while simplifying complex financial concepts into practical insights for members.', 1),
  ('f0000000-0000-0000-0000-000000000002', 'commfest', 'COMMFEST UMN 2025', 'Communication Festival', '/commfest.jpg', 'Logo COMMFEST', 'Equipment', 'Mar 2025 - Nov 2025', 'Managed event equipment and logistics to support operational needs and ensure the smooth execution of the festival.', 2),
  ('f0000000-0000-0000-0000-000000000003', 'umnfest', 'UFEST 2024', 'UMN Festival', '/ufest.jpg', 'Logo UMN Fest', 'Competition', 'Oct 2024 - Dec 2024', 'Supported sports competition operations by assisting with match administration and on-field coordination.', 3);

-- =============================================
-- ms_gallery_item
-- =============================================
INSERT INTO ms_gallery_item (id, image, alt, caption, sort_order) VALUES
  ('aa000000-0000-0000-0000-000000000001', '/spm.jpg', 'Event 1', 'Sekolah Pasar Modal', 1),
  ('aa000000-0000-0000-0000-000000000002', '/closingcommfest.jpg', 'Event 2', 'COMMFEST 2025', 2),
  ('aa000000-0000-0000-0000-000000000003', '/ufestt.jpg', 'Event 3', 'UMN Festival 2024', 3),
  ('aa000000-0000-0000-0000-000000000004', '/state.jpg', 'Event 4', 'STATE KSPM', 4),
  ('aa000000-0000-0000-0000-000000000005', '/pkm.jpg', 'Event 5', 'PKM', 5);

-- =============================================
-- ms_nav_link
-- =============================================
INSERT INTO ms_nav_link (id, label, href, sort_order) VALUES
  ('ab000000-0000-0000-0000-000000000001', 'About', '#about', 1),
  ('ab000000-0000-0000-0000-000000000002', 'Projects', '#projects', 2),
  ('ab000000-0000-0000-0000-000000000003', 'Organization', '#organization', 3);

-- =============================================
-- ms_seo_metadata
-- =============================================
INSERT INTO ms_seo_metadata (id, title, description, keywords, og_image, canonical_url)
VALUES (
  'ac000000-0000-0000-0000-000000000001',
  'Sebastian Obert | Portfolio',
  'Portfolio of Sebastian Obert - Informatics student at Multimedia Nusantara University. Specialized in cross-platform development with a user-centric design approach.',
  ARRAY['Sebastian Obert', 'portfolio', 'web developer', 'mobile developer', 'Next.js', 'React', 'TypeScript', 'Kotlin', 'UMN', 'Informatics'],
  '/og-image.png',
  'https://sebastianobert.site'
);
