import { faker } from "@faker-js/faker";

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        // System will already open issue creating modal in beforeEach block
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("Should create an issue and validate it successfully", () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Type value to description input field
      cy.get(".ql-editor").type("TEST_DESCRIPTION");
      cy.get(".ql-editor").should("have.text", "TEST_DESCRIPTION");

      // Order of filling in the fields is first description, then title on purpose
      cy.get(".ql-editor").clear();
      cy.get(".ql-editor").type("My bug description");
      // Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type("TEST_TITLE");
      // Type value to title input field
      cy.get('input[name="title"]').clear();
      cy.get('input[name="title"]').type("Bug");
      cy.get('input[name="title"]').should("have.value", "Bug");

      // Open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:story"]').should("be.visible");
      //cy.get('div[data-testid="select:reporterId"]').click();

      //Open Issue Type Dropdown and select Bug
      cy.get(".sc-qrIAp").eq(1).click();

      // Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      //Select Pickle Rick from Reporter Dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      // Select Baby Yoda from assignee dropdown
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      //First remove all selected assignees and then Select Lord Gaben from Assignee dropdown
      cy.get('[data-testid="form-field:userIds"]').click();
      //First clear the already added Assignee in the section
      //Below steps allows you to remove all selected options from Assignee Drop Down
      /*cy.get("i.sc-bdVaJa.iEcsva").each(($el) => {
        const itemCount = Cypress.$($el).length;
        cy.log(itemCount);
      });*/

      //cy.get("i.sc-bdVaJa.iEcsva").eq($el).click();

      cy.get("i.sc-bdVaJa.iEcsva").click();
      //cy.get('[data-testid="select:userIds]').clear();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      //Select priority of the issue
      //cy.get('[data-testid="form-field:priority"]').click();
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();

      //Assert that the issue has been created and is visible on the board
      //cy.get(".sc-bxivhb rljZq").should("be.visible");

      // Click on button "Create issue"
      cy.get('button[type="submit"]').click();

      //Assert that the issue has been created and is visible on the board
      //??
    });

    // Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    // Reload the page to be able to see recently created issue
    // Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    // Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        // Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Bug")
          .siblings()
          .within(() => {
            //Assert that correct avatar and type icon are visible
            cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
            cy.get('[data-testid="icon:story"]').should("be.visible");
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains("Bug")
      .within(() => {
        // Assert that correct avatar and type icon are visible
        cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
        cy.get('[data-testid="icon:story"]').should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      // Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      // Assert that correct error message is visible
      //cy.get('[data-testid="form-field:title"]').should(
      cy.get(".sc-gisBJw").should("contain", "This field is required");
    });
  });

  it("Random data plugin issue creation", () => {
    //Title: Use the random data plugin for a single word
    cy.wait(5000);
    //const title = faker.location.country();
    const title = faker.word.verb();
    cy.wait(5000);
    // System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //const { faker } = require("@faker-js/faker");
      cy.wait(500);
      cy.get('input[name="title"]').type(title);
      cy.wait(500);
      cy.get('input[name="title"]').should("have.value", title);

      // Order of filling in the fields is first description, then title on purpose
      cy.get(".ql-editor").clear();
      // Type value to description input field
      //const { faker } = require("@faker-js/faker");
      const desc = faker.word.words();
      cy.log(desc);
      cy.get(".ql-editor").type(desc);

      // Open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="icon:close"]').click();
      cy.get('[data-testid="select-option:Task"]')
        .wait(1000)
        .trigger("mouseover")
        .trigger("click");
      cy.get('[data-testid="icon:task"]').should("be.visible");
      //cy.get('div[data-testid="select:reporterId"]').click();

      // Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      //Select priority of the issue
      //cy.get('[data-testid="form-field:priority"]').click();
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();

      //Assert that the issue has been created and is visible on the board
      //cy.get(".sc-bxivhb rljZq").should("be.visible");

      // Click on button "Create issue"
      cy.get('button[type="submit"]').click();

      //Assert that the issue has been created and is visible on the board
      //??
    });

    // Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");

    // Reload the page to be able to see recently created issue
    // Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");

    cy.wait(5000);
    // Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        // Assert that this list contains 5 issues and first element with tag p has specified text
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains(title)
          .siblings()
          .within(() => {
            //Assert that correct icon type is visible
            //cy.get('[data-testid="avatar:Baby Yoda"]').should("be.visible");
            cy.get('[data-testid="icon:task"]').should("be.visible");
          });
      });
  });
});
