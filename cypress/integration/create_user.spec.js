// @ts-check
/// <reference types="cypress" />

/**
 *
 * @param {Partial<Cypress.RequestOptions>} options
 */
function request(options) {
  return cy.request({
    url: "api/create_user",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
    ...options,
  })
}

const invalidInputs = [
  { firstName: "enrico" },
  {
    lastName: "schaaf",
  },
  { firstName: "", lastName: "" },
]

describe("Create User", () => {
  it("should return with status 405", () => {
    request({ method: "GET" }).then((response) => {
      expect(response.headers.allow).to.equal("POST")
      expect(response.status).to.equal(405)
      expect(response.body).to.deep.equal({
        error: { message: "Method Not Allowed" },
      })
    })
  })

  it("should return with status 422", () => {
    invalidInputs.map((input) =>
      request({
        body: JSON.stringify(input),
      }).then((response) => {
        expect(response.status).to.equal(422)
        expect(response.body).to.deep.equal({
          error: { message: "Unprocessable Entity" },
        })
      }),
    )
  })

  it("should return with capitalized first and last name", () => {
    request({
      body: JSON.stringify({ firstName: "enrico", lastName: "schaaf" }),
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.deep.equal({
        payload: { Firstname: "Enrico", Lastname: "Schaaf" },
      })
    })
  })
})
