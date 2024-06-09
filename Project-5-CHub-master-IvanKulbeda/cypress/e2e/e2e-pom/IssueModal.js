/**
 * This is an example file and approach for POM in Cypress
 * 
 * 
 */
class IssueModal {
  constructor () {
    this.issueDetails = '[data-testid="modal:issue-details"]';
    this.issueConfirm = '[data-testid="modal:confirm"]';
    this.iconTrash = '[data-testid="icon:trash"]';
    this.iconClose = '[data-testid="icon:close"]';
  }

  

  deletingIssue ()  {
    cy.get(this.issueDetails)
      .should('be.visible')
      .within(() => {
        cy.get(this.iconTrash).should('be.visible').click();
      });

      cy.get(this.issueConfirm)
      .should('be.visible')
      .within(() => {
        cy.get('button').contains('Delete issue').click();
      });

      cy.get(this.issueConfirm).should('not.exist');
      cy.get(this.issueDetails).should('not.exist');

      cy.reload();

      cy.contains('This is an issue of type: Task.').should('not.exist');
  }

    cancellingDeletingIssue () {
      cy.get(this.issueDetails)
        .should('be.visible')
        .within(() => {
          cy.get(this.iconTrash).first().should('be.visible').click();
        });

        cy.get(this.issueConfirm)
        .should('be.visible')
        .within(() => {
          cy.get('button').contains('Cancel').click();
        });

        cy.get(this.issueConfirm).should('not.exist');
        cy.get(this.issueDetails).should('be.visible');
        cy.get(this.iconClose).first().should('be.visible').click();
        cy.get(this.issueDetails).should('not.exist');
  }
  
 } 

 export default new IssueModal();
