// @ts-nocheck
import * as puppeteer from "puppeteer";

async function run() {
  let browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: ["--start-maximized"],
    timeout: 0,
  });

  let page = await browser.newPage();
  await page.goto(
    "https://www.fiverr.com/categories/programming-tech/software-development/web-application?source=drawer&ref=seller_location%3AMA%7Cseller_level%3Alevel_two_seller",
  );
  await page.waitForSelector(".gig_listings-package");
  let data = await page.evaluate(() => {
    let elements = document.querySelectorAll(
      ".gig_listings-package > .gig-card-layout",
    );
    let gigs = [];
    elements.forEach((element) => {
      let gig = {
        title: element.querySelector("h3.text-normal")?.textContent,
        link: element.querySelector("a")?.href,
        price: element.querySelector(".hxtGeVp span span")?.textContent,
        rating: element.querySelector(".rating-score")?.textContent,
        reviews: element.querySelector(".rating-count-number")?.textContent,
        image: element
          .querySelector("img")
          ?.src.replace("/t_gig_cards_web,q_auto,f_auto", ""),
        seller: {
          name: element.querySelector(".ZIApIq2")?.textContent,
          image: element
            .querySelector("._YszT7W")
            ?.src.replace("/t_profile_thumb,q_auto,f_auto", ""),
        },
      };
      gigs.push(gig);
    });
    return gigs;
  });
  console.log(data);
  await browser.close();
}

run();
