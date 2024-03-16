function main() {
  //find the sheet and get all of its data
  var formResp = getSheetbyID(978379940);

  //get all of its data
  var formData = formResp.getRange(1, 1, formResp.getLastRow(), formResp.getLastColumn()).getDisplayValues();
  // Logger.log(formData);
  
  //get the latest responses (aka the last row)
  var recentResponse = formResp.getRange(formResp.getLastRow(), 1, 1, formResp.getLastColumn()).getDisplayValues();
  // Logger.log(recentResponse);

  //define fields to replace (birthday is later)
  var nameCN = recentResponse[0][1];
  var nameENG = recentResponse[0][2];
  var age = recentResponse[0][4];
  var address = recentResponse[0][5];
  var emailRecipient = recentResponse[0][6];
  var grade = recentResponse[0][7];
  var mando1 = recentResponse[0][8];
  var mando2 = recentResponse[0][9];
  var mando3 = recentResponse[0][10];
  var mando4 = recentResponse[0][11];
  var mando5 = recentResponse[0][12];
  var mandoOther = recentResponse[0][13];
  var gpa9 = recentResponse[0][14];
  var gpa10 = recentResponse[0][15];
  var gpa11 = recentResponse[0][16];
  var questionOne = recentResponse[0][17];
  var questionTwo = recentResponse[0][18];
  var questionuThree = recentResponse[0][19];
  var questionFour = recentResponse[0][20];

  //split the birthday into its corresponding values, instead of one large string
  var bdayWhole = recentResponse[0][3];
  var bdayArray = [{}];
  bdayArray = bdayWhole.split("/");
  // Logger.log(bdayArray);

  //set the google doc to create a copy of and the folder to put the copies into
  //then create the copy
  var file = DriveApp.getFileById('1QNGbtm24GD-tAHl6MYMEuGgj3ZiaVUjuxgQDTUXC1ac'); 
  var folder = DriveApp.getFolderById('1_ttA3-eJrQfy0jUJ63uxDNkxQMZz0DRW')
  var copy = file.makeCopy(nameENG + ' - National Chinese Honors Society Student Application Form', folder); 
  
  //open the copy of the template doc and prepare for updates
  //THE DOC IS FOUND UNDER THE 'COPY' VARIABLE, 'DOC' SIMPLY ALLOWS FOR EDITS TO HAPPEN TO THE COPY
  var doc = DocumentApp.openById(copy.getId()); 
  var body = doc.getBody(); 

  //replace stuff :sob:
  body.replaceText('{{chineseName}}', nameCN); 
  body.replaceText('{{engName}}', nameENG);  
  body.replaceText('{{birthYear}}', bdayArray[2]);
  body.replaceText('{{birthMonth}}', bdayArray[0]);
  body.replaceText('{{birthDay}}', bdayArray[1]);
  body.replaceText('{{age}}', age);
  body.replaceText('{{address}}', address);  
  body.replaceText('{{email}}', emailRecipient);  
  body.replaceText('{{grade}}', grade);
  body.replaceText('{{1grade}}', mando1);
  body.replaceText('{{2grade}}', mando2);
  body.replaceText('{{3grade}}', mando3);
  body.replaceText('{{4grade}}', mando4);
  body.replaceText('{{5grade}}', mando5);
  body.replaceText('{{otherGrade}}', mandoOther);
  body.replaceText('{{9gpa}}', gpa9);
  body.replaceText('{{10gpa}}', gpa10);
  body.replaceText('{{11gpa}}', gpa11);
  body.replaceText('{{questionOne}}', questionOne);
  body.replaceText('{{questionTwo}}', questionTwo);
  body.replaceText('{{questionThree}}', questionuThree);
  body.replaceText('{{questionFour}}', questionFour);

  //save doc, keeps changes made
  doc.saveAndClose(); 

  //create email template from email.html
  var htmlTemplate = HtmlService.createTemplateFromFile('email');

  //make the values we want to use in the email objects of the template
  htmlTemplate.nameENG = nameENG;

  //evaluate the template and prep it for emailing
  var htmlEmail = htmlTemplate.evaluate().getContent();

  //send email
  GmailApp.sendEmail(
    emailRecipient, 
    'NCHS Student Application Form', 
    'This email contains html', {
     htmlBody: htmlEmail,
     attachments: [copy.getAs(MimeType.PDF)],
     name: 'National Chinese Honors Society'
    }
  );

  //delete the file
  //if you would prefer to keep all of the generated forms in the selected folder instead of deleteing them immediately, then comment out the line below
  copy.setTrashed(true);

}
