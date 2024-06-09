

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

it('Need to create a new issue with modified information',()=> {
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('The bug description');
    cy.get('input[name="title"]').type('Bug');
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="select-option:Bug"]').wait(1000).trigger('mouseover').trigger('click');
    cy.get('[data-testid="icon:bug"]').should('be.visible');
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Highest"]').click();
    cy.get('[data-testid="select:userIds"]').click();
    cy.get('[data-testid="select-option:Lord Gaben"]').click();
    cy.get('button[type="submit"]').click();
  });
    
  cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Bug')
          .siblings()
          .within(() => {
          cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
          cy.get('[data-testid="icon:bug"]').should('be.visible');
          })
          })
  })
})




describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

it('Need to create a new issue with random data plugin',()=> {
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('Random data plugin description');
    cy.get('input[name="title"]').type('Random Name');
    cy.get('[data-testid="select:type"]').click();
    cy.get('[data-testid="icon:task"]').should('be.visible');
    cy.get('[data-testid="select:reporterId"]').click();
    cy.get('[data-testid="select-option:Baby Yoda"]').click();
    cy.get('[data-testid="select:priority"]').click();
    cy.get('[data-testid="select-option:Low"]').click();
    cy.get('button[type="submit"]').click();
  });
    
  cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Random Name')
          .siblings()
          .within(() => {
          cy.get('[data-testid="icon:task"]').should('be.visible');
          })
          })
  })
})