function dailyQuota() {
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
Logger.log("Remaining email quota: " + emailQuotaRemaining);
}
