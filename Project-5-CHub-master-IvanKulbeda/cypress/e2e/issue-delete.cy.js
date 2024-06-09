describe('Issue deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Delete the issue', () => {
    cy.get('[data-testid="modal:issue-details"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="icon:trash"]').should('be.visible').click();
      });

    cy.get('[data-testid="modal:confirm"]')
      .should('be.visible')
      .within(() => {
        cy.get('button').contains('Delete issue').click();
      });

    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('not.exist');
  });
});

describe('Issue deletion cancellation', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  it('Cancel the deletion of the issue', () => {
    cy.get('[data-testid="modal:issue-details"]')
      .should('be.visible')
      .within(() => {
        cy.get('[data-testid="icon:trash"]').first().should('be.visible').click();
      });

    cy.get('[data-testid="modal:confirm"]')
      .should('be.visible')
      .within(() => {
        cy.get('button').contains('Cancel').click();
      });

    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    cy.get('[data-testid="icon:close"]').first().should('be.visible').click();
    cy.get('[data-testid="modal:issue-details"]').should('not.exist');
  });
});