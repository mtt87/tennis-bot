const { test } = require("@playwright/test");
const moment = require("moment");

const day = moment().add(7, "days");

console.log("booking for day:", day.format("DD MMMM yyy"));

test("test", async ({ page }) => {
  // Go to https://outlook.office365.com/owa/calendar/GardenHallsTennis@upp-ltd.com/bookings/
  await page.goto(
    "https://outlook.office365.com/owa/calendar/GardenHallsTennis@upp-ltd.com/bookings/"
  );
  await page.click("text=Visitor");
  await page.click(
    `[aria-label="${day.format("DD MMMM yyy")}. Times available"]`
  );
  if (await page.isVisible("text=10:00")) {
    await page.click("text=10:00");
  } else if (await page.isVisible("text=11:00")) {
    await page.click("text=11:00");
  } else if (await page.isVisible("text=12:00")) {
    await page.click("text=12:00");
  } else {
    await page.pause();
    throw new Error("no available time");
  }
  await page.fill('[placeholder="Name"]', process.env.NAME);
  await page.fill('[placeholder="Email"]', process.env.EMAIL);
  await page.fill('[placeholder="Phone number"]', process.env.PHONE_NUMBER);
  await page.fill(
    'text=Provide additional informationSurname (please also provide full name above) >> input[type="text"]',
    process.env.NAME
  );
  await page.check('input[type="checkBox"]');
  await page.click('button[type="submit"]');
});
