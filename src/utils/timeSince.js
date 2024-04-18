function timeSince(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  let interval = seconds / 31536000; // 60 * 60 * 24 * 365

  if (interval > 1) {
    return (
      Math.floor(interval) + " year" + (Math.floor(interval) > 1 ? "s" : "")
    );
  }
  interval = seconds / 2592000; // 60 * 60 * 24 * 30
  if (interval > 1) {
    return (
      Math.floor(interval) + " month" + (Math.floor(interval) > 1 ? "s" : "")
    );
  }
  interval = seconds / 604800; // 60 * 60 * 24 * 7
  if (interval > 1) {
    return (
      Math.floor(interval) + " week" + (Math.floor(interval) > 1 ? "s" : "")
    );
  }
  interval = seconds / 86400; // 60 * 60 * 24
  if (interval > 1) {
    return (
      Math.floor(interval) + " day" + (Math.floor(interval) > 1 ? "s" : "")
    );
  }
  interval = seconds / 3600; // 60 * 60
  if (interval > 1) {
    return (
      Math.floor(interval) + " hour" + (Math.floor(interval) > 1 ? "s" : "")
    );
  }
  interval = seconds / 60;
  if (interval > 1) {
    return (
      Math.floor(interval) + " minute" + (Math.floor(interval) > 1 ? "s" : "")
    );
  }
  return Math.floor(seconds) + " second" + (Math.floor(seconds) > 1 ? "s" : "");
}

export default timeSince;
