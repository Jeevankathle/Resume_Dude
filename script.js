document.addEventListener("DOMContentLoaded", () => {
    const LEGACY_DRAFT_KEY = "savedResumeDraft";
    const DRAFTS_STORE_KEY = "resumeDudeDrafts_v2";
    const ACTIVE_DRAFT_KEY = "resumeDudeActiveDraftId_v2";
    const VIEW_STATE_KEY = "resumeDudeViewState";
    const POST_DOWNLOAD_DISMISSED_KEY = "resumeDudePostDownloadDismissed";
            
    // Views
    const landingView = document.getElementById("landingView");
    const builderView = document.getElementById("builderView");
    const navOpenBuilderBtn = document.getElementById("navOpenBuilderBtn");
    const heroBuildBtn = document.getElementById("heroBuildBtn");
    const backToLandingBtn = document.getElementById("backToLandingBtn");
    const inputNameField = document.getElementById("inputName");
    const landingNavLinks = Array.from(document.querySelectorAll(".landing-nav [data-nav-target]"));

    // Header & Navigation Controls
    const openDraftsHeaderBtn = document.getElementById("openDraftsHeaderBtn");
    const activeDraftTitle = document.getElementById("activeDraftTitle");
    const saveStatusPill = document.getElementById("saveStatusPill");
    const saveStatusText = document.getElementById("saveStatusText");
    const tabFormBtn = document.getElementById("tabFormBtn");
    const tabPreviewBtn = document.getElementById("tabPreviewBtn");
    const formContainer = document.getElementById("formContainer");
    const previewContainer = document.getElementById("previewContainer");
    const moreOptionsBtn = document.getElementById("moreOptionsBtn");
    const moreOptionsMenu = document.getElementById("moreOptionsMenu");
    const menuDraftsBtn = document.getElementById("menuDraftsBtn");
    const menuNewResumeBtn = document.getElementById("menuNewResumeBtn");
    const menuPrivacyBtn = document.getElementById("menuPrivacyBtn");
    const menuOverviewBtn = document.getElementById("menuOverviewBtn");

    // Stepper & Form Elements
    const resumeForm = document.getElementById("resumeForm");
    const stepPanels = Array.from(document.querySelectorAll(".wizard-step"));
    const stepPills = Array.from(document.querySelectorAll("#stepperPills .step-pill"));
    const stepCounterLabel = document.getElementById("stepCounterLabel");
    const stepCurrentName = document.getElementById("stepCurrentName");
    const stepperProgressFill = document.getElementById("stepperProgressFill");
    const prevStepBtn = document.getElementById("prevStepBtn");
    const nextStepBtn = document.getElementById("nextStepBtn");

    // Inline Confirm for New Blank Resume
    const newResumeConfirmBar = document.getElementById("newResumeConfirmBar");
    const confirmNewResumeBtn = document.getElementById("confirmNewResumeBtn");
    const cancelNewResumeBtn = document.getElementById("cancelNewResumeBtn");

    // Summary Controls
    const inputSummary = document.getElementById("inputSummary");
    const summaryWordCount = document.getElementById("summaryWordCount");
    const autoGenSummaryBtn = document.getElementById("autoGenSummaryBtn");
    const pasteSummaryBtn = document.getElementById("pasteSummaryBtn");
    const summaryTemplateSelect = document.getElementById("summaryTemplateSelect");

    // Education Controls
    const toggleEduPgBtn = document.getElementById("toggleEduPgBtn");
    const eduPgWrapper = document.getElementById("eduPgWrapper");
    const toggleEdu12Btn = document.getElementById("toggleEdu12Btn");
    const edu12Wrapper = document.getElementById("edu12Wrapper");
    const toggleEdu10Btn = document.getElementById("toggleEdu10Btn");
    const edu10Wrapper = document.getElementById("edu10Wrapper");
    const eduStream2 = document.getElementById("eduStream2");
    const eduStreamCustomWrap = document.getElementById("eduStreamCustomWrap");
    const eduStreamCustom2 = document.getElementById("eduStreamCustom2");
    const addCustomEduBtn = document.getElementById("addCustomEduBtn");
    const customEduContainer = document.getElementById("customEduContainer");

    // Skills Controls
    const removeTechSectionBtn = document.getElementById("removeTechSectionBtn");
    const techSkillsWrapper = document.getElementById("techSkillsWrapper");
    const addCustomSkillGroupBtn = document.getElementById("addCustomSkillGroupBtn");
    const customSkillGroupsContainer = document.getElementById("customSkillGroupsContainer");
    const softSkillPresets = document.getElementById("softSkillPresets");
    const softSkillsInput = document.getElementById("softSkillsInput");
    const addSoftTagBtn = document.getElementById("addSoftTagBtn");
    const softTagsContainer = document.getElementById("softTagsContainer");

    // Projects & Experience Controls
    const addProjectBtn = document.getElementById("addProjectBtn");
    const projectsContainer = document.getElementById("projectsContainer");
    const projectsEmptyState = document.getElementById("projectsEmptyState");
    const addExpBtn = document.getElementById("addExpBtn");
    const expContainer = document.getElementById("expContainer");
    const expEmptyState = document.getElementById("expEmptyState");

    // Additional Info Controls
    const certGuideBtn = document.getElementById("certGuideBtn");
    const addCertBtn = document.getElementById("addCertBtn");
    const certsContainer = document.getElementById("certsContainer");
    const achieveGuideBtn = document.getElementById("achieveGuideBtn");
    const addAchieveBtn = document.getElementById("addAchieveBtn");
    const achieveContainer = document.getElementById("achieveContainer");
    const toggleCourseworkBtn = document.getElementById("toggleCourseworkBtn");
    const courseworkWrapper = document.getElementById("courseworkWrapper");
    const addLangBtn = document.getElementById("addLangBtn");
    const languagesContainer = document.getElementById("languagesContainer");

    // Formatting, ATS & Export Controls
    const templateSelect = document.getElementById("templateSelect");
    const fontSelect = document.getElementById("fontSelect");
    const spacingSelect = document.getElementById("spacingSelect");
    const previewTemplateQuick = document.getElementById("previewTemplateQuick");
    const previewFontQuick = document.getElementById("previewFontQuick");
    const previewPageBadge = document.getElementById("previewPageBadge");
    const exportPageNote = document.getElementById("exportPageNote");
    const atsScoreBadge = document.getElementById("atsScoreBadge");
    const atsProgressFill = document.getElementById("atsProgressFill");
    const atsReadinessSummary = document.getElementById("atsReadinessSummary");
    const atsChecksList = document.getElementById("atsChecksList");
    const downloadBtn = document.getElementById("downloadBtn");
    const previewDownloadBtn = document.getElementById("previewDownloadBtn");

    // Preview Canvas
    const previewDesk = document.querySelector(".preview-desk");
    const scaleWrapper = document.getElementById("resumeScaleWrapper");
    const canvas = document.getElementById("resumeCanvas");

    // Modals & Toasts
    const draftsModal = document.getElementById("draftsModal");
    const closeDraftsModalBtn = document.getElementById("closeDraftsModalBtn");
    const newDraftNameInput = document.getElementById("newDraftNameInput");
    const createDraftBtn = document.getElementById("createDraftBtn");
    const draftsListContainer = document.getElementById("draftsListContainer");
    const deleteDraftConfirmBar = document.getElementById("deleteDraftConfirmBar");
    const deleteDraftConfirmText = document.getElementById("deleteDraftConfirmText");
    const confirmDeleteDraftBtn = document.getElementById("confirmDeleteDraftBtn");
    const cancelDeleteDraftBtn = document.getElementById("cancelDeleteDraftBtn");

    const guideModal = document.getElementById("guideModal");
    const guideModalTitle = document.getElementById("guideModalTitle");
    const closeGuideModalBtn = document.getElementById("closeGuideModalBtn");
    const guideSuggestionsList = document.getElementById("guideSuggestionsList");

    const privacyModal = document.getElementById("privacyModal");
    const closePrivacyModalBtn = document.getElementById("closePrivacyModalBtn");
    const postDownloadModal = document.getElementById("postDownloadModal");
    const closePostDownloadBtn = document.getElementById("closePostDownloadBtn");
    const dismissPostDownloadBtn = document.getElementById("dismissPostDownloadBtn");
    const toastContainer = document.getElementById("toastContainer");

    const STEP_NAMES = [
        "Personal Information",
        "Professional Summary",
        "Education",
        "Skills",
        "Projects & Experience",
        "Additional Information",
        "Review & Download"
    ];

    const PRESET_SOFT_SKILLS = [
        "Communication",
        "Problem Solving",
        "Teamwork",
        "Time Management",
        "Adaptability",
        "Quick Learner",
        "Critical Thinking",
        "Leadership",
        "Attention to Detail",
        "Collaboration"
    ];

    const SUMMARY_TEMPLATES = {
        "1": "Results-driven professional with a strong foundation in modern tools and structured problem-solving. Proven ability to organize workflows, collaborate across teams, and deliver reliable outcomes on schedule.",
        "2": "Motivated graduate equipped with foundational proficiency in core programming, analytical thinking, and practical project work. Known for adaptability and rapid learning, seeking an entry-level role to contribute dependable results.",
        "3": "Entry-level software candidate skilled in writing clean, modular code, working with relational databases, and debugging technical issues. Eager to apply engineering fundamentals to build reliable applications.",
        "4": "Detail-oriented content and digital specialist skilled in structuring clear communication, analyzing engagement metrics, and coordinating timely deliverables across teams.",
        "5": "Organized coordinator experienced in tracking project milestones, documenting requirements, and supporting cross-functional team workflows to keep schedules on track.",
        "6": "Client-focused communicator with strong problem-resolution skills, clear written documentation, and a commitment to maintaining high customer satisfaction.",
        "7": "Analytical graduate focused on data cleaning, statistical reasoning, and spreadsheet/SQL reporting to surface clear operational insights.",
        "9": "Dependable administrative professional skilled in structured documentation, scheduling, and accurate record-keeping to support daily team operations.",
        "10": "Adaptable candidate transitioning into technology with strong analytical habits, self-directed project training, and collaborative communication skills."
    };

    const STRING_FIELD_IDS = [
        "inputName", "inputEmail", "inputPhone", "inputLocation",
        "inputLinkedin", "inputGithub", "inputPortfolio",
        "inputSummary", "summaryTemplateSelect",
        "eduDegree1", "eduSchool1", "eduYear1", "eduScore1",
        "eduDegreePG", "eduSchoolPG", "eduYearPG", "eduScorePG",
        "eduStream2", "eduStreamCustom2", "eduSchool2", "eduYear2", "eduScore2",
        "eduBoard3", "eduSchool3", "eduYear3", "eduScore3",
        "inputLang", "inputWeb", "inputDB", "inputConcepts",
        "inputCoursework"
    ];

    let currentStep = 0;
    let softSkillsList = [];
    let isTechSectionActive = true;
    let isEduPgActive = false;
    let isEdu12Active = true;
    let isEdu10Active = true;
    let isCourseworkActive = false;
    let summaryCycleIdx = 0;
    let lastFocusedElement = null;
    let saveDebounceTimer = null;
    let pendingDeleteDraftId = null;
    let fieldSeq = 0;
    const fid = (base) => `${base}-${++fieldSeq}`;

    let draftsStore = [];
    let activeDraftId = null;
    let hasDismissedPostDownloadPromo = false;
    try {
        hasDismissedPostDownloadPromo = sessionStorage.getItem(POST_DOWNLOAD_DISMISSED_KEY) === "true";
    } catch (e) {}

    // --- TOAST NOTIFICATIONS ---
    function showToast(message, type = "info", durationMs = 2600) {
        if (!toastContainer) return;
        while (toastContainer.children.length >= 2) {
            toastContainer.firstElementChild?.remove();
        }
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.setAttribute("role", type === "error" ? "alert" : "status");

        const span = document.createElement("span");
        span.textContent = message;

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "toast-close";
        closeBtn.setAttribute("aria-label", "Dismiss notification");
        closeBtn.innerHTML = "&times;";

        const remove = () => { if (toast.isConnected) toast.remove(); };
        closeBtn.addEventListener("click", remove);
        toast.append(span, closeBtn);
        toastContainer.appendChild(toast);

        if (durationMs > 0) window.setTimeout(remove, durationMs);
    }

    // --- SANITIZATION ---
    function escapeHtml(value) {
        if (!value) return "";
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function sanitizeUrl(rawUrl) {
        if (!rawUrl) return "";
        const trimmed = rawUrl.trim();
        if (!trimmed || /^(?:javascript|data|vbscript|file|blob):/i.test(trimmed)) return "";
        const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
        try {
            const parsed = new URL(withProtocol);
            const hasValidHost = parsed.hostname.includes(".") && !/\s/.test(parsed.hostname);
            if ((parsed.protocol === "http:" || parsed.protocol === "https:") && hasValidHost) {
                return parsed.href;
            }
        } catch (e) {
            return "";
        }
        return "";
    }

    function sanitizeEmail(rawEmail) {
        if (!rawEmail) return "";
        const cleaned = rawEmail.trim().replace(/^mailto:/i, "").trim();
        return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(cleaned) ? cleaned : "";
    }

    // --- VIEW ROUTING (LANDING vs BUILDER) ---
    function showLandingView() {
        if (landingView) landingView.hidden = false;
        if (builderView) builderView.hidden = true;
        try { localStorage.setItem(VIEW_STATE_KEY, "landing"); } catch (e) {}
        window.scrollTo({ top: 0, behavior: "auto" });
        updateActiveLandingNav();
    }

    function showBuilderView() {
        if (landingView) landingView.hidden = true;
        if (builderView) builderView.hidden = false;
        try { localStorage.setItem(VIEW_STATE_KEY, "builder"); } catch (e) {}
        updatePreview();
        updatePreviewScale();
    }

    // --- LANDING SECTION ACTIVE-STATE SCROLL SPY (DESKTOP & MOBILE) ---
    let navClickLockUntil = 0;

    function setActiveLandingNavTarget(targetId) {
        landingNavLinks.forEach(link => {
            const matches = Boolean(targetId) && link.dataset.navTarget === targetId;
            link.classList.toggle("is-active", matches);
            if (matches) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }

    function updateActiveLandingNav() {
        if (!landingView || landingView.hidden) return;
        if (Date.now() < navClickLockUntil) return;

        const sectionIds = ["howItWorks", "privacy", "careerResources"];
        const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
        if (sections.length === 0) return;

        const headerHeight = document.querySelector(".landing-nav")?.offsetHeight || 64;
        const firstSectionTop = sections[0].getBoundingClientRect().top + window.scrollY;
        const scrollTop = window.scrollY;

        // Do not highlight any section link while user is in the top Hero area
        if (scrollTop + headerHeight + 80 < firstSectionTop) {
            setActiveLandingNavTarget(null);
            return;
        }

        // If scrolled to the very bottom of the landing page, highlight the bottom section
        const nearBottom = window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 16;
        if (nearBottom) {
            setActiveLandingNavTarget("careerResources");
            return;
        }

        const focusLine = scrollTop + headerHeight + Math.min(180, window.innerHeight * 0.28);
        let activeId = sectionIds[0];
        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top + scrollTop;
            if (top <= focusLine) activeId = sec.id;
        });
        setActiveLandingNavTarget(activeId);
    }

    landingNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            const target = link.dataset.navTarget;
            if (target) {
                navClickLockUntil = Date.now() + 500;
                setActiveLandingNavTarget(target);
                window.setTimeout(() => {
                    navClickLockUntil = 0;
                    updateActiveLandingNav();
                }, 520);
            }
        });
    });

    document.querySelector(".brand-lockup")?.addEventListener("click", () => {
        navClickLockUntil = 0;
        setActiveLandingNavTarget(null);
    });

    document.getElementById("heroHowItWorksBtn")?.addEventListener("click", () => {
        navClickLockUntil = Date.now() + 500;
        setActiveLandingNavTarget("howItWorks");
        window.setTimeout(() => {
            navClickLockUntil = 0;
            updateActiveLandingNav();
        }, 520);
    });

    let navScrollTicking = false;
    window.addEventListener("scroll", () => {
        if (navScrollTicking) return;
        navScrollTicking = true;
        window.requestAnimationFrame(() => {
            navScrollTicking = false;
            updateActiveLandingNav();
        });
    }, { passive: true });

    navOpenBuilderBtn?.addEventListener("click", showBuilderView);
    heroBuildBtn?.addEventListener("click", showBuilderView);
    backToLandingBtn?.addEventListener("click", showLandingView);
    menuOverviewBtn?.addEventListener("click", () => {
        closeMoreMenu();
        showLandingView();
    });

    // --- MORE MENU & MODALS ---
    function closeMoreMenu() {
        if (!moreOptionsMenu || !moreOptionsBtn) return;
        moreOptionsMenu.hidden = true;
        moreOptionsBtn.setAttribute("aria-expanded", "false");
    }

    moreOptionsBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!moreOptionsMenu) return;
        const willOpen = moreOptionsMenu.hidden;
        moreOptionsMenu.hidden = !willOpen;
        moreOptionsBtn.setAttribute("aria-expanded", String(willOpen));
    });

    document.addEventListener("click", (e) => {
        if (moreOptionsMenu && !moreOptionsMenu.hidden && !moreOptionsMenu.contains(e.target) && e.target !== moreOptionsBtn) {
            closeMoreMenu();
        }
    });

    const allModals = [draftsModal, guideModal, privacyModal, postDownloadModal].filter(Boolean);

    function openModal(modalEl) {
        if (!modalEl) return;
        lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        allModals.forEach(m => { if (m !== modalEl) closeModal(m, false); });
        modalEl.classList.add("is-open");
        modalEl.setAttribute("aria-hidden", "false");
        const target = modalEl.querySelector("input:not([type='hidden']), button:not(.close-modal-btn), .close-modal-btn");
        requestAnimationFrame(() => target?.focus());
    }

    function dismissPostDownloadPromo() {
        hasDismissedPostDownloadPromo = true;
        try { sessionStorage.setItem(POST_DOWNLOAD_DISMISSED_KEY, "true"); } catch (e) {}
    }

    function closeModal(modalEl, restoreFocus = true) {
        if (!modalEl) return;
        if (modalEl === postDownloadModal && modalEl.classList.contains("is-open")) {
            dismissPostDownloadPromo();
        }
        modalEl.classList.remove("is-open");
        modalEl.setAttribute("aria-hidden", "true");
        if (restoreFocus && lastFocusedElement && lastFocusedElement.isConnected) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    allModals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMoreMenu();
            const openOne = allModals.find(m => m.classList.contains("is-open"));
            if (openOne) {
                e.preventDefault();
                closeModal(openOne);
            }
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;
        const open = allModals.find(m => m.classList.contains("is-open"));
        if (!open) return;
        const focusables = Array.from(open.querySelectorAll("button:not([disabled]), input, a[href]"))
            .filter(el => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!open.contains(document.activeElement)) {
            e.preventDefault();
            (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    closeDraftsModalBtn?.addEventListener("click", () => closeModal(draftsModal));
    closeGuideModalBtn?.addEventListener("click", () => closeModal(guideModal));
    closePrivacyModalBtn?.addEventListener("click", () => closeModal(privacyModal));
    closePostDownloadBtn?.addEventListener("click", () => closeModal(postDownloadModal));
    dismissPostDownloadBtn?.addEventListener("click", () => closeModal(postDownloadModal));
    menuPrivacyBtn?.addEventListener("click", () => {
        closeMoreMenu();
        openModal(privacyModal);
    });

    // --- STEPPER WIZARD NAVIGATION ---
    function isStepComplete(stepIdx) {
        if (stepIdx === 0) {
            return Boolean(
                document.getElementById("inputName")?.value.trim() &&
                sanitizeEmail(document.getElementById("inputEmail")?.value || "") &&
                document.getElementById("inputPhone")?.value.trim() &&
                document.getElementById("inputLocation")?.value.trim()
            );
        }
        if (stepIdx === 1) {
            return (inputSummary?.value.trim().split(/\s+/).filter(Boolean).length || 0) >= 15;
        }
        if (stepIdx === 2) {
            return Boolean(
                document.getElementById("eduDegree1")?.value.trim() &&
                document.getElementById("eduSchool1")?.value.trim() &&
                document.getElementById("eduYear1")?.value.trim()
            );
        }
        if (stepIdx === 3) {
            const techCount = ["inputLang", "inputWeb", "inputDB", "inputConcepts"]
                .flatMap(id => (document.getElementById(id)?.value || "").split(",").map(s => s.trim()).filter(Boolean)).length;
            return techCount + softSkillsList.length >= 3;
        }
        if (stepIdx === 4) {
            const { projFilled, expFilled } = getFilledSectionCounts();
            return projFilled > 0 || expFilled > 0;
        }
        if (stepIdx === 5) {
            const { certsFilled, achieveFilled } = getFilledSectionCounts();
            return certsFilled > 0 || achieveFilled > 0 || Boolean(document.getElementById("inputCoursework")?.value.trim()) || getLanguagesList().length > 0;
        }
        return false;
    }

    function updateStepIndicators() {
        stepPills.forEach((pill, idx) => {
            pill.classList.toggle("active", idx === currentStep);
            pill.classList.toggle("is-done", idx !== currentStep && isStepComplete(idx));
        });
        if (stepCounterLabel) stepCounterLabel.textContent = `Step ${currentStep + 1} of ${STEP_NAMES.length}`;
        if (stepCurrentName) stepCurrentName.textContent = STEP_NAMES[currentStep];
        if (stepperProgressFill) {
            stepperProgressFill.style.width = `${((currentStep + 1) / STEP_NAMES.length) * 100}%`;
        }
        if (prevStepBtn) prevStepBtn.disabled = currentStep === 0;
        if (nextStepBtn) {
            if (currentStep === STEP_NAMES.length - 1) {
                nextStepBtn.textContent = "Download PDF";
            } else {
                const nextShort = STEP_NAMES[currentStep + 1].split(" ")[0];
                nextStepBtn.textContent = `Next: ${nextShort}`;
            }
        }
    }

    function goToStep(stepIdx) {
        const clamped = Math.max(0, Math.min(STEP_NAMES.length - 1, stepIdx));
        currentStep = clamped;
        stepPanels.forEach((panel, idx) => {
            const active = idx === clamped;
            panel.hidden = !active;
            panel.classList.toggle("active", active);
        });
        updateStepIndicators();
        const editorForm = document.querySelector(".editor-form");
        if (editorForm) editorForm.scrollTop = 0;
        if (window.innerWidth <= 1023) window.scrollTo({ top: 0, behavior: "auto" });
    }

    stepPills.forEach(pill => {
        pill.addEventListener("click", () => goToStep(Number(pill.dataset.step)));
    });

    prevStepBtn?.addEventListener("click", () => goToStep(currentStep - 1));
    nextStepBtn?.addEventListener("click", () => {
        if (currentStep === STEP_NAMES.length - 1) {
            triggerPdfDownload();
        } else {
            goToStep(currentStep + 1);
        }
    });

    // --- MOBILE EDIT / PREVIEW TABS ---
    function switchMobileView(mode) {
        const isPreview = mode === "preview";
        tabFormBtn?.classList.toggle("active", !isPreview);
        tabFormBtn?.setAttribute("aria-pressed", String(!isPreview));
        tabPreviewBtn?.classList.toggle("active", isPreview);
        tabPreviewBtn?.setAttribute("aria-pressed", String(isPreview));
        formContainer?.classList.toggle("hide-mobile", isPreview);
        previewContainer?.classList.toggle("show-mobile", isPreview);
        if (isPreview) updatePreviewScale();
    }

    tabFormBtn?.addEventListener("click", () => switchMobileView("edit"));
    tabPreviewBtn?.addEventListener("click", () => switchMobileView("preview"));

    // --- SAVE STATUS & MULTI-DRAFT STORAGE ---
    function setSaveStatus(state, customText = "") {
        if (!saveStatusPill || !saveStatusText) return;
        saveStatusPill.classList.remove("is-saving", "is-error");
        if (state === "saving") {
            saveStatusPill.classList.add("is-saving");
            saveStatusText.textContent = customText || "Saving...";
        } else if (state === "error") {
            saveStatusPill.classList.add("is-error");
            saveStatusText.textContent = customText || "Save failed";
        } else {
            saveStatusText.textContent = customText || "Saved";
        }
    }

    function makeDraftId() {
        return "draft_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
    }

    function serializeCurrentForm() {
        const formData = {
            template: templateSelect?.value || "classic",
            font: fontSelect?.value || "arial",
            spacing: spacingSelect?.value || "auto",
            isTechSectionActive,
            isEduPgActive,
            isEdu12Active,
            isEdu10Active,
            isCourseworkActive,
            softSkillsList: [...softSkillsList],
            customEdu: customEduContainer ? Array.from(customEduContainer.querySelectorAll(".custom-edu-block")).map(b => ({
                degree: b.querySelector(".cedu-degree")?.value || "",
                school: b.querySelector(".cedu-school")?.value || "",
                year: b.querySelector(".cedu-year")?.value || "",
                score: b.querySelector(".cedu-score")?.value || ""
            })) : [],
            customSkillGroups: customSkillGroupsContainer ? Array.from(customSkillGroupsContainer.querySelectorAll(".custom-skill-block")).map(b => ({
                label: b.querySelector(".cskill-label")?.value || "",
                items: b.querySelector(".cskill-items")?.value || ""
            })) : [],
            experiences: expContainer ? Array.from(expContainer.querySelectorAll(".exp-block")).map(b => ({
                role: b.querySelector(".exp-role")?.value || "",
                company: b.querySelector(".exp-company")?.value || "",
                duration: b.querySelector(".exp-duration")?.value || "",
                desc: b.querySelector(".exp-desc")?.value || ""
            })) : [],
            projects: projectsContainer ? Array.from(projectsContainer.querySelectorAll(".project-block")).map(b => ({
                title: b.querySelector(".proj-title")?.value || "",
                tech: b.querySelector(".proj-tech")?.value || "",
                desc: b.querySelector(".proj-desc")?.value || ""
            })) : [],
            languages: languagesContainer ? Array.from(languagesContainer.querySelectorAll(".lang-block")).map(b => ({
                name: b.querySelector(".lang-name")?.value || "",
                read: Boolean(b.querySelector(".lang-read")?.checked),
                write: Boolean(b.querySelector(".lang-write")?.checked),
                speak: Boolean(b.querySelector(".lang-speak")?.checked)
            })) : [],
            certs: certsContainer ? Array.from(certsContainer.querySelectorAll(".cert-input")).map(i => i.value || "") : [],
            achieve: achieveContainer ? Array.from(achieveContainer.querySelectorAll(".achieve-input")).map(i => i.value || "") : []
        };

        STRING_FIELD_IDS.forEach(id => {
            formData[id] = document.getElementById(id)?.value || "";
        });

        return formData;
    }

    function persistDraftsStore() {
        try {
            localStorage.setItem(DRAFTS_STORE_KEY, JSON.stringify(draftsStore));
            if (activeDraftId) localStorage.setItem(ACTIVE_DRAFT_KEY, activeDraftId);
            const current = draftsStore.find(d => d.id === activeDraftId);
            if (current) {
                localStorage.setItem(LEGACY_DRAFT_KEY, JSON.stringify(current.data));
            }
            setSaveStatus("saved", "Saved");
        } catch (e) {
            console.error("LocalStorage save failed:", e);
            setSaveStatus("error", "Save failed");
        }
    }

    function scheduleSaveResumeData(immediate = false) {
        setSaveStatus("saving", "Saving...");
        if (saveDebounceTimer) window.clearTimeout(saveDebounceTimer);
        const run = () => {
            const data = serializeCurrentForm();
            let current = draftsStore.find(d => d.id === activeDraftId);
            if (!current) {
                current = {
                    id: makeDraftId(),
                    name: data.inputName?.trim() ? `${data.inputName.trim()} Resume` : "Untitled Draft",
                    updatedAt: Date.now(),
                    data
                };
                draftsStore.unshift(current);
                activeDraftId = current.id;
            } else {
                current.data = data;
                current.updatedAt = Date.now();
                if (current.name === "Untitled Draft" && data.inputName?.trim()) {
                    current.name = `${data.inputName.trim()} Resume`;
                }
            }
            updateActiveDraftHeaderTitle();
            persistDraftsStore();
        };

        if (immediate) run();
        else saveDebounceTimer = window.setTimeout(run, 180);
    }

    function updateActiveDraftHeaderTitle() {
        const current = draftsStore.find(d => d.id === activeDraftId);
        if (activeDraftTitle) activeDraftTitle.textContent = current ? current.name : "Untitled Draft";
    }

    function hydrateFormFromData(data) {
        const safeData = data && typeof data === "object" ? data : {};
        resumeForm?.reset();

        if (templateSelect) {
            const validTemplates = ["classic", "modern", "academic"];
            templateSelect.value = validTemplates.includes(safeData.template) ? safeData.template : "classic";
        }
        if (fontSelect) {
            const validFonts = ["arial", "calibri", "times", "georgia"];
            fontSelect.value = validFonts.includes(safeData.font) ? safeData.font : "arial";
        }
        if (spacingSelect) {
            const validSpacings = ["auto", "compact", "normal", "relaxed"];
            spacingSelect.value = validSpacings.includes(safeData.spacing) ? safeData.spacing : "auto";
        }
        syncQuickToolbarValues();

        STRING_FIELD_IDS.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const val = typeof safeData[id] === "string" ? safeData[id] : "";
            el.value = id === "inputName" ? val.toUpperCase() : val;
        });

        isTechSectionActive = typeof safeData.isTechSectionActive === "boolean" ? safeData.isTechSectionActive : true;
        isEduPgActive = typeof safeData.isEduPgActive === "boolean"
            ? safeData.isEduPgActive
            : Boolean(safeData.eduDegreePG || safeData.eduSchoolPG || safeData.eduYearPG);
        isEdu12Active = typeof safeData.isEdu12Active === "boolean" ? safeData.isEdu12Active : true;
        isEdu10Active = typeof safeData.isEdu10Active === "boolean" ? safeData.isEdu10Active : true;
        isCourseworkActive = typeof safeData.isCourseworkActive === "boolean"
            ? safeData.isCourseworkActive
            : Boolean(safeData.inputCoursework);
        syncSectionTogglesUI();

        if (softTagsContainer) softTagsContainer.innerHTML = "";
        softSkillsList = [];
        if (Array.isArray(safeData.softSkillsList)) {
            safeData.softSkillsList.filter(s => typeof s === "string").forEach(s => createSoftTag(s, false));
        }
        syncSoftPresetChips();

        if (customEduContainer) {
            customEduContainer.innerHTML = "";
            if (Array.isArray(safeData.customEdu)) {
                safeData.customEdu.filter(ed => ed && typeof ed === "object").forEach(ed => addCustomEduField(ed.degree, ed.school, ed.year, ed.score, false));
            }
        }

        if (customSkillGroupsContainer) {
            customSkillGroupsContainer.innerHTML = "";
            if (Array.isArray(safeData.customSkillGroups)) {
                safeData.customSkillGroups.filter(g => g && typeof g === "object").forEach(g => addCustomSkillGroupField(g.label, g.items, false));
            }
        }

        if (projectsContainer) {
            projectsContainer.innerHTML = "";
            if (Array.isArray(safeData.projects)) {
                safeData.projects.filter(p => p && typeof p === "object").forEach(p => addProjectField(p.title, p.tech, p.desc, false));
            }
        }

        if (expContainer) {
            expContainer.innerHTML = "";
            if (Array.isArray(safeData.experiences)) {
                safeData.experiences.filter(e => e && typeof e === "object").forEach(e => addExpField(e.role, e.company, e.duration, e.desc, false));
            }
        }

        if (languagesContainer) {
            languagesContainer.innerHTML = "";
            if (Array.isArray(safeData.languages)) {
                safeData.languages.filter(l => l && typeof l === "object").forEach(l => addLanguageField(l.name, l.read !== false, l.write !== false, l.speak !== false, false));
            } else if (typeof safeData.inputLanguagesKnown === "string" && safeData.inputLanguagesKnown.trim()) {
                safeData.inputLanguagesKnown.split(",").map(s => s.trim()).filter(Boolean).forEach(n => {
                    addLanguageField(n, true, true, true, false);
                });
            }
        }

        if (certsContainer) {
            certsContainer.innerHTML = "";
            if (Array.isArray(safeData.certs)) {
                safeData.certs.filter(c => typeof c === "string").forEach(c => addCertField(c, false));
            }
        }

        if (achieveContainer) {
            achieveContainer.innerHTML = "";
            if (Array.isArray(safeData.achieve)) {
                safeData.achieve.filter(a => typeof a === "string").forEach(a => addAchieveField(a, false));
            }
        }

        updateEmptyStates();
        updateSummaryWordCount();
        updatePreview();
        updateStepIndicators();
    }

    // --- DRAFTS MODAL MANAGEMENT ---
    function formatRelativeTime(ts) {
        if (!ts) return "";
        const mins = Math.round((Date.now() - ts) / 60000);
        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins}m ago`;
        const hrs = Math.round(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;
        return new Date(ts).toLocaleDateString();
    }

    function renderDraftsList() {
        if (!draftsListContainer) return;
        draftsListContainer.innerHTML = "";
        if (deleteDraftConfirmBar) deleteDraftConfirmBar.hidden = true;
        pendingDeleteDraftId = null;

        const sorted = [...draftsStore].sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
        sorted.forEach(draft => {
            const isActive = draft.id === activeDraftId;
            const row = document.createElement("div");
            row.className = `draft-row ${isActive ? "is-active" : ""}`;

            const meta = document.createElement("div");
            meta.className = "draft-meta";

            const title = document.createElement("div");
            title.className = "draft-title-text";
            title.textContent = draft.name || "Untitled Draft";

            const time = document.createElement("div");
            time.className = "draft-time-text";
            time.textContent = isActive ? `Active • ${formatRelativeTime(draft.updatedAt)}` : `Updated ${formatRelativeTime(draft.updatedAt)}`;
            meta.append(title, time);

            const actions = document.createElement("div");
            actions.className = "draft-row-actions";

            if (!isActive) {
                const openBtn = document.createElement("button");
                openBtn.type = "button";
                openBtn.className = "btn btn-secondary btn-sm";
                openBtn.textContent = "Open";
                openBtn.addEventListener("click", () => {
                    flushPendingSave();
                    activeDraftId = draft.id;
                    updateActiveDraftHeaderTitle();
                    hydrateFormFromData(draft.data);
                    persistDraftsStore();
                    closeModal(draftsModal);
                    showToast(`Opened "${draft.name}".`, "success");
                });
                actions.appendChild(openBtn);
            }

            const renameBtn = document.createElement("button");
            renameBtn.type = "button";
            renameBtn.className = "btn btn-ghost btn-sm";
            renameBtn.textContent = "Rename";
            renameBtn.addEventListener("click", () => {
                meta.innerHTML = "";
                const input = document.createElement("input");
                input.type = "text";
                input.className = "draft-rename-input";
                input.value = draft.name;
                meta.appendChild(input);
                input.focus();
                input.select();

                const commitRename = () => {
                    const nextName = input.value.trim() || "Untitled Draft";
                    draft.name = nextName;
                    draft.updatedAt = Date.now();
                    updateActiveDraftHeaderTitle();
                    persistDraftsStore();
                    renderDraftsList();
                };
                input.addEventListener("keydown", (ev) => {
                    if (ev.key === "Enter") commitRename();
                    if (ev.key === "Escape") renderDraftsList();
                });
                input.addEventListener("blur", commitRename);
            });
            actions.appendChild(renameBtn);

            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "btn btn-ghost btn-sm";
            delBtn.textContent = "Delete";
            delBtn.addEventListener("click", () => {
                pendingDeleteDraftId = draft.id;
                if (deleteDraftConfirmText) {
                    deleteDraftConfirmText.textContent = `Delete "${draft.name}" permanently?`;
                }
                if (deleteDraftConfirmBar) deleteDraftConfirmBar.hidden = false;
            });
            actions.appendChild(delBtn);

            row.append(meta, actions);
            draftsListContainer.appendChild(row);
        });
    }

    function flushPendingSave() {
        if (!saveDebounceTimer) return;
        window.clearTimeout(saveDebounceTimer);
        saveDebounceTimer = null;
        scheduleSaveResumeData(true);
    }

    openDraftsHeaderBtn?.addEventListener("click", () => {
        renderDraftsList();
        openModal(draftsModal);
    });

    menuDraftsBtn?.addEventListener("click", () => {
        closeMoreMenu();
        renderDraftsList();
        openModal(draftsModal);
    });

    createDraftBtn?.addEventListener("click", () => {
        flushPendingSave();
        const title = newDraftNameInput?.value.trim() || `Resume ${draftsStore.length + 1}`;
        const fresh = {
            id: makeDraftId(),
            name: title,
            updatedAt: Date.now(),
            data: {}
        };
        draftsStore.unshift(fresh);
        activeDraftId = fresh.id;
        if (newDraftNameInput) newDraftNameInput.value = "";
        updateActiveDraftHeaderTitle();
        hydrateFormFromData({});
        persistDraftsStore();
        renderDraftsList();
        goToStep(0);
        showToast(`Created "${title}".`, "success");
    });

    confirmDeleteDraftBtn?.addEventListener("click", () => {
        flushPendingSave();
        if (!pendingDeleteDraftId) return;
        const deletedWasActive = pendingDeleteDraftId === activeDraftId;
        draftsStore = draftsStore.filter(d => d.id !== pendingDeleteDraftId);
        pendingDeleteDraftId = null;

        if (draftsStore.length === 0) {
            const replacement = { id: makeDraftId(), name: "Untitled Draft", updatedAt: Date.now(), data: {} };
            draftsStore.push(replacement);
            activeDraftId = replacement.id;
            hydrateFormFromData({});
        } else if (deletedWasActive) {
            activeDraftId = draftsStore[0].id;
            hydrateFormFromData(draftsStore[0].data);
        }

        updateActiveDraftHeaderTitle();
        persistDraftsStore();
        renderDraftsList();
        showToast("Draft deleted.", "info");
    });

    cancelDeleteDraftBtn?.addEventListener("click", () => {
        pendingDeleteDraftId = null;
        if (deleteDraftConfirmBar) deleteDraftConfirmBar.hidden = true;
    });

    // New Blank Resume (Inline Confirmation)
    menuNewResumeBtn?.addEventListener("click", () => {
        closeMoreMenu();
        if (newResumeConfirmBar) {
            newResumeConfirmBar.hidden = false;
            confirmNewResumeBtn?.focus();
        }
    });

    cancelNewResumeBtn?.addEventListener("click", () => {
        if (newResumeConfirmBar) newResumeConfirmBar.hidden = true;
    });

    confirmNewResumeBtn?.addEventListener("click", () => {
        if (newResumeConfirmBar) newResumeConfirmBar.hidden = true;
        const current = draftsStore.find(d => d.id === activeDraftId);
        if (current) {
            current.name = "Untitled Draft";
            current.data = {};
            current.updatedAt = Date.now();
        }
        updateActiveDraftHeaderTitle();
        hydrateFormFromData({});
        persistDraftsStore();
        goToStep(0);
        showToast("Started a blank resume.", "success");
    });

    // --- SUMMARY ASSISTANT & WORD COUNT ---
    function updateSummaryWordCount() {
        if (!summaryWordCount || !inputSummary) return;
        const words = inputSummary.value.trim().split(/\s+/).filter(Boolean).length;
        summaryWordCount.textContent = `${words} ${words === 1 ? "word" : "words"}`;
    }

    summaryTemplateSelect?.addEventListener("change", () => {
        const val = summaryTemplateSelect.value;
        if (val && SUMMARY_TEMPLATES[val] && inputSummary) {
            inputSummary.value = SUMMARY_TEMPLATES[val];
            updateSummaryWordCount();
            updatePreview();
            scheduleSaveResumeData();
        }
    });

    pasteSummaryBtn?.addEventListener("click", async () => {
        if (!inputSummary) return;
        if (navigator.clipboard && typeof navigator.clipboard.readText === "function") {
            try {
                const clipText = await navigator.clipboard.readText();
                if (clipText && clipText.trim()) {
                    inputSummary.value = clipText.trim();
                    updateSummaryWordCount();
                    updatePreview();
                    scheduleSaveResumeData();
                    showToast("Pasted notes into summary.", "success");
                    return;
                }
                showToast("Clipboard is empty.", "warn");
                inputSummary.focus();
                return;
            } catch (e) {}
        }
        inputSummary.focus();
        showToast("Press Ctrl+V (or long-press Paste) inside the summary box.", "info");
    });

    function extractCasualKnowledgeFromNotes(text) {
        if (!text) return [];
        const cuePattern = /(?:i\s+(?:also\s+)?know|knowledge\s+(?:in|of)|skilled\s+in|proficient\s+in|good\s+(?:at|in)|familiar\s+with|learned)/i;
        const leadPattern = /^(?:and\s+|also\s+)?(?:i\s+(?:also\s+)?know|i\s+have\s+(?:knowledge|skills|experience)\s+(?:in|of)|i\s+am\s+(?:skilled|proficient|good|familiar)\s+(?:in|at|with)|skilled\s+in|proficient\s+in|good\s+(?:at|in)|familiar\s+with|learned|know|basics\s+of|basic)\s+/i;

        const found = [];
        text.split(/[.;!\n]+/).forEach(segment => {
            if (!cuePattern.test(segment)) return;
            segment.split(/,|\s+\band\b\s+|\s*\/\s*/i).forEach(part => {
                let item = part.trim();
                let prev;
                do {
                    prev = item;
                    item = item.replace(leadPattern, "").trim();
                } while (item !== prev);
                if (item.length >= 1 && item.length <= 36) found.push(item);
            });
        });
        return found;
    }

    function dedupeList(items) {
        const seen = new Set();
        const out = [];
        items.forEach(item => {
            const clean = String(item || "").trim();
            const key = clean.toLowerCase();
            if (clean && !seen.has(key)) {
                seen.add(key);
                out.push(clean);
            }
        });
        return out;
    }

    function formatNaturalList(items) {
        if (items.length === 0) return "";
        if (items.length === 1) return items[0];
        if (items.length === 2) return `${items[0]} and ${items[1]}`;
        return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
    }

    autoGenSummaryBtn?.addEventListener("click", () => {
        const rawNotes = inputSummary?.value.trim() || "";
        const casualSkills = extractCasualKnowledgeFromNotes(rawNotes);

        const pgDegree = document.getElementById("eduDegreePG")?.value.trim() || "";
        const ugDegree = document.getElementById("eduDegree1")?.value.trim() || "";
        const ugSchool = document.getElementById("eduSchool1")?.value.trim() || "";
        const ugYear = document.getElementById("eduYear1")?.value.trim() || "";
        const degree = pgDegree || ugDegree || "Graduate";

        const splitCsv = (id) => (document.getElementById(id)?.value || "")
            .split(",").map(s => s.trim()).filter(Boolean);

        const customSkillItems = customSkillGroupsContainer
            ? Array.from(customSkillGroupsContainer.querySelectorAll(".cskill-items"))
                .flatMap(i => (i.value || "").split(",").map(s => s.trim()).filter(Boolean))
            : [];

        const techSkills = dedupeList([
            ...splitCsv("inputLang"),
            ...splitCsv("inputWeb"),
            ...splitCsv("inputDB"),
            ...splitCsv("inputConcepts"),
            ...customSkillItems,
            ...casualSkills
        ]);

        const softSkills = dedupeList(softSkillsList);
        const expRoles = expContainer
            ? Array.from(expContainer.querySelectorAll(".exp-block"))
                .map(b => ({ role: b.querySelector(".exp-role")?.value.trim() || "", company: b.querySelector(".exp-company")?.value.trim() || "" }))
                .filter(e => e.role)
            : [];
        const projectTitles = projectsContainer
            ? Array.from(projectsContainer.querySelectorAll(".proj-title")).map(i => i.value.trim()).filter(Boolean)
            : [];
        const certNames = certsContainer
            ? Array.from(certsContainer.querySelectorAll(".cert-input")).map(i => i.value.trim()).filter(Boolean)
            : [];
        const coursework = (document.getElementById("inputCoursework")?.value || "")
            .split(",").map(s => s.trim()).filter(Boolean);

        const techPhrase = techSkills.length > 0
            ? formatNaturalList(techSkills.slice(0, 6))
            : "core analytical and technical fundamentals";
        const softPhrase = softSkills.length > 0
            ? formatNaturalList(softSkills.slice(0, 3)).toLowerCase()
            : "problem-solving, communication, and teamwork";
        const eduMeta = ugSchool && ugYear ? ` from ${ugSchool} (${ugYear})` : (ugSchool ? ` from ${ugSchool}` : "");

        let variations;
        if (expRoles.length === 0) {
            const extra = projectTitles.length > 0
                ? ` Applied practical skills across projects including ${formatNaturalList(projectTitles.slice(0, 2))}.`
                : coursework.length > 0
                    ? ` Built academic grounding in ${formatNaturalList(coursework.slice(0, 4))}.`
                    : certNames.length > 0
                        ? ` Completed structured training including ${certNames[0]}.`
                        : " Committed to writing clear, reliable work and learning team workflows quickly.";
            variations = [
                `${degree} graduate${eduMeta} with foundational proficiency in ${techPhrase}.${extra} Combines ${softPhrase} to contribute dependably in an entry-level role.`,
                `Detail-oriented ${degree} candidate${eduMeta} skilled in ${techPhrase}.${extra} Recognized for ${softPhrase}, seeking an opportunity to add practical value from day one.`
            ];
        } else {
            const primary = expRoles[0];
            const compPart = primary.company ? ` at ${primary.company}` : "";
            const projPart = projectTitles.length > 0 ? ` Delivered projects including ${formatNaturalList(projectTitles.slice(0, 2))}.` : "";
            variations = [
                `${primary.role}${compPart ? ` with experience${compPart}` : ""} and ${degree} background, proficient in ${techPhrase}.${projPart} Leverages ${softPhrase} to deliver consistent outcomes.`,
                `Results-focused ${primary.role} (${degree}${eduMeta}) experienced in ${techPhrase}.${projPart} Known for ${softPhrase} and cross-team execution.`
            ];
        }

        if (inputSummary) {
            inputSummary.value = variations[summaryCycleIdx % variations.length];
            summaryCycleIdx = (summaryCycleIdx + 1) % variations.length;
        }
        updateSummaryWordCount();
        updatePreview();
        scheduleSaveResumeData(true);
        showToast("Generated summary from your entered details.", "success");
    });

    // --- COLLAPSIBLES & DYNAMIC FIELD BUILDERS ---
    function syncSectionTogglesUI() {
        if (eduPgWrapper && toggleEduPgBtn) {
            eduPgWrapper.hidden = !isEduPgActive;
            toggleEduPgBtn.textContent = isEduPgActive ? "Hide" : "Add";
            toggleEduPgBtn.setAttribute("aria-expanded", String(isEduPgActive));
        }
        if (edu12Wrapper && toggleEdu12Btn) {
            edu12Wrapper.hidden = !isEdu12Active;
            toggleEdu12Btn.textContent = isEdu12Active ? "Hide" : "Add";
            toggleEdu12Btn.setAttribute("aria-expanded", String(isEdu12Active));
        }
        if (edu10Wrapper && toggleEdu10Btn) {
            edu10Wrapper.hidden = !isEdu10Active;
            toggleEdu10Btn.textContent = isEdu10Active ? "Hide" : "Add";
            toggleEdu10Btn.setAttribute("aria-expanded", String(isEdu10Active));
        }
        if (eduStreamCustomWrap) {
            eduStreamCustomWrap.hidden = eduStream2?.value !== "Others";
        }
        if (techSkillsWrapper && removeTechSectionBtn) {
            techSkillsWrapper.hidden = !isTechSectionActive;
            removeTechSectionBtn.textContent = isTechSectionActive ? "Hide Section" : "Restore Section";
            removeTechSectionBtn.setAttribute("aria-expanded", String(isTechSectionActive));
        }
        if (courseworkWrapper && toggleCourseworkBtn) {
            toggleCourseworkBtn.textContent = isCourseworkActive ? "Hide" : "Add";
            courseworkWrapper.hidden = !isCourseworkActive;
            toggleCourseworkBtn.setAttribute("aria-expanded", String(isCourseworkActive));
        }
    }

    toggleEduPgBtn?.addEventListener("click", () => {
        isEduPgActive = !isEduPgActive;
        syncSectionTogglesUI();
        updatePreview();
        scheduleSaveResumeData();
    });
    toggleEdu12Btn?.addEventListener("click", () => {
        isEdu12Active = !isEdu12Active;
        syncSectionTogglesUI();
        updatePreview();
        scheduleSaveResumeData();
    });
    toggleEdu10Btn?.addEventListener("click", () => {
        isEdu10Active = !isEdu10Active;
        syncSectionTogglesUI();
        updatePreview();
        scheduleSaveResumeData();
    });
    eduStream2?.addEventListener("change", () => {
        if (eduStream2.value !== "Others" && eduStreamCustom2) eduStreamCustom2.value = "";
        syncSectionTogglesUI();
        updatePreview();
        scheduleSaveResumeData();
    });
    removeTechSectionBtn?.addEventListener("click", () => {
        isTechSectionActive = !isTechSectionActive;
        syncSectionTogglesUI();
        updatePreview();
        scheduleSaveResumeData();
    });
    toggleCourseworkBtn?.addEventListener("click", () => {
        isCourseworkActive = !isCourseworkActive;
        syncSectionTogglesUI();
        updatePreview();
        scheduleSaveResumeData();
    });

    function addCustomEduField(degree = "", school = "", year = "", score = "", shouldRefresh = true) {
        if (!customEduContainer) return;
        const ids = {
            degree: fid("cedu-degree"),
            school: fid("cedu-school"),
            year: fid("cedu-year"),
            score: fid("cedu-score")
        };
        const card = document.createElement("div");
        card.className = "entry-card custom-edu-block";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Qualification</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove qualification">Remove</button>
            </div>
            <div class="field-grid">
                <div class="field-item field-full">
                    <label for="${ids.degree}">Qualification / Diploma</label>
                    <input type="text" id="${ids.degree}" class="cedu-degree" placeholder="e.g. Diploma in Computer Science" value="${escapeHtml(degree)}">
                </div>
                <div class="field-item field-full">
                    <label for="${ids.school}">Institution</label>
                    <input type="text" id="${ids.school}" class="cedu-school" placeholder="Institute / Board Name" value="${escapeHtml(school)}">
                </div>
                <div class="field-item">
                    <label for="${ids.year}">Passing Year</label>
                    <input type="text" id="${ids.year}" class="cedu-year" placeholder="e.g. 2023" value="${escapeHtml(year)}">
                </div>
                <div class="field-item">
                    <label for="${ids.score}">CGPA / Percentage</label>
                    <input type="text" id="${ids.score}" class="cedu-score" placeholder="Optional" value="${escapeHtml(score)}">
                </div>
            </div>
        `;
        customEduContainer.appendChild(card);
        if (shouldRefresh) onFormChanged();
    }

    function addCustomSkillGroupField(label = "", items = "", shouldRefresh = true) {
        if (!customSkillGroupsContainer) return;
        const ids = { label: fid("cskill-label"), items: fid("cskill-items") };
        const card = document.createElement("div");
        card.className = "entry-card custom-skill-block";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Skill Category</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove skill category">Remove</button>
            </div>
            <div class="field-grid">
                <div class="field-item">
                    <label for="${ids.label}">Category Name</label>
                    <input type="text" id="${ids.label}" class="cskill-label" placeholder="e.g. Design Tools" value="${escapeHtml(label)}">
                </div>
                <div class="field-item">
                    <label for="${ids.items}">Skills (comma-separated)</label>
                    <input type="text" id="${ids.items}" class="cskill-items" placeholder="e.g. Figma, Photoshop" value="${escapeHtml(items)}">
                </div>
            </div>
        `;
        customSkillGroupsContainer.appendChild(card);
        if (shouldRefresh) onFormChanged();
    }

    function addProjectField(title = "", tech = "", desc = "", shouldRefresh = true) {
        if (!projectsContainer) return;
        const ids = { title: fid("proj-title"), tech: fid("proj-tech"), desc: fid("proj-desc") };
        const card = document.createElement("div");
        card.className = "entry-card project-block";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Project</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove project">Remove</button>
            </div>
            <div class="field-grid">
                <div class="field-item field-full">
                    <label for="${ids.title}">Project Title</label>
                    <input type="text" id="${ids.title}" class="proj-title" placeholder="e.g. Student Attendance Web App" value="${escapeHtml(title)}">
                </div>
                <div class="field-item field-full">
                    <label for="${ids.tech}">Technologies Used</label>
                    <input type="text" id="${ids.tech}" class="proj-tech" placeholder="e.g. Python, SQLite, HTML, CSS" value="${escapeHtml(tech)}">
                </div>
                <div class="field-item field-full">
                    <label for="${ids.desc}">What You Built &amp; Outcome (One bullet per line)</label>
                    <textarea id="${ids.desc}" class="proj-desc" rows="3" placeholder="Built a login and attendance tracking dashboard for 200+ records.&#10;Reduced manual spreadsheet updates by automating CSV export.">${escapeHtml(desc)}</textarea>
                </div>
            </div>
        `;
        projectsContainer.appendChild(card);
        updateEmptyStates();
        if (shouldRefresh) onFormChanged();
    }

    function addExpField(role = "", comp = "", dur = "", desc = "", shouldRefresh = true) {
        if (!expContainer) return;
        const ids = {
            role: fid("exp-role"),
            company: fid("exp-company"),
            duration: fid("exp-duration"),
            desc: fid("exp-desc")
        };
        const card = document.createElement("div");
        card.className = "entry-card exp-block";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Experience / Internship</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove experience">Remove</button>
            </div>
            <div class="field-grid">
                <div class="field-item field-full">
                    <label for="${ids.role}">Role / Title</label>
                    <input type="text" id="${ids.role}" class="exp-role" placeholder="e.g. Software Intern" value="${escapeHtml(role)}">
                </div>
                <div class="field-item">
                    <label for="${ids.company}">Organization &amp; City</label>
                    <input type="text" id="${ids.company}" class="exp-company" placeholder="e.g. Acme Tech, Bengaluru" value="${escapeHtml(comp)}">
                </div>
                <div class="field-item">
                    <label for="${ids.duration}">Duration</label>
                    <input type="text" id="${ids.duration}" class="exp-duration" placeholder="e.g. May 2025 – Jul 2025" value="${escapeHtml(dur)}">
                </div>
                <div class="field-item field-full">
                    <label for="${ids.desc}">Key Responsibilities &amp; Impact (One bullet per line)</label>
                    <textarea id="${ids.desc}" class="exp-desc" rows="3" placeholder="Developed responsive UI pages using HTML5 and CSS3.&#10;Tested 15+ REST endpoints and documented bug fixes.">${escapeHtml(desc)}</textarea>
                </div>
            </div>
        `;
        expContainer.appendChild(card);
        updateEmptyStates();
        if (shouldRefresh) onFormChanged();
    }

    function addLanguageField(name = "", read = true, write = true, speak = true, shouldRefresh = true) {
        if (!languagesContainer) return;
        const card = document.createElement("div");
        card.className = "entry-card lang-block";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Language</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove language">Remove</button>
            </div>
            <input type="text" class="lang-name" aria-label="Language name" placeholder="e.g. English, Hindi, Telugu" value="${escapeHtml(name)}">
            <div class="lang-proficiency-group" role="group" aria-label="Language proficiency">
                <label class="lang-check"><input type="checkbox" class="lang-read" ${read ? "checked" : ""}> Read</label>
                <label class="lang-check"><input type="checkbox" class="lang-write" ${write ? "checked" : ""}> Write</label>
                <label class="lang-check"><input type="checkbox" class="lang-speak" ${speak ? "checked" : ""}> Speak</label>
            </div>
        `;
        languagesContainer.appendChild(card);
        if (shouldRefresh) onFormChanged();
    }

    function addCertField(defaultValue = "", shouldRefresh = true) {
        if (!certsContainer) return;
        const card = document.createElement("div");
        card.className = "entry-card";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Certification</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove certification">Remove</button>
            </div>
            <input type="text" class="cert-input" aria-label="Certification name and issuer" placeholder="Certification Name &amp; Issuer" value="${escapeHtml(defaultValue)}">
        `;
        certsContainer.appendChild(card);
        if (shouldRefresh) onFormChanged();
    }

    function addAchieveField(defaultValue = "", shouldRefresh = true) {
        if (!achieveContainer) return;
        const card = document.createElement("div");
        card.className = "entry-card";
        card.innerHTML = `
            <div class="entry-card-top">
                <span class="entry-card-label">Achievement</span>
                <button type="button" class="entry-remove-btn" aria-label="Remove achievement">Remove</button>
            </div>
            <input type="text" class="achieve-input" aria-label="Achievement" placeholder="e.g. 1st Place in College Coding Contest (2024)" value="${escapeHtml(defaultValue)}">
        `;
        achieveContainer.appendChild(card);
        if (shouldRefresh) onFormChanged();
    }

    function updateEmptyStates() {
        if (projectsEmptyState && projectsContainer) {
            projectsEmptyState.hidden = projectsContainer.children.length > 0;
        }
        if (expEmptyState && expContainer) {
            expEmptyState.hidden = expContainer.children.length > 0;
        }
    }

    addCustomEduBtn?.addEventListener("click", () => addCustomEduField());
    addCustomSkillGroupBtn?.addEventListener("click", () => addCustomSkillGroupField());
    addProjectBtn?.addEventListener("click", () => addProjectField());
    addExpBtn?.addEventListener("click", () => addExpField());
    addLangBtn?.addEventListener("click", () => addLanguageField());
    addCertBtn?.addEventListener("click", () => addCertField());
    addAchieveBtn?.addEventListener("click", () => addAchieveField());

    const handleCardRemoval = (e) => {
        if (e.target.classList.contains("entry-remove-btn")) {
            e.target.closest(".entry-card")?.remove();
            updateEmptyStates();
            onFormChanged();
        }
    };
    [customEduContainer, customSkillGroupsContainer, projectsContainer, expContainer, languagesContainer, certsContainer, achieveContainer]
        .forEach(container => container?.addEventListener("click", handleCardRemoval));

    // --- EXAMPLES DIALOG (CERTIFICATIONS & ACHIEVEMENTS) ---
    const EXAMPLES_DATA = {
        certs: [
            "Google Cloud Digital Leader Certification",
            "AWS Certified Cloud Practitioner",
            "Oracle Certified Associate: Java SE Programmer",
            "Meta Front-End Developer Certificate (Coursera)",
            "Python for Data Science — NPTEL / SWAYAM"
        ],
        achieve: [
            "Finalist among 150+ student teams in Inter-College Software Hackathon (2024).",
            "Solved 250+ Data Structures and Algorithms problems across coding platforms.",
            "Coordinated technical workshops for 120+ first-year computer science students.",
            "Maintained top 10% academic standing in undergraduate cohort."
        ]
    };

    function openExamplesModal(type) {
        if (!guideSuggestionsList || !guideModal) return;
        guideSuggestionsList.innerHTML = "";
        if (guideModalTitle) {
            guideModalTitle.textContent = type === "certs" ? "Certification Examples" : "Achievement Examples";
        }
        EXAMPLES_DATA[type].forEach(item => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "guide-item";
            btn.textContent = item;
            btn.addEventListener("click", () => {
                if (type === "certs") addCertField(item);
                else addAchieveField(item);
                closeModal(guideModal);
                showToast("Added example. Edit it to match your real record.", "info");
            });
            guideSuggestionsList.appendChild(btn);
        });
        openModal(guideModal);
    }

    certGuideBtn?.addEventListener("click", () => openExamplesModal("certs"));
    achieveGuideBtn?.addEventListener("click", () => openExamplesModal("achieve"));

    // --- SOFT SKILLS ---
    function syncSoftPresetChips() {
        if (!softSkillPresets) return;
        const lowerSet = new Set(softSkillsList.map(s => s.toLowerCase()));
        softSkillPresets.querySelectorAll(".soft-preset-chip").forEach(btn => {
            const active = lowerSet.has((btn.dataset.skill || "").toLowerCase());
            btn.classList.toggle("is-selected", active);
            btn.setAttribute("aria-pressed", String(active));
        });
    }

    function renderSoftPresetChips() {
        if (!softSkillPresets) return;
        softSkillPresets.innerHTML = "";
        PRESET_SOFT_SKILLS.forEach(skill => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "soft-preset-chip";
            btn.dataset.skill = skill;
            btn.textContent = `+ ${skill}`;
            btn.setAttribute("aria-pressed", "false");
            btn.addEventListener("click", () => {
                const idx = softSkillsList.findIndex(s => s.toLowerCase() === skill.toLowerCase());
                if (idx > -1) removeSoftSkillByValue(softSkillsList[idx]);
                else createSoftTag(skill, true);
            });
            softSkillPresets.appendChild(btn);
        });
        syncSoftPresetChips();
    }

    function removeSoftSkillByValue(val) {
        const idx = softSkillsList.findIndex(s => s.toLowerCase() === val.toLowerCase());
        if (idx > -1) softSkillsList.splice(idx, 1);
        if (softTagsContainer) {
            Array.from(softTagsContainer.querySelectorAll(".skill-tag")).forEach(tag => {
                if (tag.dataset.skill?.toLowerCase() === val.toLowerCase()) tag.remove();
            });
        }
        syncSoftPresetChips();
        onFormChanged();
    }

    function createSoftTag(text, shouldRefresh = true) {
        if (!text || !text.trim()) return;
        const clean = text.trim();
        if (softSkillsList.some(s => s.toLowerCase() === clean.toLowerCase())) return;
        softSkillsList.push(clean);

        const tag = document.createElement("div");
        tag.className = "skill-tag";
        tag.dataset.skill = clean;

        const span = document.createElement("span");
        span.textContent = clean;

        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "remove-tag";
        removeBtn.setAttribute("aria-label", `Remove ${clean}`);
        removeBtn.innerHTML = "&times;";
        removeBtn.addEventListener("click", () => removeSoftSkillByValue(clean));

        tag.append(span, removeBtn);
        softTagsContainer?.appendChild(tag);
        syncSoftPresetChips();
        if (shouldRefresh) onFormChanged();
    }

    addSoftTagBtn?.addEventListener("click", () => {
        if (softSkillsInput) {
            createSoftTag(softSkillsInput.value);
            softSkillsInput.value = "";
            softSkillsInput.focus();
        }
    });

    softSkillsInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            createSoftTag(softSkillsInput.value);
            softSkillsInput.value = "";
        }
    });

    // --- TEMPLATE, FONT & DENSITY SYNC ---
    function syncQuickToolbarValues() {
        if (previewTemplateQuick && templateSelect) previewTemplateQuick.value = templateSelect.value;
        if (previewFontQuick && fontSelect) previewFontQuick.value = fontSelect.value;
    }

    templateSelect?.addEventListener("change", () => {
        syncQuickToolbarValues();
        onFormChanged();
    });
    fontSelect?.addEventListener("change", () => {
        syncQuickToolbarValues();
        onFormChanged();
    });
    spacingSelect?.addEventListener("change", onFormChanged);

    previewTemplateQuick?.addEventListener("change", () => {
        if (templateSelect) templateSelect.value = previewTemplateQuick.value;
        onFormChanged();
    });
    previewFontQuick?.addEventListener("change", () => {
        if (fontSelect) fontSelect.value = previewFontQuick.value;
        onFormChanged();
    });

    function getFilledSectionCounts() {
        const expFilled = expContainer ? Array.from(expContainer.querySelectorAll(".exp-block")).filter(b =>
            b.querySelector(".exp-role")?.value.trim() || b.querySelector(".exp-company")?.value.trim() || b.querySelector(".exp-desc")?.value.trim()
        ).length : 0;
        const projFilled = projectsContainer ? Array.from(projectsContainer.querySelectorAll(".project-block")).filter(b =>
            b.querySelector(".proj-title")?.value.trim() || b.querySelector(".proj-tech")?.value.trim() || b.querySelector(".proj-desc")?.value.trim()
        ).length : 0;
        const certsFilled = certsContainer ? Array.from(certsContainer.querySelectorAll(".cert-input")).filter(i => i.value.trim()).length : 0;
        const achieveFilled = achieveContainer ? Array.from(achieveContainer.querySelectorAll(".achieve-input")).filter(i => i.value.trim()).length : 0;
        return { expFilled, projFilled, certsFilled, achieveFilled };
    }

    function getLanguagesList() {
        if (!languagesContainer) return [];
        const list = [];
        languagesContainer.querySelectorAll(".lang-block").forEach(b => {
            const name = b.querySelector(".lang-name")?.value.trim() || "";
            if (!name) return;
            const modes = [];
            if (b.querySelector(".lang-read")?.checked) modes.push("Read");
            if (b.querySelector(".lang-write")?.checked) modes.push("Write");
            if (b.querySelector(".lang-speak")?.checked) modes.push("Speak");
            list.push(modes.length > 0 ? `${name} (${modes.join(", ")})` : name);
        });
        return list;
    }

    function resolvePreviewBaseSpacing() {
        const selected = spacingSelect ? spacingSelect.value : "auto";
        if (selected !== "auto") return selected;
        const { expFilled, projFilled, certsFilled, achieveFilled } = getFilledSectionCounts();
        const optTotal = expFilled + projFilled + certsFilled + achieveFilled;
        if (optTotal === 0 && softSkillsList.length <= 4 && getLanguagesList().length <= 2) return "fresher";
        if (optTotal <= 2 && softSkillsList.length <= 8) return "relaxed";
        if (optTotal <= 5) return "normal";
        return "compact";
    }

    function applyCanvasFormatting(pdfInfo = computePdfLayoutInfo()) {
        if (!canvas) return;
        const templateVal = templateSelect ? templateSelect.value : "classic";
        const fontVal = fontSelect ? fontSelect.value : "arial";
        const selectedSpacing = spacingSelect ? spacingSelect.value : "auto";

        canvas.classList.remove("template-classic", "template-modern", "template-academic");
        canvas.classList.add(`template-${templateVal}`);

        canvas.classList.remove("font-arial", "font-calibri", "font-times", "font-georgia");
        canvas.classList.add(`font-${fontVal}`);

        const setSpacing = (mode) => {
            canvas.classList.remove("spacing-compact", "spacing-normal", "spacing-relaxed", "spacing-fresher");
            canvas.classList.add(`spacing-${mode}`);
        };

        if (selectedSpacing !== "auto") {
            setSpacing(selectedSpacing);
        } else {
            const order = ["fresher", "relaxed", "normal", "compact"];
            const startIdx = Math.max(0, order.indexOf(resolvePreviewBaseSpacing()));
            const A4_HEIGHT_PX = 1122;
            for (let i = startIdx; i < order.length; i++) {
                setSpacing(order[i]);
                if (canvas.scrollHeight <= A4_HEIGHT_PX) break;
            }
        }

        if (previewPageBadge) {
            previewPageBadge.textContent = pdfInfo.pageCount === 1 ? "Fits 1 page" : `${pdfInfo.pageCount} pages`;
            previewPageBadge.classList.toggle("is-multi", pdfInfo.pageCount > 1);
        }
        if (exportPageNote) {
            exportPageNote.textContent = pdfInfo.pageCount === 1
                ? "Ready: exports a single-page, text-selectable A4 PDF."
                : `Current content spans ${pdfInfo.pageCount} A4 pages. Use Compact density to tighten if desired.`;
        }
        updatePreviewScale();
    }

    function updatePreviewScale() {
        if (!previewDesk || !scaleWrapper || !canvas) return;
        canvas.style.transform = "none";
        const sheetW = canvas.offsetWidth || 794;
        const sheetH = canvas.offsetHeight || 1123;
        const pad = window.innerWidth <= 640 ? 24 : 40;
        const availW = Math.max(260, previewDesk.clientWidth - pad);
        const scale = Math.min(1, availW / sheetW);

        canvas.style.transform = `scale(${scale})`;
        scaleWrapper.style.width = `${Math.round(sheetW * scale)}px`;
        scaleWrapper.style.height = `${Math.round(sheetH * scale)}px`;
    }

    if (typeof ResizeObserver !== "undefined" && previewDesk) {
        const obs = new ResizeObserver(() => requestAnimationFrame(updatePreviewScale));
        obs.observe(previewDesk);
    } else {
        window.addEventListener("resize", updatePreviewScale);
    }

    // --- RESTRAINED 7-POINT ATS READINESS ASSESSMENT ---
    function updateAtsReadiness(pageCount = 1) {
        if (!atsScoreBadge || !atsProgressFill || !atsChecksList || !atsReadinessSummary) return;

        const name = document.getElementById("inputName")?.value.trim() || "";
        const location = document.getElementById("inputLocation")?.value.trim() || "";
        const email = sanitizeEmail(document.getElementById("inputEmail")?.value || "");
        const phoneDigits = (document.getElementById("inputPhone")?.value || "").replace(/\D/g, "");
        const hasProfileLink = Boolean(
            sanitizeUrl(document.getElementById("inputLinkedin")?.value || "") ||
            sanitizeUrl(document.getElementById("inputGithub")?.value || "") ||
            sanitizeUrl(document.getElementById("inputPortfolio")?.value || "")
        );

        const summary = inputSummary?.value.trim() || "";
        const summaryWords = summary.split(/\s+/).filter(Boolean).length;
        const summaryPolished = summaryWords >= 25 && !/^(?:i\s+know|i\s+am\s+looking)\b/i.test(summary);

        const techValues = isTechSectionActive
            ? ["inputLang", "inputWeb", "inputDB", "inputConcepts"]
                .flatMap(id => (document.getElementById(id)?.value || "").split(",").map(s => s.trim()).filter(Boolean))
            : [];
        const customSkillValues = customSkillGroupsContainer
            ? Array.from(customSkillGroupsContainer.querySelectorAll(".cskill-items"))
                .flatMap(i => (i.value || "").split(",").map(s => s.trim()).filter(Boolean))
            : [];
        const totalSkills = techValues.length + customSkillValues.length + softSkillsList.length;

        const eduDegree = document.getElementById("eduDegree1")?.value.trim() || "";
        const eduSchool = document.getElementById("eduSchool1")?.value.trim() || "";
        const eduYear = document.getElementById("eduYear1")?.value.trim() || "";
        const hasValidYear = /\b(?:19|20)\d{2}\b/.test(eduYear);

        const filledProjs = projectsContainer ? Array.from(projectsContainer.querySelectorAll(".project-block")).filter(b =>
            b.querySelector(".proj-title")?.value.trim() && b.querySelector(".proj-desc")?.value.trim()
        ) : [];
        const filledExps = expContainer ? Array.from(expContainer.querySelectorAll(".exp-block")).filter(b =>
            (b.querySelector(".exp-role")?.value.trim() || b.querySelector(".exp-company")?.value.trim()) &&
            b.querySelector(".exp-desc")?.value.trim()
        ) : [];

        const bullets = [
            ...filledProjs.flatMap(b => (b.querySelector(".proj-desc")?.value || "").split("\n")),
            ...filledExps.flatMap(b => (b.querySelector(".exp-desc")?.value || "").split("\n"))
        ].map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);

        const strongBullets = bullets.filter(line =>
            /\d+%|\d+\+/.test(line) ||
            /^(?:built|developed|created|designed|implemented|optimized|reduced|improved|automated|led|managed|engineered|deployed|integrated|analyzed|tested|authored|delivered)\b/i.test(line)
        ).length;

        const hasTechOnProj = filledProjs.every(b => Boolean(b.querySelector(".proj-tech")?.value.trim()));
        const { certsFilled, achieveFilled } = getFilledSectionCounts();
        const hasExtra = certsFilled > 0 || achieveFilled > 0 || Boolean(document.getElementById("inputCoursework")?.value.trim()) || getLanguagesList().length > 0;

        const checks = [
            {
                title: "Contact details check",
                pass: Boolean(name.length >= 2 && location && email && phoneDigits.length >= 7 && hasProfileLink),
                weight: 15,
                passDesc: "Name, email, phone, location, and at least one profile link are valid.",
                warnDesc: "Provide Full Name, valid Email, 7+ digit Phone, City/State, and a LinkedIn, GitHub, or Portfolio link."
            },
            {
                title: "Summary check",
                pass: summaryPolished,
                weight: 15,
                passDesc: `Summary is concise and resume-ready (${summaryWords} words).`,
                warnDesc: "Write a 25+ word summary focused on your education, skills, and target role (convert casual 'I know...' notes)."
            },
            {
                title: "Skills check",
                pass: totalSkills >= 5 && (!isTechSectionActive || techValues.length + customSkillValues.length >= 3),
                weight: 15,
                passDesc: `${totalSkills} relevant technical and soft skills listed for keyword parsing.`,
                warnDesc: "List at least 5 total skills (including 3+ technical/domain skills if applicable)."
            },
            {
                title: "Education check",
                pass: Boolean(eduDegree && eduSchool && hasValidYear),
                weight: 15,
                passDesc: "Graduation degree, institution, and 4-digit passing year are complete.",
                warnDesc: "Complete Graduation Degree, College/University, and a 4-digit Passing Year."
            },
            {
                title: "Project / Experience check",
                pass: filledProjs.length > 0 || filledExps.length > 0,
                weight: 20,
                passDesc: filledProjs.length > 0
                    ? `${filledProjs.length} project(s) included with descriptions.`
                    : `${filledExps.length} experience entry included with descriptions.`,
                warnDesc: "Add at least 1 Project (ideal for freshers) or 1 Internship/Experience entry with a description."
            },
            {
                title: "Bullet specificity check",
                pass: strongBullets >= 2 && (filledProjs.length === 0 || hasTechOnProj),
                weight: 10,
                passDesc: `${strongBullets} action-oriented bullets with clear context.`,
                warnDesc: "Your project/experience descriptions could be more specific. Mention the technologies used and start 2+ bullets with action verbs (e.g. 'Built...', 'Automated...')."
            },
            {
                title: "Formatting check",
                pass: pageCount === 1 && hasExtra,
                weight: 10,
                passDesc: "Fits on a single A4 page with clean single-column ATS structure.",
                warnDesc: pageCount > 1
                    ? "Content spans multiple pages. Switch Page Density to Compact or tighten bullets for a 1-page fresher resume."
                    : "Single-column ATS format active. Add Languages, Coursework, or Certifications in Step 6 if relevant."
            }
        ];

        const score = checks.reduce((acc, c) => acc + (c.pass ? c.weight : 0), 0);
        const label = score >= 85 ? "Ready" : score >= 60 ? "Fair" : "Incomplete";

        atsScoreBadge.textContent = `${score}% • ${label}`;
        atsScoreBadge.classList.remove("score-high", "score-mid", "score-low");
        atsScoreBadge.classList.add(score >= 85 ? "score-high" : score >= 60 ? "score-mid" : "score-low");

        atsProgressFill.style.width = `${score}%`;
        atsProgressFill.style.backgroundColor = score >= 85 ? "var(--success)" : score >= 60 ? "var(--warning)" : "var(--error)";

        const passed = checks.filter(c => c.pass).length;
        atsReadinessSummary.textContent = `${passed} of ${checks.length} checks passed`;

        atsChecksList.innerHTML = "";
        checks.forEach(c => {
            const li = document.createElement("li");
            li.className = `ats-check-item ${c.pass ? "is-pass" : "is-warn"}`;
            li.innerHTML = `
                <span class="ats-check-status" aria-hidden="true">${c.pass ? "✓" : "!"}</span>
                <div class="ats-check-body">
                    <strong>${escapeHtml(c.title)} (${c.pass ? c.weight : 0}/${c.weight}%)</strong>
                    <span>${escapeHtml(c.pass ? c.passDesc : c.warnDesc)}</span>
                </div>
            `;
            atsChecksList.appendChild(li);
        });
    }

    // --- LIVE PREVIEW RENDERER ---
    function renderEduEntryHtml(title, year, subtitle, score) {
        return `
            <div class="entry-block">
                <div class="flex-row">
                    <span class="entry-title">${escapeHtml(title)}</span>
                    <span class="entry-date">${escapeHtml(year)}</span>
                </div>
                ${subtitle ? `<div>${escapeHtml(subtitle)}</div>` : ""}
                ${score ? `<div><em>Aggregate: ${escapeHtml(score)}</em></div>` : ""}
            </div>
        `;
    }

    function updatePreview() {
        if (!canvas) return;

        const name = (document.getElementById("inputName")?.value.trim() || "YOUR FULL NAME").toUpperCase();
        const location = document.getElementById("inputLocation")?.value.trim() || "City, State";
        const rawEmail = document.getElementById("inputEmail")?.value.trim() || "";
        const validEmail = sanitizeEmail(rawEmail);
        const phone = document.getElementById("inputPhone")?.value.trim() || "Phone Number";
        const linkedin = sanitizeUrl(document.getElementById("inputLinkedin")?.value || "");
        const github = sanitizeUrl(document.getElementById("inputGithub")?.value || "");
        const portfolio = sanitizeUrl(document.getElementById("inputPortfolio")?.value || "");
        const summary = inputSummary?.value.trim() || "";

        const lang = document.getElementById("inputLang")?.value.trim() || "";
        const web = document.getElementById("inputWeb")?.value.trim() || "";
        const db = document.getElementById("inputDB")?.value.trim() || "";
        const concepts = document.getElementById("inputConcepts")?.value.trim() || "";
        const customGroups = customSkillGroupsContainer
            ? Array.from(customSkillGroupsContainer.querySelectorAll(".custom-skill-block")).map(b => ({
                label: b.querySelector(".cskill-label")?.value.trim() || "",
                items: b.querySelector(".cskill-items")?.value.trim() || ""
            })).filter(g => g.label && g.items)
            : [];

        const linksArray = [];
        if (location) linksArray.push(escapeHtml(location));
        if (phone) linksArray.push(escapeHtml(phone));
        if (validEmail) {
            linksArray.push(`<a href="mailto:${escapeHtml(validEmail)}" class="resume-link">${escapeHtml(validEmail)}</a>`);
        } else {
            linksArray.push(escapeHtml(rawEmail || "yourname@email.com"));
        }
        if (linkedin) linksArray.push(`<a href="${escapeHtml(linkedin)}" target="_blank" rel="noopener noreferrer" class="resume-link resume-link-bold">LinkedIn</a>`);
        if (github) linksArray.push(`<a href="${escapeHtml(github)}" target="_blank" rel="noopener noreferrer" class="resume-link resume-link-bold">GitHub</a>`);
        if (portfolio) linksArray.push(`<a href="${escapeHtml(portfolio)}" target="_blank" rel="noopener noreferrer" class="resume-link resume-link-bold">Portfolio</a>`);

        let html = `
            <h1>${escapeHtml(name)}</h1>
            <div class="resume-header-links">${linksArray.join(" | ")}</div>
        `;

        if (summary) {
            html += `<h2>Professional Summary</h2><p>${escapeHtml(summary)}</p>`;
        } else {
            html += `<h2>Professional Summary</h2><p>Motivated graduate seeking an entry-level opportunity to apply academic fundamentals, practical project experience, and problem-solving skills.</p>`;
        }

        // Education
        html += `<h2>Education</h2>`;
        if (isEduPgActive) {
            const pgDeg = document.getElementById("eduDegreePG")?.value.trim() || "";
            const pgSch = document.getElementById("eduSchoolPG")?.value.trim() || "";
            const pgYr = document.getElementById("eduYearPG")?.value.trim() || "";
            const pgSc = document.getElementById("eduScorePG")?.value.trim() || "";
            if (pgDeg || pgSch || pgYr) {
                html += renderEduEntryHtml(pgDeg || "Post-Graduation", pgYr, pgSch || "University", pgSc);
            }
        }

        const ugDeg = document.getElementById("eduDegree1")?.value.trim() || "Degree & Specialization";
        const ugSch = document.getElementById("eduSchool1")?.value.trim() || "College / University Name";
        const ugYr = document.getElementById("eduYear1")?.value.trim() || "Passing Year";
        const ugSc = document.getElementById("eduScore1")?.value.trim() || "";
        html += renderEduEntryHtml(ugDeg, ugYr, ugSch, ugSc);

        if (customEduContainer) {
            customEduContainer.querySelectorAll(".custom-edu-block").forEach(b => {
                const d = b.querySelector(".cedu-degree")?.value.trim() || "";
                const s = b.querySelector(".cedu-school")?.value.trim() || "";
                const y = b.querySelector(".cedu-year")?.value.trim() || "";
                const sc = b.querySelector(".cedu-score")?.value.trim() || "";
                if (d || s || y) html += renderEduEntryHtml(d || "Qualification", y, s, sc);
            });
        }

        if (isEdu12Active) {
            const sel = eduStream2?.value || "";
            const custom = eduStreamCustom2?.value.trim() || "";
            const finalStream = sel === "Others" ? custom : sel;
            const sch2 = document.getElementById("eduSchool2")?.value.trim() || "";
            const yr2 = document.getElementById("eduYear2")?.value.trim() || "";
            const sc2 = document.getElementById("eduScore2")?.value.trim() || "";
            if (sel || sch2 || yr2 || sc2) {
                const label = finalStream ? `Class 12 / Intermediate (${finalStream})` : "Class 12 / Intermediate";
                html += renderEduEntryHtml(label, yr2, sch2, sc2);
            }
        }

        if (isEdu10Active) {
            const brd3 = document.getElementById("eduBoard3")?.value.trim() || "";
            const sch3 = document.getElementById("eduSchool3")?.value.trim() || "";
            const yr3 = document.getElementById("eduYear3")?.value.trim() || "";
            const sc3 = document.getElementById("eduScore3")?.value.trim() || "";
            if (brd3 || sch3 || yr3 || sc3) {
                const line = sch3 && brd3 ? `${sch3} | ${brd3}` : (sch3 || brd3 || "High School");
                html += renderEduEntryHtml("Class 10 / Secondary School", yr3, line, sc3);
            }
        }

        // Technical & Custom Skills
        const hasTech = isTechSectionActive && (lang || web || db || concepts);
        if (hasTech || customGroups.length > 0) {
            html += `<h2>Technical Skills</h2><ul>`;
            if (hasTech) {
                if (lang) html += `<li><strong>Programming Languages:</strong> ${escapeHtml(lang)}</li>`;
                if (web) html += `<li><strong>Web Technologies &amp; Frameworks:</strong> ${escapeHtml(web)}</li>`;
                if (db) html += `<li><strong>Databases &amp; Tools:</strong> ${escapeHtml(db)}</li>`;
                if (concepts) html += `<li><strong>Core Concepts:</strong> ${escapeHtml(concepts)}</li>`;
            }
            customGroups.forEach(g => {
                html += `<li><strong>${escapeHtml(g.label)}:</strong> ${escapeHtml(g.items)}</li>`;
            });
            html += `</ul>`;
        }

        if (softSkillsList.length > 0) {
            html += `<h2>Soft Skills</h2><ul>`;
            softSkillsList.forEach(s => { html += `<li>${escapeHtml(s)}</li>`; });
            html += `</ul>`;
        }

        // Projects
        if (projectsContainer) {
            const blocks = projectsContainer.querySelectorAll(".project-block");
            let projHtml = "";
            blocks.forEach(b => {
                const title = b.querySelector(".proj-title")?.value.trim() || "";
                const tech = b.querySelector(".proj-tech")?.value.trim() || "";
                const desc = b.querySelector(".proj-desc")?.value.trim() || "";
                if (title || tech || desc) {
                    projHtml += `
                        <div class="entry-block">
                            <div class="proj-title-row">${escapeHtml(title || "Project Title")}</div>
                            ${tech ? `<div class="tech-stack">Technologies: ${escapeHtml(tech)}</div>` : ""}
                    `;
                    if (desc) {
                        projHtml += `<ul>`;
                        desc.split("\n").forEach(line => {
                            const clean = line.replace(/^[-•*]\s*/, "").trim();
                            if (clean) projHtml += `<li>${escapeHtml(clean)}</li>`;
                        });
                        projHtml += `</ul>`;
                    }
                    projHtml += `</div>`;
                }
            });
            if (projHtml) html += `<h2>Projects</h2>${projHtml}`;
        }

        // Experience
        if (expContainer) {
            const blocks = expContainer.querySelectorAll(".exp-block");
            let expHtml = "";
            blocks.forEach(b => {
                const role = b.querySelector(".exp-role")?.value.trim() || "";
                const comp = b.querySelector(".exp-company")?.value.trim() || "";
                const dur = b.querySelector(".exp-duration")?.value.trim() || "";
                const desc = b.querySelector(".exp-desc")?.value.trim() || "";
                if (role || comp || dur || desc) {
                    expHtml += `
                        <div class="entry-block">
                            <div class="flex-row">
                                <span class="entry-title">${escapeHtml(role || "Position")}</span>
                                <span class="entry-date">${escapeHtml(dur)}</span>
                            </div>
                            ${comp ? `<div><em>${escapeHtml(comp)}</em></div>` : ""}
                    `;
                    if (desc) {
                        expHtml += `<ul>`;
                        desc.split("\n").forEach(line => {
                            const clean = line.replace(/^[-•*]\s*/, "").trim();
                            if (clean) expHtml += `<li>${escapeHtml(clean)}</li>`;
                        });
                        expHtml += `</ul>`;
                    }
                    expHtml += `</div>`;
                }
            });
            if (expHtml) html += `<h2>Experience</h2>${expHtml}`;
        }

        // Additional Information
        if (isCourseworkActive) {
            const cw = document.getElementById("inputCoursework")?.value.trim() || "";
            if (cw) html += `<h2>Relevant Coursework</h2><p>${escapeHtml(cw)}</p>`;
        }

        const langs = getLanguagesList();
        if (langs.length > 0) {
            html += `<h2>Languages Known</h2><ul>`;
            langs.forEach(l => { html += `<li>${escapeHtml(l)}</li>`; });
            html += `</ul>`;
        }

        if (certsContainer) {
            const certLines = Array.from(certsContainer.querySelectorAll(".cert-input")).map(i => i.value.trim()).filter(Boolean);
            if (certLines.length > 0) {
                html += `<h2>Certifications</h2><ul>${certLines.map(c => `<li>${escapeHtml(c)}</li>`).join("")}</ul>`;
            }
        }

        if (achieveContainer) {
            const achLines = Array.from(achieveContainer.querySelectorAll(".achieve-input")).map(i => i.value.trim()).filter(Boolean);
            if (achLines.length > 0) {
                html += `<h2>Achievements</h2><ul>${achLines.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`;
            }
        }

        canvas.innerHTML = html;
        const pdfInfo = computePdfLayoutInfo();
        applyCanvasFormatting(pdfInfo);
        updateAtsReadiness(pdfInfo.pageCount);
    }

    // --- DIRECT TEXT-BASED A4 PDF GENERATOR (1:1 TEMPLATE & FONT PARITY) ---
    const PDF_FONT_WIDTHS = {
        helvetica: [
            278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,
            556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,
            1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,
            667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,
            333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,
            556,556,333,500,278,556,500,722,500,500,500,334,260,334,584
        ],
        helveticaBold: [
            278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,
            556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,
            975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,
            667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,
            333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,
            611,611,389,556,333,611,556,778,556,556,500,389,280,389,584
        ],
        times: [
            250,333,408,500,500,833,778,180,333,333,500,564,250,333,250,278,
            500,500,500,500,500,500,500,500,500,500,278,278,564,564,564,444,
            921,722,667,667,722,611,556,722,722,333,389,722,611,889,722,722,
            556,722,667,556,611,722,722,944,722,722,611,333,278,333,469,500,
            333,444,500,444,500,444,333,500,500,278,278,500,278,778,500,500,
            500,500,333,389,278,500,500,722,500,500,444,480,200,480,541
        ],
        timesBold: [
            250,333,555,500,500,1000,833,278,333,333,500,570,250,333,250,278,
            500,500,500,500,500,500,500,500,500,500,333,333,570,570,570,500,
            930,722,667,722,722,667,611,778,778,389,500,778,667,944,722,778,
            611,778,722,556,667,722,722,1000,722,722,667,333,278,333,581,500,
            333,500,556,444,556,444,333,500,556,278,333,556,278,833,556,500,
            556,556,444,389,333,556,500,722,500,500,444,394,220,394,520
        ]
    };

    function normalizePdfText(str) {
        return String(str || "")
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[\u2018\u2019]/g, "'")
            .replace(/[\u201C\u201D]/g, '"')
            .replace(/\u2013/g, "-")
            .replace(/\u2014/g, "--")
            .replace(/\u2022/g, "*")
            .replace(/\u00A0/g, " ")
            .replace(/[^\x20-\x7E]/g, " ");
    }

    function escapePdfString(str) {
        return normalizePdfText(str)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)");
    }

    function measurePdfTextWidth(text, fontSize, fontKey) {
        const clean = normalizePdfText(text);
        const table = PDF_FONT_WIDTHS[fontKey] || PDF_FONT_WIDTHS.helvetica;
        let units = 0;
        for (let i = 0; i < clean.length; i++) {
            const idx = clean.charCodeAt(i) - 32;
            units += idx >= 0 && idx < table.length ? table[idx] : 500;
        }
        return (units / 1000) * fontSize;
    }

    function wrapPdfText(text, maxWidth, fontSize, fontKey) {
        const clean = normalizePdfText(text).trim();
        if (!clean) return [];
        const words = clean.split(/\s+/);
        const lines = [];
        let line = "";
        words.forEach(w => {
            const test = line ? `${line} ${w}` : w;
            if (measurePdfTextWidth(test, fontSize, fontKey) <= maxWidth) {
                line = test;
            } else {
                if (line) lines.push(line);
                if (measurePdfTextWidth(w, fontSize, fontKey) <= maxWidth) {
                    line = w;
                } else {
                    let chunk = "";
                    for (const ch of w) {
                        if (measurePdfTextWidth(chunk + ch, fontSize, fontKey) <= maxWidth) chunk += ch;
                        else { if (chunk) lines.push(chunk); chunk = ch; }
                    }
                    line = chunk;
                }
            }
        });
        if (line) lines.push(line);
        return lines;
    }

    function collectResumeDataForPdf() {
        const name = (document.getElementById("inputName")?.value.trim() || "YOUR FULL NAME").toUpperCase();
        const location = document.getElementById("inputLocation")?.value.trim() || "City, State";
        const rawEmail = document.getElementById("inputEmail")?.value.trim() || "";
        const validEmail = sanitizeEmail(rawEmail);
        const phone = document.getElementById("inputPhone")?.value.trim() || "Phone Number";
        const linkedin = sanitizeUrl(document.getElementById("inputLinkedin")?.value || "");
        const github = sanitizeUrl(document.getElementById("inputGithub")?.value || "");
        const portfolio = sanitizeUrl(document.getElementById("inputPortfolio")?.value || "");
        const summary = inputSummary?.value.trim() || "";

        const headerSegments = [];
        if (location) headerSegments.push({ text: location, url: "" });
        if (phone) headerSegments.push({ text: phone, url: "" });
        if (validEmail) headerSegments.push({ text: validEmail, url: `mailto:${validEmail}` });
        else if (rawEmail) headerSegments.push({ text: rawEmail, url: "" });
        if (linkedin) headerSegments.push({ text: "LinkedIn", url: linkedin });
        if (github) headerSegments.push({ text: "GitHub", url: github });
        if (portfolio) headerSegments.push({ text: "Portfolio", url: portfolio });

        const techItems = [];
        if (isTechSectionActive) {
            const lang = document.getElementById("inputLang")?.value.trim() || "";
            const web = document.getElementById("inputWeb")?.value.trim() || "";
            const db = document.getElementById("inputDB")?.value.trim() || "";
            const concepts = document.getElementById("inputConcepts")?.value.trim() || "";
            if (lang) techItems.push({ label: "Programming Languages:", value: lang });
            if (web) techItems.push({ label: "Web Technologies & Frameworks:", value: web });
            if (db) techItems.push({ label: "Databases & Tools:", value: db });
            if (concepts) techItems.push({ label: "Core Concepts:", value: concepts });
        }
        if (customSkillGroupsContainer) {
            customSkillGroupsContainer.querySelectorAll(".custom-skill-block").forEach(b => {
                const l = b.querySelector(".cskill-label")?.value.trim() || "";
                const items = b.querySelector(".cskill-items")?.value.trim() || "";
                if (l && items) techItems.push({ label: `${l}:`, value: items });
            });
        }

        const education = [];
        if (isEduPgActive) {
            const pgDeg = document.getElementById("eduDegreePG")?.value.trim() || "";
            const pgSch = document.getElementById("eduSchoolPG")?.value.trim() || "";
            const pgYr = document.getElementById("eduYearPG")?.value.trim() || "";
            const pgSc = document.getElementById("eduScorePG")?.value.trim() || "";
            if (pgDeg || pgSch || pgYr) {
                education.push({ title: pgDeg || "Post-Graduation", year: pgYr, subtitle: pgSch || "University", score: pgSc });
            }
        }
        const ugDeg = document.getElementById("eduDegree1")?.value.trim() || "";
        const ugSch = document.getElementById("eduSchool1")?.value.trim() || "";
        const ugYr = document.getElementById("eduYear1")?.value.trim() || "";
        const ugSc = document.getElementById("eduScore1")?.value.trim() || "";
        if (ugDeg || ugSch || ugYr || ugSc) {
            education.push({ title: ugDeg || "Graduation", year: ugYr, subtitle: ugSch || "College / University", score: ugSc });
        }
        if (customEduContainer) {
            customEduContainer.querySelectorAll(".custom-edu-block").forEach(b => {
                const d = b.querySelector(".cedu-degree")?.value.trim() || "";
                const s = b.querySelector(".cedu-school")?.value.trim() || "";
                const y = b.querySelector(".cedu-year")?.value.trim() || "";
                const sc = b.querySelector(".cedu-score")?.value.trim() || "";
                if (d || s || y) education.push({ title: d || "Qualification", year: y, subtitle: s, score: sc });
            });
        }
        if (isEdu12Active) {
            const sel = eduStream2?.value || "";
            const custom = eduStreamCustom2?.value.trim() || "";
            const finalStream = sel === "Others" ? custom : sel;
            const sch2 = document.getElementById("eduSchool2")?.value.trim() || "";
            const yr2 = document.getElementById("eduYear2")?.value.trim() || "";
            const sc2 = document.getElementById("eduScore2")?.value.trim() || "";
            if (sel || sch2 || yr2 || sc2) {
                education.push({
                    title: finalStream ? `Class 12 / Intermediate (${finalStream})` : "Class 12 / Intermediate",
                    year: yr2, subtitle: sch2, score: sc2
                });
            }
        }
        if (isEdu10Active) {
            const brd3 = document.getElementById("eduBoard3")?.value.trim() || "";
            const sch3 = document.getElementById("eduSchool3")?.value.trim() || "";
            const yr3 = document.getElementById("eduYear3")?.value.trim() || "";
            const sc3 = document.getElementById("eduScore3")?.value.trim() || "";
            if (brd3 || sch3 || yr3 || sc3) {
                education.push({
                    title: "Class 10 / Secondary School",
                    year: yr3,
                    subtitle: sch3 && brd3 ? `${sch3} | ${brd3}` : (sch3 || brd3 || "High School"),
                    score: sc3
                });
            }
        }

        const projects = projectsContainer ? Array.from(projectsContainer.querySelectorAll(".project-block")).map(b => ({
            title: b.querySelector(".proj-title")?.value.trim() || "",
            tech: b.querySelector(".proj-tech")?.value.trim() || "",
            bullets: (b.querySelector(".proj-desc")?.value || "").split("\n").map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean)
        })).filter(p => p.title || p.tech || p.bullets.length > 0) : [];

        const experiences = expContainer ? Array.from(expContainer.querySelectorAll(".exp-block")).map(b => ({
            role: b.querySelector(".exp-role")?.value.trim() || "",
            company: b.querySelector(".exp-company")?.value.trim() || "",
            duration: b.querySelector(".exp-duration")?.value.trim() || "",
            bullets: (b.querySelector(".exp-desc")?.value || "").split("\n").map(l => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean)
        })).filter(e => e.role || e.company || e.duration || e.bullets.length > 0) : [];

        const coursework = isCourseworkActive ? (document.getElementById("inputCoursework")?.value.trim() || "") : "";
        const languagesList = getLanguagesList();
        const certs = certsContainer ? Array.from(certsContainer.querySelectorAll(".cert-input")).map(i => i.value.trim()).filter(Boolean) : [];
        const achieves = achieveContainer ? Array.from(achieveContainer.querySelectorAll(".achieve-input")).map(i => i.value.trim()).filter(Boolean) : [];

        return {
            name, headerSegments, summary, education, techItems, softSkills: [...softSkillsList],
            projects, experiences, coursework, languagesList, certs, achieves
        };
    }

    function computePdfLayoutInfo() {
        const data = collectResumeDataForPdf();
        const templateChoice = templateSelect ? templateSelect.value : "classic";
        const fontChoice = fontSelect ? fontSelect.value : "arial";
        const useSerif = fontChoice === "times" || fontChoice === "georgia";
        const selectedSpacing = spacingSelect ? spacingSelect.value : "auto";

        const spacingConfig = {
            fresherWide: { marginX: 54, marginY: 46, bodySize: 10.8, h1Size: 20, h2Size: 11.5, lineHeight: 16.0, sectionGap: 15, entryGap: 9, itemGap: 3.2 },
            fresherFit: { marginX: 52, marginY: 40, bodySize: 10.4, h1Size: 19, h2Size: 11, lineHeight: 15.0, sectionGap: 13.5, entryGap: 7.5, itemGap: 2.5 },
            relaxed: { marginX: 52, marginY: 44, bodySize: 10.5, h1Size: 19.5, h2Size: 11.2, lineHeight: 15.2, sectionGap: 14, entryGap: 8, itemGap: 2.8 },
            normal: { marginX: 46, marginY: 36, bodySize: 9.8, h1Size: 17.5, h2Size: 10.5, lineHeight: 13.2, sectionGap: 10, entryGap: 5.5, itemGap: 1.6 },
            compact: { marginX: 40, marginY: 30, bodySize: 9.2, h1Size: 16, h2Size: 10, lineHeight: 11.8, sectionGap: 7.5, entryGap: 4, itemGap: 1 },
            ultraCompact: { marginX: 36, marginY: 26, bodySize: 8.8, h1Size: 15, h2Size: 9.5, lineHeight: 11.0, sectionGap: 6.5, entryGap: 3.2, itemGap: 0.8 }
        };

        const regularFontKey = useSerif ? "times" : "helvetica";
        const boldFontKey = useSerif ? "timesBold" : "helveticaBold";
        const regularPdfFont = useSerif ? "Times-Roman" : "Helvetica";
        const boldPdfFont = useSerif ? "Times-Bold" : "Helvetica-Bold";
        const italicPdfFont = useSerif ? "Times-Italic" : "Helvetica-Oblique";
        const PAGE_WIDTH = 595.28;
        const PAGE_HEIGHT = 841.89;

        const isLeftHeader = templateChoice === "modern";
        const headingColorRgb = templateChoice === "modern" ? "0.09 0.14 0.23" : "0 0 0";
        const ruleColorRgb = templateChoice === "modern" ? "0.58 0.64 0.72" : "0.07 0.09 0.15";

        const renderPagesWithConfig = (cfg) => {
            const contentWidth = PAGE_WIDTH - cfg.marginX * 2;
            const pages = [{ cmds: [], annots: [] }];
            let pageIdx = 0;
            let cursorY = PAGE_HEIGHT - cfg.marginY;
            const currentPage = () => pages[pageIdx];

            const ensureSpace = (needed) => {
                if (cursorY - needed < cfg.marginY) {
                    pages.push({ cmds: [], annots: [] });
                    pageIdx++;
                    cursorY = PAGE_HEIGHT - cfg.marginY;
                }
            };

            const drawText = (text, x, y, fontRef, size, rgb = "0 0 0") => {
                const safe = escapePdfString(text);
                currentPage().cmds.push(`${rgb} rg BT /${fontRef} ${size.toFixed(2)} Tf ${x.toFixed(2)} ${y.toFixed(2)} Td (${safe}) Tj ET`);
            };

            const drawRule = (x1, y, x2, width = 0.75, rgb = "0 0 0") => {
                currentPage().cmds.push(`${rgb} RG ${width.toFixed(2)} w ${x1.toFixed(2)} ${y.toFixed(2)} m ${x2.toFixed(2)} ${y.toFixed(2)} l S`);
            };

            const drawSectionHeading = (title) => {
                cursorY -= cfg.sectionGap;
                ensureSpace(cfg.h2Size + cfg.lineHeight + 8);
                drawText(title.toUpperCase(), cfg.marginX, cursorY, "F2", cfg.h2Size, headingColorRgb);
                drawRule(cfg.marginX, cursorY - 3, PAGE_WIDTH - cfg.marginX, templateChoice === "academic" ? 0.65 : 0.85, ruleColorRgb);
                cursorY -= (cfg.h2Size + 7);
            };

            const drawWrappedParagraph = (text, fontRef = "F1", fontKey = regularFontKey, size = cfg.bodySize) => {
                wrapPdfText(text, contentWidth, size, fontKey).forEach(line => {
                    ensureSpace(cfg.lineHeight);
                    drawText(line, cfg.marginX, cursorY, fontRef, size);
                    cursorY -= cfg.lineHeight;
                });
            };

            const drawBulletLine = (text, boldPrefix = "") => {
                const indent = 14;
                const fullText = boldPrefix ? `${boldPrefix} ${text}` : text;
                wrapPdfText(fullText, contentWidth - indent, cfg.bodySize, regularFontKey).forEach((line, idx) => {
                    ensureSpace(cfg.lineHeight);
                    if (idx === 0) {
                        drawText("-", cfg.marginX + 4, cursorY, "F2", cfg.bodySize);
                        if (boldPrefix && line.startsWith(boldPrefix)) {
                            drawText(boldPrefix, cfg.marginX + indent, cursorY, "F2", cfg.bodySize);
                            const prefixW = measurePdfTextWidth(boldPrefix, cfg.bodySize, boldFontKey);
                            const rest = line.slice(boldPrefix.length);
                            if (rest) drawText(rest, cfg.marginX + indent + prefixW, cursorY, "F1", cfg.bodySize);
                        } else {
                            drawText(line, cfg.marginX + indent, cursorY, "F1", cfg.bodySize);
                        }
                    } else {
                        drawText(line, cfg.marginX + indent, cursorY, "F1", cfg.bodySize);
                    }
                    cursorY -= cfg.lineHeight;
                });
                cursorY -= cfg.itemGap;
            };

            const drawSplitRow = (leftText, rightText, size = cfg.bodySize) => {
                const rightStr = normalizePdfText(rightText || "").trim();
                const rightW = rightStr ? measurePdfTextWidth(rightStr, size, boldFontKey) : 0;
                const maxLeftW = rightStr ? Math.max(120, contentWidth - rightW - 14) : contentWidth;
                const leftLines = wrapPdfText(leftText || "", maxLeftW, size, boldFontKey);
                ensureSpace(Math.max(1, leftLines.length) * cfg.lineHeight);
                if (leftLines.length === 0) {
                    if (rightStr) drawText(rightStr, PAGE_WIDTH - cfg.marginX - rightW, cursorY, "F2", size);
                    cursorY -= cfg.lineHeight;
                    return;
                }
                leftLines.forEach((line, idx) => {
                    drawText(line, cfg.marginX, cursorY, "F2", size);
                    if (idx === 0 && rightStr) drawText(rightStr, PAGE_WIDTH - cfg.marginX - rightW, cursorY, "F2", size);
                    cursorY -= cfg.lineHeight;
                });
            };

            // Name Header
            const displayName = data.name.toUpperCase();
            const nameW = measurePdfTextWidth(displayName, cfg.h1Size, boldFontKey);
            const nameX = isLeftHeader ? cfg.marginX : Math.max(cfg.marginX, (PAGE_WIDTH - nameW) / 2);
            drawText(displayName, nameX, cursorY, "F2", cfg.h1Size, headingColorRgb);
            cursorY -= (cfg.h1Size + 4);

            // Contact Line + Clickable Links
            if (data.headerSegments.length > 0) {
                const linkSize = Math.max(8.5, cfg.bodySize - 0.6);
                const sep = " | ";
                const sepW = measurePdfTextWidth(sep, linkSize, regularFontKey);
                const lines = [[]];
                let lineW = 0;

                data.headerSegments.forEach(seg => {
                    const fKey = seg.url && !seg.url.startsWith("mailto:") ? boldFontKey : regularFontKey;
                    const segW = measurePdfTextWidth(seg.text, linkSize, fKey);
                    const extra = lines[lines.length - 1].length > 0 ? sepW : 0;
                    if (lines[lines.length - 1].length > 0 && lineW + extra + segW > contentWidth) {
                        lines.push([seg]);
                        lineW = segW;
                    } else {
                        lines[lines.length - 1].push(seg);
                        lineW += extra + segW;
                    }
                });

                lines.forEach(segList => {
                    const totalW = segList.reduce((acc, seg, idx) => {
                        const fKey = seg.url && !seg.url.startsWith("mailto:") ? boldFontKey : regularFontKey;
                        return acc + measurePdfTextWidth(seg.text, linkSize, fKey) + (idx > 0 ? sepW : 0);
                    }, 0);
                    let x = isLeftHeader ? cfg.marginX : Math.max(cfg.marginX, (PAGE_WIDTH - totalW) / 2);
                    segList.forEach((seg, idx) => {
                        if (idx > 0) { drawText(sep, x, cursorY, "F1", linkSize); x += sepW; }
                        const isBoldLink = Boolean(seg.url && !seg.url.startsWith("mailto:"));
                        const fRef = isBoldLink ? "F2" : "F1";
                        const fKey = isBoldLink ? boldFontKey : regularFontKey;
                        const segW = measurePdfTextWidth(seg.text, linkSize, fKey);
                        drawText(seg.text, x, cursorY, fRef, linkSize);
                        if (seg.url) {
                            drawRule(x, cursorY - 1.5, x + segW, 0.5);
                            currentPage().annots.push({ rect: [x, cursorY - 2, x + segW, cursorY + linkSize], uri: seg.url });
                        }
                        x += segW;
                    });
                    cursorY -= (linkSize + 4);
                });
                if (templateChoice === "academic") {
                    drawRule(cfg.marginX, cursorY + 1, PAGE_WIDTH - cfg.marginX, 0.5, "0.82 0.84 0.87");
                    cursorY -= 4;
                }
            }

            const summaryText = data.summary || "Motivated graduate seeking an entry-level opportunity to apply academic fundamentals, practical project experience, and problem-solving skills.";
            drawSectionHeading("Professional Summary");
            drawWrappedParagraph(summaryText);

            if (data.education.length > 0) {
                drawSectionHeading("Education");
                data.education.forEach(edu => {
                    drawSplitRow(edu.title, edu.year);
                    if (edu.subtitle) drawWrappedParagraph(edu.subtitle, "F1", regularFontKey);
                    if (edu.score) drawWrappedParagraph(`Aggregate: ${edu.score}`, "F3", regularFontKey);
                    cursorY -= cfg.entryGap;
                });
            }

            if (data.techItems.length > 0) {
                drawSectionHeading("Technical Skills");
                data.techItems.forEach(item => drawBulletLine(item.value, item.label));
            }

            if (data.softSkills.length > 0) {
                drawSectionHeading("Soft Skills");
                data.softSkills.forEach(skill => drawBulletLine(skill));
            }

            if (data.projects.length > 0) {
                drawSectionHeading("Projects");
                data.projects.forEach(proj => {
                    drawSplitRow(proj.title || "Project Title", "");
                    if (proj.tech) drawWrappedParagraph(`Technologies: ${proj.tech}`, "F3", regularFontKey, Math.max(8.5, cfg.bodySize - 0.5));
                    proj.bullets.forEach(b => drawBulletLine(b));
                    cursorY -= cfg.entryGap;
                });
            }

            if (data.experiences.length > 0) {
                drawSectionHeading("Experience");
                data.experiences.forEach(exp => {
                    drawSplitRow(exp.role || "Position", exp.duration);
                    if (exp.company) drawWrappedParagraph(exp.company, "F3", regularFontKey);
                    exp.bullets.forEach(b => drawBulletLine(b));
                    cursorY -= cfg.entryGap;
                });
            }

            if (data.coursework) {
                drawSectionHeading("Relevant Coursework");
                drawWrappedParagraph(data.coursework);
            }

            if (data.languagesList.length > 0) {
                drawSectionHeading("Languages Known");
                data.languagesList.forEach(l => drawBulletLine(l));
            }

            if (data.certs.length > 0) {
                drawSectionHeading("Certifications");
                data.certs.forEach(c => drawBulletLine(c));
            }

            if (data.achieves.length > 0) {
                drawSectionHeading("Achievements");
                data.achieves.forEach(a => drawBulletLine(a));
            }

            return pages;
        };

        let pages;
        if (selectedSpacing === "auto") {
            const keys = ["fresherWide", "fresherFit", "relaxed", "normal", "compact", "ultraCompact"];
            for (const key of keys) {
                const candidate = renderPagesWithConfig(spacingConfig[key]);
                pages = candidate;
                if (candidate.length === 1) break;
            }
            if (pages.length > 1) pages = renderPagesWithConfig(spacingConfig.compact);
        } else {
            pages = renderPagesWithConfig(spacingConfig[selectedSpacing] || spacingConfig.normal);
        }

        return { pages, pageCount: pages.length, regularPdfFont, boldPdfFont, italicPdfFont, PAGE_WIDTH, PAGE_HEIGHT };
    }

    function generateResumePdfBlob() {
        const { pages, regularPdfFont, boldPdfFont, italicPdfFont, PAGE_WIDTH, PAGE_HEIGHT } = computePdfLayoutInfo();

        const objects = [];
        const addObj = (body) => { objects.push(body); return objects.length; };
        const catalogId = addObj("");
        const pagesId = addObj("");
        const f1Id = addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /${regularPdfFont} >>`);
        const f2Id = addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /${boldPdfFont} >>`);
        const f3Id = addObj(`<< /Type /Font /Subtype /Type1 /BaseFont /${italicPdfFont} >>`);

        const pageIds = [];
        pages.forEach(p => {
            const streamStr = p.cmds.join("\n");
            const contentId = addObj(`<< /Length ${streamStr.length} >>\nstream\n${streamStr}\nendstream`);
            const annotIds = p.annots.map(a => {
                const safeUri = escapePdfString(a.uri);
                const rect = a.rect.map(v => v.toFixed(2)).join(" ");
                return addObj(`<< /Type /Annot /Subtype /Link /Rect [${rect}] /Border [0 0 0] /A << /S /URI /URI (${safeUri}) >> >>`);
            });
            const annotsEntry = annotIds.length > 0 ? `/Annots [${annotIds.map(id => `${id} 0 R`).join(" ")}]` : "";
            const pageObjId = addObj(
                `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${PAGE_WIDTH.toFixed(2)} ${PAGE_HEIGHT.toFixed(2)}] ` +
                `/Resources << /Font << /F1 ${f1Id} 0 R /F2 ${f2Id} 0 R /F3 ${f3Id} 0 R >> >> ${annotsEntry} /Contents ${contentId} 0 R >>`
            );
            pageIds.push(pageObjId);
        });

        objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
        objects[pagesId - 1] = `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map(id => `${id} 0 R`).join(" ")}] >>`;

        const encoder = new TextEncoder();
        const chunks = [];
        let byteOffset = 0;
        const pushStr = (s) => { const b = encoder.encode(s); chunks.push(b); byteOffset += b.length; };

        pushStr("%PDF-1.4\n%\x25\x25\n");
        const offsets = [0];
        objects.forEach((body, idx) => {
            offsets.push(byteOffset);
            pushStr(`${idx + 1} 0 obj\n${body}\nendobj\n`);
        });

        const xrefOffset = byteOffset;
        pushStr(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
        for (let i = 1; i <= objects.length; i++) {
            pushStr(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
        }
        pushStr(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

        return new Blob(chunks, { type: "application/pdf" });
    }

    function triggerPdfDownload() {
        const nameInput = document.getElementById("inputName");
        const name = nameInput?.value.trim() || "";
        if (!name) {
            goToStep(0);
            switchMobileView("edit");
            nameInput?.focus();
            showToast("Please enter your Full Name in Step 1 before downloading.", "warn");
            return;
        }

        scheduleSaveResumeData(true);

        try {
            const pdfBlob = generateResumePdfBlob();
            const safeBase = name.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") || "Resume";
            const fileName = `${safeBase}_Resume.pdf`;
            const blobUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            window.setTimeout(() => {
                link.remove();
                URL.revokeObjectURL(blobUrl);
            }, 10000);

            showToast(`Downloaded ${fileName}`, "success");

            if (!hasDismissedPostDownloadPromo && postDownloadModal) {
                window.setTimeout(() => {
                    if (!hasDismissedPostDownloadPromo) {
                        openModal(postDownloadModal);
                    }
                }, 280);
            }
        } catch (err) {
            console.error("PDF export failed:", err);
            showToast("Unable to generate PDF. Please inspect your inputs.", "error");
        }
    }

    downloadBtn?.addEventListener("click", triggerPdfDownload);
    previewDownloadBtn?.addEventListener("click", triggerPdfDownload);

    // --- AUTO-UPPERCASE FULL NAME ONLY (CURSOR-SAFE) ---
    inputNameField?.addEventListener("input", () => {
        const current = inputNameField.value;
        const upper = current.toUpperCase();
        if (current !== upper) {
            const start = inputNameField.selectionStart;
            const end = inputNameField.selectionEnd;
            inputNameField.value = upper;
            if (typeof start === "number" && typeof end === "number") {
                try {
                    inputNameField.setSelectionRange(start, end);
                } catch (e) {}
            }
        }
    });

    // --- FORM INPUT CHANGE HANDLER ---
    let previewFrame = 0;
    function schedulePreview() {
        cancelAnimationFrame(previewFrame);
        previewFrame = requestAnimationFrame(updatePreview);
    }

    function onFormChanged() {
        updateSummaryWordCount();
        schedulePreview();
        updateStepIndicators();
        scheduleSaveResumeData();
    }

    resumeForm?.addEventListener("submit", (e) => e.preventDefault());
    resumeForm?.addEventListener("input", onFormChanged);
    resumeForm?.addEventListener("change", onFormChanged);
    resumeForm?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.id !== "softSkillsInput") {
            e.preventDefault();
        }
    });

    // --- BOOT & LEGACY MIGRATION ---
    renderSoftPresetChips();

    try {
        const rawStore = localStorage.getItem(DRAFTS_STORE_KEY);
        if (rawStore) {
            const parsed = JSON.parse(rawStore);
            if (Array.isArray(parsed)) {
                draftsStore = parsed.filter(d => d && typeof d.id === "string" && d.data && typeof d.data === "object");
            }
        }
        activeDraftId = localStorage.getItem(ACTIVE_DRAFT_KEY);
    } catch (e) {
        draftsStore = [];
    }

    if (draftsStore.length === 0) {
        let legacyData = {};
        try {
            const legacyRaw = localStorage.getItem(LEGACY_DRAFT_KEY);
            if (legacyRaw) legacyData = JSON.parse(legacyRaw) || {};
        } catch (e) {}
        const initialDraft = {
            id: makeDraftId(),
            name: legacyData.inputName?.trim() ? `${legacyData.inputName.trim()} Resume` : "Untitled Draft",
            updatedAt: Date.now(),
            data: legacyData
        };
        draftsStore.push(initialDraft);
        activeDraftId = initialDraft.id;
    }

    const activeDraft = draftsStore.find(d => d.id === activeDraftId) || draftsStore[0];
    activeDraftId = activeDraft.id;
    updateActiveDraftHeaderTitle();
    try {
        hydrateFormFromData(activeDraft.data);
    } catch (err) {
        console.error("Draft hydration failed, starting blank:", err);
        hydrateFormFromData({});
    }
    setSaveStatus("saved", "Saved");

    // Always open on the Home / Landing View first
    showLandingView();
    goToStep(0);
});
