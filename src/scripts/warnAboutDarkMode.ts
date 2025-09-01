/**
 * Samsung Internet applies a filter over many colors if dark-mode is enabled.
 * If the user is on Samsung Internet we should warn them and give them some options to
 * improve their experience.
 *
 * Credit for this goes to the answer here:
 * https://stackoverflow.com/questions/60118216/how-do-i-stop-dark-mode-from-destroying-my-css
 *
 * */

if (navigator.userAgent.match(/samsung/i)) {
  alert("Your browser (Samsung Internet) might not be showing you this website correctly; " +
    "especially if you use dark-mode.\n\n" +
    "If the site is displaying unexpected colors for your theme you can either:\n" +
    "\t1. Ensure dark-mode is disabled for the browser, or, if that doesn't work\n" +
    "\t2. Use a standards-compliant browser, such as Google Chrome, Firefox, or Microsoft Edge.",
  );
}
