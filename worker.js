console.log("Service worker loaded");

self.addEventListener("push", (e) => {
  const data = e.data.json();

  self.registration.showNotification(data.title, {
    body: "Notified by vikita otiz",
    icon: "https://cdn.britannica.com/15/15-004-B5D6BF80/Flag-Kenya.jpg",
  });
});
