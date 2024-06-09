/**
 * This is an example file and approach for POM in Cypress
 * 
 * 
 */

 import issueModal from './IssueModal';

  const issueTitle = 'This is an issue of type: Task.';

  describe('Issue deletion', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then(() => {
        cy.contains(issueTitle).click();
      });
    });

  it('Should delete issue successfully', () => {
    issueModal.deletingIssue ();
      });
  });


  describe('Issue deletion cancellation', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains(issueTitle).click();
      });
    });

  it('Should cancel deletion process successfully', () => {
   issueModal.cancellingDeletingIssue ();
});
});