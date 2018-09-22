import { FinanceiroUiPage } from './app.po';

describe('financeiro-ui App', () => {
  let page: FinanceiroUiPage;

  beforeEach(() => {
    page = new FinanceiroUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
