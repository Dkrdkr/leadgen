// Admin authentication system
const ADMIN_CODE_KEY = "admin_authenticated";
const ADMIN_SESSION_KEY = "admin_session_token";

// Get admin code from env or fallback
const ADMIN_ACCESS_CODE = import.meta.env.VITE_ADMIN_ACCESS_CODE || "ADMIN2026";

export function checkAdminAuth(): boolean {
  const isAuth = localStorage.getItem(ADMIN_CODE_KEY) === "true";
  const sessionToken = localStorage.getItem(ADMIN_SESSION_KEY);

  // Check if session is still valid (24h expiry)
  if (isAuth && sessionToken) {
    try {
      const tokenData = JSON.parse(atob(sessionToken));
      const expiryTime = tokenData.expiry;

      if (Date.now() < expiryTime) {
        return true;
      } else {
        // Session expired
        logoutAdmin();
        return false;
      }
    } catch {
      logoutAdmin();
      return false;
    }
  }

  return false;
}

export function authenticateAdmin(code: string): boolean {
  if (code === ADMIN_ACCESS_CODE) {
    // Create session token valid for 24h
    const sessionData = {
      authenticated: true,
      expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      timestamp: Date.now(),
    };

    const sessionToken = btoa(JSON.stringify(sessionData));

    localStorage.setItem(ADMIN_CODE_KEY, "true");
    localStorage.setItem(ADMIN_SESSION_KEY, sessionToken);

    // Track admin login
    console.log("[AUTH] Admin logged in at", new Date().toISOString());

    return true;
  }

  return false;
}

export function logoutAdmin(): void {
  localStorage.removeItem(ADMIN_CODE_KEY);
  localStorage.removeItem(ADMIN_SESSION_KEY);
  console.log("[AUTH] Admin logged out");
}

export function getAdminCode(): string {
  return ADMIN_ACCESS_CODE;
}

// Rate limiting for login attempts
const LOGIN_ATTEMPTS_KEY = "admin_login_attempts";
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

export function checkLoginAttempts(): { allowed: boolean; remaining: number; lockoutTime?: number } {
  const attemptsData = localStorage.getItem(LOGIN_ATTEMPTS_KEY);

  if (!attemptsData) {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  try {
    const data = JSON.parse(attemptsData);
    const { count, timestamp } = data;

    // Check if lockout period has passed
    if (Date.now() - timestamp > LOCKOUT_DURATION) {
      localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
      return { allowed: true, remaining: MAX_ATTEMPTS };
    }

    // Check if max attempts reached
    if (count >= MAX_ATTEMPTS) {
      const lockoutTime = timestamp + LOCKOUT_DURATION;
      return { allowed: false, remaining: 0, lockoutTime };
    }

    return { allowed: true, remaining: MAX_ATTEMPTS - count };
  } catch {
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }
}

export function recordLoginAttempt(success: boolean): void {
  if (success) {
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    return;
  }

  const attemptsData = localStorage.getItem(LOGIN_ATTEMPTS_KEY);

  if (!attemptsData) {
    localStorage.setItem(
      LOGIN_ATTEMPTS_KEY,
      JSON.stringify({ count: 1, timestamp: Date.now() })
    );
  } else {
    try {
      const data = JSON.parse(attemptsData);
      data.count += 1;
      localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(data));
    } catch {
      localStorage.setItem(
        LOGIN_ATTEMPTS_KEY,
        JSON.stringify({ count: 1, timestamp: Date.now() })
      );
    }
  }
}
