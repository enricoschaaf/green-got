// @ts-check
/// <reference types="cypress" />

/**
 *
 * @param {Partial<Cypress.RequestOptions>} options
 */
function request(options) {
  return cy.request({
    failOnStatusCode: false,
    ...options,
  })
}

const invalidUrls = [
  "api/greetings?first_name=",
  "api/greetings?first_name=Enrico&first_name=Enrico",
]

describe("Greetings", () => {
  it("should return with status 405", () => {
    request({
      url: "api/greetings?first_name=Enrico",
      method: "POST",
    }).then((response) => {
      expect(response.status).to.equal(405)
      expect(response.body).to.deep.equal({
        error: { message: "Method Not Allowed" },
      })
      expect(response.headers.allow).to.equal("GET")
    })
  })

  it("should return with status 422", () => {
    invalidUrls.map((url) =>
      request({
        url,
      }).then((response) => {
        expect(response.status).to.equal(422)
        expect(response.body).to.deep.equal({
          error: { message: "Unprocessable Entity" },
        })
      }),
    )
  })

  it('should return "Hello Enrico!"', () => {
    cy.request("api/greetings?first_name=Enrico").then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal({
        payload: "Hello Enrico!",
      })
    })
  })
})
