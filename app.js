/* ================================================================
   CozySpace - Complete JavaScript Application
   ================================================================ */

class CozySpace {
  constructor() {
    this.currentUser = null;
    this.currentWidget = "todos";
    this.todos = [];
    this.notes = "";
    this.links = [];
    this.events = [];
    this.timerState = {
      timeLeft: 25 * 60, // 25 minutes in seconds
      isRunning: false,
      mode: "focus", // 'focus', 'break'
      session: 1,
      settings: {
        focusDuration: 25,
        breakDuration: 5,
        ambientSound: false,
        notifications: true,
        autoStartBreaks: false,
      },
    };
    this.ambientPlayer = {
      currentSound: null,
      audio: null,
      volume: 50,
      isPlaying: false,
    };
    this.stats = {
      sessionsToday: 0,
      tasksCompleted: 0,
      currentStreak: 0,
      totalFocusTime: 0,
    };

    this.init();
  }

  // Initialize the application
  init() {
    this.loadUserData();
    this.setupEventListeners();
    this.showPageLoader();

    // Simulate loading time
    setTimeout(() => {
      this.hidePageLoader();
      if (this.currentUser) {
        this.showApp();
      } else {
        this.showAuth();
      }
    }, 2000);
  }

  // Page loader methods
  showPageLoader() {
    const loader = document.getElementById("page-loader");
    if (loader) {
      loader.classList.remove("hidden");
    }
  }

  hidePageLoader() {
    const loader = document.getElementById("page-loader");
    if (loader) {
      loader.classList.add("hidden");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }

  // Authentication methods
  showAuth() {
    document.getElementById("auth-container").style.display = "flex";
    document.getElementById("app-container").classList.remove("show");
  }

  showApp() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("app-container").classList.add("show");
    document.getElementById("app-container").style.display = "block";
    this.updateUserInterface();
    this.loadAllData();
    this.showWidget(this.currentWidget);
  }

  login(email, password) {
    // Demo login or simple validation
    if (email === "demo@cozyspace.com" && password === "demo123") {
      this.currentUser = {
        name: "Demo User",
        email: "demo@cozyspace.com",
        avatar: "👤",
        bio: "Welcome to CozySpace!",
        timezone: "auto",
      };
    } else if (email && password) {
      this.currentUser = {
        name: email.split("@")[0],
        email: email,
        avatar: "👤",
        bio: "",
        timezone: "auto",
      };
    } else {
      this.showNotification("Please enter valid credentials", "error");
      return false;
    }

    this.saveUserData();
    this.showApp();
    this.showNotification("Welcome to CozySpace!", "success");
    return true;
  }

  register(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
      this.showNotification("Passwords do not match", "error");
      return false;
    }

    if (!name || !email || !password) {
      this.showNotification("Please fill in all fields", "error");
      return false;
    }

    this.currentUser = {
      name: name,
      email: email,
      avatar: "👤",
      bio: "",
      timezone: "auto",
    };

    this.showProfileSetup();
    return true;
  }

  showProfileSetup() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("profile-setup-form").style.display = "block";
  }

  completeProfileSetup(avatar, bio, timezone) {
    if (this.currentUser) {
      this.currentUser.avatar = avatar;
      this.currentUser.bio = bio;
      this.currentUser.timezone = timezone;
    }

    this.saveUserData();
    this.showApp();
    this.showNotification("Profile setup complete!", "success");
  }

  logout() {
    this.currentUser = null;
    this.saveUserData();
    this.showAuth();
    this.showNotification("Logged out successfully", "success");
  }

  // Setup event listeners
  setupEventListeners() {
    this.setupAuthListeners();
    this.setupNavigationListeners();
    this.setupUserMenuListeners();
    this.setupTodoListeners();
    this.setupTimerListeners();
    this.setupNotesListeners();
    this.setupAmbientListeners();
    this.setupLinksListeners();
    this.setupCalendarListeners();
    this.setupModalListeners();
    this.setupThemeListener();
    this.setupSidebarToggle();
  }

  setupAuthListeners() {
    // Login form
    const loginForm = document.getElementById("login-form-element");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        this.login(email, password);
      });
    }

    // Register form
    const registerForm = document.getElementById("register-form-element");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById(
          "register-password-confirm"
        ).value;
        this.register(name, email, password, confirmPassword);
      });
    }

    // Profile setup form
    const profileSetupForm = document.getElementById(
      "profile-setup-form-element"
    );
    if (profileSetupForm) {
      profileSetupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const avatar = document.querySelector(".avatar-option.active").dataset
          .avatar;
        const bio = document.getElementById("profile-bio").value;
        const timezone = document.getElementById("profile-timezone").value;
        this.completeProfileSetup(avatar, bio, timezone);
      });
    }

    // Avatar selection
    document.querySelectorAll(".avatar-option").forEach((option) => {
      option.addEventListener("click", () => {
        document
          .querySelectorAll(".avatar-option")
          .forEach((opt) => opt.classList.remove("active"));
        option.classList.add("active");
      });
    });

    // Toggle between login and register
    const showRegister = document.getElementById("show-register");
    const showLogin = document.getElementById("show-login");

    if (showRegister) {
      showRegister.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("login-form").style.display = "none";
        document.getElementById("register-form").style.display = "block";
      });
    }

    if (showLogin) {
      showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
      });
    }
  }

  setupNavigationListeners() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const widget = link.dataset.widget;
        if (widget) {
          this.showWidget(widget);
          this.updateNavigation(widget);
        }
      });
    });
  }

  setupUserMenuListeners() {
    const userAvatar = document.getElementById("user-avatar");
    const userMenu = document.getElementById("user-menu");
    const logoutBtn = document.getElementById("logout-btn");
    const profileSettings = document.getElementById("profile-settings");
    const exportData = document.getElementById("export-data");
    const importData = document.getElementById("import-data");
    const resetProfile = document.getElementById("reset-profile");

    if (userAvatar) {
      userAvatar.addEventListener("click", () => {
        userMenu.classList.toggle("show");
      });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!userAvatar.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove("show");
      }
    });

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => this.logout());
    }

    if (profileSettings) {
      profileSettings.addEventListener("click", () => this.showProfileModal());
    }

    if (exportData) {
      exportData.addEventListener("click", () => this.exportUserData());
    }

    if (importData) {
      importData.addEventListener("click", () => this.importUserData());
    }

    if (resetProfile) {
      resetProfile.addEventListener("click", () => this.resetProfile());
    }
  }

  setupTodoListeners() {
    const addTodoBtn = document.getElementById("add-todo-btn");
    const saveTodoBtn = document.getElementById("save-todo");
    const cancelTodoBtn = document.getElementById("cancel-todo");
    const todoInput = document.getElementById("todo-input");

    if (addTodoBtn) {
      addTodoBtn.addEventListener("click", () => this.showAddTodoForm());
    }

    if (saveTodoBtn) {
      saveTodoBtn.addEventListener("click", () => this.saveTodo());
    }

    if (cancelTodoBtn) {
      cancelTodoBtn.addEventListener("click", () => this.hideAddTodoForm());
    }

    if (todoInput) {
      todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.saveTodo();
        }
      });
    }
  }

  setupTimerListeners() {
    const startBtn = document.getElementById("timer-start");
    const pauseBtn = document.getElementById("timer-pause");
    const resetBtn = document.getElementById("timer-reset");
    const focusDurationSlider = document.getElementById("focus-duration");
    const breakDurationSlider = document.getElementById("break-duration");

    if (startBtn) {
      startBtn.addEventListener("click", () => this.startTimer());
    }

    if (pauseBtn) {
      pauseBtn.addEventListener("click", () => this.pauseTimer());
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => this.resetTimer());
    }

    if (focusDurationSlider) {
      focusDurationSlider.addEventListener("input", (e) => {
        const value = e.target.value;
        document.getElementById("focus-duration-value").textContent = value;
        this.timerState.settings.focusDuration = parseInt(value);
        if (!this.timerState.isRunning && this.timerState.mode === "focus") {
          this.timerState.timeLeft = value * 60;
          this.updateTimerDisplay();
        }
        this.saveUserData();
      });
    }

    if (breakDurationSlider) {
      breakDurationSlider.addEventListener("input", (e) => {
        const value = e.target.value;
        document.getElementById("break-duration-value").textContent = value;
        this.timerState.settings.breakDuration = parseInt(value);
        this.saveUserData();
      });
    }

    // Timer settings checkboxes
    const ambientToggle = document.getElementById("ambient-sound-toggle");
    const notificationsToggle = document.getElementById("notifications-toggle");
    const autoStartToggle = document.getElementById("auto-start-breaks");

    if (ambientToggle) {
      ambientToggle.addEventListener("change", (e) => {
        this.timerState.settings.ambientSound = e.target.checked;
        this.saveUserData();
      });
    }

    if (notificationsToggle) {
      notificationsToggle.addEventListener("change", (e) => {
        this.timerState.settings.notifications = e.target.checked;
        this.saveUserData();
      });
    }

    if (autoStartToggle) {
      autoStartToggle.addEventListener("change", (e) => {
        this.timerState.settings.autoStartBreaks = e.target.checked;
        this.saveUserData();
      });
    }
  }

  setupNotesListeners() {
    const notesTextarea = document.getElementById("notes-textarea");
    const boldBtn = document.getElementById("bold-btn");
    const italicBtn = document.getElementById("italic-btn");
    const clearBtn = document.getElementById("clear-btn");
    const exportBtn = document.getElementById("export-btn");

    if (notesTextarea) {
      notesTextarea.addEventListener("input", () => {
        this.notes = notesTextarea.value;
        this.updateWordCount();
        this.saveUserData();
        this.showSaveStatus("saving");

        // Auto-save after 1 second of no typing
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(() => {
          this.showSaveStatus("saved");
        }, 1000);
      });

      notesTextarea.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "b") {
          e.preventDefault();
          this.formatText("bold");
        } else if (e.ctrlKey && e.key === "i") {
          e.preventDefault();
          this.formatText("italic");
        }
      });
    }

    if (boldBtn) {
      boldBtn.addEventListener("click", () => this.formatText("bold"));
    }

    if (italicBtn) {
      italicBtn.addEventListener("click", () => this.formatText("italic"));
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearNotes());
    }

    if (exportBtn) {
      exportBtn.addEventListener("click", () => this.exportNotes());
    }
  }

  setupAmbientListeners() {
    const soundCards = document.querySelectorAll(".sound-card");
    const playBtn = document.getElementById("play-btn");
    const stopBtn = document.getElementById("stop-btn");
    const volumeSlider = document.getElementById("volume-slider");

    soundCards.forEach((card) => {
      card.addEventListener("click", () => {
        const sound = card.dataset.sound;
        this.selectAmbientSound(sound);
      });
    });

    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (this.ambientPlayer.isPlaying) {
          this.pauseAmbientSound();
        } else {
          this.playAmbientSound();
        }
      });
    }

    if (stopBtn) {
      stopBtn.addEventListener("click", () => this.stopAmbientSound());
    }

    if (volumeSlider) {
      volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value;
        this.setAmbientVolume(volume);
      });
    }
  }

  setupLinksListeners() {
    const addLinkBtn = document.getElementById("add-link-btn");
    const saveLinkBtn = document.getElementById("save-link");
    const cancelLinkBtn = document.getElementById("cancel-link");

    if (addLinkBtn) {
      addLinkBtn.addEventListener("click", () => this.showAddLinkForm());
    }

    if (saveLinkBtn) {
      saveLinkBtn.addEventListener("click", () => this.saveLink());
    }

    if (cancelLinkBtn) {
      cancelLinkBtn.addEventListener("click", () => this.hideAddLinkForm());
    }
  }

  setupCalendarListeners() {
    const prevMonth = document.getElementById("prev-month");
    const nextMonth = document.getElementById("next-month");
    const addEventBtn = document.getElementById("add-event-btn");

    if (prevMonth) {
      prevMonth.addEventListener("click", () => this.navigateMonth(-1));
    }

    if (nextMonth) {
      nextMonth.addEventListener("click", () => this.navigateMonth(1));
    }

    if (addEventBtn) {
      addEventBtn.addEventListener("click", () => this.showEventModal());
    }
  }

  setupModalListeners() {
    const eventModal = document.getElementById("event-modal");
    const profileModal = document.getElementById("profile-modal");
    const closeEventModal = document.getElementById("close-event-modal");
    const closeProfileModal = document.getElementById("close-profile-modal");
    const saveEvent = document.getElementById("save-event");
    const cancelEvent = document.getElementById("cancel-event");
    const saveProfile = document.getElementById("save-profile");
    const cancelProfile = document.getElementById("cancel-profile");

    if (closeEventModal) {
      closeEventModal.addEventListener("click", () => this.hideEventModal());
    }

    if (closeProfileModal) {
      closeProfileModal.addEventListener("click", () =>
        this.hideProfileModal()
      );
    }

    if (saveEvent) {
      saveEvent.addEventListener("click", () => this.saveEvent());
    }

    if (cancelEvent) {
      cancelEvent.addEventListener("click", () => this.hideEventModal());
    }

    if (saveProfile) {
      saveProfile.addEventListener("click", () => this.saveProfileSettings());
    }

    if (cancelProfile) {
      cancelProfile.addEventListener("click", () => this.hideProfileModal());
    }

    // Close modals when clicking overlay
    [eventModal, profileModal].forEach((modal) => {
      if (modal) {
        modal.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
          }
        });
      }
    });
  }

  setupThemeListener() {
    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) {
      themeSelect.addEventListener("change", (e) => {
        this.changeTheme(e.target.value);
      });
    }
  }

  setupSidebarToggle() {
    const sidebarToggle = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");

    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
  }

  // Navigation methods
  showWidget(widgetName) {
    // Hide all widgets
    document.querySelectorAll(".widget").forEach((widget) => {
      widget.style.display = "none";
    });

    // Show selected widget
    const selectedWidget = document.getElementById(widgetName);
    if (selectedWidget) {
      selectedWidget.style.display = "block";
    }

    this.currentWidget = widgetName;

    // Widget-specific initialization
    if (widgetName === "calendar") {
      this.initializeCalendar();
    } else if (widgetName === "timer") {
      this.updateTimerDisplay();
    }
  }

  updateNavigation(activeWidget) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    const activeLink = document.querySelector(
      `[data-widget="${activeWidget}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // User interface methods
  updateUserInterface() {
    if (this.currentUser) {
      // Update user avatar and name
      const avatars = document.querySelectorAll(
        "#user-avatar, #welcome-avatar"
      );
      avatars.forEach((avatar) => {
        avatar.textContent = this.currentUser.avatar;
      });

      // Update user name displays
      document.getElementById("user-display-name").textContent =
        this.currentUser.name;
      document.getElementById("user-display-email").textContent =
        this.currentUser.email;
      document.getElementById("welcome-name").textContent =
        this.currentUser.name;

      // Update greeting based on time
      this.updateGreeting();

      // Update stats
      this.updateStats();
    }
  }

  updateGreeting() {
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
      greeting = "Good morning!";
    } else if (hour < 18) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }

    const greetingElement = document.getElementById("welcome-greeting");
    if (greetingElement) {
      greetingElement.textContent = greeting;
    }
  }

  updateStats() {
    // Update sidebar stats
    document.getElementById("sidebar-sessions").textContent =
      this.stats.sessionsToday;
    document.getElementById("sidebar-tasks").textContent =
      this.stats.tasksCompleted;
    document.getElementById("sidebar-streak").textContent =
      this.stats.currentStreak;

    // Update timer stats
    document.getElementById("sessions-count").textContent =
      this.stats.sessionsToday;
    document.getElementById("total-time").textContent =
      Math.floor(this.stats.totalFocusTime / 60) + "h";
    document.getElementById("streak-count").textContent =
      this.stats.currentStreak;

    // Update todo badge
    const incompleteTodos = this.todos.filter((todo) => !todo.completed).length;
    document.getElementById("todos-badge").textContent = incompleteTodos;
  }

  // Todo methods
  showAddTodoForm() {
    document.getElementById("add-todo-form").style.display = "block";
    document.getElementById("todo-input").focus();
  }

  hideAddTodoForm() {
    document.getElementById("add-todo-form").style.display = "none";
    document.getElementById("todo-input").value = "";
  }

  saveTodo() {
    const input = document.getElementById("todo-input");
    const text = input.value.trim();

    if (!text) {
      this.showNotification("Please enter a task", "error");
      return;
    }

    const todo = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: new Date(),
    };

    this.todos.unshift(todo);
    this.renderTodos();
    this.hideAddTodoForm();
    this.saveUserData();
    this.updateStats();
    this.showNotification("Task added successfully!", "success");
  }

  toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      if (todo.completed) {
        this.stats.tasksCompleted++;
        this.showNotification("Task completed!", "success");
      } else {
        this.stats.tasksCompleted = Math.max(0, this.stats.tasksCompleted - 1);
      }
      this.renderTodos();
      this.saveUserData();
      this.updateStats();
    }
  }

  deleteTodo(id) {
    const todoIndex = this.todos.findIndex((t) => t.id === id);
    if (todoIndex > -1) {
      const todo = this.todos[todoIndex];
      if (todo.completed) {
        this.stats.tasksCompleted = Math.max(0, this.stats.tasksCompleted - 1);
      }
      this.todos.splice(todoIndex, 1);
      this.renderTodos();
      this.saveUserData();
      this.updateStats();
      this.showNotification("Task deleted", "success");
    }
  }

  renderTodos() {
    const todosList = document.getElementById("todos-list");
    const todosEmpty = document.getElementById("todos-empty");

    if (this.todos.length === 0) {
      todosEmpty.style.display = "flex";
      todosList.style.display = "none";
    } else {
      todosEmpty.style.display = "none";
      todosList.style.display = "block";

      todosList.innerHTML = this.todos
        .map(
          (todo) => `
        <li class="todo-item ${todo.completed ? "completed" : ""}">
          <input 
            type="checkbox" 
            class="todo-checkbox" 
            ${todo.completed ? "checked" : ""} 
            onchange="app.toggleTodo(${todo.id})"
          >
          <span class="todo-text">${this.escapeHtml(todo.text)}</span>
          <button class="todo-delete" onclick="app.deleteTodo(${
            todo.id
          })" title="Delete task">
            ×
          </button>
        </li>
      `
        )
        .join("");
    }
  }

  // Timer methods
  startTimer() {
    if (!this.timerState.isRunning) {
      this.timerState.isRunning = true;
      this.timerInterval = setInterval(() => {
        this.timerState.timeLeft--;
        this.updateTimerDisplay();

        if (this.timerState.timeLeft <= 0) {
          this.timerComplete();
        }
      }, 1000);

      document.getElementById("timer-start").style.display = "none";
      document.getElementById("timer-pause").style.display = "inline-flex";

      // Start ambient sound if enabled
      if (
        this.timerState.settings.ambientSound &&
        this.ambientPlayer.currentSound
      ) {
        this.playAmbientSound();
      }
    }
  }

  pauseTimer() {
    if (this.timerState.isRunning) {
      this.timerState.isRunning = false;
      clearInterval(this.timerInterval);

      document.getElementById("timer-start").style.display = "inline-flex";
      document.getElementById("timer-pause").style.display = "none";

      // Stop ambient sound
      this.stopAmbientSound();
    }
  }

  resetTimer() {
    this.pauseTimer();

    if (this.timerState.mode === "focus") {
      this.timerState.timeLeft = this.timerState.settings.focusDuration * 60;
    } else {
      this.timerState.timeLeft = this.timerState.settings.breakDuration * 60;
    }

    this.updateTimerDisplay();
  }

  timerComplete() {
    this.pauseTimer();

    if (this.timerState.mode === "focus") {
      this.stats.sessionsToday++;
      this.stats.totalFocusTime += this.timerState.settings.focusDuration;
      this.stats.currentStreak++;

      this.showNotification(
        "Focus session complete! Time for a break.",
        "success"
      );

      if (this.timerState.settings.notifications) {
        this.showDesktopNotification(
          "Focus Complete!",
          "Great work! Time for a break."
        );
      }

      // Switch to break mode
      this.timerState.mode = "break";
      this.timerState.timeLeft = this.timerState.settings.breakDuration * 60;
      document.getElementById("timer-mode-text").textContent = "Break Time";

      // Auto-start break if enabled
      if (this.timerState.settings.autoStartBreaks) {
        setTimeout(() => this.startTimer(), 2000);
      }
    } else {
      this.showNotification(
        "Break complete! Ready for another focus session?",
        "success"
      );

      if (this.timerState.settings.notifications) {
        this.showDesktopNotification(
          "Break Complete!",
          "Ready for another focus session?"
        );
      }

      // Switch back to focus mode
      this.timerState.mode = "focus";
      this.timerState.session++;
      this.timerState.timeLeft = this.timerState.settings.focusDuration * 60;
      document.getElementById("timer-mode-text").textContent = "Focus Time";
    }

    this.updateTimerDisplay();
    this.updateStats();
    this.saveUserData();
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerState.timeLeft / 60);
    const seconds = this.timerState.timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    document.getElementById("timer-time").textContent = timeString;
    document.getElementById(
      "timer-session-info"
    ).textContent = `Session ${this.timerState.session}`;

    // Update progress circle
    const totalTime =
      this.timerState.mode === "focus"
        ? this.timerState.settings.focusDuration * 60
        : this.timerState.settings.breakDuration * 60;
    const progress = (totalTime - this.timerState.timeLeft) / totalTime;
    const circumference = 2 * Math.PI * 120; // radius = 120
    const strokeDashoffset = circumference - progress * circumference;

    const progressCircle = document.getElementById("timer-progress");
    if (progressCircle) {
      progressCircle.style.strokeDashoffset = strokeDashoffset;
    }
  }

  // Notes methods
  updateWordCount() {
    const wordCount =
      this.notes.trim() === "" ? 0 : this.notes.trim().split(/\s+/).length;
    document.getElementById("word-count").textContent = `${wordCount} words`;
  }

  showSaveStatus(status) {
    const saveStatus = document.getElementById("save-status");
    saveStatus.className = `save-status ${status}`;
    saveStatus.textContent = status === "saving" ? "Saving..." : "Saved";
  }

  formatText(format) {
    const textarea = document.getElementById("notes-textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      let formattedText;
      if (format === "bold") {
        formattedText = `**${selectedText}**`;
      } else if (format === "italic") {
        formattedText = `*${selectedText}*`;
      }

      textarea.value =
        textarea.value.substring(0, start) +
        formattedText +
        textarea.value.substring(end);
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length
      );
    }
  }

  clearNotes() {
    if (confirm("Are you sure you want to clear all notes?")) {
      document.getElementById("notes-textarea").value = "";
      this.notes = "";
      this.updateWordCount();
      this.saveUserData();
      this.showNotification("Notes cleared", "success");
    }
  }

  exportNotes() {
    const blob = new Blob([this.notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CozySpace_Notes_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showNotification("Notes exported successfully!", "success");
  }

  // Ambient sound methods
  selectAmbientSound(soundName) {
    // Remove active class from all sound cards
    document.querySelectorAll(".sound-card").forEach((card) => {
      card.classList.remove("active");
    });

    // Add active class to selected card
    const selectedCard = document.querySelector(`[data-sound="${soundName}"]`);
    if (selectedCard) {
      selectedCard.classList.add("active");
    }

    this.ambientPlayer.currentSound = soundName;
    this.updateAmbientStatus(`${soundName} selected`);
  }

  playAmbientSound() {
    if (!this.ambientPlayer.currentSound) {
      this.showNotification("Please select a sound first", "warning");
      return;
    }

    if (this.ambientPlayer.isPlaying) {
      this.pauseAmbientSound();
      return;
    }

    // Freesound.org direct download links (working URLs)
    const soundUrls = {
      rain: "https://freesound.org/data/previews/523/523538_11861866-lq.mp3",
      forest: "https://freesound.org/data/previews/416/416710_5121236-lq.mp3",
      waves: "https://freesound.org/data/previews/233/233156_1648170-lq.mp3",
      fireplace: "https://freesound.org/data/previews/320/320885_527080-lq.mp3",
      cafe: "https://freesound.org/data/previews/521/521571_11651468-lq.mp3",
      wind: "https://freesound.org/data/previews/442/442037_1969318-lq.mp3",
    };

    // Create or reuse audio element
    if (!this.ambientPlayer.audio) {
      this.ambientPlayer.audio = new Audio();
      this.ambientPlayer.audio.loop = true;

      // Add event listeners
      this.ambientPlayer.audio.addEventListener("ended", () => {
        if (this.ambientPlayer.audio.loop) {
          this.ambientPlayer.audio.play();
        }
      });

      this.ambientPlayer.audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        this.showNotification(
          "Could not load audio. Using alternative...",
          "warning"
        );
        // Fallback: Use a data URL white noise generator
        this.playWhiteNoise();
      });
    }

    // Stop current if playing
    if (!this.ambientPlayer.audio.paused) {
      this.ambientPlayer.audio.pause();
    }

    // Set new source
    this.ambientPlayer.audio.src = soundUrls[this.ambientPlayer.currentSound];
    this.ambientPlayer.audio.volume = this.ambientPlayer.volume / 100;
    this.ambientPlayer.audio.currentTime = 0;

    // Try to play
    this.ambientPlayer.audio
      .play()
      .then(() => {
        this.ambientPlayer.isPlaying = true;
        this.updateAmbientStatus(`Playing ${this.ambientPlayer.currentSound}`);
        document.getElementById("play-icon").textContent = "⏸️";
        document.getElementById("play-text").textContent = "Pause";
        this.showNotification(
          `Playing ${this.ambientPlayer.currentSound} sounds`,
          "success"
        );
      })
      .catch((error) => {
        console.error("Playback error:", error);
        // Auto-play might be blocked, show user instruction
        this.showNotification(
          "Click anywhere on the page first, then try Play again",
          "info"
        );
      });
  }

  // Add this new method for fallback white noise
  playWhiteNoise() {
    if (!this.ambientPlayer.audioContext) {
      this.ambientPlayer.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const bufferSize = 2 * this.ambientPlayer.audioContext.sampleRate;
    const noiseBuffer = this.ambientPlayer.audioContext.createBuffer(
      1,
      bufferSize,
      this.ambientPlayer.audioContext.sampleRate
    );
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ambientPlayer.audioContext.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const gainNode = this.ambientPlayer.audioContext.createGain();
    gainNode.gain.value = (this.ambientPlayer.volume / 100) * 0.05;

    whiteNoise.connect(gainNode);
    gainNode.connect(this.ambientPlayer.audioContext.destination);
    whiteNoise.start(0);

    this.ambientPlayer.whiteNoise = whiteNoise;
    this.ambientPlayer.gainNode = gainNode;
    this.ambientPlayer.isPlaying = true;

    this.updateAmbientStatus(
      `Playing ${this.ambientPlayer.currentSound} (ambient)`
    );
    document.getElementById("play-icon").textContent = "⏸️";
    document.getElementById("play-text").textContent = "Pause";
  }

  pauseAmbientSound() {
    // Stop regular audio
    if (this.ambientPlayer.audio && !this.ambientPlayer.audio.paused) {
      this.ambientPlayer.audio.pause();
    }

    // Stop white noise if active
    if (this.ambientPlayer.whiteNoise) {
      this.ambientPlayer.whiteNoise.stop();
      this.ambientPlayer.whiteNoise = null;
    }

    this.ambientPlayer.isPlaying = false;
    this.updateAmbientStatus("Paused");
    document.getElementById("play-icon").textContent = "▶️";
    document.getElementById("play-text").textContent = "Play";
  }

  stopAmbientSound() {
    // Stop regular audio
    if (this.ambientPlayer.audio) {
      this.ambientPlayer.audio.pause();
      this.ambientPlayer.audio.currentTime = 0;
    }

    // Stop white noise if active
    if (this.ambientPlayer.whiteNoise) {
      this.ambientPlayer.whiteNoise.stop();
      this.ambientPlayer.whiteNoise = null;
    }

    // Close audio context
    if (
      this.ambientPlayer.audioContext &&
      this.ambientPlayer.audioContext.state !== "closed"
    ) {
      this.ambientPlayer.audioContext.close().then(() => {
        this.ambientPlayer.audioContext = null;
      });
    }

    this.ambientPlayer.isPlaying = false;
    this.updateAmbientStatus("Ready");
    document.getElementById("play-icon").textContent = "▶️";
    document.getElementById("play-text").textContent = "Play";
  }

  selectAmbientSound(soundName) {
    // Remove active class from all sound cards
    document.querySelectorAll(".sound-card").forEach((card) => {
      card.classList.remove("active");
    });

    // Add active class to selected card
    const selectedCard = document.querySelector(`[data-sound="${soundName}"]`);
    if (selectedCard) {
      selectedCard.classList.add("active");
    }

    // Stop current sound if playing
    if (this.ambientPlayer.isPlaying) {
      this.stopAmbientSound();
    }

    this.ambientPlayer.currentSound = soundName;
    this.updateAmbientStatus(`${soundName} selected - Click Play to start`);
    this.showNotification(`${soundName} selected`, "success");
  }

  updateAmbientStatus(status) {
    const statusText = document.querySelector(".ambient-status .status-text");
    if (statusText) {
      statusText.textContent = status;
    }
  }

  // Links methods
  showAddLinkForm() {
    document.getElementById("add-link-form").style.display = "block";
    document.getElementById("link-title").focus();
  }

  hideAddLinkForm() {
    document.getElementById("add-link-form").style.display = "none";
    document.getElementById("link-title").value = "";
    document.getElementById("link-url").value = "";
  }

  saveLink() {
    const title = document.getElementById("link-title").value.trim();
    const url = document.getElementById("link-url").value.trim();

    if (!title || !url) {
      this.showNotification("Please enter both title and URL", "error");
      return;
    }

    if (!this.isValidUrl(url)) {
      this.showNotification("Please enter a valid URL", "error");
      return;
    }

    const link = {
      id: Date.now(),
      title: title,
      url: url,
      icon: this.getLinkIcon(url),
      createdAt: new Date(),
    };

    this.links.unshift(link);
    this.renderLinks();
    this.hideAddLinkForm();
    this.saveUserData();
    this.showNotification("Link added successfully!", "success");
  }

  deleteLink(id) {
    const linkIndex = this.links.findIndex((l) => l.id === id);
    if (linkIndex > -1) {
      this.links.splice(linkIndex, 1);
      this.renderLinks();
      this.saveUserData();
      this.showNotification("Link deleted", "success");
    }
  }

  renderLinks() {
    const linksGrid = document.getElementById("links-grid");
    const linksEmpty = document.getElementById("links-empty");

    if (this.links.length === 0) {
      linksEmpty.style.display = "flex";
      linksGrid.style.display = "none";
    } else {
      linksEmpty.style.display = "none";
      linksGrid.style.display = "grid";

      linksGrid.innerHTML = this.links
        .map(
          (link) => `
        <div class="link-card-wrapper">
          <a href="${this.escapeHtml(
            link.url
          )}" target="_blank" class="link-card">
            <div class="link-icon">${link.icon}</div>
            <div class="link-info">
              <h3>${this.escapeHtml(link.title)}</h3>
              <p>${this.getDomain(link.url)}</p>
            </div>
          </a>
          <button class="link-delete" onclick="app.deleteLink(${
            link.id
          })" title="Delete link">
            ×
          </button>
        </div>
      `
        )
        .join("");
    }
  }

  getLinkIcon(url) {
    const domain = this.getDomain(url).toLowerCase();

    const iconMap = {
      "github.com": "🐙",
      "youtube.com": "📺",
      "google.com": "🔍",
      "twitter.com": "🐦",
      "facebook.com": "📘",
      "linkedin.com": "💼",
      "instagram.com": "📷",
      "reddit.com": "🤖",
      "stackoverflow.com": "💻",
      "medium.com": "📝",
      "gmail.com": "📧",
    };

    return iconMap[domain] || "🔗";
  }

  getDomain(url) {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  // Calendar methods
  initializeCalendar() {
    this.currentDate = new Date();
    this.renderCalendar();
  }

  navigateMonth(direction) {
    this.currentDate.setMonth(this.currentDate.getMonth() + direction);
    this.renderCalendar();
  }

  renderCalendar() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const currentMonthElement = document.getElementById("current-month");
    if (currentMonthElement) {
      currentMonthElement.textContent = `${
        monthNames[this.currentDate.getMonth()]
      } ${this.currentDate.getFullYear()}`;
    }

    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const calendarGrid = document.getElementById("calendar-grid");
    if (calendarGrid) {
      let calendarHTML = '<div class="calendar-days">';

      dayNames.forEach((day) => {
        calendarHTML += `<div class="calendar-day-name">${day}</div>`;
      });

      for (let i = 0; i < firstDayOfWeek; i++) {
        calendarHTML += '<div class="calendar-day empty"></div>';
      }

      const today = new Date();
      const isCurrentMonth =
        today.getMonth() === this.currentDate.getMonth() &&
        today.getFullYear() === this.currentDate.getFullYear();

      for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && day === today.getDate();
        const dayClass = isToday ? "calendar-day today" : "calendar-day";

        const dateStr = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          day
        )
          .toISOString()
          .split("T")[0];
        const hasEvents = this.events.some((event) => event.date === dateStr);

        calendarHTML += `
        <div class="${dayClass} ${hasEvents ? "has-events" : ""}">
          <span class="day-number">${day}</span>
          ${hasEvents ? '<span class="event-dot"></span>' : ""}
        </div>
      `;
      }

      calendarHTML += "</div>";
      calendarGrid.innerHTML = calendarHTML;
    }

    this.renderTodayEvents();
  }

  renderTodayEvents() {
    const eventsList = document.getElementById("events-list");
    const eventsEmpty = document.getElementById("events-empty");

    const today = new Date().toDateString();
    const todayEvents = this.events.filter(
      (event) => new Date(event.date).toDateString() === today
    );

    if (todayEvents.length === 0) {
      eventsEmpty.style.display = "flex";
      eventsList.style.display = "none";
    } else {
      eventsEmpty.style.display = "none";
      eventsList.style.display = "block";

      eventsList.innerHTML = todayEvents
        .map(
          (event) => `
        <div class="event-item" style="padding: 1rem; margin-bottom: 0.5rem; background: ${
          event.color
        }; border-radius: 0.75rem;">
          <h4 style="margin: 0 0 0.5rem 0;">${this.escapeHtml(event.title)}</h4>
          <p style="margin: 0; font-size: 0.875rem; opacity: 0.8;">
            ${event.startTime}${event.endTime ? ` - ${event.endTime}` : ""}
          </p>
          ${
            event.description
              ? `<p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">${this.escapeHtml(
                  event.description
                )}</p>`
              : ""
          }
        </div>
      `
        )
        .join("");
    }
  }

  // Modal methods
  showEventModal() {
    document.getElementById("event-modal").style.display = "flex";
    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("event-date").value = today;
  }

  hideEventModal() {
    document.getElementById("event-modal").style.display = "none";
    this.clearEventForm();
  }

  saveEvent() {
    const title = document.getElementById("event-title").value.trim();
    const date = document.getElementById("event-date").value;
    const startTime = document.getElementById("event-start-time").value;
    const endTime = document.getElementById("event-end-time").value;
    const description = document
      .getElementById("event-description")
      .value.trim();
    const color = document.querySelector(
      'input[name="event-color"]:checked'
    ).value;

    if (!title || !date || !startTime) {
      this.showNotification("Please fill in required fields", "error");
      return;
    }

    const event = {
      id: Date.now(),
      title: title,
      date: date,
      startTime: startTime,
      endTime: endTime,
      description: description,
      color: color,
      createdAt: new Date(),
    };

    this.events.push(event);
    this.hideEventModal();
    this.renderTodayEvents();
    this.saveUserData();
    this.showNotification("Event created successfully!", "success");
  }

  clearEventForm() {
    document.getElementById("event-title").value = "";
    document.getElementById("event-date").value = "";
    document.getElementById("event-start-time").value = "";
    document.getElementById("event-end-time").value = "";
    document.getElementById("event-description").value = "";
    document.querySelector('input[name="event-color"]').checked = true;
  }

  showProfileModal() {
    const modal = document.getElementById("profile-modal");
    modal.style.display = "flex";

    // Populate current values
    document.getElementById("profile-name").value = this.currentUser.name;
    document.getElementById("profile-bio-modal").value =
      this.currentUser.bio || "";
    document.getElementById("profile-timezone-modal").value =
      this.currentUser.timezone || "auto";

    // Set current avatar
    document
      .querySelectorAll("#modal-avatar-options .avatar-option")
      .forEach((option) => {
        option.classList.remove("active");
        if (option.dataset.avatar === this.currentUser.avatar) {
          option.classList.add("active");
        }
      });
  }

  hideProfileModal() {
    document.getElementById("profile-modal").style.display = "none";
  }

  saveProfileSettings() {
    const name = document.getElementById("profile-name").value.trim();
    const bio = document.getElementById("profile-bio-modal").value.trim();
    const timezone = document.getElementById("profile-timezone-modal").value;
    const avatar = document.querySelector(
      "#modal-avatar-options .avatar-option.active"
    ).dataset.avatar;

    if (!name) {
      this.showNotification("Name is required", "error");
      return;
    }

    this.currentUser.name = name;
    this.currentUser.bio = bio;
    this.currentUser.timezone = timezone;
    this.currentUser.avatar = avatar;

    this.updateUserInterface();
    this.hideProfileModal();
    this.saveUserData();
    this.showNotification("Profile updated successfully!", "success");
  }

  // Theme methods
  changeTheme(themeName) {
    document.body.className = `theme-${themeName}`;
    this.saveUserData();
  }

  // Data persistence methods
  saveUserData() {
    const userData = {
      currentUser: this.currentUser,
      todos: this.todos,
      notes: this.notes,
      links: this.links,
      events: this.events,
      timerState: this.timerState,
      stats: this.stats,
      theme: document.body.className,
    };

    try {
      const dataStr = JSON.stringify(userData);
      // In a real app, you'd save to a backend or localStorage
      // Using memory storage for Claude.ai environment
      this.userData = userData;
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  }

  loadUserData() {
    try {
      // In a real app, you'd load from backend or localStorage
      const userData = this.userData;

      if (userData) {
        this.currentUser = userData.currentUser;
        this.todos = userData.todos || [];
        this.notes = userData.notes || "";
        this.links = userData.links || [];
        this.events = userData.events || [];
        this.timerState = { ...this.timerState, ...userData.timerState };
        this.stats = { ...this.stats, ...userData.stats };

        if (userData.theme) {
          document.body.className = userData.theme;
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  loadAllData() {
    // Load notes
    const notesTextarea = document.getElementById("notes-textarea");
    if (notesTextarea) {
      notesTextarea.value = this.notes;
      this.updateWordCount();
    }

    // Load todos
    this.renderTodos();

    // Load links
    this.renderLinks();

    // Load timer settings
    this.loadTimerSettings();

    // Update empty states
    this.updateEmptyStates();
  }

  loadTimerSettings() {
    const focusSlider = document.getElementById("focus-duration");
    const breakSlider = document.getElementById("break-duration");
    const ambientToggle = document.getElementById("ambient-sound-toggle");
    const notificationsToggle = document.getElementById("notifications-toggle");
    const autoStartToggle = document.getElementById("auto-start-breaks");

    if (focusSlider) {
      focusSlider.value = this.timerState.settings.focusDuration;
      document.getElementById("focus-duration-value").textContent =
        this.timerState.settings.focusDuration;
    }

    if (breakSlider) {
      breakSlider.value = this.timerState.settings.breakDuration;
      document.getElementById("break-duration-value").textContent =
        this.timerState.settings.breakDuration;
    }

    if (ambientToggle) {
      ambientToggle.checked = this.timerState.settings.ambientSound;
    }

    if (notificationsToggle) {
      notificationsToggle.checked = this.timerState.settings.notifications;
    }

    if (autoStartToggle) {
      autoStartToggle.checked = this.timerState.settings.autoStartBreaks;
    }
  }

  updateEmptyStates() {
    // Update empty states based on data
    const todosEmpty = document.getElementById("todos-empty");
    const linksEmpty = document.getElementById("links-empty");
    const notesEmpty = document.getElementById("notes-empty");

    if (todosEmpty) {
      todosEmpty.style.display = this.todos.length === 0 ? "flex" : "none";
    }

    if (linksEmpty) {
      linksEmpty.style.display = this.links.length === 0 ? "flex" : "none";
    }

    if (notesEmpty) {
      notesEmpty.style.display = this.notes.trim() === "" ? "block" : "none";
    }
  }

  // Export/Import methods
  exportUserData() {
    const exportData = {
      todos: this.todos,
      notes: this.notes,
      links: this.links,
      events: this.events,
      stats: this.stats,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CozySpace_Export_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification("Data exported successfully!", "success");
  }

  importUserData() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importData = JSON.parse(e.target.result);

            if (confirm("This will replace your current data. Are you sure?")) {
              this.todos = importData.todos || [];
              this.notes = importData.notes || "";
              this.links = importData.links || [];
              this.events = importData.events || [];
              this.stats = { ...this.stats, ...importData.stats };

              this.loadAllData();
              this.updateStats();
              this.saveUserData();
              this.showNotification("Data imported successfully!", "success");
            }
          } catch (error) {
            this.showNotification("Invalid file format", "error");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  resetProfile() {
    if (
      confirm(
        "This will delete all your data and reset your profile. Are you sure?"
      )
    ) {
      this.todos = [];
      this.notes = "";
      this.links = [];
      this.events = [];
      this.stats = {
        sessionsToday: 0,
        tasksCompleted: 0,
        currentStreak: 0,
        totalFocusTime: 0,
      };
      this.timerState = {
        timeLeft: 25 * 60,
        isRunning: false,
        mode: "focus",
        session: 1,
        settings: {
          focusDuration: 25,
          breakDuration: 5,
          ambientSound: false,
          notifications: true,
          autoStartBreaks: false,
        },
      };

      this.loadAllData();
      this.updateStats();
      this.resetTimer();
      this.saveUserData();
      this.showNotification("Profile reset successfully!", "success");
    }
  }

  // Notification methods
  showNotification(message, type = "info") {
    const container = document.getElementById("notification-container");
    if (!container) return;

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="font-size: 1.25rem;">
          ${
            type === "success"
              ? "✅"
              : type === "error"
              ? "❌"
              : type === "warning"
              ? "⚠️"
              : "ℹ️"
          }
        </span>
        <span>${this.escapeHtml(message)}</span>
      </div>
    `;

    container.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (notification.parentNode) {
            container.removeChild(notification);
          }
        }, 300);
      }
    }, 4000);
  }

  showDesktopNotification(title, body) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body, icon: "🌙" });
    } else if (
      "Notification" in window &&
      Notification.permission !== "denied"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(title, { body, icon: "🌙" });
        }
      });
    }
  }

  // Utility methods
  escapeHtml(text) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.app = new CozySpace();
});

// Handle page visibility change to pause timer when tab is not visible
document.addEventListener("visibilitychange", () => {
  if (window.app && document.hidden && window.app.timerState.isRunning) {
    // Optionally pause timer when tab is hidden
    // window.app.pauseTimer();
  }
});
