describe("Time estimation functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.get('[data-testid="board-list:backlog"]')
          .should("be.visible")
          .and("have.length", "1")
          .within(() => {
            // Assert that this list contains 4 issues and first element with tag p has specified text
            cy.get('[data-testid="list-issue"]')
              .first()
              .should("contain", "This is an issue of type: Task.");
            cy.get('[data-testid="list-issue"]').first().click();
          });
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="Modal:issue-details"]');

  const originalestimatehourselector = '[placeholder="Number"]';
  const addtime = "10";
  const updatedestimatedTime = "15";

  it("Should add, update and remove estimated time in the issue", () => {
    //Add estimated time
    cy.get(originalestimatehourselector)
      .clear()
      .type(addtime)
      .should("have.value", addtime);

    //Add estimated updated time
    cy.get(originalestimatehourselector)
      .clear()
      .type(updatedestimatedTime)
      .should("have.value", updatedestimatedTime);

    // Remove estimated time
    cy.get(originalestimatehourselector).clear().should("have.value", "");
  });
});
