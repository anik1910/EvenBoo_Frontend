importScripts("https://js.pusher.com/beams/service-worker.js");

self.addEventListener("push", function (event) {
  console.log("Push event received:", event);

  if (!event.data) return;

  const payload = event.data.json();
  console.log("Payload data:", payload);

  const notificationOptions = {
    body: payload.web?.notification?.body || "You have a new notification",
    icon: payload.web?.notification?.icon || "/icon-192x192.png",
    data: payload.web?.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(
      payload.web?.notification?.title || "Notification",
      notificationOptions
    )
  );
});

self.addEventListener("notificationclick", function (event) {
  const deep_link = event.notification.data?.deep_link || "/";
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(deep_link);
    })
  );
});
