import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const IDLE_LIMIT = 10; // seconds before auto-logout
const WARNING_THRESHOLD = 5; // show dialog when remaining <= 5

function Dashboard() {
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(IDLE_LIMIT);
  const [showDialog, setShowDialog] = useState(false);

  // Stable handler that resets the timer
  const reset = useCallback(() => {
    setRemaining(IDLE_LIMIT);
  }, []);

  // Tick down once per second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // React to remaining time changes (show/hide dialog, logout)
  useEffect(() => {
    if (remaining <= WARNING_THRESHOLD && remaining > 0) {
      setShowDialog(true);
    } else if (remaining > WARNING_THRESHOLD) {
      setShowDialog(false);
    }

    if (remaining <= 0) {
      setShowDialog(false);
      navigate("/"); // redirect when idle runs out
    }
  }, [remaining, navigate]);

  // Listen for real activity events and reset timer (debounced to avoid spam)
  useEffect(() => {
    let last = 0;
    const MIN_GAP = 250; // ms

    const onActivity = () => {
      const now = Date.now();
      if (now - last < MIN_GAP) return; // throttle
      last = now;
      reset();
    };

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "wheel",
      "touchstart",
      "visibilitychange",
    ];

    // Special-case: when tab becomes visible, treat as activity
    const handler = (e) => {
      if (e.type === "visibilitychange") {
        if (document.visibilityState === "visible") onActivity();
        return;
      }
      onActivity();
    };

    events.forEach((evt) =>
      window.addEventListener(evt, handler, { passive: true })
    );
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handler));
    };
  }, [reset]);

  return (
    <div className="flex w-full justify-center items-center flex-col gap-4 h-screen">
      <h2>User Logged In Successfully</h2>
      <p>Login at: {new Date().toLocaleString()}</p>
      <p>
        Idle timeout in: {remaining} second{remaining === 1 ? "" : "s"}
      </p>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-md p-4 w-[90%] max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Still there?</h3>
            <p className="mb-4">
              Auto-logout in <strong>{remaining}</strong> second
              {remaining === 1 ? "" : "s"}. Move mouse or press any key to stay
              signed in.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => navigate("/")}
                className="px-3 py-1.5 rounded bg-red-600 text-white"
              >
                Logout now
              </button>
              <button
                onClick={() => reset()}
                className="px-3 py-1.5 rounded bg-zinc-200 dark:bg-zinc-800"
              >
                Stay signed in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
