const { Builder, By } = require('selenium-webdriver');
const fs = require('fs');

(async () => {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.umg.edu.gt/');

    await driver.sleep(5000); 

    const body = await driver.findElement(By.tagName('body'));
    await driver.executeScript("arguments[0].scrollTo(0, arguments[0].scrollHeight);", body);

    const screenshot = await driver.takeScreenshot();

    fs.writeFileSync('screenshot.png', screenshot, 'base64');
    console.log('Captura de pantalla de toda la página guardada correctamente.');
  } catch (error) {
    console.error('Ocurrió un error:', error);
  } finally {
    await driver.quit();
  }
})();
