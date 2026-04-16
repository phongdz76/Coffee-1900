const AUTH_USERS_KEY = "coffee1900_users";
const AUTH_CURRENT_USER_KEY = "coffee1900_current_user";

function parseJson(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
  const users = parseJson(AUTH_USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

function saveUsers(users) {
  writeJson(AUTH_USERS_KEY, users);
}

function setCurrentUser(user) {
  const userSession = {
    id: user.id,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    loggedInAt: Date.now(),
  };

  writeJson(AUTH_CURRENT_USER_KEY, userSession);
}

function sanitizeRedirectPath(path) {
  if (!path || typeof path !== "string") {
    return null;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("//")
  ) {
    return null;
  }

  return path;
}

function getRedirectPath(defaultPath = "../../index.html") {
  const query = new URLSearchParams(window.location.search);
  const redirect = sanitizeRedirectPath(query.get("redirect"));
  return redirect || defaultPath;
}

function showFormMessage(message, type) {
  const messageElement = document.getElementById("formMessage");
  if (!messageElement) {
    return;
  }

  messageElement.className = `form-message show ${type}`;
  messageElement.textContent = message;
}

function normalizeInput(value) {
  return String(value || "").trim();
}

function normalizeIdentity(value) {
  return normalizeInput(value).toLowerCase();
}

function attachPasswordToggles() {
  const toggleButtons = document.querySelectorAll("[data-toggle-password]");
  toggleButtons.forEach((button) => {
    button.classList.remove("is-visible");
    button.setAttribute("aria-label", "Hiện mật khẩu");
    button.setAttribute("title", "Hiện mật khẩu");

    button.addEventListener("click", () => {
      const targetInputId = button.getAttribute("data-toggle-password");
      const targetInput = document.getElementById(targetInputId);
      if (!targetInput) {
        return;
      }

      const isPassword = targetInput.type === "password";
      targetInput.type = isPassword ? "text" : "password";

      button.classList.toggle("is-visible", isPassword);
      const actionLabel = isPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu";
      button.setAttribute("aria-label", actionLabel);
      button.setAttribute("title", actionLabel);
    });
  });
}

function attachCrossLinks() {
  const redirectPath = sanitizeRedirectPath(
    new URLSearchParams(window.location.search).get("redirect"),
  );
  if (!redirectPath) {
    return;
  }

  const signupLink = document.getElementById("signupLink");
  if (signupLink) {
    signupLink.href = `./signup.html?redirect=${encodeURIComponent(redirectPath)}`;
  }

  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.href = `./login.html?redirect=${encodeURIComponent(redirectPath)}`;
  }
}

function initLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) {
    return;
  }

  const query = new URLSearchParams(window.location.search);
  if (query.get("registered") === "1") {
    showFormMessage(
      "Đăng ký thành công. Vui lòng đăng nhập để tiếp tục.",
      "success",
    );
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const identifier = normalizeIdentity(loginForm.identifier.value);
    const password = normalizeInput(loginForm.password.value);

    if (!identifier || !password) {
      showFormMessage(
        "Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu.",
        "error",
      );
      return;
    }

    const users = getUsers();
    const matchedUser = users.find((user) => {
      return (
        normalizeIdentity(user.username) === identifier ||
        normalizeIdentity(user.email) === identifier
      );
    });

    if (!matchedUser || matchedUser.password !== password) {
      showFormMessage("Thông tin đăng nhập không chính xác.", "error");
      return;
    }

    setCurrentUser(matchedUser);
    showFormMessage("Đăng nhập thành công. Đang chuyển hướng...", "success");

    const redirectPath = getRedirectPath("../../index.html");
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 500);
  });
}

function validateSignupData(data, users) {
  if (data.fullName.length < 2) {
    return "Họ và tên phải có ít nhất 2 ký tự.";
  }

  if (!/^[a-zA-Z0-9._-]{3,20}$/.test(data.username)) {
    return "Tên đăng nhập gồm 3-20 ký tự, chỉ chứa chữ, số, dấu chấm, gạch ngang hoặc gạch dưới.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Email không hợp lệ.";
  }

  if (data.password.length < 6) {
    return "Mật khẩu phải có ít nhất 6 ký tự.";
  }

  if (!/[A-Za-z]/.test(data.password) || !/[0-9]/.test(data.password)) {
    return "Mật khẩu cần có ít nhất 1 chữ và 1 số.";
  }

  if (data.password !== data.confirmPassword) {
    return "Nhập lại mật khẩu chưa khớp.";
  }

  if (!data.acceptTerms) {
    return "Bạn cần đồng ý điều khoản sử dụng.";
  }

  const duplicatedUsername = users.some(
    (user) =>
      normalizeIdentity(user.username) === normalizeIdentity(data.username),
  );
  if (duplicatedUsername) {
    return "Tên đăng nhập đã tồn tại.";
  }

  const duplicatedEmail = users.some(
    (user) => normalizeIdentity(user.email) === normalizeIdentity(data.email),
  );
  if (duplicatedEmail) {
    return "Email đã được sử dụng.";
  }

  return null;
}

function initSignupForm() {
  const signupForm = document.getElementById("signupForm");
  if (!signupForm) {
    return;
  }

  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const users = getUsers();
    const formData = {
      fullName: normalizeInput(signupForm.fullName.value),
      username: normalizeInput(signupForm.username.value),
      email: normalizeInput(signupForm.email.value),
      password: normalizeInput(signupForm.password.value),
      confirmPassword: normalizeInput(signupForm.confirmPassword.value),
      acceptTerms: signupForm.terms.checked,
    };

    const validationError = validateSignupData(formData, users);
    if (validationError) {
      showFormMessage(validationError, "error");
      return;
    }

    const newUser = {
      id: `user-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      createdAt: Date.now(),
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);

    showFormMessage("Đăng ký thành công. Đang chuyển hướng...", "success");

    const redirectPath = getRedirectPath("../../index.html");
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 600);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  attachPasswordToggles();
  attachCrossLinks();

  const page = document.body.dataset.page;
  if (page === "login") {
    initLoginForm();
  }

  if (page === "signup") {
    initSignupForm();
  }
});
