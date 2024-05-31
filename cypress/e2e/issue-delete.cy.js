describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
      });
  });

  it("Test case 1: Issue Deletion", () => {
    cy.wait(10000);
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      // Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]').first().click();
    });

    // Click the delete button and confirming the deletion
    cy.get('[data-testid="icon:trash"]').click();
    cy.contains("Delete issue").click();
    cy.wait(20000);

    //Assert that the deletion confirmation dialogue is not visible
    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    //Assert that  the issue is deleted and no longer displayed on the Jira board
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        // Assert that this list contains 4 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "3")
          .first()
          .find("p")
          .should("not.contain", "This is an issue of type: Task.")
          .siblings();
      });
  });

  it("Test Case 2: Issue Deletion Cancellation", () => {
    cy.wait(5000);
    cy.get('[data-testid="board-list:backlog"]').within(() => {
      // Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]').first().click();
    });

    //The issue deletion process and then cancelling it
    cy.get('[data-testid="icon:trash"]').click();
    //Assert the visibility of the issue detail view modal

    //Click the delete issue button
    cy.get("div").contains("Cancel").should("be.visible");
    cy.get("div").contains("Cancel").click();

    //Assert that the deletion confirmation dialogue is not visible
    cy.get('[data-testid="modal:confirm"]').should("not.exist");

    //Close the issue
    cy.get('[data-testid="icon:close"]').eq(0).click();

    //Assert that  the issue is deleted and no longer displayed on the Jira board
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        // Assert that this list contains 4 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "4")
          .first()
          .find("p")
          .should("contain", "This is an issue of type: Task.")
          .siblings();
      });
  });
});
