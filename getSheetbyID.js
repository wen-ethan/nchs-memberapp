function getSheetbyID(id) {
  //picks up every single sheet
  var wb = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = wb.getSheets();

  //iterates through them to find the sheet we want
  for (i in sheets) {
    if(sheets[i].getSheetId() == id ) {
      //once matched, remember the name of the sheet
      var sheetName = sheets[i].getSheetName();
    }
  }

  //returns the sheet data we want by looking it up via its name
  return wb.getSheetByName(sheetName);
}
