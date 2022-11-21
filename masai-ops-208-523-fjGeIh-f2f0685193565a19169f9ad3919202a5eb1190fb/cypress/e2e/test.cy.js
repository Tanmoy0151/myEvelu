import data from "../../submissionData.json"; // do not create this file

// let data = [{ submission_link: "http://localhost:8080/", id: 67890 }];

data.forEach((ele) => {
  describe("Website Builder layout", () => {
    let url = ele.submission_link;
    let acc_score = 1;
    if (url && url.trim().length) {
      it("There is a Image inside the Main", () => {
        cy.visit(url);
        cy.get(".main>img").then(() => {
          acc_score += 1;
        }); //
      }); // Giving a score of 1
      it("Checking the Text align part for the texts", () => {
        cy.get("#content>h1")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 1;
          });
        cy.get("#content>p")
          .should("have.css", "text-align", "center")
          .then(() => {
            acc_score += 1;
          });
      }); // Giving a score of 2

      it("Products should have display flex &  4 child divs inside it", () => {
        cy.get("#products")
          .should("have.css", "display", "flex")
          .then(() => {
            acc_score += 1;
          });
        cy.get("#products")
          .children()
          .should("have.length", 4)
          .then(() => {
            acc_score += 1;
          });
      }); // Giving a score of 2

      it("Each box has a image, a h3 and a p tag inside it", () => {
        cy.get(".box h3");
        cy.get(".box p");
        cy.get(".box img");
        cy.then(() => {
          acc_score += 2;
        });
      }); // Giving a score of 2
      it("The text inside the child elements should be  aligned center", () => {
        cy.get(".box h3").should("have.css", "text-align", "center");
        cy.get(".box p").should("have.css", "text-align", "center");

        cy.then(() => {
          acc_score += 2;
        });
      }); // 2
    }
    it(`generate score`, () => {
      //////////////
      console.log(acc_score);
      let result = {
        id: ele.id,
        marks: Math.floor(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});
